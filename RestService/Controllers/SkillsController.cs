using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using AutoMapper;
using CitySurfing.Domain.Models;
using CitySurfing.RestService.DAL;
using CitySurfing.RestService.Dtos;

namespace CitySurfing.RestService.Controllers
{
    public class SkillsController : ApiController
    {
        private readonly AppDbContext _dbContext = new AppDbContext();

        // GET: api/Skills
        public IList<SkillDto> GetSkills()
        {
            var skills = _dbContext.Skills.ToList();

            return Mapper.Map<List<Skill>, List<SkillDto>>(skills);
        }

        // GET: api/Skills/5
        [ResponseType(typeof(Skill))]
        public async Task<IHttpActionResult> GetEmployee(int id)
        {
            var skill = await _dbContext.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<Skill, SkillDto>(skill));
        }

        // PUT: api/Skills/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEmployee(int id, Skill skill)
        {
            //TODO: continue with converting to DTOs and extract business logic to a service

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != skill.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(skill).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Skills
        [ResponseType(typeof(Skill))]
        public async Task<IHttpActionResult> PostEmployee(Skill skill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Skills.Add(skill);
            await _dbContext.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = skill.Id }, skill);
        }

        // DELETE: api/Skills/5
        [ResponseType(typeof(Skill))]
        public async Task<IHttpActionResult> DeleteEmployee(int id)
        {
            var skill = await _dbContext.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            _dbContext.Skills.Remove(skill);
            await _dbContext.SaveChangesAsync();

            return Ok(skill);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return _dbContext.Skills.Count(e => e.Id == id) > 0;
        }
    }
}
