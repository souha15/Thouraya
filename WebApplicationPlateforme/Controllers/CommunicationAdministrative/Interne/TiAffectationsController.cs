using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Interne;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Interne
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiAffectationsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TiAffectationsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TiAffectations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TiAffectation>>> GettiAffectations()
        {
            return await _context.tiAffectations.ToListAsync();
        }

        // GET: api/TiAffectations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TiAffectation>> GetTiAffectation(int id)
        {
            var tiAffectation = await _context.tiAffectations.FindAsync(id);

            if (tiAffectation == null)
            {
                return NotFound();
            }

            return tiAffectation;
        }

        // PUT: api/TiAffectations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiAffectation(int id, TiAffectation tiAffectation)
        {
            if (id != tiAffectation.Id)
            {
                return BadRequest();
            }

            _context.Entry(tiAffectation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiAffectationExists(id))
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

        // POST: api/TiAffectations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TiAffectation>> PostTiAffectation(TiAffectation tiAffectation)
        {
            _context.tiAffectations.Add(tiAffectation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTiAffectation", new { id = tiAffectation.Id }, tiAffectation);
        }

        // DELETE: api/TiAffectations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TiAffectation>> DeleteTiAffectation(int id)
        {
            var tiAffectation = await _context.tiAffectations.FindAsync(id);
            if (tiAffectation == null)
            {
                return NotFound();
            }

            _context.tiAffectations.Remove(tiAffectation);
            await _context.SaveChangesAsync();

            return tiAffectation;
        }

        private bool TiAffectationExists(int id)
        {
            return _context.tiAffectations.Any(e => e.Id == id);
        }
    }
}
