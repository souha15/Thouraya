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
    public class AssistancesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public AssistancesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Assistances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assistance>>> Getassistances()
        {
            return await _context.assistances.ToListAsync();
        }

        // GET: api/Assistances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Assistance>> GetAssistance(int id)
        {
            var assistance = await _context.assistances.FindAsync(id);

            if (assistance == null)
            {
                return NotFound();
            }

            return assistance;
        }

        // PUT: api/Assistances/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssistance(int id, Assistance assistance)
        {
            if (id != assistance.Id)
            {
                return BadRequest();
            }

            _context.Entry(assistance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssistanceExists(id))
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

        // POST: api/Assistances
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Assistance>> PostAssistance(Assistance assistance)
        {
            _context.assistances.Add(assistance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssistance", new { id = assistance.Id }, assistance);
        }

        // DELETE: api/Assistances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Assistance>> DeleteAssistance(int id)
        {
            var assistance = await _context.assistances.FindAsync(id);
            if (assistance == null)
            {
                return NotFound();
            }

            _context.assistances.Remove(assistance);
            await _context.SaveChangesAsync();

            return assistance;
        }

        private bool AssistanceExists(int id)
        {
            return _context.assistances.Any(e => e.Id == id);
        }
    }
}
