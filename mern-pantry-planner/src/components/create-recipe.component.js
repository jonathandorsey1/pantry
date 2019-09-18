import React, { Component } from 'react';
import IngredientForm from './ingredient-form.component';
import axios from 'axios';

export default class CreateRecipe extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNumIngredients = this.onChangeNumIngredients.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAddIngredientName = this.onAddIngredientName.bind(this);
        this.onAddIngredientAmount = this.onAddIngredientAmount.bind(this);

        this.state = {
            name: '',
            numIngredients: 0,
            ingredients: []
        };

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeNumIngredients(e) {
        e.persist();
        this.setState((prevState) => {
            let prevNumIngredients = prevState.numIngredients;
            let newNumIngredients = e.target.value;
            for(let i = prevNumIngredients; i < newNumIngredients; i++){
                prevState.ingredients.push({name: '', amount: 0});
            }
            for(let i = prevNumIngredients; i > newNumIngredients; i--){
                prevState.ingredients.pop();
            }
            prevState.numIngredients = e.target.value;
            return prevState;
        });
    }

    onAddIngredientName(name, index) {
        this.setState((prevState) => {
            prevState.ingredients[index]['name'] = name;
            return {ingredients: prevState.ingredients};
        });
    }

    onAddIngredientAmount(amount, index) {
        this.setState((prevState) => {
            prevState.ingredients[index]['amount'] = amount;
            return {ingredients: prevState.ingredients};
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let ingredients = [];
        for (let i = 0; i < this.state.ingredients; i++) {
            let ingredient = this.state.ingredients[i];
            if (ingredient.name !== '') {
                ingredients.push(ingredient);
            }
        }

        const recipe = {
            name: this.state.name,
            ingredients: ingredients
        };

        console.log(recipe);
        axios.post('http://localhost:5000/recipes/add', recipe)
            .then(res => console.log(res.data));

        window.location = '/recipes';
    }

    render() {
        var rows = [];
        for (let i = 0; i < this.state.numIngredients; i++){
            rows.push(<IngredientForm 
                key={i} 
                index={i}
                name={this.state.ingredients[i]['name']}
                amount={this.state.ingredients[i]['amount']} 
                onAddIngredientName={this.onAddIngredientName}
                onAddIngredientAmount={this.onAddIngredientAmount}/>);
        }
        return (
            <div>
                <h3>Create New Recipe</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-row align-items-center'>
                        <div className='form-group col-auto'>
                            <label>Recipe Name</label>
                            <input type='text' 
                                   className='form-control' 
                                   placeholder='Name'
                                   onChange={this.onChangeName}/>
                        </div>
                        <div className='form-group col-auto'>
                            <label>Number of Ingredients</label>
                            <input type='number' 
                                   className='form-control' 
                                   placeholder=''
                                   onChange={this.onChangeNumIngredients}/>
                        </div>
                    </div>
                    <div>{rows}</div>
                    <div className='form-row'>
                        <div className='form-group col'>
                            <input type='submit'
                                   value='Create Recipe'
                                   className='btn btn-primary'/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}