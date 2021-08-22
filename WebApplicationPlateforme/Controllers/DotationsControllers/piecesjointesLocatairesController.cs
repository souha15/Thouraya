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
    public class piecesjointesLocatairesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public piecesjointesLocatairesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/piecesjointesLocataires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<piecesjointesLocataire>>> GetpiecesjointesLocataires()
        {
            return await _context.piecesjointesLocataires.ToListAsync();
        }

        // GET: api/piecesjointesLocataires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<piecesjointesLocataire>> GetpiecesjointesLocataire(int id)
        {
            var piecesjointesLocataire = await _context.piecesjointesLocataires.FindAsync(id);

            if (piecesjointesLocataire == null)
            {
                return NotFound();
            }

            return piecesjointesLocataire;
        }

        // PUT: api/piecesjointesLocataires/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutpiecesjointesLocataire(int id, piecesjointesLocataire piecesjointesLocataire)
        {
            if (id != piecesjointesLocataire.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesjointesLocataire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!piecesjointesLocataireExists(id))
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

        // POST: api/piecesjointesLocataires
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<piecesjointesLocataire>> PostpiecesjointesLocataire(piecesjointesLocataire piecesjointesLocataire)
        {
            _context.piecesjointesLocataires.Add(piecesjointesLocataire);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetpiecesjointesLocataire", new { id = piecesjointesLocataire.Id }, piecesjointesLocataire);
        }

        // DELETE: api/piecesjointesLocataires/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<piecesjointesLocataire>> DeletepiecesjointesLocataire(int id)
        {
            var piecesjointesLocataire = await _context.piecesjointesLocataires.FindAsync(id);
            if (piecesjointesLocataire == null)
            {
                return NotFound();
            }

            _context.piecesjointesLocataires.Remove(piecesjointesLocataire);
            await _context.SaveChangesAsync();

            return piecesjointesLocataire;
        }

        private bool piecesjointesLocataireExists(int id)
        {
            return _context.piecesjointesLocataires.Any(e => e.Id == id);
        }
    }
}
