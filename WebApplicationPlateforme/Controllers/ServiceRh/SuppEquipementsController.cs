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
    public class SuppEquipementsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SuppEquipementsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/SuppEquipements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SuppEquipement>>> GetsuppEquipements()
        {
            return await _context.suppEquipements.ToListAsync();
        }

        // GET: api/SuppEquipements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SuppEquipement>> GetSuppEquipement(int id)
        {
            var suppEquipement = await _context.suppEquipements.FindAsync(id);

            if (suppEquipement == null)
            {
                return NotFound();
            }

            return suppEquipement;
        }

        // PUT: api/SuppEquipements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSuppEquipement(int id, SuppEquipement suppEquipement)
        {
            if (id != suppEquipement.Id)
            {
                return BadRequest();
            }

            _context.Entry(suppEquipement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SuppEquipementExists(id))
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

        // POST: api/SuppEquipements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SuppEquipement>> PostSuppEquipement(SuppEquipement suppEquipement)
        {
            _context.suppEquipements.Add(suppEquipement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSuppEquipement", new { id = suppEquipement.Id }, suppEquipement);
        }

        // DELETE: api/SuppEquipements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SuppEquipement>> DeleteSuppEquipement(int id)
        {
            var suppEquipement = await _context.suppEquipements.FindAsync(id);
            if (suppEquipement == null)
            {
                return NotFound();
            }

            _context.suppEquipements.Remove(suppEquipement);
            await _context.SaveChangesAsync();

            return suppEquipement;
        }

        private bool SuppEquipementExists(int id)
        {
            return _context.suppEquipements.Any(e => e.Id == id);
        }
    }
}
