using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrAffectationsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TrAffectationsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TrAffectations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrAffectation>>> GettrAffectations()
        {
            return await _context.trAffectations.ToListAsync();
        }

        // GET: api/TrAffectations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrAffectation>> GetTrAffectation(int id)
        {
            var trAffectation = await _context.trAffectations.FindAsync(id);

            if (trAffectation == null)
            {
                return NotFound();
            }

            return trAffectation;
        }

        // PUT: api/TrAffectations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrAffectation(int id, TrAffectation trAffectation)
        {
            if (id != trAffectation.Id)
            {
                return BadRequest();
            }

            _context.Entry(trAffectation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrAffectationExists(id))
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

        // POST: api/TrAffectations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TrAffectation>> PostTrAffectation(TrAffectation trAffectation)
        {
            _context.trAffectations.Add(trAffectation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrAffectation", new { id = trAffectation.Id }, trAffectation);
        }

        // DELETE: api/TrAffectations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TrAffectation>> DeleteTrAffectation(int id)
        {
            var trAffectation = await _context.trAffectations.FindAsync(id);
            if (trAffectation == null)
            {
                return NotFound();
            }

            _context.trAffectations.Remove(trAffectation);
            await _context.SaveChangesAsync();

            return trAffectation;
        }

        private bool TrAffectationExists(int id)
        {
            return _context.trAffectations.Any(e => e.Id == id);
        }
    }
}
