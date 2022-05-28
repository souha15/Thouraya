using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.Visite;

namespace WebApplicationPlateforme.Controllers.MediaCenter.visiController
{
    [Route("api/[controller]")]
    [ApiController]
    public class offreImpressionsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public offreImpressionsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/offreImpressions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<offreImpression>>> GetoffreImpression()
        {
            return await _context.offreImpression.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/offreImpressions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<offreImpression>> GetoffreImpression(int id)
        {
            var offreImpression = await _context.offreImpression.FindAsync(id);

            if (offreImpression == null)
            {
                return NotFound();
            }

            return offreImpression;
        }

        // PUT: api/offreImpressions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutoffreImpression(int id, offreImpression offreImpression)
        {
            if (id != offreImpression.Id)
            {
                return BadRequest();
            }

            _context.Entry(offreImpression).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!offreImpressionExists(id))
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

        // POST: api/offreImpressions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<offreImpression>> PostoffreImpression(offreImpression offreImpression)
        {
            _context.offreImpression.Add(offreImpression);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetoffreImpression", new { id = offreImpression.Id }, offreImpression);
        }

        // DELETE: api/offreImpressions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<offreImpression>> DeleteoffreImpression(int id)
        {
            var offreImpression = await _context.offreImpression.FindAsync(id);
            if (offreImpression == null)
            {
                return NotFound();
            }

            _context.offreImpression.Remove(offreImpression);
            await _context.SaveChangesAsync();

            return offreImpression;
        }

        private bool offreImpressionExists(int id)
        {
            return _context.offreImpression.Any(e => e.Id == id);
        }
    }
}
