using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenement2;

namespace WebApplicationPlateforme.Controllers.EventsTwo
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiecesJointesEvTzoesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesEvTzoesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesEvTzoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesEvTzo>>> GetpiecesJointesEvTzos()
        {
            return await _context.piecesJointesEvTzos.ToListAsync();
        }

        // GET: api/PiecesJointesEvTzoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesEvTzo>> GetPiecesJointesEvTzo(int id)
        {
            var piecesJointesEvTzo = await _context.piecesJointesEvTzos.FindAsync(id);

            if (piecesJointesEvTzo == null)
            {
                return NotFound();
            }

            return piecesJointesEvTzo;
        }

        // PUT: api/PiecesJointesEvTzoes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesEvTzo(int id, PiecesJointesEvTzo piecesJointesEvTzo)
        {
            if (id != piecesJointesEvTzo.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesEvTzo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesEvTzoExists(id))
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

        // POST: api/PiecesJointesEvTzoes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesEvTzo>> PostPiecesJointesEvTzo(PiecesJointesEvTzo piecesJointesEvTzo)
        {
            _context.piecesJointesEvTzos.Add(piecesJointesEvTzo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesEvTzo", new { id = piecesJointesEvTzo.Id }, piecesJointesEvTzo);
        }

        // DELETE: api/PiecesJointesEvTzoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesEvTzo>> DeletePiecesJointesEvTzo(int id)
        {
            var piecesJointesEvTzo = await _context.piecesJointesEvTzos.FindAsync(id);
            if (piecesJointesEvTzo == null)
            {
                return NotFound();
            }

            _context.piecesJointesEvTzos.Remove(piecesJointesEvTzo);
            await _context.SaveChangesAsync();

            return piecesJointesEvTzo;
        }

        private bool PiecesJointesEvTzoExists(int id)
        {
            return _context.piecesJointesEvTzos.Any(e => e.Id == id);
        }
    }
}
