﻿using System.Collections.Generic;
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
    public class JobsController : ApiController
    {
        private readonly AppDbContext _dbContext = new AppDbContext();

        // GET: api/Jobs
        [HttpGet]
        public IList<JobDto> GetJobs()
        {
            var jobs = _dbContext.Jobs.ToList();

            return Mapper.Map<List<Job>, List<JobDto>>(jobs);
        }

        // GET: api/Jobs/5
        [HttpGet]
        [ResponseType(typeof(JobDto))]
        public async Task<IHttpActionResult> GetJob(int id)
        {
            var job = await _dbContext.Jobs.FindAsync(id);
            if (job == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<Job, JobDto>(job));
        }

        // PUT: api/Jobs/5
        [HttpPut]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> UpdateJob(int id, JobDto jobDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != jobDto.Id)
            {
                return BadRequest();
            }

            var job = Mapper.Map<JobDto, Job>(jobDto);
            _dbContext.Entry(job).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Jobs
        [HttpPost]
        [ResponseType(typeof(JobDto))]
        public async Task<IHttpActionResult> InsertJob(JobDto jobDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var job = Mapper.Map<JobDto, Job>(jobDto);

            _dbContext.Jobs.Add(job);
            await _dbContext.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = jobDto.Id }, jobDto);
        }

        // DELETE: api/Jobs/5
        [HttpDelete]
        [ResponseType(typeof(Job))]
        public async Task<IHttpActionResult> DeleteJob(int id)
        {
            var job = await _dbContext.Jobs.FindAsync(id);
            if (job == null)
            {
                return NotFound();
            }

            _dbContext.Jobs.Remove(job);
            await _dbContext.SaveChangesAsync();

            return Ok(job);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JobExists(int id)
        {
            return _dbContext.Jobs.Count(e => e.Id == id) > 0;
        }
    }
}
