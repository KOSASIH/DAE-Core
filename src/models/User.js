import mongoose from 'mongoose';

/**
 * User Schema for storing user information.
 */
const userSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    registeredAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the User model
const User = mongoose.model('User ', userSchema);

export default User;
