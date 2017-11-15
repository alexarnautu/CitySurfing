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
    [Authorize]
    public class SkillsController : ApiController
    {
        private readonly AppDbContext _dbContext = new AppDbContext();

        // GET: api/Skills
        [HttpGet]
        public IList<SkillDto> GetSkills()
        {
            var skills = _dbContext.Skills.ToList();

            return Mapper.Map<List<Skill>, List<SkillDto>>(skills);
        }

        // GET: api/Skills/5
        [HttpGet]
        [ResponseType(typeof(Skill))]
        public async Task<IHttpActionResult> GetSkill(int id)
        {
            var skill = await _dbContext.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<Skill, SkillDto>(skill));
        }

        // PUT: api/Skills/5
        [HttpPut]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> UpdateSkill(int id, SkillDto skillDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != skillDto.Id)
            {
                return BadRequest();
            }

            var skill = Mapper.Map<SkillDto, Skill>(skillDto);

            _dbContext.Entry(skill).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SkillExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Skills
        [HttpPost]
        [ResponseType(typeof(SkillDto))]
        public async Task<IHttpActionResult> InertSkill(SkillDto skillDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var skill = Mapper.Map<SkillDto, Skill>(skillDto);
            _dbContext.Skills.Add(skill);
            await _dbContext.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = skillDto.Id }, skillDto);
        }

        // DELETE: api/Skills/5
        [HttpDelete]
        [ResponseType(typeof(SkillDto))]
        public async Task<IHttpActionResult> DeleteSkill(int id)
        {
            var skill = await _dbContext.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            _dbContext.Skills.Remove(skill);
            await _dbContext.SaveChangesAsync();

            return Ok(Mapper.Map<Skill, SkillDto>(skill));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SkillExists(int id)
        {
            return _dbContext.Skills.Count(e => e.Id == id) > 0;
        }
    }
}
