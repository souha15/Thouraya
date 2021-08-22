using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.voitures;

namespace WebApplicationPlateforme.Controllers.voitures
{
    [Route("api/[controller]")]
    [ApiController]
    public class voitureRepairsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public voitureRepairsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/voitureRepairs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<voitureRepair>>> GetvoitureRepairs()
        {
            return await _context.voitureRepairs.ToListAsync();
        }

        // GET: api/voitureRepairs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<voitureRepair>> GetvoitureRepair(int id)
        {
            var voitureRepair = await _context.voitureRepairs.FindAsync(id);

            if (voitureRepair == null)
            {
                return NotFound();
            }

            return voitureRepair;
        }

        // PUT: api/voitureRepairs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutvoitureRepair(int id, voitureRepair voitureRepair)
        {
            if (id != voitureRepair.Id)
            {
                return BadRequest();
            }

            _context.Entry(voitureRepair).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!voitureRepairExists(id))
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

        // POST: api/voitureRepairs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<voitureRepair>> PostvoitureRepair(voitureRepair voitureRepair)
        {
            _context.voitureRepairs.Add(voitureRepair);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetvoitureRepair", new { id = voitureRepair.Id }, voitureRepair);
        }

        // DELETE: api/voitureRepairs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<voitureRepair>> DeletevoitureRepair(int id)
        {
            var voitureRepair = await _context.voitureRepairs.FindAsync(id);
            if (voitureRepair == null)
            {
                return NotFound();
            }

            _context.voitureRepairs.Remove(voitureRepair);
            await _context.SaveChangesAsync();

            return voitureRepair;
        }

        private bool voitureRepairExists(int id)
        {
            return _context.voitureRepairs.Any(e => e.Id == id);
        }
    }
}
