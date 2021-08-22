using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiecesJointesRcsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesRcsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesRcs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesRc>>> GetpiecesJointesRcs()
        {
            return await _context.piecesJointesRcs.ToListAsync();
        }

        // GET: api/PiecesJointesRcs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesRc>> GetPiecesJointesRc(int id)
        {
            var piecesJointesRc = await _context.piecesJointesRcs.FindAsync(id);

            if (piecesJointesRc == null)
            {
                return NotFound();
            }

            return piecesJointesRc;
        }

        // PUT: api/PiecesJointesRcs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesRc(int id, PiecesJointesRc piecesJointesRc)
        {
            if (id != piecesJointesRc.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesRc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesRcExists(id))
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

        // POST: api/PiecesJointesRcs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesRc>> PostPiecesJointesRc(PiecesJointesRc piecesJointesRc)
        {
            _context.piecesJointesRcs.Add(piecesJointesRc);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesRc", new { id = piecesJointesRc.Id }, piecesJointesRc);
        }

        // DELETE: api/PiecesJointesRcs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesRc>> DeletePiecesJointesRc(int id)
        {
            var piecesJointesRc = await _context.piecesJointesRcs.FindAsync(id);
            if (piecesJointesRc == null)
            {
                return NotFound();
            }

            _context.piecesJointesRcs.Remove(piecesJointesRc);
            await _context.SaveChangesAsync();

            return piecesJointesRc;
        }

        private bool PiecesJointesRcExists(int id)
        {
            return _context.piecesJointesRcs.Any(e => e.Id == id);
        }
    }
}
