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
    public class piecesjointesRevenusController : ControllerBase
    {
        private readonly FinanceContext _context;

        public piecesjointesRevenusController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/piecesjointesRevenus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<piecesjointesRevenus>>> GetPiecesjointesRevenus()
        {
            return await _context.PiecesjointesRevenus.ToListAsync();
        }

        // GET: api/piecesjointesRevenus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<piecesjointesRevenus>> GetpiecesjointesRevenus(int id)
        {
            var piecesjointesRevenus = await _context.PiecesjointesRevenus.FindAsync(id);

            if (piecesjointesRevenus == null)
            {
                return NotFound();
            }

            return piecesjointesRevenus;
        }

        // PUT: api/piecesjointesRevenus/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutpiecesjointesRevenus(int id, piecesjointesRevenus piecesjointesRevenus)
        {
            if (id != piecesjointesRevenus.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesjointesRevenus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!piecesjointesRevenusExists(id))
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

        // POST: api/piecesjointesRevenus
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<piecesjointesRevenus>> PostpiecesjointesRevenus(piecesjointesRevenus piecesjointesRevenus)
        {
            _context.PiecesjointesRevenus.Add(piecesjointesRevenus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetpiecesjointesRevenus", new { id = piecesjointesRevenus.Id }, piecesjointesRevenus);
        }

        // DELETE: api/piecesjointesRevenus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<piecesjointesRevenus>> DeletepiecesjointesRevenus(int id)
        {
            var piecesjointesRevenus = await _context.PiecesjointesRevenus.FindAsync(id);
            if (piecesjointesRevenus == null)
            {
                return NotFound();
            }

            _context.PiecesjointesRevenus.Remove(piecesjointesRevenus);
            await _context.SaveChangesAsync();

            return piecesjointesRevenus;
        }

        private bool piecesjointesRevenusExists(int id)
        {
            return _context.PiecesjointesRevenus.Any(e => e.Id == id);
        }
    }
}
