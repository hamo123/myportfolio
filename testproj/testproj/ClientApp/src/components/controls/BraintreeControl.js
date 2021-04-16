import React, { Component } from 'react';
import axios from 'axios';
import configData from "../../localconfig.json";
import { connect } from 'react-redux'

class BraintreeControl extends Component {
    static displayName = BraintreeControl.name;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            address: '',
            postcode: '',
            telephoneNumber: ''
        };

        this.updateName = this.updateName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.updatePostcode = this.updatePostcode.bind(this);
        this.updateTelephoneNumber = this.updateTelephoneNumber.bind(this);
    }

    updateName = (e) => {
        this.setState({ name: e.target.value });
        window.localStorage.setItem("name", JSON.stringify(e.target.value));
    }

    updateEmail= (e) => {
        this.setState({ email: e.target.value });
        window.localStorage.setItem("email", JSON.stringify(e.target.value));
    }

    updateAddress = (e) => {
        this.setState({ address: e.target.value });
        window.localStorage.setItem("address", JSON.stringify(e.target.value));
    }

    updatePostcode = (e) => {
        this.setState({ postcode: e.target.value });
        window.localStorage.setItem("postcode", JSON.stringify(e.target.value));
    }

    updateTelephoneNumber = (e) => {
        this.setState({ telephoneNumber: e.target.value });

        window.localStorage.setItem("telephoneNumber", JSON.stringify(e.target.value));
    }

    scriptLoaded = () => {
        axios.post(configData.SERVER_URL + "api/Order/GenerateClientToken")
            .then(res => {
                window.braintree.setup(res.data, "dropin", {
                    container: "payment-form",
                    onPaymentMethodReceived: function (e) {
                        var request = {};

                        request.Nonce = e.nonce;

                        //Total up everything inside the basket...
                        let array = JSON.parse(window.localStorage.getItem("Basket"));
                        request.items = [];

                        request.Name = JSON.parse(window.localStorage.getItem("name"));
                        request.Email = JSON.parse(window.localStorage.getItem("email"));
                        request.Address = JSON.parse(window.localStorage.getItem("address"));
                        request.Postcode = JSON.parse(window.localStorage.getItem("postcode"));
                        request.TelephoneNumber = JSON.parse(window.localStorage.getItem("telephoneNumber"));

                        for (var i = 0; i < array.length; i++) {
                            var orderItem = {};

                            //Everything is 10...will allow this to be selectable if time 
                            orderItem.Quantity = 10;
                            orderItem.ProductID = array[i].productItem.ID;

                            request.items.push(orderItem);
                        }

                        axios.post(configData.SERVER_URL + "api/Order/ProcessOrder", request)
                            .then(res => {
                                alert("Success!");
                            })
                            .catch(error => {
                                alert("Order failed");
                                console.log(error);
                            });
                    },
                    onError: function (type, message) {
                        console.log(type + "" + message);
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        var script = document.createElement('script')
        script.src = "https://js.braintreegateway.com/js/braintree-2.24.1.min.js"// path of external javascript file.
        script.class = "external-script";
        script.async = true;

        script.onload = () => this.scriptLoaded();

        document.body.appendChild(script);
    }

    render() {
        return (
            <div>
                <div> <h2>Order details & Payment!</h2> </div>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3">
                            Name
                        </div>
                        <div class="col-sm-3">
                            <input type="text" value={this.state.name} onChange={this.updateName} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            Email
                        </div>
                        <div class="col-sm-3">
                            <input type="text" value={this.state.email} onChange={this.updateEmail} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            Address 
                        </div>
                        <div class="col-sm-3">
                            <input type="text" value={this.state.address} onChange={this.updateAddress} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            Postcode
                        </div>
                        <div class="col-sm-3">
                            <input type="text" value={this.state.postcode} onChange={this.updatePostcode} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            Telephone
                        </div>
                        <div class="col-sm-3">
                            <input type="text" value={this.state.telephoneNumber} onChange={this.updateTelephoneNumber} />
                        </div>
                    </div>
                </div>
                <div class="defaultPadding">
                    <strong>This is linked to the braintree platform. Use 4111 1111 1111 1111 and an expiry date in the future to test a valid transaction</strong>
                </div>
                <form id="checkout" method="post">
                    <div id="payment-form"></div>
                    <div>
                        <strong>Please only press PAY once.</strong>
                    </div>
                    <div>
                        <input type="submit" class="btn btn-primary m-1" value="Pay" />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { basket: state.basket }
}

export default connect(mapStateToProps)(BraintreeControl)
