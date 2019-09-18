import React, { Component } from 'react';
import axios from 'axios';

export default class IngredientList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            ingredients: []
        };
    }

    componentDidMount() {
        let username = this.props.username;
        axios.get('http://localhost:5000/pantry/' + username)
            .then(res => {
                this.setState({
                    ingredients: res.map(ingredient => {
                        return {
                            name: ingredient.name,
                            amount: ingredient.amount
                        };
                    })
                });
            });
        
        console.log(this.state.ingredients);
    }

    render() {
        let rows = [];
        for (let i = 0; i < this.state.ingredients.length; i++) {
            let ingredient = this.state.ingredients[i];
            rows.push(
            <tr>
                <th scope='row'>1</th>
                <td>{ingredient['name']}</td>
                <td>{ingredient['amount']}</td>
            </tr>);
        }

        return (
            <div>
                <h4>Pantry</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>  
                            <th scope='col'>Ingredient</th>
                            <th scope='col'>Amount (grams)</th> 
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}