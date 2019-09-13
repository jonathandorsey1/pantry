const router = require('express').Router();
let Ingredient = require('../models/ingredient.model');

router.route('/').get((req, res) => {
    Ingredient.find()
        .then(ingredients => res.json(ingredients))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const amount = req.body.amount;
    const recipe_id = req.body.recipe_id; 

    const newIngredient = new Ingredient({name, amount, recipe_id});
    
    newIngredient.save()
        .then(() => res.json('Ingredient added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;