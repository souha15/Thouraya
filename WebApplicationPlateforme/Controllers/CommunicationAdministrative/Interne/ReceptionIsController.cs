using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Interne;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Interne
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceptionIsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ReceptionIsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ReceptionIs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceptionI>>> GetreceptionIs()
        {
            return await _context.receptionIs.ToListAsync();
        }

        // GET: api/ReceptionIs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceptionI>> GetReceptionI(int id)
        {
            var receptionI = await _context.receptionIs.FindAsync(id);

            if (receptionI == null)
            {
                return NotFound();
            }

            return receptionI;
        }

        // PUT: api/ReceptionIs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceptionI(int id, ReceptionI receptionI)
        {
            if (id != receptionI.Id)
            {
                return BadRequest();
            }

            _context.Entry(receptionI).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceptionIExists(id))
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

        // POST: api/ReceptionIs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ReceptionI>> PostReceptionI(ReceptionI receptionI)
        {
            _context.receptionIs.Add(receptionI);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceptionI", new { id = receptionI.Id }, receptionI);
        }

        // DELETE: api/ReceptionIs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ReceptionI>> DeleteReceptionI(int id)
        {
            var receptionI = await _context.receptionIs.FindAsync(id);
            if (receptionI == null)
            {
                return NotFound();
            }

            _context.receptionIs.Remove(receptionI);
            await _context.SaveChangesAsync();

            return receptionI;
        }

        private bool ReceptionIExists(int id)
        {
            return _context.receptionIs.Any(e => e.Id == id);
        }
    }
}
