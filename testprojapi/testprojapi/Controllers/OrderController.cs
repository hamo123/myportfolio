using Braintree;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testprojapiDAL;
using testprojapiDAL.Context;
using testprojapiDAL.Entities;
using testprojapiDAL.Interfaces;

namespace testprojapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyCORSPolicy")]
    public class OrderController : Controller
    {
        private BraintreeGateway _gateway { get; set; }
        private TestProjContext _testDBcontext;
        private IUnitOfWork _unitOfWork;

        public OrderController(TestProjContext testProjContext, IUnitOfWork unitOfWork)
        {
            _testDBcontext = testProjContext;
            _unitOfWork = unitOfWork;
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
        public async Task<string> ProcessOrder(ProcessPaymentRequest request)
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

            //Log the order...come back to this needs more boilerplate
            Order order = new Order()
            {
                Address = request.Address,
                Name = request.Name,
                PostCode = request.Postcode,
                TelephoneNumber = request.TelephoneNumber,
                OrderItems = new List<OrderItem>()
            };

            decimal total = 0.0m;
            List<OrderItem> items = new List<OrderItem>();

            //Total up on server side, client side can be manipulated
            foreach (ProcessPaymentsItemsRequest item in request.items)
            {
                Product product = _testDBcontext.Products.FirstOrDefault(x => x.ID == item.ProductID);
                OrderItem orderItem = new OrderItem();

                if (product != null)
                {
                    total += (product.Cost * item.Quantity);
                }

                orderItem.ProductID = item.ProductID;
                orderItem.Quantity = item.Quantity;

                order.OrderItems.Add(orderItem);
            }

            order.OrderTotal = total;
            order.OrderRef = Guid.NewGuid().ToString().Replace("-", "").Substring(0,15); //Just generate a random guid for the order ref
            order.Email = request.Email;

            var transRequest = new TransactionRequest
            {
                //set this
                Amount = total,
                //set this
                PaymentMethodNonce = request.nonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };

            Result<Transaction> result = _gateway.Transaction.Sale(transRequest);

            //Log the transaction status from braintree...this will let the back end user know if they should prepare the order or not
            order.TransactionStatus = result.Message;

            await _unitOfWork.Orders.Add(order);
            _unitOfWork.Complete();

            return returnString;
        }
    }
}
