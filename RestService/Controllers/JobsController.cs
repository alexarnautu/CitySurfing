using System.Collections.Generic;
using System.Web.Http;

namespace CitySurfing.RestService.Controllers
{
    public class JobsController : ApiController
    {
        public IEnumerable<string> Get()
        {
            return new[] { "First job", "Second job" };
        }

        // GET: api/Jobs/5
        public string Get(int id)
        {
            return "job";
        }

        // POST: api/Jobs
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Jobs/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Jobs/5
        public void Delete(int id)
        {
        }
    }
}
