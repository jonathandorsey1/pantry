import React, { Component } from 'react';
import axios from 'axios';

export default class IngredientList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            ingredients: []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.username !== this.props.username ||
            prevProps.updateFlag !== this.props.updateFlag){
            let username = this.props.username;
            console.log('here');
            axios.get('http://localhost:5000/pantry/' + username)
                .then(res => {
                    this.setState({
                        ingredients: res.data.map(ingredient => {
                            return {
                                name: ingredient.name,
                                amount: ingredient.amount
                            };
                        })
                    });
                });
            
            console.log(this.state.ingredients);
        }
    }

    render() {
        let rows = [];
        for (let i = 1; i <= this.state.ingredients.length; i++) {
            let ingredient = this.state.ingredients[i - 1];
            rows.push(
            <tr key={i}>
                <th scope='row'>{i}</th>
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