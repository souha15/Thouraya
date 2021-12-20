using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ActivitePart;

namespace WebApplicationPlateforme.Controllers.ActivitesPart
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitePrepasController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ActivitePrepasController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ActivitePrepas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivitePrepa>>> GetActivitePrepas()
        {
            return await _context.ActivitePrepas.ToListAsync();
        }

        // GET: api/ActivitePrepas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivitePrepa>> GetActivitePrepa(int id)
        {
            var activitePrepa = await _context.ActivitePrepas.FindAsync(id);

            if (activitePrepa == null)
            {
                return NotFound();
            }

            return activitePrepa;
        }

        // PUT: api/ActivitePrepas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivitePrepa(int id, ActivitePrepa activitePrepa)
        {
            if (id != activitePrepa.Id)
            {
                return BadRequest();
            }

            _context.Entry(activitePrepa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivitePrepaExists(id))
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

        // POST: api/ActivitePrepas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActivitePrepa>> PostActivitePrepa(ActivitePrepa activitePrepa)
        {
            _context.ActivitePrepas.Add(activitePrepa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivitePrepa", new { id = activitePrepa.Id }, activitePrepa);
        }

        // DELETE: api/ActivitePrepas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActivitePrepa>> DeleteActivitePrepa(int id)
        {
            var activitePrepa = await _context.ActivitePrepas.FindAsync(id);
            if (activitePrepa == null)
            {
                return NotFound();
            }

            _context.ActivitePrepas.Remove(activitePrepa);
            await _context.SaveChangesAsync();

            return activitePrepa;
        }

        private bool ActivitePrepaExists(int id)
        {
            return _context.ActivitePrepas.Any(e => e.Id == id);
        }
    }
}
