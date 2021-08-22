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
    public class DemPayCheqNotifsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DemPayCheqNotifsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DemPayCheqNotifs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DemPayCheqNotif>>> GetdemPayCheqNotifs()
        {
            return await _context.demPayCheqNotifs.ToListAsync();
        }

        // GET: api/DemPayCheqNotifs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DemPayCheqNotif>> GetDemPayCheqNotif(int id)
        {
            var demPayCheqNotif = await _context.demPayCheqNotifs.FindAsync(id);

            if (demPayCheqNotif == null)
            {
                return NotFound();
            }

            return demPayCheqNotif;
        }

        // PUT: api/DemPayCheqNotifs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemPayCheqNotif(int id, DemPayCheqNotif demPayCheqNotif)
        {
            if (id != demPayCheqNotif.Id)
            {
                return BadRequest();
            }

            _context.Entry(demPayCheqNotif).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemPayCheqNotifExists(id))
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

        // POST: api/DemPayCheqNotifs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DemPayCheqNotif>> PostDemPayCheqNotif(DemPayCheqNotif demPayCheqNotif)
        {
            _context.demPayCheqNotifs.Add(demPayCheqNotif);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemPayCheqNotif", new { id = demPayCheqNotif.Id }, demPayCheqNotif);
        }

        // DELETE: api/DemPayCheqNotifs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DemPayCheqNotif>> DeleteDemPayCheqNotif(int id)
        {
            var demPayCheqNotif = await _context.demPayCheqNotifs.FindAsync(id);
            if (demPayCheqNotif == null)
            {
                return NotFound();
            }

            _context.demPayCheqNotifs.Remove(demPayCheqNotif);
            await _context.SaveChangesAsync();

            return demPayCheqNotif;
        }

        private bool DemPayCheqNotifExists(int id)
        {
            return _context.demPayCheqNotifs.Any(e => e.Id == id);
        }
    }
}
