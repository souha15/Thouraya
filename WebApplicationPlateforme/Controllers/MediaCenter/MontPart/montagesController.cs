using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.Montage;

namespace WebApplicationPlateforme.Controllers.MediaCenter.MontPart
{
    [Route("api/[controller]")]
    [ApiController]
    public class montagesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public montagesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/montages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<montage>>> GetMontages()
        {
            return await _context.Montages.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/montages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<montage>> Getmontage(int id)
        {
            var montage = await _context.Montages.FindAsync(id);

            if (montage == null)
            {
                return NotFound();
            }

            return montage;
        }

        // PUT: api/montages/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putmontage(int id, montage montage)
        {
            if (id != montage.Id)
            {
                return BadRequest();
            }

            _context.Entry(montage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!montageExists(id))
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

        // POST: api/montages
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<montage>> Postmontage(montage montage)
        {
            _context.Montages.Add(montage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getmontage", new { id = montage.Id }, montage);
        }

        // DELETE: api/montages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<montage>> Deletemontage(int id)
        {
            var montage = await _context.Montages.FindAsync(id);
            if (montage == null)
            {
                return NotFound();
            }

            _context.Montages.Remove(montage);
            await _context.SaveChangesAsync();

            return montage;
        }

        private bool montageExists(int id)
        {
            return _context.Montages.Any(e => e.Id == id);
        }
    }
}
