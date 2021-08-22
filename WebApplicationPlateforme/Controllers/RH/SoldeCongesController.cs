using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoldeCongesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SoldeCongesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/SoldeConges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SoldeConge>>> GetsoldeConges()
        {
            return await _context.soldeConges.ToListAsync();
        }

        // GET: api/SoldeConges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SoldeConge>> GetSoldeConge(int id)
        {
            var soldeConge = await _context.soldeConges.FindAsync(id);

            if (soldeConge == null)
            {
                return NotFound();
            }

            return soldeConge;
        }

        // PUT: api/SoldeConges/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSoldeConge(int id, SoldeConge soldeConge)
        {
            if (id != soldeConge.Id)
            {
                return BadRequest();
            }

            _context.Entry(soldeConge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SoldeCongeExists(id))
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

        // POST: api/SoldeConges
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SoldeConge>> PostSoldeConge(SoldeConge soldeConge)
        {
            _context.soldeConges.Add(soldeConge);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSoldeConge", new { id = soldeConge.Id }, soldeConge);
        }

        // DELETE: api/SoldeConges/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SoldeConge>> DeleteSoldeConge(int id)
        {
            var soldeConge = await _context.soldeConges.FindAsync(id);
            if (soldeConge == null)
            {
                return NotFound();
            }

            _context.soldeConges.Remove(soldeConge);
            await _context.SaveChangesAsync();

            return soldeConge;
        }

        private bool SoldeCongeExists(int id)
        {
            return _context.soldeConges.Any(e => e.Id == id);
        }
    }
}
