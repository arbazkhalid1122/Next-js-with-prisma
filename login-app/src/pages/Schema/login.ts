const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export const NewUsers = mongoose.models.user || mongoose.model('user', newUserSchema);
