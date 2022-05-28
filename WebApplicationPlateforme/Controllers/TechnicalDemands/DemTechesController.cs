using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.TechnicalDemands;

namespace WebApplicationPlateforme.Controllers.TechnicalDemands
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemTechesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public DemTechesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/DemTeches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemTech>>> GetdemTeches()
        {
            return await _context.demTeches.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/DemTeches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemTech>> GetDemTech(int id)
        {
            var demTech = await _context.demTeches.FindAsync(id);

            if (demTech == null)
            {
                return NotFound();
            }

            return demTech;
        }

        // PUT: api/DemTeches/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemTech(int id, DemTech demTech)
        {
            if (id != demTech.Id)
            {
                return BadRequest();
            }

            _context.Entry(demTech).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemTechExists(id))
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

        // POST: api/DemTeches
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemTech>> PostDemTech(DemTech demTech)
        {
            _context.demTeches.Add(demTech);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemTech", new { id = demTech.Id }, demTech);
        }

        // DELETE: api/DemTeches/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemTech>> DeleteDemTech(int id)
        {
            var demTech = await _context.demTeches.FindAsync(id);
            if (demTech == null)
            {
                return NotFound();
            }

            _context.demTeches.Remove(demTech);
            await _context.SaveChangesAsync();

            return demTech;
        }

        private bool DemTechExists(int id)
        {
            return _context.demTeches.Any(e => e.Id == id);
        }
    }
}
