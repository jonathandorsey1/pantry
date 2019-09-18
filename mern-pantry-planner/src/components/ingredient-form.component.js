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

        let ingredientLabel = null;
        let amountLabel = null;
        if (this.props.index === 0){
            ingredientLabel = <label>Ingredients</label>;
            amountLabel = <label>Amount (in grams)</label>;
        }
        return (
            <div className="form-row">
                <div className="form-group col-auto">
                    <div>{ingredientLabel}</div>
                    <input type="text" 
                            value={name}
                            className="form-control" 
                            placeholder="Ingredient"
                            onChange={this.onChangeName}/>
                </div>
                <div className="form-group col-auto">
                    <div>{amountLabel}</div>
                    <input type="number" 
                           value={amount}
                           className="form-control" 
                           onChange={this.onChangeAmount}/>
                </div>
            </div>
        
        );
    }
}