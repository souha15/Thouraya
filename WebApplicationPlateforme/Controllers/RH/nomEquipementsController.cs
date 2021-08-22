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
    public class nomEquipementsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public nomEquipementsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/nomEquipements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<nomEquipement>>> GetnomEquipements()
        {
            return await _context.nomEquipements.ToListAsync();
        }

        // GET: api/nomEquipements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<nomEquipement>> GetnomEquipement(int id)
        {
            var nomEquipement = await _context.nomEquipements.FindAsync(id);

            if (nomEquipement == null)
            {
                return NotFound();
            }

            return nomEquipement;
        }

        // PUT: api/nomEquipements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutnomEquipement(int id, nomEquipement nomEquipement)
        {
            if (id != nomEquipement.Id)
            {
                return BadRequest();
            }

            _context.Entry(nomEquipement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!nomEquipementExists(id))
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

        // POST: api/nomEquipements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<nomEquipement>> PostnomEquipement(nomEquipement nomEquipement)
        {
            _context.nomEquipements.Add(nomEquipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetnomEquipement", new { id = nomEquipement.Id }, nomEquipement);
        }

        // DELETE: api/nomEquipements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<nomEquipement>> DeletenomEquipement(int id)
        {
            var nomEquipement = await _context.nomEquipements.FindAsync(id);
            if (nomEquipement == null)
            {
                return NotFound();
            }

            _context.nomEquipements.Remove(nomEquipement);
            await _context.SaveChangesAsync();

            return nomEquipement;
        }

        private bool nomEquipementExists(int id)
        {
            return _context.nomEquipements.Any(e => e.Id == id);
        }
    }
}
