import React, { Component } from 'react';
import axios from 'axios';
import configData from "../../localconfig.json";
import { connect } from 'react-redux'

class ProductControl extends Component {
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
        this.props.dispatch({
            type: 'ADD_BASKET_ITEM',
            payload: e
        })
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

        return (
            <div class="defaultPadding">
                <div> <h2>My Products!</h2> </div>

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
 
                        </div>
                    </div>
                    {contents}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { basket: state.basket }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductControl)
