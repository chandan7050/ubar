
// const userModel = require('../models/UserModels')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const blackListModel = require('../models/BlackListTokenModel')


// module.exports.authUser = async (req, res, next) => {
//     const token = req.cookies.token || req.headers?.authorization?.split(' ')[ 1 ];

//     console.log("this is token-- ", token );
    

//     if (!token) {
//         return res.status(401).json({ message: 'Token not provided' });
//     }

//     const isBlacklisted = await blackListModel.findOne({ token: token});

//     if(isBlacklisted){
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);

//         console.log("this req.user ",req.user);
        

//         req.user = user;

//         return next();

//     }catch(error){
//         return res.status(401).json({ message: 'Unauthorized' });

//     }
// }

const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');
const blackListTokenModel = require('../models/BlackListTokenModel');
const bcrypt = require('bcrypt')
const captainModel = require('../models/CaptainModels');
require('dotenv').config();

exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token || (req.headers?.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null);
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded.id; // Add user ID to req.user
    console.log('Decoded user id from token:', decoded.id);

    // Optionally, fetch the user data from the database
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('User found in database:', user);

    req.user = user;

    next();
  } catch (error) {
    console.log("yaha error agaya ", error);
    
    res.status(401).json({ message: 'Unauthorized', error });
  }
}


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}