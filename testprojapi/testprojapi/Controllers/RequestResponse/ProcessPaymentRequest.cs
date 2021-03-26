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
}