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
    public class PiecesJointesfsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesfsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesfs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesf>>> GetpiecesJointesfs()
        {
            return await _context.piecesJointesfs.ToListAsync();
        }

        // GET: api/PiecesJointesfs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesf>> GetPiecesJointesf(int id)
        {
            var piecesJointesf = await _context.piecesJointesfs.FindAsync(id);

            if (piecesJointesf == null)
            {
                return NotFound();
            }

            return piecesJointesf;
        }

        // PUT: api/PiecesJointesfs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesf(int id, PiecesJointesf piecesJointesf)
        {
            if (id != piecesJointesf.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesf).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesfExists(id))
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

        // POST: api/PiecesJointesfs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesf>> PostPiecesJointesf(PiecesJointesf piecesJointesf)
        {
            _context.piecesJointesfs.Add(piecesJointesf);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesf", new { id = piecesJointesf.Id }, piecesJointesf);
        }

        // DELETE: api/PiecesJointesfs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesf>> DeletePiecesJointesf(int id)
        {
            var piecesJointesf = await _context.piecesJointesfs.FindAsync(id);
            if (piecesJointesf == null)
            {
                return NotFound();
            }

            _context.piecesJointesfs.Remove(piecesJointesf);
            await _context.SaveChangesAsync();

            return piecesJointesf;
        }

        private bool PiecesJointesfExists(int id)
        {
            return _context.piecesJointesfs.Any(e => e.Id == id);
        }
    }
}
