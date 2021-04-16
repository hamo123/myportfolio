import React, { Component } from 'react';
import BraintreeControl from './controls/BraintreeControl'
import BasketControl from './controls/BasketControl'
import ProductControl from './controls/ProductControl'

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            basket: []
        };
    }

    updateBasket = (item) => {
        this.state.basket.push(item);

        this.setState({
            basket: this.state.basket
        });
    }

    render () {
        return (
            <div>
                <div>
                    <BasketControl></BasketControl>
                </div>
                <div>
                    <ProductControl></ProductControl>
                </div>
                <div>
                    <BraintreeControl></BraintreeControl>
                </div>
          </div>
        );
    }
}
