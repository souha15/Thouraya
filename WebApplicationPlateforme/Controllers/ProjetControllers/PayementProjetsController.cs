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
    public class PayementProjetsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PayementProjetsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PayementProjets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayementProjet>>> GetpayementProjets()
        {
            return await _context.payementProjets.ToListAsync();
        }

        // GET: api/PayementProjets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayementProjet>> GetPayementProjet(int id)
        {
            var payementProjet = await _context.payementProjets.FindAsync(id);

            if (payementProjet == null)
            {
                return NotFound();
            }

            return payementProjet;
        }

        // PUT: api/PayementProjets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayementProjet(int id, PayementProjet payementProjet)
        {
            if (id != payementProjet.Id)
            {
                return BadRequest();
            }

            _context.Entry(payementProjet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayementProjetExists(id))
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

        // POST: api/PayementProjets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PayementProjet>> PostPayementProjet(PayementProjet payementProjet)
        {
            _context.payementProjets.Add(payementProjet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayementProjet", new { id = payementProjet.Id }, payementProjet);
        }

        // DELETE: api/PayementProjets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PayementProjet>> DeletePayementProjet(int id)
        {
            var payementProjet = await _context.payementProjets.FindAsync(id);
            if (payementProjet == null)
            {
                return NotFound();
            }

            _context.payementProjets.Remove(payementProjet);
            await _context.SaveChangesAsync();

            return payementProjet;
        }

        private bool PayementProjetExists(int id)
        {
            return _context.payementProjets.Any(e => e.Id == id);
        }
    }
}
