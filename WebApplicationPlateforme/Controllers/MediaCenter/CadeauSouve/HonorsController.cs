using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.CadeauxSouvenirs;

namespace WebApplicationPlateforme.Controllers.MediaCenter.CadeauSouve
{
    [Route("api/[controller]")]
    [ApiController]
    public class HonorsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public HonorsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Honors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Honor>>> GetHonor()
        {
            return await _context.Honor.ToListAsync();
        }

        // GET: api/Honors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Honor>> GetHonor(int id)
        {
            var honor = await _context.Honor.FindAsync(id);

            if (honor == null)
            {
                return NotFound();
            }

            return honor;
        }

        // PUT: api/Honors/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHonor(int id, Honor honor)
        {
            if (id != honor.Id)
            {
                return BadRequest();
            }

            _context.Entry(honor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HonorExists(id))
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

        // POST: api/Honors
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Honor>> PostHonor(Honor honor)
        {
            _context.Honor.Add(honor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHonor", new { id = honor.Id }, honor);
        }

        // DELETE: api/Honors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Honor>> DeleteHonor(int id)
        {
            var honor = await _context.Honor.FindAsync(id);
            if (honor == null)
            {
                return NotFound();
            }

            _context.Honor.Remove(honor);
            await _context.SaveChangesAsync();

            return honor;
        }

        private bool HonorExists(int id)
        {
            return _context.Honor.Any(e => e.Id == id);
        }
    }
}
