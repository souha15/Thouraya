using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.News;

namespace WebApplicationPlateforme.Controllers.News
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsisController : ControllerBase
    {
        private readonly FinanceContext _context;

        public NewsisController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Newsis
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Newsi>>> Getnewsi()
        {
            return await _context.newsi.ToListAsync();
        }

        // GET: api/Newsis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Newsi>> GetNewsi(int id)
        {
            var newsi = await _context.newsi.FindAsync(id);

            if (newsi == null)
            {
                return NotFound();
            }

            return newsi;
        }

        // PUT: api/Newsis/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNewsi(int id, Newsi newsi)
        {
            if (id != newsi.Id)
            {
                return BadRequest();
            }

            _context.Entry(newsi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsiExists(id))
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

        // POST: api/Newsis
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Newsi>> PostNewsi(Newsi newsi)
        {
            _context.newsi.Add(newsi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNewsi", new { id = newsi.Id }, newsi);
        }

        // DELETE: api/Newsis/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Newsi>> DeleteNewsi(int id)
        {
            var newsi = await _context.newsi.FindAsync(id);
            if (newsi == null)
            {
                return NotFound();
            }

            _context.newsi.Remove(newsi);
            await _context.SaveChangesAsync();

            return newsi;
        }

        private bool NewsiExists(int id)
        {
            return _context.newsi.Any(e => e.Id == id);
        }
    }
}
