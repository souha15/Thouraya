using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenements;

namespace WebApplicationPlateforme.Controllers.Evenements
{
    [Route("api/[controller]")]
    [ApiController]
    public class TacheEvsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TacheEvsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TacheEvs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TacheEv>>> GettacheEvs()
        {
            return await _context.tacheEvs.ToListAsync();
        }

        // GET: api/TacheEvs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TacheEv>> GetTacheEv(int id)
        {
            var tacheEv = await _context.tacheEvs.FindAsync(id);

            if (tacheEv == null)
            {
                return NotFound();
            }

            return tacheEv;
        }

        // PUT: api/TacheEvs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTacheEv(int id, TacheEv tacheEv)
        {
            if (id != tacheEv.Id)
            {
                return BadRequest();
            }

            _context.Entry(tacheEv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TacheEvExists(id))
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

        // POST: api/TacheEvs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TacheEv>> PostTacheEv(TacheEv tacheEv)
        {
            _context.tacheEvs.Add(tacheEv);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTacheEv", new { id = tacheEv.Id }, tacheEv);
        }

        // DELETE: api/TacheEvs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TacheEv>> DeleteTacheEv(int id)
        {
            var tacheEv = await _context.tacheEvs.FindAsync(id);
            if (tacheEv == null)
            {
                return NotFound();
            }

            _context.tacheEvs.Remove(tacheEv);
            await _context.SaveChangesAsync();

            return tacheEv;
        }

        private bool TacheEvExists(int id)
        {
            return _context.tacheEvs.Any(e => e.Id == id);
        }
    }
}
