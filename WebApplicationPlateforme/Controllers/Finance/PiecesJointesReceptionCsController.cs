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
    public class PiecesJointesReceptionCsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesReceptionCsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesReceptionCs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesReceptionC>>> GetpiecesJointesReceptionCs()
        {
            return await _context.piecesJointesReceptionCs.ToListAsync();
        }

        // GET: api/PiecesJointesReceptionCs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesReceptionC>> GetPiecesJointesReceptionC(int id)
        {
            var piecesJointesReceptionC = await _context.piecesJointesReceptionCs.FindAsync(id);

            if (piecesJointesReceptionC == null)
            {
                return NotFound();
            }

            return piecesJointesReceptionC;
        }

        // PUT: api/PiecesJointesReceptionCs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesReceptionC(int id, PiecesJointesReceptionC piecesJointesReceptionC)
        {
            if (id != piecesJointesReceptionC.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesReceptionC).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesReceptionCExists(id))
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

        // POST: api/PiecesJointesReceptionCs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesReceptionC>> PostPiecesJointesReceptionC(PiecesJointesReceptionC piecesJointesReceptionC)
        {
            _context.piecesJointesReceptionCs.Add(piecesJointesReceptionC);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesReceptionC", new { id = piecesJointesReceptionC.Id }, piecesJointesReceptionC);
        }

        // DELETE: api/PiecesJointesReceptionCs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesReceptionC>> DeletePiecesJointesReceptionC(int id)
        {
            var piecesJointesReceptionC = await _context.piecesJointesReceptionCs.FindAsync(id);
            if (piecesJointesReceptionC == null)
            {
                return NotFound();
            }

            _context.piecesJointesReceptionCs.Remove(piecesJointesReceptionC);
            await _context.SaveChangesAsync();

            return piecesJointesReceptionC;
        }

        private bool PiecesJointesReceptionCExists(int id)
        {
            return _context.piecesJointesReceptionCs.Any(e => e.Id == id);
        }
    }
}
