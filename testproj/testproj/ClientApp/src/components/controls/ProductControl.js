﻿import React, { Component } from 'react';
import axios from 'axios';
import configData from "../../localconfig.json";

export class ProductControl extends Component {
    static displayName = ProductControl.name;

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            basket: [],
            basketVisible: false
        };
    }

    componentDidMount() {
        axios.get(configData.SERVER_URL + "api/Product/GetProducts")
            .then(res => {
                this.setState({ products: res.data });
            })
            .catch(function (error) {
                alert("Error, check the log.");
                console.log(error);
            });
    }

    addToBasketClick = (e) => {
        this.props.updateBasketcallback(e);
    }

    renderProducts(products) {
        return (
            products.map(productItem => (
                <div class="row" key={ productItem.ID }>
                    <div class="col-sm-3">
                        { productItem.Title }
                    </div>
                    <div class="col-sm-3">
                        {productItem.Description}
                    </div>
                    <div class="col-sm-3">
                        {productItem.Cost}
                    </div>
                    <div class="col-sm-3">
                        <button className="btn btn-primary m-1" onClick={(e) => this.addToBasketClick({ productItem })}>Add to Basket</button>
                    </div>
                </div>

            ))
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProducts(this.state.products);

        let basket = this.state.loading

        return (
            <div class="defaultPadding">
                <div> <h2>My Products!</h2> </div>

                <div class="container">
                    <div class="row">
                        <div class="col-sm-3">
                            Title
                        </div>
                        <div class="col-sm-3">
                            Description
                        </div>
                        <div class="col-sm-3">
                            Cost
                        </div>
                        <div class="col-sm-3">
 
                        </div>
                    </div>
                    {contents}
                </div>
            </div>
        );
    }
}

export default ProductControl;