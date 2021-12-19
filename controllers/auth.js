const {StatusCodes} = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = require('../models/Users');



const register = async (req,res) => {

    const user = await User.create(req.body);

    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({user:{name: user.name},token});
};

const login = async(req,res) => {

    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide email and Password');
    }

    const user = await User.findOne({email});

    if(!user){
        throw new UnauthenticatedError('Please provide valid credetials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Please provide valid credetials');
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({user:{name: user.name},token});
};

module.exports = {register, login};