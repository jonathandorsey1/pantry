import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import HomePage from './components/homepage.component';
import RecipeList from './components/recipe-list.component';
import PantryList from './components/pantry-list.component';
import CreateRecipe from './components/create-recipe.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
        <Route path='/' exact component={HomePage}/>
        <Route path='/recipes' exact component={RecipeList}/>
        <Route path='/pantry' component={PantryList}/>
        <Route path='/recipes/create' exact component={CreateRecipe}/>
        <Route path='/user' component={CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
