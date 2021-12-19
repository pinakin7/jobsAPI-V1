const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide company name"],
    },
    position:{
        type: String,
        required: [true, "Please provide position"],
    },
    status:{
        type: String,
        enum: ['interview','declined','pending'],
        default: "pending",
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true,"Please provide job author"],
    }
},{
    timestamps: true
});


module.exports = mongoose.model('Job', JobSchema);