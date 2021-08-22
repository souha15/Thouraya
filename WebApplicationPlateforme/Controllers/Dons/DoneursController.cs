using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Dons;

namespace WebApplicationPlateforme.Controllers.Dons
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoneursController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DoneursController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Doneurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doneur>>> Getdoneurs()
        {
            return await _context.doneurs.ToListAsync();
        }

        // GET: api/Doneurs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doneur>> GetDoneur(int id)
        {
            var doneur = await _context.doneurs.FindAsync(id);

            if (doneur == null)
            {
                return NotFound();
            }

            return doneur;
        }

        // PUT: api/Doneurs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoneur(int id, Doneur doneur)
        {
            if (id != doneur.Id)
            {
                return BadRequest();
            }

            _context.Entry(doneur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoneurExists(id))
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

        // POST: api/Doneurs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Doneur>> PostDoneur(Doneur doneur)
        {
            _context.doneurs.Add(doneur);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoneur", new { id = doneur.Id }, doneur);
        }

        // DELETE: api/Doneurs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Doneur>> DeleteDoneur(int id)
        {
            var doneur = await _context.doneurs.FindAsync(id);
            if (doneur == null)
            {
                return NotFound();
            }

            _context.doneurs.Remove(doneur);
            await _context.SaveChangesAsync();

            return doneur;
        }

        private bool DoneurExists(int id)
        {
            return _context.doneurs.Any(e => e.Id == id);
        }
    }
}
