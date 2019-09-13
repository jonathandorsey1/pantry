const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
});

const usersRouter = require('./routes/users');
const ingredientsRouter = require('./routes/ingredients');
const recipesRouter = require('./routes/recipes');
const pantryRouter = require('./routes/pantry');

app.use('/users', usersRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/recipes', recipesRouter);
app.use('/pantry', pantryRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});