﻿using DataAccess.Concrete;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using System.Net.Http;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Web.Security;
using CitySurfing.Domain.Models;
using CitySurfing.RestService.Dtos;

namespace Business
{
    public class AuthProvider
    {
        private readonly AppUserManager _userManager;
        private readonly IAuthenticationManager _authManager;
        public AuthProvider ()
        {
            _userManager = HttpContext.Current.GetOwinContext().GetUserManager<AppUserManager>();
            _authManager = HttpContext.Current.GetOwinContext().Authentication;
        }

        public void AddToRole(string userId, string role)
        {
            var roles = _userManager.GetRoles(userId).ToArray();
            _userManager.RemoveFromRoles(userId, roles);
            _userManager.AddToRole(userId, role);
        }

        public async Task Register(RegistrationDto user)
        {
            var newUser = new User
            {
                UserName = user.Email,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
            };
            
            await _userManager.CreateAsync(newUser, user.Password);
            _userManager.AddToRole(newUser.Id, "User");
        }

        public async Task<bool> Login (string username, string password)
        {
            var user = await _userManager.FindAsync(username, password);
            if (user == null)
            {
                return false;
            }

            var ident =  await _userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            _authManager.SignOut();
            _authManager.SignIn(new AuthenticationProperties
            {
                IsPersistent = true
            }, ident);

            return true;
        }

        public void Logout()
        {
            _authManager.SignOut();
        }

    }
}
