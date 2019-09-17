import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    render(){
        return (
            <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
                <Link to='/' className='navbar-brand'>PantryPlanner</Link>
                <div className='collpase navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                        <Link to='/' className='nav-link'>Homepage</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/recipes' className='nav-link'>Recipes</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/pantry/:id' className='nav-link'>My Pantry</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/recipes/create' className='nav-link'>Create a Recipe</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/user' className='nav-link'>Create Account</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
