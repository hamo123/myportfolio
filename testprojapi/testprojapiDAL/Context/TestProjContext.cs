using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using testprojapiDAL.Entities;

namespace testprojapiDAL.Context
{
    public class TestProjContext : DbContext
    {
        public TestProjContext(DbContextOptions<TestProjContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>().ToTable("Order");
            modelBuilder.Entity<OrderItem>().ToTable("OrderItem");
            modelBuilder.Entity<Product>().ToTable("Product");
        }
    }
}
