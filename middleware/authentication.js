const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

require('dotenv').config();

const authUser = async (req, res, next) => {
    // check the header

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Invalid Authentication');
    }

    const token = authHeader.split(' ')[1];

    try {

        const payLoad = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {userID: payLoad.userID, name: payLoad.name};

        next();

    } 
    catch (error) {
        throw new UnauthenticatedError(error);
    }

};

module.exports = authUser;