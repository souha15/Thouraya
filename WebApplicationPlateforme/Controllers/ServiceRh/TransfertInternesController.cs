using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServiceRh;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransfertInternesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TransfertInternesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TransfertInternes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransfertInterne>>> GettransfertInternes()
        {
            return await _context.transfertInternes.ToListAsync();
        }

        // GET: api/TransfertInternes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransfertInterne>> GetTransfertInterne(int id)
        {
            var transfertInterne = await _context.transfertInternes.FindAsync(id);

            if (transfertInterne == null)
            {
                return NotFound();
            }

            return transfertInterne;
        }

        // PUT: api/TransfertInternes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransfertInterne(int id, TransfertInterne transfertInterne)
        {
            if (id != transfertInterne.Id)
            {
                return BadRequest();
            }

            _context.Entry(transfertInterne).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransfertInterneExists(id))
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

        // POST: api/TransfertInternes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TransfertInterne>> PostTransfertInterne(TransfertInterne transfertInterne)
        {
            _context.transfertInternes.Add(transfertInterne);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransfertInterne", new { id = transfertInterne.Id }, transfertInterne);
        }

        // DELETE: api/TransfertInternes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TransfertInterne>> DeleteTransfertInterne(int id)
        {
            var transfertInterne = await _context.transfertInternes.FindAsync(id);
            if (transfertInterne == null)
            {
                return NotFound();
            }

            _context.transfertInternes.Remove(transfertInterne);
            await _context.SaveChangesAsync();

            return transfertInterne;
        }

        private bool TransfertInterneExists(int id)
        {
            return _context.transfertInternes.Any(e => e.Id == id);
        }
    }
}
