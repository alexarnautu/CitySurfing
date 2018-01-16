using AutoMapper;
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
        public async Task<IHttpActionResult> Login(LoginDto login)
        {
            if (await _authProv.Login(login.Username, login.Password))
            {
                return Ok(
                    Mapper.Map<User, UserDto>(
                        _dbContext.Users.FirstOrDefault(x => x.UserName == login.Username)
                    )
                );
            }
            return BadRequest();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
            base.Dispose(disposing);
        }

        [HttpGet]
        [Authorize]
        [Route("api/Users/{id}")]
        public async Task<IHttpActionResult> GetById(string id)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("api/Users/GetReviews/{id}")]
        public IHttpActionResult GetReviews(string id)
        {
            return Ok(_dbContext.Reviews.Where(x => x.UserFromId == id));
        }

        [HttpGet]
        [Authorize]
        [Route("api/Users/GetReviewsCount/{id}")]
        public IHttpActionResult GetReviewsCount(string id)
        {
            return Ok(_dbContext.Reviews.Where(x => x.UserFromId == id).Count());
        }

    }
}
