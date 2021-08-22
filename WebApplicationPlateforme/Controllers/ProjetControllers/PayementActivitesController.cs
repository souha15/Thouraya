using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Projets;

namespace WebApplicationPlateforme.Controllers.ProjetControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayementActivitesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PayementActivitesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PayementActivites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayementActivite>>> GetpayementActivites()
        {
            return await _context.payementActivites.ToListAsync();
        }

        // GET: api/PayementActivites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayementActivite>> GetPayementActivite(int id)
        {
            var payementActivite = await _context.payementActivites.FindAsync(id);

            if (payementActivite == null)
            {
                return NotFound();
            }

            return payementActivite;
        }

        // PUT: api/PayementActivites/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayementActivite(int id, PayementActivite payementActivite)
        {
            if (id != payementActivite.Id)
            {
                return BadRequest();
            }

            _context.Entry(payementActivite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayementActiviteExists(id))
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

        // POST: api/PayementActivites
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PayementActivite>> PostPayementActivite(PayementActivite payementActivite)
        {
            _context.payementActivites.Add(payementActivite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayementActivite", new { id = payementActivite.Id }, payementActivite);
        }

        // DELETE: api/PayementActivites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PayementActivite>> DeletePayementActivite(int id)
        {
            var payementActivite = await _context.payementActivites.FindAsync(id);
            if (payementActivite == null)
            {
                return NotFound();
            }

            _context.payementActivites.Remove(payementActivite);
            await _context.SaveChangesAsync();

            return payementActivite;
        }

        private bool PayementActiviteExists(int id)
        {
            return _context.payementActivites.Any(e => e.Id == id);
        }
    }
}
