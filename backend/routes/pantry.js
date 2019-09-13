const router = require('express').Router();
let Pantry = require('../models/pantry.model');

router.route('/:id').get((req, res) => {
    Pantry.find({username: id, amount: {$gt: 0}})
        .then(pantry => res.json(pantry))
        .catch(err => res.status(400).json('Error ' + err));
});

// todo: match add recipe matching per user
// router.route('/:id/matches').get(req, res) => {
//     Pantry
// }

router.route('/:id/add').post((req, res) => {

    const username = id;
    const name = req.body.name;
    const amount = req.body.amount;

    const newPantry = new Pantry({username, name, amount});

    newPantry.save()
        .then(() => res.json('Ingredient added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').post((req, res) => {
    Pantry.findOne({username: id, name: req.body.name})
        .then(ingredient => {
            ingredient.amount = req.body.amount;

            ingredient.save()
                .then(() => res.json('Pantry updated!'))
                .catch((err) => res.status(400).json('Error ' + err));
        });
});

module.exports = router;