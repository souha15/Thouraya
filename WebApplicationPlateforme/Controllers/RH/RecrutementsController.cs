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
    public class RecrutementsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public RecrutementsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Recrutements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recrutement>>> Getrecrutements()
        {
            return await _context.recrutements.ToListAsync();
        }

        // GET: api/Recrutements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recrutement>> GetRecrutement(int id)
        {
            var recrutement = await _context.recrutements.FindAsync(id);

            if (recrutement == null)
            {
                return NotFound();
            }

            return recrutement;
        }

        // PUT: api/Recrutements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecrutement(int id, Recrutement recrutement)
        {
            if (id != recrutement.Id)
            {
                return BadRequest();
            }

            _context.Entry(recrutement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecrutementExists(id))
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

        // POST: api/Recrutements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Recrutement>> PostRecrutement(Recrutement recrutement)
        {
            _context.recrutements.Add(recrutement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecrutement", new { id = recrutement.Id }, recrutement);
        }

        // DELETE: api/Recrutements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Recrutement>> DeleteRecrutement(int id)
        {
            var recrutement = await _context.recrutements.FindAsync(id);
            if (recrutement == null)
            {
                return NotFound();
            }

            _context.recrutements.Remove(recrutement);
            await _context.SaveChangesAsync();

            return recrutement;
        }

        private bool RecrutementExists(int id)
        {
            return _context.recrutements.Any(e => e.Id == id);
        }
    }
}
