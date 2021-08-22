using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenement2;

namespace WebApplicationPlateforme.Controllers.EventsTwo
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvenementTwoesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public EvenementTwoesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/EvenementTwoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EvenementTwo>>> GetevenementTwos()
        {
            return await _context.evenementTwos.ToListAsync();
        }

        // GET: api/EvenementTwoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EvenementTwo>> GetEvenementTwo(int id)
        {
            var evenementTwo = await _context.evenementTwos.FindAsync(id);

            if (evenementTwo == null)
            {
                return NotFound();
            }

            return evenementTwo;
        }

        // PUT: api/EvenementTwoes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvenementTwo(int id, EvenementTwo evenementTwo)
        {
            if (id != evenementTwo.Id)
            {
                return BadRequest();
            }

            _context.Entry(evenementTwo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EvenementTwoExists(id))
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

        // POST: api/EvenementTwoes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EvenementTwo>> PostEvenementTwo(EvenementTwo evenementTwo)
        {
            _context.evenementTwos.Add(evenementTwo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvenementTwo", new { id = evenementTwo.Id }, evenementTwo);
        }

        // DELETE: api/EvenementTwoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EvenementTwo>> DeleteEvenementTwo(int id)
        {
            var evenementTwo = await _context.evenementTwos.FindAsync(id);
            if (evenementTwo == null)
            {
                return NotFound();
            }

            _context.evenementTwos.Remove(evenementTwo);
            await _context.SaveChangesAsync();

            return evenementTwo;
        }

        private bool EvenementTwoExists(int id)
        {
            return _context.evenementTwos.Any(e => e.Id == id);
        }
    }
}
