using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.gestion_beneficiaire;

namespace WebApplicationPlateforme.Controllers.GestBen
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompteBensController : ControllerBase
    {
        private readonly FinanceContext _context;

        public CompteBensController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/CompteBens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompteBen>>> GetcompteBens()
        {
            return await _context.compteBens.ToListAsync();
        }

        // GET: api/CompteBens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompteBen>> GetCompteBen(int id)
        {
            var compteBen = await _context.compteBens.FindAsync(id);

            if (compteBen == null)
            {
                return NotFound();
            }

            return compteBen;
        }

        // PUT: api/CompteBens/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompteBen(int id, CompteBen compteBen)
        {
            if (id != compteBen.Id)
            {
                return BadRequest();
            }

            _context.Entry(compteBen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompteBenExists(id))
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

        // POST: api/CompteBens
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CompteBen>> PostCompteBen(CompteBen compteBen)
        {
            _context.compteBens.Add(compteBen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompteBen", new { id = compteBen.Id }, compteBen);
        }

        // DELETE: api/CompteBens/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CompteBen>> DeleteCompteBen(int id)
        {
            var compteBen = await _context.compteBens.FindAsync(id);
            if (compteBen == null)
            {
                return NotFound();
            }

            _context.compteBens.Remove(compteBen);
            await _context.SaveChangesAsync();

            return compteBen;
        }

        private bool CompteBenExists(int id)
        {
            return _context.compteBens.Any(e => e.Id == id);
        }
    }
}
