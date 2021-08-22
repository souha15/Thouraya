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
    public class dotationsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public dotationsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/dotations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<dotation>>> Getdotations()
        {
            return await _context.dotations.ToListAsync();
        }

        // GET: api/dotations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<dotation>> Getdotation(int id)
        {
            var dotation = await _context.dotations.FindAsync(id);

            if (dotation == null)
            {
                return NotFound();
            }

            return dotation;
        }

        // PUT: api/dotations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putdotation(int id, dotation dotation)
        {
            if (id != dotation.Id)
            {
                return BadRequest();
            }

            _context.Entry(dotation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dotationExists(id))
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

        // POST: api/dotations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<dotation>> Postdotation(dotation dotation)
        {
            _context.dotations.Add(dotation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getdotation", new { id = dotation.Id }, dotation);
        }

        // DELETE: api/dotations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<dotation>> Deletedotation(int id)
        {
            var dotation = await _context.dotations.FindAsync(id);
            if (dotation == null)
            {
                return NotFound();
            }

            _context.dotations.Remove(dotation);
            await _context.SaveChangesAsync();

            return dotation;
        }

        private bool dotationExists(int id)
        {
            return _context.dotations.Any(e => e.Id == id);
        }
    }
}
