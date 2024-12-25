

const axios = require('axios');
const captainModel = require('../models/CaptainModels');
require('dotenv').config();

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.OPENCAGE_API_KEY; // Correct API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`; // OpenCage URL

    try {
        const response = await axios.get(url);
        
        // Check if the response has results
        if (!response.data.results || response.data.results.length === 0) {
            throw new Error('Unable to fetch coordinates from the API response');
        }

        // Get the first result's location
        const location = response.data.results[0].geometry;

        return {
            lat: location.lat, // Change ltd to lat
            lng: location.lng  // lng remains the same
        };
    } catch (error) {
        console.error('Error while fetching coordinates:', error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.OPENCAGE_API_KEY;

    try {
        // 1️⃣ Get Coordinates for Origin
        const originLocation = await module.exports.getAddressCoordinate(origin);
        if (!originLocation) {
            throw new Error(`Unable to get coordinates for origin: ${origin}`);
        }

        // 2️⃣ Get Coordinates for Destination
        const destinationLocation = await module.exports.getAddressCoordinate(destination);
        if (!destinationLocation) {
            throw new Error(`Unable to get coordinates for destination: ${destination}`);
        }

        // 3️⃣ Calculate distance using Haversine formula
        const distance = calculateDistance(
            originLocation.lat, 
            originLocation.lng, 
            destinationLocation.lat, 
            destinationLocation.lng
        );

        console.log('Calculated Distance:', distance); 

        // 4️⃣ Time calculation (assuming an average speed of 40 km/h, adjust as needed)
        const speed = 40; // km/h
        const time = distance / speed; // Time in hours
        const duration = time * 60; // Convert to minutes

        console.log('Calculated Duration (in minutes):', duration);

        return {
            origin: origin,
            destination: destination,
            distance: `${distance.toFixed(2)} km`,
            duration: `${duration.toFixed(0)} minutes` // In minutes
        };

    } catch (error) {
        console.error('Error while fetching distance and time:', error.message);
        throw error;
    }
};

// 📐 Haversine Formula to Calculate Distance Between Two Coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    

    const apiKey = process.env.OPENCAGE_API_KEY;  // OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        console.log('API Response:', response.data);  // Log response for debugging

        // Check if API status is OK
        if (response.data.status.code !== 200) {
            throw new Error(`OpenCage API Error: ${JSON.stringify(response.data.status)}`);
        }

        if (!response.data.results || response.data.results.length === 0) {
            throw new Error('No suggestions found');
        }

        // Extract place descriptions and return them
        return response.data.results.map(result => result.formatted).filter(value => value);
    } catch (err) {
        console.error('Error fetching suggestions:', err.message);
        throw err;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;
}