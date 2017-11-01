using AutoMapper;
using CitySurfing.Domain.Models;
using CitySurfing.RestService.DAL;
using CitySurfing.RestService.Dtos;
using Services;
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
    public class UserController : ApiController
    {
        // THIS DEPENDENCIES CRY TO BE INJECTED
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
