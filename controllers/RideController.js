const rideService = require('../serviese/RideServics');
const {validationResult} = require('express-validator');
const mapService = require('../serviese/mapsServies');
const rideModel = require('../models/RideModels');

module.exports.createRide = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType} = req.body;

    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try{
        const ride = await rideService.createRide({user:req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        // const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}

module.exports.getFare = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup,destination} = req.query;

    try {
        const fare = await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);

    }catch(e){
        return res.status(500).json({ message: err.message });
    }

}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId} = req.body;

    try{
        const ride = await rideService.confirmRide({rideId, captain:req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data:ride
        })
        return res.status(200).json(ride);
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId,otp} = req.query;

    try{
        const ride = await rideService.startRide({rideId, otp, captain:req.captain});
        console.log(ride);
         sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
         })
         return res.status(200).json(ride);

    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId} = req.body;

    try{
        const ride = await rideService.endRide({rideId, captain:req.captain});

        sendMessageToSocketId(ride.user.socketId,{
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}