using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using testprojapiDAL.Context;

namespace testprojapiDAL
{
    public abstract class GenericRepository<T> : IGenericRepositoryInterface<T> where T : class
    {
        protected readonly TestProjContext _context;

        public GenericRepository(TestProjContext context)
        {
            _context = context;
        }

        public async Task Add(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task<T> Get(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
