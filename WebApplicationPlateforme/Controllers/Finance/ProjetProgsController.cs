using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Finance;

namespace WebApplicationPlateforme.Controllers.Finance
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjetProgsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ProjetProgsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ProjetProgs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjetProg>>> GetprojetProgs()
        {
            return await _context.projetProgs.ToListAsync();
        }

        // GET: api/ProjetProgs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjetProg>> GetProjetProg(int id)
        {
            var projetProg = await _context.projetProgs.FindAsync(id);

            if (projetProg == null)
            {
                return NotFound();
            }

            return projetProg;
        }

        // PUT: api/ProjetProgs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjetProg(int id, ProjetProg projetProg)
        {
            if (id != projetProg.Id)
            {
                return BadRequest();
            }

            _context.Entry(projetProg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjetProgExists(id))
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

        // POST: api/ProjetProgs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProjetProg>> PostProjetProg(ProjetProg projetProg)
        {
            _context.projetProgs.Add(projetProg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjetProg", new { id = projetProg.Id }, projetProg);
        }

        // DELETE: api/ProjetProgs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjetProg>> DeleteProjetProg(int id)
        {
            var projetProg = await _context.projetProgs.FindAsync(id);
            if (projetProg == null)
            {
                return NotFound();
            }

            _context.projetProgs.Remove(projetProg);
            await _context.SaveChangesAsync();

            return projetProg;
        }

        private bool ProjetProgExists(int id)
        {
            return _context.projetProgs.Any(e => e.Id == id);
        }
    }
}
