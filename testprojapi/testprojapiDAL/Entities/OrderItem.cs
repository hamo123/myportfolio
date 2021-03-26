using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testprojapiDAL.Entities
{
    public class OrderItem
    {
        public int ID { get; set; }
        public int Quantity { get; set; }
        public int ProductID { get; set; }
        public int OrderID { get; set; }
    }
}
