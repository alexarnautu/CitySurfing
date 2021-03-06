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
using CitySurfing.RestService.Services;
using Microsoft.AspNet.Identity;
using System;

namespace CitySurfing.RestService.Controllers
{
    public class JobsController : ApiController
    {
        private readonly AppDbContext _dbContext = new AppDbContext();

        // GET: api/Jobs
        [HttpGet]
        public async Task<IHttpActionResult> GetJobs([FromUri] JobFilterCriteriaDto criteria)
        {
            IQueryable<Job> jobQuery = _dbContext.Jobs;

            if (criteria != null)
            {
                if ((criteria.EndDate != null) != (criteria.StartDate != null))
                {
                    return BadRequest("EndDate and StartDate must be both null or both different from null");
                }
                else if (criteria.EndDate != null) // Filter by date
                {
                    jobQuery = jobQuery.Where(x => x.StartDate >= criteria.StartDate && x.EndDate <= criteria.EndDate);
                }

                if (criteria.MinPrice != null) // Filter by price
                {
                    jobQuery = jobQuery.Where(x => x.Price >= criteria.MinPrice);
                }
                if (criteria.MaxPrice != null) // Filter by price
                {
                    jobQuery = jobQuery.Where(x => x.Price <= criteria.MaxPrice);
                }
                if (criteria.Location != null) // Filter by location
                {
                    jobQuery = jobQuery.Where(x => x.Location == criteria.Location);
                }
                if (criteria.SkillNames != null) // Filter by skill names
                {
                    jobQuery = jobQuery.Where(x => x.RequiredSkills.Any(y => criteria.SkillNames.Contains(y.Name)));
                }
            }

            var res = Mapper.Map<IEnumerable<Job>, IEnumerable<JobDto>>(await jobQuery.ToListAsync());

            foreach (var job in res) {
                foreach (var app in job.Applyments)
                {
                    app.FullName = _dbContext.Users.Find(app.UserId).FullName;
                }
            }

            return Ok(res);
        }

        // GET: api/Jobs/5
        [HttpGet]
        [ResponseType(typeof(JobDto))]
        public async Task<IHttpActionResult> GetJob(int id)
        {
            var job = await _dbContext.Jobs.FindAsync(id);
            foreach (var app in job.Applyments)
            {
                app.FullName = _dbContext.Users.Find(app.UserId).FullName;
            }
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
            job.Created = DateTime.Now;
            job.CategoryId = job.Category.Id;
            job.Creator = await _dbContext.Users.SingleAsync(u => u.Id == jobDto.Creator.Id);

            // If i delete this foreach, the skill objects are newly created in the 
            // database instead of using the already existing ones
            foreach (Skill skill in job.RequiredSkills)
            {
                _dbContext.Entry(skill).State = EntityState.Unchanged;
            }

            _dbContext.Jobs.Add(job);
            await _dbContext.SaveChangesAsync();

            jobDto = Mapper.Map<Job, JobDto>(job);
            return CreatedAtRoute("DefaultApi", new { id = jobDto.Id }, jobDto);
        }

        [HttpPost]
        [Route("api/Jobs/SetUnavailable/{id}")]
        public IHttpActionResult SetUnavailable(int id)
        {
            var job = _dbContext.Jobs.Find(id);
            job.IsAvailable = false;
            _dbContext.SaveChanges();
            return Ok();
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
