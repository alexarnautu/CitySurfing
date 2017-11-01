using CitySurfing.Domain.Models;
using CitySurfing.RestService.DAL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class AppUserManager : UserManager<User>
    {

        public AppUserManager(IUserStore<User> store) : base(store) { }

        public static AppUserManager Create(IdentityFactoryOptions<AppUserManager> options, IOwinContext context)
        {
            var db = new AppDbContext();
            return new AppUserManager (new UserStore<User> (db));
        }

    }
}
