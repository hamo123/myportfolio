using Braintree;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testprojapiDAL.Context;

namespace testprojapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyCORSPolicy")]
    public class OrderController : Controller
    {
        private BraintreeGateway _gateway { get; set; }
        private TestProjContext _testDBcontext;
        
        public OrderController(TestProjContext testProjContext)
        {
            _testDBcontext = testProjContext;
        }

        [HttpPost]
        [Route("GenerateClientToken")]
        public string GenerateClientToken()
        {
            //Don't make these keys public...even on a sandbox
            if (_gateway == null)
            {
                _gateway = new BraintreeGateway
                {
                    Environment = Braintree.Environment.SANDBOX,
                    MerchantId = "hfqcjm9qttjdgg3z",
                    PublicKey = "dhc3w9xdkqqpkd7w",
                    PrivateKey = "6c7b6d1116e0ecd3b0a333b7684bb1df"
                };
            }

            var clientToken = _gateway.ClientToken.Generate();
            
            return clientToken;
        }

        [HttpPost]
        [Route("ProcessOrder")]
        public string ProcessOrder(ProcessPaymentRequest request)
        {
            string returnString = String.Empty;
            //Don't make these keys public...even on a sandbox
            if (_gateway == null)
            {
                _gateway = new BraintreeGateway
                {
                    Environment = Braintree.Environment.SANDBOX,
                    MerchantId = "hfqcjm9qttjdgg3z",
                    PublicKey = "dhc3w9xdkqqpkd7w",
                    PrivateKey = "6c7b6d1116e0ecd3b0a333b7684bb1df"
                };
            }

            var transRequest = new TransactionRequest
            {
                //set this
                Amount = request.Amount,
                //set this
                PaymentMethodNonce = request.nonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };

            Result<Transaction> result = _gateway.Transaction.Sale(transRequest);

            //Log the order...come back to this needs more boilerplate
            

            return returnString;
        }
    }
}
