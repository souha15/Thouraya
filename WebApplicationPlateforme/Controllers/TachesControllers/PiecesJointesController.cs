using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Taches;

namespace WebApplicationPlateforme.Controllers.TachesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiecesJointesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PiecesJointesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointes>>> GetpiecesJointes()
        {
            return await _context.piecesJointes.ToListAsync();
        }

        // GET: api/PiecesJointes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointes>> GetPiecesJointes(int id)
        {
            var piecesJointes = await _context.piecesJointes.FindAsync(id);

            if (piecesJointes == null)
            {
                return NotFound();
            }

            return piecesJointes;
        }

        // PUT: api/PiecesJointes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointes(int id, PiecesJointes piecesJointes)
        {
            if (id != piecesJointes.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesExists(id))
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

        // POST: api/PiecesJointes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<PiecesJointes>> PostPiecesJointes(PiecesJointes piecesJointes)
        {
            _context.piecesJointes.Add(piecesJointes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointes", new { id = piecesJointes.Id }, piecesJointes);
        }

        // DELETE: api/PiecesJointes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointes>> DeletePiecesJointes(int id)
        {
            var piecesJointes = await _context.piecesJointes.FindAsync(id);
            if (piecesJointes == null)
            {
                return NotFound();
            }

            _context.piecesJointes.Remove(piecesJointes);
            await _context.SaveChangesAsync();

            return piecesJointes;
        }

        private bool PiecesJointesExists(int id)
        {
            return _context.piecesJointes.Any(e => e.Id == id);
        }
    }
}
