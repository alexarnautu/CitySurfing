using CitySurfing.Domain.Models;
using CitySurfing.RestService.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CitySurfing.RestService.Controllers
{
    public class ReviewController : ApiController
    {

        private readonly AppDbContext _dbContext = new AppDbContext();

        [Authorize]
        [HttpPost]
        public IHttpActionResult PostReview([FromBody] Review rev)
        {
            _dbContext.Reviews.Add(rev);
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}
