using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.FinancePartTwo.Cheques;

namespace WebApplicationPlateforme.Controllers.FinancePartTwo.Cheque
{
    [Route("api/[controller]")]
    [ApiController]
    public class demandePayChequesReceivesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public demandePayChequesReceivesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/demandePayChequesReceives
        [HttpGet]
        public async Task<ActionResult<IEnumerable<demandePayChequesReceive>>> GetdemandePayChequesReceive()
        {
            return await _context.demandePayChequesReceive.ToListAsync();
        }

        // GET: api/demandePayChequesReceives/5
        [HttpGet("{id}")]
        public async Task<ActionResult<demandePayChequesReceive>> GetdemandePayChequesReceive(int id)
        {
            var demandePayChequesReceive = await _context.demandePayChequesReceive.FindAsync(id);

            if (demandePayChequesReceive == null)
            {
                return NotFound();
            }

            return demandePayChequesReceive;
        }

        // PUT: api/demandePayChequesReceives/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutdemandePayChequesReceive(int id, demandePayChequesReceive demandePayChequesReceive)
        {
            if (id != demandePayChequesReceive.Id)
            {
                return BadRequest();
            }

            _context.Entry(demandePayChequesReceive).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!demandePayChequesReceiveExists(id))
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

        // POST: api/demandePayChequesReceives
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<demandePayChequesReceive>> PostdemandePayChequesReceive(demandePayChequesReceive demandePayChequesReceive)
        {
            _context.demandePayChequesReceive.Add(demandePayChequesReceive);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetdemandePayChequesReceive", new { id = demandePayChequesReceive.Id }, demandePayChequesReceive);
        }

        // DELETE: api/demandePayChequesReceives/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<demandePayChequesReceive>> DeletedemandePayChequesReceive(int id)
        {
            var demandePayChequesReceive = await _context.demandePayChequesReceive.FindAsync(id);
            if (demandePayChequesReceive == null)
            {
                return NotFound();
            }

            _context.demandePayChequesReceive.Remove(demandePayChequesReceive);
            await _context.SaveChangesAsync();

            return demandePayChequesReceive;
        }

        private bool demandePayChequesReceiveExists(int id)
        {
            return _context.demandePayChequesReceive.Any(e => e.Id == id);
        }
    }
}
