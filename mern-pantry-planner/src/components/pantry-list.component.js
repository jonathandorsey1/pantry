import React, { Component } from 'react';
import axios from 'axios';
import IngredientList from './ingredient-list.component';

export default class PantryList extends Component {

    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeIngredient = this.onChangeIngredient.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);

        this.state = {
            users: [],
            username: '',
            ingredient: '',
            amount: 0,
            updateFlag: true
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                console.log(res.data);
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    });
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeIngredient(e) {
        this.setState({
            ingredient: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let ingredient = {
            name: this.state.ingredient,
            amount: this.state.amount
        };

        let username = this.state.username;
        axios.post('http://localhost:5000/pantry/' + username + '/add', ingredient)
            .then(res => {
                console.log(res.data);
                this.setState(prevState => {
                    return {
                        ingredient: '',
                        amount: 0,
                        updateFlag: !prevState.updateFlag
                    }
                });
            });
    }

    render() {
        return (
            <div>
                <h3>My Pantry</h3>
                <form className='form-inline'>
                    <label>Username</label>
                    <div className='form-group col-auto'>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option 
                                            key={user}
                                            value={user}>{user}
                                            </option>;
                                        })
                                }
                        </select>
                    </div>
                </form>
                <br/>
                <form className='form-inline' onSubmit={this.onSubmit}>
                    <label>Ingredient</label>
                    <div className='form-group col-auto'>
                        <input type='text'
                               className='form-control'
                               placeholder='Ingredient'
                               onChange={this.onChangeIngredient}
                               value={this.state.ingredient}/>
                    </div>
                    <label>Amount (grams)</label>
                    <div className='form-group col-auto'>
                        <input type='number'
                               className='form-control'
                               onChange={this.onChangeAmount}
                               value={this.state.amount}/>
                    </div>
                    <div className='form-group col-auto'>
                            <input type='submit'
                                   value='Add ingredient'
                                   className='btn btn-primary'/>
                    </div>
                </form>
                <br/>
                <IngredientList username={this.state.username}
                                updateFlag={this.state.updateFlag}/>
            </div>
        );
    }
}