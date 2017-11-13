using CitySurfing.Domain.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System;

namespace CitySurfing.RestService.DAL
{
    public class AppDbContext : IdentityDbContext<User>
    {

        public AppDbContext() : base("CitySurfingConnectionString") { }

        public DbSet<Skill> Skills { get; set; }
        public DbSet<Job> Jobs { get; set; }

        internal static IDisposable Create() =>
            new AppDbContext();

        public DbSet<Category> Categories { get; set; }
        public DbSet<Applyment> Applyments { get; set; }

        public DbSet<Review> Reviews { get; set; }
    }
}