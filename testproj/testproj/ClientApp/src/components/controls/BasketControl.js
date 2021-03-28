import React, { Component } from 'react';
import axios from 'axios';
import configData from "../../localconfig.json";

export class BasketControl extends Component {
    static displayName = BasketControl.name;

    constructor(props) {
        super(props);

        this.state = {
            basket: [],
        };
    }

    componentDidMount() {

    }

    renderBasket(products) {
        window.localStorage.setItem("Basket", JSON.stringify(products));

        return (
            products.map(productItemTest => (
                <div class="row" key={productItemTest.productItem.ID}>
                    <div class="col-sm-3">
                        {productItemTest.productItem.Title}
                    </div>
                    <div class="col-sm-3">
                        {productItemTest.productItem.Description}
                    </div>
                    <div class="col-sm-3">
                        {productItemTest.productItem.Cost}
                    </div>
                    <div class="col-sm-3">
                        {productItemTest.productItem.Cost}
                    </div>
                </div>

            ))
        );
    }

    render() {
        let contentsBasket = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderBasket(this.props.basketItems);

        var display = 'No items in your basket';

        if (this.props.basketItems.length != 0) {
            display = <div>
                        <div>
                            <div>
                                <h2>My Basket !</h2>
                            </div>
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-3">
                                      <strong>Title</strong>
                                    </div>
                                    <div class="col-sm-3">
                                      <strong>Description</strong>
                                    </div>
                                    <div class="col-sm-3">
                                        <strong>Cost</strong>
                                    </div>
                                    <div class="col-sm-3">
                                      <strong>Quantity</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                {contentsBasket}
                            </div>
                            
                        </div>
                    </div>
        }

        return (
            display
        );
    }
}

export default BasketControl;