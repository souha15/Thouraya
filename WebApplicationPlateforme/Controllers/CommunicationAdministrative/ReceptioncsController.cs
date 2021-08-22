using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceptioncsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ReceptioncsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Receptioncs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Receptioncs>>> Getreceptioncs()
        {
            return await _context.receptioncs.ToListAsync();
        }

        // GET: api/Receptioncs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Receptioncs>> GetReceptioncs(int id)
        {
            var receptioncs = await _context.receptioncs.FindAsync(id);
            if (receptioncs == null)
            {
                return NotFound();
            }

            return receptioncs;
        }

   

        // PUT: api/Receptioncs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceptioncs(int id, Receptioncs receptioncs)
        {
            if (id != receptioncs.Id)
            {
                return BadRequest();
            }

            _context.Entry(receptioncs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceptioncsExists(id))
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

        // POST: api/Receptioncs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Receptioncs>> PostReceptioncs(Receptioncs receptioncs)
        {
            _context.receptioncs.Add(receptioncs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceptioncs", new { id = receptioncs.Id }, receptioncs);
        }

        // DELETE: api/Receptioncs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Receptioncs>> DeleteReceptioncs(int id)
        {
            var receptioncs = await _context.receptioncs.FindAsync(id);
            if (receptioncs == null)
            {
                return NotFound();
            }

            _context.receptioncs.Remove(receptioncs);
            await _context.SaveChangesAsync();

            return receptioncs;
        }

        private bool ReceptioncsExists(int id)
        {
            return _context.receptioncs.Any(e => e.Id == id);
        }
    }
}
