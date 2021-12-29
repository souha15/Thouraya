using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Allmaintenance;

namespace WebApplicationPlateforme.Controllers.Maintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllTypeOfMaintenancesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public AllTypeOfMaintenancesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/AllTypeOfMaintenances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllTypeOfMaintenance>>> GetAllTypeOfMaintenance()
        {
            return await _context.AllTypeOfMaintenance.ToListAsync();
        }

        // GET: api/AllTypeOfMaintenances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AllTypeOfMaintenance>> GetAllTypeOfMaintenance(int id)
        {
            var allTypeOfMaintenance = await _context.AllTypeOfMaintenance.FindAsync(id);

            if (allTypeOfMaintenance == null)
            {
                return NotFound();
            }

            return allTypeOfMaintenance;
        }

        // PUT: api/AllTypeOfMaintenances/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAllTypeOfMaintenance(int id, AllTypeOfMaintenance allTypeOfMaintenance)
        {
            if (id != allTypeOfMaintenance.Id)
            {
                return BadRequest();
            }

            _context.Entry(allTypeOfMaintenance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllTypeOfMaintenanceExists(id))
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

        // POST: api/AllTypeOfMaintenances
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AllTypeOfMaintenance>> PostAllTypeOfMaintenance(AllTypeOfMaintenance allTypeOfMaintenance)
        {
            _context.AllTypeOfMaintenance.Add(allTypeOfMaintenance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAllTypeOfMaintenance", new { id = allTypeOfMaintenance.Id }, allTypeOfMaintenance);
        }

        // DELETE: api/AllTypeOfMaintenances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AllTypeOfMaintenance>> DeleteAllTypeOfMaintenance(int id)
        {
            var allTypeOfMaintenance = await _context.AllTypeOfMaintenance.FindAsync(id);
            if (allTypeOfMaintenance == null)
            {
                return NotFound();
            }

            _context.AllTypeOfMaintenance.Remove(allTypeOfMaintenance);
            await _context.SaveChangesAsync();

            return allTypeOfMaintenance;
        }

        private bool AllTypeOfMaintenanceExists(int id)
        {
            return _context.AllTypeOfMaintenance.Any(e => e.Id == id);
        }
    }
}
