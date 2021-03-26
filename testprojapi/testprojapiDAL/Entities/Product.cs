using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testprojapiDAL.Entities
{
    public class Product
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public decimal Cost { get; set; }
        public int StockCount { get; set; }
    }
}
