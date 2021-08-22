using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Dotations;

namespace WebApplicationPlateforme.Controllers.DotationsControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiecesJointesDotLocsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesDotLocsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesDotLocs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesDotLoc>>> GetPiecesJointesDotLoc()
        {
            return await _context.PiecesJointesDotLoc.ToListAsync();
        }

        // GET: api/PiecesJointesDotLocs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesDotLoc>> GetPiecesJointesDotLoc(int id)
        {
            var piecesJointesDotLoc = await _context.PiecesJointesDotLoc.FindAsync(id);

            if (piecesJointesDotLoc == null)
            {
                return NotFound();
            }

            return piecesJointesDotLoc;
        }

        // PUT: api/PiecesJointesDotLocs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesDotLoc(int id, PiecesJointesDotLoc piecesJointesDotLoc)
        {
            if (id != piecesJointesDotLoc.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesDotLoc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesDotLocExists(id))
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

        // POST: api/PiecesJointesDotLocs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesDotLoc>> PostPiecesJointesDotLoc(PiecesJointesDotLoc piecesJointesDotLoc)
        {
            _context.PiecesJointesDotLoc.Add(piecesJointesDotLoc);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesDotLoc", new { id = piecesJointesDotLoc.Id }, piecesJointesDotLoc);
        }

        // DELETE: api/PiecesJointesDotLocs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesDotLoc>> DeletePiecesJointesDotLoc(int id)
        {
            var piecesJointesDotLoc = await _context.PiecesJointesDotLoc.FindAsync(id);
            if (piecesJointesDotLoc == null)
            {
                return NotFound();
            }

            _context.PiecesJointesDotLoc.Remove(piecesJointesDotLoc);
            await _context.SaveChangesAsync();

            return piecesJointesDotLoc;
        }

        private bool PiecesJointesDotLocExists(int id)
        {
            return _context.PiecesJointesDotLoc.Any(e => e.Id == id);
        }
    }
}
