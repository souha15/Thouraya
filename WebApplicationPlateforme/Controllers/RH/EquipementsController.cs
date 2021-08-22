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
    public class EquipementsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public EquipementsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Equipements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipement>>> Getequipements()
        {
            return await _context.equipements.ToListAsync();
        }

        // GET: api/Equipements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Equipement>> GetEquipement(int id)
        {
            var equipement = await _context.equipements.FindAsync(id);

            if (equipement == null)
            {
                return NotFound();
            }

            return equipement;
        }

        // PUT: api/Equipements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquipement(int id, Equipement equipement)
        {
            if (id != equipement.Id)
            {
                return BadRequest();
            }

            _context.Entry(equipement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipementExists(id))
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

        // POST: api/Equipements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Equipement>> PostEquipement(Equipement equipement)
        {
            _context.equipements.Add(equipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEquipement", new { id = equipement.Id }, equipement);
        }

        // DELETE: api/Equipements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Equipement>> DeleteEquipement(int id)
        {
            var equipement = await _context.equipements.FindAsync(id);
            if (equipement == null)
            {
                return NotFound();
            }

            _context.equipements.Remove(equipement);
            await _context.SaveChangesAsync();

            return equipement;
        }

        private bool EquipementExists(int id)
        {
            return _context.equipements.Any(e => e.Id == id);
        }
    }
}
