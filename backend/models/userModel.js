import mongoose from 'mongoose';

const userModel = new mongoose.Schema(
    {
        name: {type: String},
        email: {type: String},
        password: {type: String},
        isAdmin: {type: Boolean},
    },
);

const User = mongoose.model('User', userModel);

export default User;