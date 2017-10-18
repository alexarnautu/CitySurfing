using CitySurfing.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace CitySurfing.RestService.DAL
{
    public class AppDbContext : IdentityDbContext<User>
    {

        public AppDbContext() : base("default") { }

        public DbSet<Skill> Skills { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Candidate> Candidates { get; set; }

    }
}