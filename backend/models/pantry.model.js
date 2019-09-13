const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pantrySchema = new Schema({
    username: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Pantry = mongoose.model('Pantry', pantrySchema);
module.exports = Pantry;