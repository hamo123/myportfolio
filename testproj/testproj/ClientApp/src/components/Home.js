import React, { Component } from 'react';
import { BraintreeControl } from './controls/BraintreeControl'
import { BasketControl } from './controls/BasketControl'
import { ProductControl } from './controls/ProductControl'

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
                    <BasketControl basketItems={this.state.basket}></BasketControl>
                </div>
                <div>
                    <ProductControl updateBasketcallback={p => this.updateBasket(p)}></ProductControl>
                </div>
                <div>
                    <BraintreeControl basketItems={this.state.basket}></BraintreeControl>
                </div>
          </div>
        );
    }
}
