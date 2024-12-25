const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const userController = require('../controllers/UserConrillers')
const auth = require('../middlewears/auth')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
 userController.registerUser
)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
userController.loginUser
)

// router.get('/profile', auth.authUser, userController.getUserProfile);

router.get('/profile',auth.authUser, (req,res)=> {
    res.status(200).json({
        message: 'User details fetched successfully',
        user: req.user
      });
});


module.exports = router;