const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const accountSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

},
//cập nhật update
{Timestamps: true},

{
    versionKey: false,
});

module.exports = mongoose.model('Account', accountSchema);
