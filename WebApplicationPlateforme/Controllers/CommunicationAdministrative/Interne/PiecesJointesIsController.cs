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
    public class PiecesJointesIsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesIsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesIs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesI>>> GetpiecesJointesIs()
        {
            return await _context.piecesJointesIs.ToListAsync();
        }

        // GET: api/PiecesJointesIs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesI>> GetPiecesJointesI(int id)
        {
            var piecesJointesI = await _context.piecesJointesIs.FindAsync(id);

            if (piecesJointesI == null)
            {
                return NotFound();
            }

            return piecesJointesI;
        }

        // PUT: api/PiecesJointesIs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesI(int id, PiecesJointesI piecesJointesI)
        {
            if (id != piecesJointesI.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesI).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesIExists(id))
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

        // POST: api/PiecesJointesIs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesI>> PostPiecesJointesI(PiecesJointesI piecesJointesI)
        {
            _context.piecesJointesIs.Add(piecesJointesI);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesI", new { id = piecesJointesI.Id }, piecesJointesI);
        }

        // DELETE: api/PiecesJointesIs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesI>> DeletePiecesJointesI(int id)
        {
            var piecesJointesI = await _context.piecesJointesIs.FindAsync(id);
            if (piecesJointesI == null)
            {
                return NotFound();
            }

            _context.piecesJointesIs.Remove(piecesJointesI);
            await _context.SaveChangesAsync();

            return piecesJointesI;
        }

        private bool PiecesJointesIExists(int id)
        {
            return _context.piecesJointesIs.Any(e => e.Id == id);
        }
    }
}
