using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Projets;

namespace WebApplicationPlateforme.Controllers.ProjetControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ButProjetsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ButProjetsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ButProjets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ButProjet>>> GetbutProjets()
        {
            return await _context.butProjets.ToListAsync();
        }

        // GET: api/ButProjets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ButProjet>> GetButProjet(int id)
        {
            var butProjet = await _context.butProjets.FindAsync(id);

            if (butProjet == null)
            {
                return NotFound();
            }

            return butProjet;
        }

        // PUT: api/ButProjets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutButProjet(int id, ButProjet butProjet)
        {
            if (id != butProjet.Id)
            {
                return BadRequest();
            }

            _context.Entry(butProjet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ButProjetExists(id))
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

        // POST: api/ButProjets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ButProjet>> PostButProjet(ButProjet butProjet)
        {
            _context.butProjets.Add(butProjet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetButProjet", new { id = butProjet.Id }, butProjet);
        }

        // DELETE: api/ButProjets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ButProjet>> DeleteButProjet(int id)
        {
            var butProjet = await _context.butProjets.FindAsync(id);
            if (butProjet == null)
            {
                return NotFound();
            }

            _context.butProjets.Remove(butProjet);
            await _context.SaveChangesAsync();

            return butProjet;
        }

        private bool ButProjetExists(int id)
        {
            return _context.butProjets.Any(e => e.Id == id);
        }
    }
}
