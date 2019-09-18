import React, { Component } from 'react';
import axios from 'axios';
import IngredientList from './ingredient-list.component';

export default class PantryList extends Component {

    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            users: [],
            username: ''
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

    render() {
        return (
            <div>
                <h3>My Pantry</h3>
                <form className='form-inline'>
                    <label>Username: </label>
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
                <IngredientList username={this.state.username}/>
            </div>
        );
    }
}