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
    public class typeEquipementsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public typeEquipementsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/typeEquipements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<typeEquipement>>> GettypeEquipements()
        {
            return await _context.typeEquipements.ToListAsync();
        }

        // GET: api/typeEquipements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<typeEquipement>> GettypeEquipement(int id)
        {
            var typeEquipement = await _context.typeEquipements.FindAsync(id);

            if (typeEquipement == null)
            {
                return NotFound();
            }

            return typeEquipement;
        }

        // PUT: api/typeEquipements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PuttypeEquipement(int id, typeEquipement typeEquipement)
        {
            if (id != typeEquipement.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeEquipement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!typeEquipementExists(id))
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

        // POST: api/typeEquipements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<typeEquipement>> PosttypeEquipement(typeEquipement typeEquipement)
        {
            _context.typeEquipements.Add(typeEquipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GettypeEquipement", new { id = typeEquipement.Id }, typeEquipement);
        }

        // DELETE: api/typeEquipements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<typeEquipement>> DeletetypeEquipement(int id)
        {
            var typeEquipement = await _context.typeEquipements.FindAsync(id);
            if (typeEquipement == null)
            {
                return NotFound();
            }

            _context.typeEquipements.Remove(typeEquipement);
            await _context.SaveChangesAsync();

            return typeEquipement;
        }

        private bool typeEquipementExists(int id)
        {
            return _context.typeEquipements.Any(e => e.Id == id);
        }
    }
}
