
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using testprojapiDAL.Context;
using testprojapiDAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using testprojapiDAL.Interfaces;

namespace testprojapiDAL
{
    public class OrdersRepository:GenericRepository<Order>, IOrderRepository
    {
        public OrdersRepository(TestProjContext context) : base(context)
        { }
    }
}
