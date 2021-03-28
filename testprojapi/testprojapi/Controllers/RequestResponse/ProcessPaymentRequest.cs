using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ProcessPaymentRequest
/// </summary>
public class ProcessPaymentRequest
{
    public string nonce { get; set; }
    public decimal Amount { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string Postcode { get; set; }
    public string TelephoneNumber { get; set; }

    public List<ProcessPaymentsItemsRequest> items {get; set; }
}