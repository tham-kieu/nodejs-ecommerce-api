const { types } = require('joi');
const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    ten: {
        types: String,
        required: true,
        trim: true
    },
    mota: {
        types: String,
        default: ''
    },
    namxuatban: {
        types: Number,
        default: new Date().getFullYear()

    },
    nhaxuatban: {
        types: String,
        default: ''
    },
    tacgia: {
        types: String,
        default: ''
    },

}, { timestamps: true });
