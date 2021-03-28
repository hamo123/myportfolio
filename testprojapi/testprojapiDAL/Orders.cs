
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using testprojapiDAL.Context;
using testprojapiDAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace testprojapiDAL
{
    public static class Orders
    {
        public static List<Order> GetAllOrders(TestProjContext context)
        {
            List<Order> orders = context.Orders.ToList();
            return orders;
        }

        public static void Save(TestProjContext context, Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
        }
    }
}
