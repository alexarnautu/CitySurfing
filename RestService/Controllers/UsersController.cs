﻿using AutoMapper;
using CitySurfing.Domain.Models;
using CitySurfing.RestService.DAL;
using CitySurfing.RestService.Dtos;
using CitySurfing.RestService.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace CitySurfing.RestService.Controllers
{
    public class UsersController : ApiController
    {
        // THOSE DEPENDENCIES CRY TO BE INJECTED
        private readonly AppDbContext _dbContext = new AppDbContext();
        private readonly AuthProvider _authProv = new AuthProvider();

        [HttpGet]
        public IEnumerable<UserDto> GetUsers() =>
            Mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(_dbContext.Users.ToList());

        // POST: api/Register
        [HttpPost]
        public async Task<IHttpActionResult> Register(RegistrationDto register)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _authProv.Register(register);

            return Ok();
        }

        [HttpPost]
        [Route("api/Users/Login")]
        public async Task<IHttpActionResult> Login(string username, string password)
        {
            await _authProv.Login(username, password);

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}