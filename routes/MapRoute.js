
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewears/auth')
const mapController = require('../controllers/MapController')
const {query} = require('express-validator');


router.get('/get-coordinates', 
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistance
);

router.get('/get-suggestions', 
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

module.exports = router;