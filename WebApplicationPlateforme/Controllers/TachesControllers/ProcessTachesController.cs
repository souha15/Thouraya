using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Taches;

namespace WebApplicationPlateforme.Controllers.TachesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessTachesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ProcessTachesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ProcessTaches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProcessTache>>> GetprocessTaches()
        {
            return await _context.processTaches.ToListAsync();
        }

        // GET: api/ProcessTaches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProcessTache>> GetProcessTache(int id)
        {
            var processTache = await _context.processTaches.FindAsync(id);

            if (processTache == null)
            {
                return NotFound();
            }

            return processTache;
        }

        // PUT: api/ProcessTaches/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcessTache(int id, ProcessTache processTache)
        {
            if (id != processTache.Id)
            {
                return BadRequest();
            }

            _context.Entry(processTache).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProcessTacheExists(id))
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

        // POST: api/ProcessTaches
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProcessTache>> PostProcessTache(ProcessTache processTache)
        {
            _context.processTaches.Add(processTache);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProcessTache", new { id = processTache.Id }, processTache);
        }

        // DELETE: api/ProcessTaches/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProcessTache>> DeleteProcessTache(int id)
        {
            var processTache = await _context.processTaches.FindAsync(id);
            if (processTache == null)
            {
                return NotFound();
            }

            _context.processTaches.Remove(processTache);
            await _context.SaveChangesAsync();

            return processTache;
        }

        private bool ProcessTacheExists(int id)
        {
            return _context.processTaches.Any(e => e.Id == id);
        }
    }
}
