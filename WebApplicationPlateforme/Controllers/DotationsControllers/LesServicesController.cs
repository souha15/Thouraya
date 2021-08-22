using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Dotations;

namespace WebApplicationPlateforme.Controllers.DotationsControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LesServicesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public LesServicesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/LesServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LesServices>>> GetlesServices()
        {
            return await _context.lesServices.ToListAsync();
        }

        // GET: api/LesServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LesServices>> GetLesServices(int id)
        {
            var lesServices = await _context.lesServices.FindAsync(id);

            if (lesServices == null)
            {
                return NotFound();
            }

            return lesServices;
        }

        // PUT: api/LesServices/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLesServices(int id, LesServices lesServices)
        {
            if (id != lesServices.Id)
            {
                return BadRequest();
            }

            _context.Entry(lesServices).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LesServicesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LesServices
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LesServices>> PostLesServices(LesServices lesServices)
        {
            _context.lesServices.Add(lesServices);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLesServices", new { id = lesServices.Id }, lesServices);
        }

        // DELETE: api/LesServices/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LesServices>> DeleteLesServices(int id)
        {
            var lesServices = await _context.lesServices.FindAsync(id);
            if (lesServices == null)
            {
                return NotFound();
            }

            _context.lesServices.Remove(lesServices);
            await _context.SaveChangesAsync();

            return lesServices;
        }

        private bool LesServicesExists(int id)
        {
            return _context.lesServices.Any(e => e.Id == id);
        }
    }
}
