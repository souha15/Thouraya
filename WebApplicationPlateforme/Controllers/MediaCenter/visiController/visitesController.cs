using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.Visite;

namespace WebApplicationPlateforme.Controllers.MediaCenter.visiController
{
    [Route("api/[controller]")]
    [ApiController]
    public class visitesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public visitesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/visites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<visite>>> Getvisite()
        {
            return await _context.visite.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/visites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<visite>> Getvisite(int id)
        {
            var visite = await _context.visite.FindAsync(id);

            if (visite == null)
            {
                return NotFound();
            }

            return visite;
        }

        // PUT: api/visites/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putvisite(int id, visite visite)
        {
            if (id != visite.Id)
            {
                return BadRequest();
            }

            _context.Entry(visite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!visiteExists(id))
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

        // POST: api/visites
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<visite>> Postvisite(visite visite)
        {
            _context.visite.Add(visite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getvisite", new { id = visite.Id }, visite);
        }

        // DELETE: api/visites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<visite>> Deletevisite(int id)
        {
            var visite = await _context.visite.FindAsync(id);
            if (visite == null)
            {
                return NotFound();
            }

            _context.visite.Remove(visite);
            await _context.SaveChangesAsync();

            return visite;
        }

        private bool visiteExists(int id)
        {
            return _context.visite.Any(e => e.Id == id);
        }
    }
}
