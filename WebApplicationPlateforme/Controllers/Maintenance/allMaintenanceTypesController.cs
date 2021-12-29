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
    public class allMaintenanceTypesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public allMaintenanceTypesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/allMaintenanceTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<allMaintenanceType>>> GetAllMaintenanceTypes()
        {
            return await _context.AllMaintenanceTypes.ToListAsync();
        }

        // GET: api/allMaintenanceTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<allMaintenanceType>> GetallMaintenanceType(int id)
        {
            var allMaintenanceType = await _context.AllMaintenanceTypes.FindAsync(id);

            if (allMaintenanceType == null)
            {
                return NotFound();
            }

            return allMaintenanceType;
        }

        // PUT: api/allMaintenanceTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutallMaintenanceType(int id, allMaintenanceType allMaintenanceType)
        {
            if (id != allMaintenanceType.Id)
            {
                return BadRequest();
            }

            _context.Entry(allMaintenanceType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!allMaintenanceTypeExists(id))
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

        // POST: api/allMaintenanceTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<allMaintenanceType>> PostallMaintenanceType(allMaintenanceType allMaintenanceType)
        {
            _context.AllMaintenanceTypes.Add(allMaintenanceType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetallMaintenanceType", new { id = allMaintenanceType.Id }, allMaintenanceType);
        }

        // DELETE: api/allMaintenanceTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<allMaintenanceType>> DeleteallMaintenanceType(int id)
        {
            var allMaintenanceType = await _context.AllMaintenanceTypes.FindAsync(id);
            if (allMaintenanceType == null)
            {
                return NotFound();
            }

            _context.AllMaintenanceTypes.Remove(allMaintenanceType);
            await _context.SaveChangesAsync();

            return allMaintenanceType;
        }

        private bool allMaintenanceTypeExists(int id)
        {
            return _context.AllMaintenanceTypes.Any(e => e.Id == id);
        }
    }
}
