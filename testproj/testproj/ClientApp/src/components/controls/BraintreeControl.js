import React, { Component } from 'react';
import axios from 'axios';
import configData from "../../localconfig.json";

export class BraintreeControl extends Component {
    static displayName = BraintreeControl.name;

    constructor(props) {
        super(props);

        this.state = {
        };
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
                        let total = 0;

                        for (var i = 0; i < array.length; i++) {
                            total += array[i].Cost * 10; //Quantity is 10 per item for this demo;
                        }

                        request.Amount = total;

                        axios.post(configData.SERVER_URL + "api/Order/ProcessOrder", request)
                            .then(res => {
                                alert("Success!");
                            })
                            .catch(error => {
                                //this.setState({ password: "", failed: true });
                                alert("Login failed");
                                console.log(error);
                            });
                        //webservicehandler.webServicePost('/api/Braintree/ProcessOrder', request, null, function (e) { alert("Success!"); }, null, '');
                    },
                    onError: function (type, message) {
                        //alert(type + " " + message);
                    }
                });
            })
            .catch(error => {
                this.setState({ password: "", failed: true });
                //alert("Login failed");
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
                <div>
                    This is linked to the braintree platform. Use 4111 1111 1111 1111 and an expiry date in the future to test a valid transaction
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

export default BraintreeControl;