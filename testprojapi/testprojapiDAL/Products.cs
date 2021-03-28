using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using testprojapiDAL.Context;
using testprojapiDAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace testprojapiDAL
{
    public static class Products
    {
        public static List<Product> GetAllProducts(TestProjContext context)
        {
            List<Product> products = context.Products.ToList();
            return products;
        }

        //SP example
        public static Product GetProduct(int ID, TestProjContext context)
        {
            SqlParameter param1 = new SqlParameter("@Product", ID);
            Product product = context.Products.FromSqlRaw("GetProduct @Product", param1).FirstOrDefault();
            return product;
        }

        public static void Save(TestProjContext context, Product product)
        {
            context.Products.Add(product);
            context.SaveChanges();
        }
    }
}
