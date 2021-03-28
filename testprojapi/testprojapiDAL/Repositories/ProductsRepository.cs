using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using testprojapiDAL.Context;
using testprojapiDAL.Entities;
using Microsoft.EntityFrameworkCore;
using testprojapiDAL.Interfaces;

namespace testprojapiDAL
{
    public class ProductsRepository : GenericRepository<Product>, IProductsRepository
    {
        public ProductsRepository(TestProjContext context) : base(context)
        { }

        //SP example
        public static Product GetProduct(int ID, TestProjContext context)
        {
            SqlParameter param1 = new SqlParameter("@Product", ID);
            Product product = context.Products.FromSqlRaw("GetProduct @Product", param1).FirstOrDefault();
            return product;
        }
    }
}
