using CitySurfing.Domain.Models;
using System;

namespace CitySurfing.RestService.DAL
{
    public class UnitOfWork : IDisposable
    {
        private readonly AppDbContext _context = new AppDbContext();

        private Repository<Skill> _skillsRepository;
        public Repository<Skill> PaperRepository => _skillsRepository ?? (_skillsRepository = new Repository<Skill>(_context));

        public void Complete()
        {
            _context.SaveChanges();
        }

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}