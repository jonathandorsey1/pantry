import React, { Component } from 'react';

export default class IngredientForm extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);

    }

    onChangeName(e) {
        this.props.onAddIngredientName(e.target.value, this.props.index);
    }

    onChangeAmount(e) {
        this.props.onAddIngredientAmount(e.target.value, this.props.index);
    }

    render() {
        const name = this.props.name;
        const amount = this.props.amount;
        return (
            <div className="form-row">
                <div className="form-group col-auto">
                    <input type="text" 
                            value={name}
                            className="form-control" 
                            placeholder="Ingredient"
                            onChange={this.onChangeName}/>
                </div>
                <div className="form-group col-auto">
                    <input type="number" 
                           value={amount}
                           className="form-control" 
                           placeholder="Amount (in grams)"
                           onChange={this.onChangeAmount}/>
                </div>
            </div>
        
        );
    }
}