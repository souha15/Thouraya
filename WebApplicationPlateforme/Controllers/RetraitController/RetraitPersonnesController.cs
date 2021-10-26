using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.RetaraitPart;

namespace WebApplicationPlateforme.Controllers.RetraitController
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetraitPersonnesController : ControllerBase
    {
        private readonly AdministrativeCommunicationContext _context;

        public RetraitPersonnesController(AdministrativeCommunicationContext context)
        {
            _context = context;
        }

        // GET: api/RetraitPersonnes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RetraitPersonne>>> GetRetraitPersonnes()
        {
            return await _context.RetraitPersonnes.ToListAsync();
        }

        // GET: api/RetraitPersonnes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RetraitPersonne>> GetRetraitPersonne(int id)
        {
            var retraitPersonne = await _context.RetraitPersonnes.FindAsync(id);

            if (retraitPersonne == null)
            {
                return NotFound();
            }

            return retraitPersonne;
        }

        // PUT: api/RetraitPersonnes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRetraitPersonne(int id, RetraitPersonne retraitPersonne)
        {
            if (id != retraitPersonne.Id)
            {
                return BadRequest();
            }

            _context.Entry(retraitPersonne).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RetraitPersonneExists(id))
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

        // POST: api/RetraitPersonnes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RetraitPersonne>> PostRetraitPersonne(RetraitPersonne retraitPersonne)
        {
            _context.RetraitPersonnes.Add(retraitPersonne);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRetraitPersonne", new { id = retraitPersonne.Id }, retraitPersonne);
        }

        // DELETE: api/RetraitPersonnes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RetraitPersonne>> DeleteRetraitPersonne(int id)
        {
            var retraitPersonne = await _context.RetraitPersonnes.FindAsync(id);
            if (retraitPersonne == null)
            {
                return NotFound();
            }

            _context.RetraitPersonnes.Remove(retraitPersonne);
            await _context.SaveChangesAsync();

            return retraitPersonne;
        }

        private bool RetraitPersonneExists(int id)
        {
            return _context.RetraitPersonnes.Any(e => e.Id == id);
        }
    }
}
