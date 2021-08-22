using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Finance;

namespace WebApplicationPlateforme.Controllers.Finance
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiecesJointesCfsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesCfsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesCfs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesCf>>> GetpiecesJointesCfs()
        {
            return await _context.piecesJointesCfs.ToListAsync();
        }

        // GET: api/PiecesJointesCfs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesCf>> GetPiecesJointesCf(int id)
        {
            var piecesJointesCf = await _context.piecesJointesCfs.FindAsync(id);

            if (piecesJointesCf == null)
            {
                return NotFound();
            }

            return piecesJointesCf;
        }

        // PUT: api/PiecesJointesCfs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesCf(int id, PiecesJointesCf piecesJointesCf)
        {
            if (id != piecesJointesCf.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesCf).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesCfExists(id))
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

        // POST: api/PiecesJointesCfs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesCf>> PostPiecesJointesCf(PiecesJointesCf piecesJointesCf)
        {
            _context.piecesJointesCfs.Add(piecesJointesCf);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesCf", new { id = piecesJointesCf.Id }, piecesJointesCf);
        }

        // DELETE: api/PiecesJointesCfs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesCf>> DeletePiecesJointesCf(int id)
        {
            var piecesJointesCf = await _context.piecesJointesCfs.FindAsync(id);
            if (piecesJointesCf == null)
            {
                return NotFound();
            }

            _context.piecesJointesCfs.Remove(piecesJointesCf);
            await _context.SaveChangesAsync();

            return piecesJointesCf;
        }

        private bool PiecesJointesCfExists(int id)
        {
            return _context.piecesJointesCfs.Any(e => e.Id == id);
        }
    }
}
