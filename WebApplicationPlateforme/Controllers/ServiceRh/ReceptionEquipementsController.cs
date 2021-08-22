using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServiceRh;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceptionEquipementsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ReceptionEquipementsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ReceptionEquipements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceptionEquipement>>> GetreceptionEquipements()
        {
            return await _context.receptionEquipements.ToListAsync();
        }

        // GET: api/ReceptionEquipements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceptionEquipement>> GetReceptionEquipement(int id)
        {
            var receptionEquipement = await _context.receptionEquipements.FindAsync(id);

            if (receptionEquipement == null)
            {
                return NotFound();
            }

            return receptionEquipement;
        }

        // PUT: api/ReceptionEquipements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceptionEquipement(int id, ReceptionEquipement receptionEquipement)
        {
            if (id != receptionEquipement.Id)
            {
                return BadRequest();
            }

            _context.Entry(receptionEquipement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceptionEquipementExists(id))
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

        // POST: api/ReceptionEquipements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ReceptionEquipement>> PostReceptionEquipement(ReceptionEquipement receptionEquipement)
        {
            _context.receptionEquipements.Add(receptionEquipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceptionEquipement", new { id = receptionEquipement.Id }, receptionEquipement);
        }

        // DELETE: api/ReceptionEquipements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ReceptionEquipement>> DeleteReceptionEquipement(int id)
        {
            var receptionEquipement = await _context.receptionEquipements.FindAsync(id);
            if (receptionEquipement == null)
            {
                return NotFound();
            }

            _context.receptionEquipements.Remove(receptionEquipement);
            await _context.SaveChangesAsync();

            return receptionEquipement;
        }

        private bool ReceptionEquipementExists(int id)
        {
            return _context.receptionEquipements.Any(e => e.Id == id);
        }
    }
}
