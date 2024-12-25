const blackListTokenModel = require('../models/BlackListTokenModel');
const userModel = require('../models/UserModels');
const userServies = require('../serviese/UserServies');
const {validationResult} = require('express-validator');
// const auth = require('../middlewears/auth');

module.exports.registerUser = async (req,res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {fullName,email, password} = req.body;

    const hashPassword = await userModel.hashPassword(password);

    const user = await userServies.createUser({
        firstName: fullName.firstName,
        lastName:  fullName.lastName,
        email,
        password:hashPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({user, token});


}

module.exports.loginUser = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    console.log("login User", user);
    

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparaPassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token',token, { httpOnly: true})

    res.status(201).json({token,user})

}

module.exports.getUserProfile = async (req,res,next) => {
    // const user = await userModel.findById(req.user._id).select('-password');
    // res.json(user);
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req,res,next) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    // await blackListTokenModel.create({token});

    res.status(200).json({ message: 'Logged out' });
}