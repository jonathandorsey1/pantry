const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    recipe_id: {
        type: ObjectId,
        required: true
    }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;