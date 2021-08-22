using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Emise;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Emise
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceptionEsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ReceptionEsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ReceptionEs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceptionE>>> GetreceptionEs()
        {
            return await _context.receptionEs.ToListAsync();
        }

        // GET: api/ReceptionEs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceptionE>> GetReceptionE(int id)
        {
            var receptionE = await _context.receptionEs.FindAsync(id);

            if (receptionE == null)
            {
                return NotFound();
            }

            return receptionE;
        }

        // PUT: api/ReceptionEs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceptionE(int id, ReceptionE receptionE)
        {
            if (id != receptionE.Id)
            {
                return BadRequest();
            }

            _context.Entry(receptionE).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceptionEExists(id))
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

        // POST: api/ReceptionEs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ReceptionE>> PostReceptionE(ReceptionE receptionE)
        {
            _context.receptionEs.Add(receptionE);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceptionE", new { id = receptionE.Id }, receptionE);
        }

        // DELETE: api/ReceptionEs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ReceptionE>> DeleteReceptionE(int id)
        {
            var receptionE = await _context.receptionEs.FindAsync(id);
            if (receptionE == null)
            {
                return NotFound();
            }

            _context.receptionEs.Remove(receptionE);
            await _context.SaveChangesAsync();

            return receptionE;
        }

        private bool ReceptionEExists(int id)
        {
            return _context.receptionEs.Any(e => e.Id == id);
        }
    }
}
