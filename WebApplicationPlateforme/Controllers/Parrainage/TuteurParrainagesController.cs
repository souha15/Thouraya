using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Parrainage;

namespace WebApplicationPlateforme.Controllers.Parrainage
{
    [Route("api/[controller]")]
    [ApiController]
    public class TuteurParrainagesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TuteurParrainagesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TuteurParrainages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TuteurParrainage>>> GetTuteurParrainages()
        {
            return await _context.TuteurParrainages.ToListAsync();
        }

        // GET: api/TuteurParrainages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TuteurParrainage>> GetTuteurParrainage(int id)
        {
            var tuteurParrainage = await _context.TuteurParrainages.FindAsync(id);

            if (tuteurParrainage == null)
            {
                return NotFound();
            }

            return tuteurParrainage;
        }

        // PUT: api/TuteurParrainages/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTuteurParrainage(int id, TuteurParrainage tuteurParrainage)
        {
            if (id != tuteurParrainage.Id)
            {
                return BadRequest();
            }

            _context.Entry(tuteurParrainage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TuteurParrainageExists(id))
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

        // POST: api/TuteurParrainages
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TuteurParrainage>> PostTuteurParrainage(TuteurParrainage tuteurParrainage)
        {
            _context.TuteurParrainages.Add(tuteurParrainage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTuteurParrainage", new { id = tuteurParrainage.Id }, tuteurParrainage);
        }

        // DELETE: api/TuteurParrainages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TuteurParrainage>> DeleteTuteurParrainage(int id)
        {
            var tuteurParrainage = await _context.TuteurParrainages.FindAsync(id);
            if (tuteurParrainage == null)
            {
                return NotFound();
            }

            _context.TuteurParrainages.Remove(tuteurParrainage);
            await _context.SaveChangesAsync();

            return tuteurParrainage;
        }

        private bool TuteurParrainageExists(int id)
        {
            return _context.TuteurParrainages.Any(e => e.Id == id);
        }
    }
}
