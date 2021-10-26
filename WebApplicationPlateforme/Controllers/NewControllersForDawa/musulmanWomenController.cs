using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MusulumanFemme;

namespace WebApplicationPlateforme.Controllers.NewControllersForDawa
{
    [Route("api/[controller]")]
    [ApiController]
    public class musulmanWomenController : ControllerBase
    {
        private readonly DawaaContext _context;

        public musulmanWomenController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/musulmanWomen
        [HttpGet]
        public async Task<ActionResult<IEnumerable<musulmanWoman>>> GetmusulmanWoman()
        {
            return await _context.musulmanWoman.ToListAsync();
        }

        // GET: api/musulmanWomen/5
        [HttpGet("{id}")]
        public async Task<ActionResult<musulmanWoman>> GetmusulmanWoman(int id)
        {
            var musulmanWoman = await _context.musulmanWoman.FindAsync(id);

            if (musulmanWoman == null)
            {
                return NotFound();
            }

            return musulmanWoman;
        }

        // PUT: api/musulmanWomen/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutmusulmanWoman(int id, musulmanWoman musulmanWoman)
        {
            if (id != musulmanWoman.Id)
            {
                return BadRequest();
            }

            _context.Entry(musulmanWoman).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!musulmanWomanExists(id))
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

        // POST: api/musulmanWomen
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<musulmanWoman>> PostmusulmanWoman(musulmanWoman musulmanWoman)
        {
            _context.musulmanWoman.Add(musulmanWoman);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetmusulmanWoman", new { id = musulmanWoman.Id }, musulmanWoman);
        }

        // DELETE: api/musulmanWomen/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<musulmanWoman>> DeletemusulmanWoman(int id)
        {
            var musulmanWoman = await _context.musulmanWoman.FindAsync(id);
            if (musulmanWoman == null)
            {
                return NotFound();
            }

            _context.musulmanWoman.Remove(musulmanWoman);
            await _context.SaveChangesAsync();

            return musulmanWoman;
        }

        private bool musulmanWomanExists(int id)
        {
            return _context.musulmanWoman.Any(e => e.Id == id);
        }
    }
}
