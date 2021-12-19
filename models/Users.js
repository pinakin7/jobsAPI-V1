const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [/\S+@\S+\.\S+/, "Please provide valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 7,
    }
});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.methods.createJWT = function(){
    return jwt.sign({userID: this._id, name: this.name},process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME});
};

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);