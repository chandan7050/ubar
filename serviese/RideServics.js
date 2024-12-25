
const rideModel = require('../models/RideModels')
const mapService = require('./mapsServies')

async function getFare(pickup,destination){
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    // const  distanceTime = await mapService.getDistanceTime(pickup,destination);
    
    let distanceTime;
    try {
        distanceTime = await mapService.getDistanceTime(pickup, destination);
        console.log('Calculated Distance:', distanceTime.distance);
        console.log('Calculated Duration (in minutes):', distanceTime.duration);
    } catch (err) {
        console.error('Error from mapService:', err);
        throw new Error('Unable to get distance and duration from mapService');
    }


    let distance = parseFloat(distanceTime.distance.replace(/[^\d.-]/g, ''));
    let duration = parseFloat(distanceTime.duration.replace(/[^\d.-]/g, ''));

    // Ensure that both distance and duration are valid numbers
    if (isNaN(distance) || isNaN(duration)) {
        console.error('Invalid distance or duration:', distanceTime);
        throw new Error('Invalid distance or duration from mapService');
    }

    
    console.log('Cleaned Distance:', distance);
    console.log('Cleaned Duration:', duration);


    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distance / 1000) * perKmRate.auto) + ((duration / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distance / 1000) * perKmRate.car) + ((duration / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distance / 1000) * perKmRate.moto) + ((duration / 60) * perMinuteRate.moto))
    };


    console.log('Calculated Fare for Auto:', fare.auto);
    console.log('Calculated Fare for Car:', fare.car);
    console.log('Calculated Fare for Moto:', fare.moto);

    return fare;
}

// module.exports.getFare = getFare


module.exports.createRide = async ({
    user,pickup, destination,vehicleType
}) => {
    if (!user ||!pickup ||!destination || !vehicleType) {
        throw new Error('All fields are require');
    }

    const fare = await getFare(pickup, destination);

    if (!fare[vehicleType] || isNaN(fare[vehicleType])) {
        throw new Error('Invalid fare calculation');
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: otp 
    });

    return ride;
}


module.exports.getFare = getFare;


module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if(!rideId){
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if(!rideId ||!otp){
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride is not accepted');
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status:'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({rideId,captain}) => {
    if(!rideId){
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain:captain._id
    }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found or not assigned to captain');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id:rideId,
    },{
        status:'complete'
    })

    return ride;
}