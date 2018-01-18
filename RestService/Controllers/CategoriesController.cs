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
    
    public class CategoriesController : ApiController
    {
        private readonly AppDbContext _dbContext = new AppDbContext();

        // GET: api/Categories
        [HttpGet]
        public IList<CategoryDto> GetCategories()
        {
            var categories = _dbContext.Categories.ToList();

            return Mapper.Map<List<Category>, List<CategoryDto>>(categories);
        }

        // GET: api/Categories/5
        [HttpGet]
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> GetCategory(int id)
        {
            var category = await _dbContext.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<Category, CategoryDto>(category));
        }

        // PUT: api/Categories/5
        [HttpPut]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> UpdateCategory(int id, CategoryDto categoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoryDto.Id)
            {
                return BadRequest();
            }

            var category = Mapper.Map<CategoryDto, Category>(categoryDto);

            _dbContext.Entry(category).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Categories
        [HttpPost]
        [ResponseType(typeof(CategoryDto))]
        public async Task<IHttpActionResult> InsertCategory(CategoryDto categoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = Mapper.Map<CategoryDto, Category>(categoryDto);
            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = categoryDto.Id }, categoryDto);
        }

        // DELETE: api/Categories/5
        [HttpDelete]
        [ResponseType(typeof(CategoryDto))]
        public async Task<IHttpActionResult> DeleteCategory(int id)
        {
            var category = await _dbContext.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _dbContext.Categories.Remove(category);
            await _dbContext.SaveChangesAsync();

            return Ok(Mapper.Map<Category, CategoryDto>(category));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return _dbContext.Categories.Count(e => e.Id == id) > 0;
        }
    }
}