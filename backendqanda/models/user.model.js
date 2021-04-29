const mongoose = require('mongoose');
bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    password: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    favorite: Object,
    location: Object
}, {
    timestamps: true
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('users', UserSchema);