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
    public class DepensesEvsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DepensesEvsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DepensesEvs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepensesEv>>> GetdepensesEvs()
        {
            return await _context.depensesEvs.ToListAsync();
        }

        // GET: api/DepensesEvs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepensesEv>> GetDepensesEv(int id)
        {
            var depensesEv = await _context.depensesEvs.FindAsync(id);

            if (depensesEv == null)
            {
                return NotFound();
            }

            return depensesEv;
        }

        // PUT: api/DepensesEvs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepensesEv(int id, DepensesEv depensesEv)
        {
            if (id != depensesEv.Id)
            {
                return BadRequest();
            }

            _context.Entry(depensesEv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepensesEvExists(id))
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

        // POST: api/DepensesEvs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DepensesEv>> PostDepensesEv(DepensesEv depensesEv)
        {
            _context.depensesEvs.Add(depensesEv);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepensesEv", new { id = depensesEv.Id }, depensesEv);
        }

        // DELETE: api/DepensesEvs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DepensesEv>> DeleteDepensesEv(int id)
        {
            var depensesEv = await _context.depensesEvs.FindAsync(id);
            if (depensesEv == null)
            {
                return NotFound();
            }

            _context.depensesEvs.Remove(depensesEv);
            await _context.SaveChangesAsync();

            return depensesEv;
        }

        private bool DepensesEvExists(int id)
        {
            return _context.depensesEvs.Any(e => e.Id == id);
        }
    }
}
