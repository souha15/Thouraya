using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServiceRh;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class PannesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PannesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Pannes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Panne>>> Getpannes()
        {
            return await _context.pannes.ToListAsync();
        }

        // GET: api/Pannes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Panne>> GetPanne(int id)
        {
            var panne = await _context.pannes.FindAsync(id);

            if (panne == null)
            {
                return NotFound();
            }

            return panne;
        }

        // PUT: api/Pannes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPanne(int id, Panne panne)
        {
            if (id != panne.Id)
            {
                return BadRequest();
            }

            _context.Entry(panne).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PanneExists(id))
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

        // POST: api/Pannes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Panne>> PostPanne(Panne panne)
        {
            _context.pannes.Add(panne);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPanne", new { id = panne.Id }, panne);
        }

        // DELETE: api/Pannes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Panne>> DeletePanne(int id)
        {
            var panne = await _context.pannes.FindAsync(id);
            if (panne == null)
            {
                return NotFound();
            }

            _context.pannes.Remove(panne);
            await _context.SaveChangesAsync();

            return panne;
        }

        private bool PanneExists(int id)
        {
            return _context.pannes.Any(e => e.Id == id);
        }
    }
}
