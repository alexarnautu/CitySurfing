﻿using System;
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
using CitySurfing.RestService.Services;

namespace CitySurfing.RestService.Controllers
{
    
    public class ApplymentsController : ApiController
    {
        private readonly AppDbContext _dbContext = new AppDbContext();
        private readonly EmailService _emailService = new EmailService();

        // GET: api/Applyments
        [HttpGet]
        public IList<ApplymentDto> GetApplyments()
        {
            var applyments = _dbContext.Applyments.ToList();

            return Mapper.Map<List<Applyment>, List<ApplymentDto>>(applyments);
        }

        [HttpGet]
        [Route("api/Applyments/{userId}")]
        public IList<ApplymentDto> GetApplymentsForUser(string userId)
        {
            var userApplyments = _dbContext.Applyments.ToList().Where(a => a.UserId == userId).ToList();

            return Mapper.Map<List<Applyment>, List<ApplymentDto>>(userApplyments);
        }

        // GET: api/Applyments/foobar/4
        [HttpGet]
        [Route("api/Applyments/{userId}/{jobId}")]
        [ResponseType(typeof(ApplymentDto))]
        public async Task<IHttpActionResult> GetApplyment(string userId, int jobId)
        {
            var applyment = await _dbContext.Applyments.FirstOrDefaultAsync(a => a.UserId == userId && a.JobId == jobId);

            if (applyment == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<Applyment, ApplymentDto>(applyment));
        }

        // PUT: api/Applyments/foobar/4
        [HttpPut]
        [Route("api/Applyments/{userId}/{jobId}")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> UpdateApplyment(string userId, int jobId, ApplymentDto applymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (userId != applymentDto.UserId || jobId != applymentDto.JobId)
            {
                return BadRequest();
            }

            var applyment = Mapper.Map<ApplymentDto, Applyment>(applymentDto);
            _dbContext.Entry(applyment).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplymentExists(userId, jobId))
                {
                    return NotFound();
                }

                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Applyments
        [HttpPost]
        [ResponseType(typeof(Applyment))]
        public async Task<IHttpActionResult> InsertApplyment(ApplymentDto applymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var applyment = Mapper.Map<ApplymentDto, Applyment>(applymentDto);

            _dbContext.Applyments.Add(applyment);

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ApplymentExists(applyment.UserId, applyment.JobId))
                {
                    return Conflict();
                }

                throw;
            }

            var job = _dbContext.Jobs.Include("Creator").FirstOrDefault(x => x.Id == applyment.JobId);
            _emailService.SendEmail(job.Creator.Email, 
                "New applyment to your job!",

                $@"
                Salut!
                {_dbContext.Users.Find(applyment.UserId).FullName} tocmai a aplicat la jobul tau!
                ({job.Title})

                Propunere:
                {applymentDto.Proposal}

                Multumim ca folositi CitySurfing !
                "
            );
            return CreatedAtRoute("DefaultApi", new { userId = applyment.UserId, jobId = applyment.JobId }, applymentDto);
        }

        // DELETE: api/Applyments/foobar/4
        [HttpDelete]
        [Route("api/Applyments/{userId}/{jobId}")]
        [ResponseType(typeof(ApplymentDto))]
        public async Task<IHttpActionResult> DeleteApplyment(string userId, int jobId)
        {
            var applyment = await _dbContext.Applyments.FirstOrDefaultAsync(a => a.UserId == userId && a.JobId == jobId);
            if (applyment == null)
            {
                return NotFound();
            }

            _dbContext.Applyments.Remove(applyment);
            await _dbContext.SaveChangesAsync();

            return Ok(Mapper.Map<Applyment, ApplymentDto>(applyment));
        }

        [HttpPost]
        [Route("api/Applyments/Approve/{jobId}/{userId}")]
        public IHttpActionResult Approve(int jobId, string userId)
        {
            var app = _dbContext.Applyments.Include(x => x.Job).Include(x => x.Job.Creator)
                .FirstOrDefault(x => x.JobId == jobId && x.UserId == userId);
            if (app == null)
            {
                return NotFound();
            }
            app.IsApproved = true;
            _dbContext.SaveChanges();

            _emailService.SendEmail(app.User.Email, "Ai fost acceptat pentru jobul aplicat!",
                
            $@"
            Salut!
            {app.Job.Creator.FullName} tocmai a acceptat propunerea ta pentru {app.Job.Title}

            Multumim ca folositi CitySurfing !
            ");

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

        private bool ApplymentExists(string userId, int jobId)
        {
            return _dbContext.Applyments.Count(e => e.UserId == userId && e.JobId == jobId) > 0;
        }
    }
}
