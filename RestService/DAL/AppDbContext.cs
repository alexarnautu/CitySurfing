using CitySurfing.Domain.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace CitySurfing.RestService.DAL
{
    public class AppDbContext : IdentityDbContext<User>
    {

        public AppDbContext() : base("CitySurfingConnectionString") { }

        public DbSet<Skill> Skills { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Applyment> Applyments { get; set; }
    }
}