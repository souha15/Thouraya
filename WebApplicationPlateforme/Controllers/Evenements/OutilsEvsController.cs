using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenements;

namespace WebApplicationPlateforme.Controllers.Evenements
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutilsEvsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OutilsEvsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/OutilsEvs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OutilsEv>>> GetoutilsEvs()
        {
            return await _context.outilsEvs.ToListAsync();
        }

        // GET: api/OutilsEvs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OutilsEv>> GetOutilsEv(int id)
        {
            var outilsEv = await _context.outilsEvs.FindAsync(id);

            if (outilsEv == null)
            {
                return NotFound();
            }

            return outilsEv;
        }

        // PUT: api/OutilsEvs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOutilsEv(int id, OutilsEv outilsEv)
        {
            if (id != outilsEv.Id)
            {
                return BadRequest();
            }

            _context.Entry(outilsEv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OutilsEvExists(id))
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

        // POST: api/OutilsEvs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OutilsEv>> PostOutilsEv(OutilsEv outilsEv)
        {
            _context.outilsEvs.Add(outilsEv);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOutilsEv", new { id = outilsEv.Id }, outilsEv);
        }

        // DELETE: api/OutilsEvs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OutilsEv>> DeleteOutilsEv(int id)
        {
            var outilsEv = await _context.outilsEvs.FindAsync(id);
            if (outilsEv == null)
            {
                return NotFound();
            }

            _context.outilsEvs.Remove(outilsEv);
            await _context.SaveChangesAsync();

            return outilsEv;
        }

        private bool OutilsEvExists(int id)
        {
            return _context.outilsEvs.Any(e => e.Id == id);
        }
    }
}
