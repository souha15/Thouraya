using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Salaire;

namespace WebApplicationPlateforme.Controllers.Salaire
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaireDsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SalaireDsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/SalaireDs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalaireD>>> Getsalaires()
        {
            return await _context.salaires.ToListAsync();
        }

        // GET: api/SalaireDs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalaireD>> GetSalaireD(int id)
        {
            var salaireD = await _context.salaires.FindAsync(id);

            if (salaireD == null)
            {
                return NotFound();
            }

            return salaireD;
        }

        // PUT: api/SalaireDs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalaireD(int id, SalaireD salaireD)
        {
            if (id != salaireD.Id)
            {
                return BadRequest();
            }

            _context.Entry(salaireD).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaireDExists(id))
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

        // POST: api/SalaireDs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SalaireD>> PostSalaireD(SalaireD salaireD)
        {
            _context.salaires.Add(salaireD);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalaireD", new { id = salaireD.Id }, salaireD);
        }

        // DELETE: api/SalaireDs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SalaireD>> DeleteSalaireD(int id)
        {
            var salaireD = await _context.salaires.FindAsync(id);
            if (salaireD == null)
            {
                return NotFound();
            }

            _context.salaires.Remove(salaireD);
            await _context.SaveChangesAsync();

            return salaireD;
        }

        private bool SalaireDExists(int id)
        {
            return _context.salaires.Any(e => e.Id == id);
        }
    }
}
