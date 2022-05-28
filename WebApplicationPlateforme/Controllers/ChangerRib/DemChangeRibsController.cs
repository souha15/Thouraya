using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ChangerRib;

namespace WebApplicationPlateforme.Controllers.ChangerRib
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemChangeRibsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public DemChangeRibsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/DemChangeRibs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemChangeRib>>> GetDemChangeRib()
        {
            return await _context.DemChangeRib.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/DemChangeRibs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemChangeRib>> GetDemChangeRib(int id)
        {
            var demChangeRib = await _context.DemChangeRib.FindAsync(id);

            if (demChangeRib == null)
            {
                return NotFound();
            }

            return demChangeRib;
        }

        // PUT: api/DemChangeRibs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemChangeRib(int id, DemChangeRib demChangeRib)
        {
            if (id != demChangeRib.Id)
            {
                return BadRequest();
            }

            _context.Entry(demChangeRib).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemChangeRibExists(id))
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

        // POST: api/DemChangeRibs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemChangeRib>> PostDemChangeRib(DemChangeRib demChangeRib)
        {
            _context.DemChangeRib.Add(demChangeRib);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemChangeRib", new { id = demChangeRib.Id }, demChangeRib);
        }

        // DELETE: api/DemChangeRibs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemChangeRib>> DeleteDemChangeRib(int id)
        {
            var demChangeRib = await _context.DemChangeRib.FindAsync(id);
            if (demChangeRib == null)
            {
                return NotFound();
            }

            _context.DemChangeRib.Remove(demChangeRib);
            await _context.SaveChangesAsync();

            return demChangeRib;
        }

        private bool DemChangeRibExists(int id)
        {
            return _context.DemChangeRib.Any(e => e.Id == id);
        }
    }
}
