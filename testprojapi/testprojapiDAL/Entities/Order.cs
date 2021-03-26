using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testprojapiDAL.Entities
{
    public class Order
    {
        public int ID { get; set; }
        public string Address { get; set; }
        public string PostCode { get; set; }
        public string Name { get; set; }
        public string TelephoneNumber { get; set; }
        public decimal OrderTotal { get; set; }

        public List<OrderItem> OrderItems { get; set; }
    }
}
