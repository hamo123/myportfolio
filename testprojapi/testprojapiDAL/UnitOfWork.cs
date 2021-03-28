using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using testprojapiDAL.Context;
using testprojapiDAL.Interfaces;

namespace testprojapiDAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TestProjContext _context;
        public IOrderRepository Orders { get; }

        public IProductsRepository Products { get; }

        public UnitOfWork(TestProjContext context,
            IOrderRepository ordersRepository,
            IProductsRepository productRepository)
        {
            this._context = context;
            this.Orders = ordersRepository;
            this.Products = productRepository;
        }
        public int Complete()
        {
            return _context.SaveChanges();
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
    }
}
