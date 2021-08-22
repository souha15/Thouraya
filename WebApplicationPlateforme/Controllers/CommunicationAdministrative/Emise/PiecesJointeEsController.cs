using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Emise;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Emise
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiecesJointeEsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointeEsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointeEs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointeE>>> GetpiecesJointeEs()
        {
            return await _context.piecesJointeEs.ToListAsync();
        }

        // GET: api/PiecesJointeEs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointeE>> GetPiecesJointeE(int id)
        {
            var piecesJointeE = await _context.piecesJointeEs.FindAsync(id);

            if (piecesJointeE == null)
            {
                return NotFound();
            }

            return piecesJointeE;
        }

        // PUT: api/PiecesJointeEs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointeE(int id, PiecesJointeE piecesJointeE)
        {
            if (id != piecesJointeE.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointeE).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointeEExists(id))
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

        // POST: api/PiecesJointeEs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointeE>> PostPiecesJointeE(PiecesJointeE piecesJointeE)
        {
            _context.piecesJointeEs.Add(piecesJointeE);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointeE", new { id = piecesJointeE.Id }, piecesJointeE);
        }

        // DELETE: api/PiecesJointeEs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointeE>> DeletePiecesJointeE(int id)
        {
            var piecesJointeE = await _context.piecesJointeEs.FindAsync(id);
            if (piecesJointeE == null)
            {
                return NotFound();
            }

            _context.piecesJointeEs.Remove(piecesJointeE);
            await _context.SaveChangesAsync();

            return piecesJointeE;
        }

        private bool PiecesJointeEExists(int id)
        {
            return _context.piecesJointeEs.Any(e => e.Id == id);
        }
    }
}
