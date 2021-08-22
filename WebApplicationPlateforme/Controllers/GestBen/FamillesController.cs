using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.gestion_beneficiaire;

namespace WebApplicationPlateforme.Controllers.GestBen
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamillesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FamillesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Familles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Famille>>> Getfamilles()
        {
            return await _context.familles.ToListAsync();
        }

        // GET: api/Familles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Famille>> GetFamille(int id)
        {
            var famille = await _context.familles.FindAsync(id);

            if (famille == null)
            {
                return NotFound();
            }

            return famille;
        }

        // PUT: api/Familles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFamille(int id, Famille famille)
        {
            if (id != famille.Id)
            {
                return BadRequest();
            }

            _context.Entry(famille).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FamilleExists(id))
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

        // POST: api/Familles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Famille>> PostFamille(Famille famille)
        {
            _context.familles.Add(famille);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFamille", new { id = famille.Id }, famille);
        }

        // DELETE: api/Familles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Famille>> DeleteFamille(int id)
        {
            var famille = await _context.familles.FindAsync(id);
            if (famille == null)
            {
                return NotFound();
            }

            _context.familles.Remove(famille);
            await _context.SaveChangesAsync();

            return famille;
        }

        private bool FamilleExists(int id)
        {
            return _context.familles.Any(e => e.Id == id);
        }
    }
}
