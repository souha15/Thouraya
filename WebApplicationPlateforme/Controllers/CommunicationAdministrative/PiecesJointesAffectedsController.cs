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
    public class PiecesJointesAffectedsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesAffectedsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesAffecteds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesAffected>>> GetpiecesJointesAffecteds()
        {
            return await _context.piecesJointesAffecteds.ToListAsync();
        }

        // GET: api/PiecesJointesAffecteds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesAffected>> GetPiecesJointesAffected(int id)
        {
            var piecesJointesAffected = await _context.piecesJointesAffecteds.FindAsync(id);

            if (piecesJointesAffected == null)
            {
                return NotFound();
            }

            return piecesJointesAffected;
        }

        // PUT: api/PiecesJointesAffecteds/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesAffected(int id, PiecesJointesAffected piecesJointesAffected)
        {
            if (id != piecesJointesAffected.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesAffected).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesAffectedExists(id))
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

        // POST: api/PiecesJointesAffecteds
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesAffected>> PostPiecesJointesAffected(PiecesJointesAffected piecesJointesAffected)
        {
            _context.piecesJointesAffecteds.Add(piecesJointesAffected);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesAffected", new { id = piecesJointesAffected.Id }, piecesJointesAffected);
        }

        // DELETE: api/PiecesJointesAffecteds/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesAffected>> DeletePiecesJointesAffected(int id)
        {
            var piecesJointesAffected = await _context.piecesJointesAffecteds.FindAsync(id);
            if (piecesJointesAffected == null)
            {
                return NotFound();
            }

            _context.piecesJointesAffecteds.Remove(piecesJointesAffected);
            await _context.SaveChangesAsync();

            return piecesJointesAffected;
        }

        private bool PiecesJointesAffectedExists(int id)
        {
            return _context.piecesJointesAffecteds.Any(e => e.Id == id);
        }
    }
}
