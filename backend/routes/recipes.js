const router = require('express').Router();
let Recipe = require('../models/recipe.model');
let Ingredient = require('../models/ingredient.model');

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const recipeName = req.body.name.toLowerCase();
    const ingredients = req.body.ingredients;

    const newRecipe = new Recipe({name: recipeName});
    console.log(ingredients);
    for(let i = 0; i < ingredients.length; i++){
        let ingredient = ingredients[i];
        const name = ingredient['name'].toLowerCase();
        const amount = ingredient['amount'];
        const recipe_id = newRecipe._id; 
        const newIngredient = new Ingredient({name, amount, recipe_id});

        newIngredient.save();
        // .then(() => res.json('Ingredient added!'))
        // .catch(err => res.status(400).json('Error: ' + err));
    }
    
    newRecipe.save()
        .then(() => res.json('Recipe added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get individual recipe's ingredient list
router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id.toLowerCase())
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete individual recipe's ingredient list
router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id.toLowerCase())
        .then(() => res.json('Recipe deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));

    // delete ingredients associated with recipe
    Ingredient.deleteMany({recipe_id: req.params.id.toLowerCase()});
});

// update single recipe
// router.route('/update/:id').post((req, res) => {
// })

module.exports = router;