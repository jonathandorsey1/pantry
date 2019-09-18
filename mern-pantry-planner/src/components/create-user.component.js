import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        console.log('New user:');
        console.log(user);
        
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: '',
            password: ''
        });
    }

    render() {
        return (
            <div>
                <h3>Create Account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-row align-items-center'>
                        <div className='form-group col-auto'>
                            <label>Username</label>
                            <input type='text' 
                                   className='form-control' 
                                   placeholder='Username'
                                   onChange={this.onChangeUsername}
                                   value={this.state.username}/>
                            <small className="text-muted">
                                Must be at least 5 characters
                            </small>
                        </div>
                        <div className='form-group col-auto'>
                            <label>Password</label>
                            <input type='text' 
                                   className='form-control' 
                                   placeholder='Password'
                                   onChange={this.onChangePassword}
                                   value={this.state.password}/>
                            <small className="text-muted">
                                Must be at least 5 characters
                            </small>
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col'>
                            <input type='submit'
                                   value='Create Account'
                                   className='btn btn-primary'/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}