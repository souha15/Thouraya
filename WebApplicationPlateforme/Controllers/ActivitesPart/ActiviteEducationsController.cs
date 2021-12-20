using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ActivitePart;

namespace WebApplicationPlateforme.Controllers.ActivitesPart
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActiviteEducationsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ActiviteEducationsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ActiviteEducations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActiviteEducation>>> GetActiviteEducations()
        {
            return await _context.ActiviteEducations.ToListAsync();
        }

        // GET: api/ActiviteEducations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActiviteEducation>> GetActiviteEducation(int id)
        {
            var activiteEducation = await _context.ActiviteEducations.FindAsync(id);

            if (activiteEducation == null)
            {
                return NotFound();
            }

            return activiteEducation;
        }

        // PUT: api/ActiviteEducations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActiviteEducation(int id, ActiviteEducation activiteEducation)
        {
            if (id != activiteEducation.Id)
            {
                return BadRequest();
            }

            _context.Entry(activiteEducation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActiviteEducationExists(id))
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

        // POST: api/ActiviteEducations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ActiviteEducation>> PostActiviteEducation(ActiviteEducation activiteEducation)
        {
            _context.ActiviteEducations.Add(activiteEducation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActiviteEducation", new { id = activiteEducation.Id }, activiteEducation);
        }

        // DELETE: api/ActiviteEducations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActiviteEducation>> DeleteActiviteEducation(int id)
        {
            var activiteEducation = await _context.ActiviteEducations.FindAsync(id);
            if (activiteEducation == null)
            {
                return NotFound();
            }

            _context.ActiviteEducations.Remove(activiteEducation);
            await _context.SaveChangesAsync();

            return activiteEducation;
        }

        private bool ActiviteEducationExists(int id)
        {
            return _context.ActiviteEducations.Any(e => e.Id == id);
        }
    }
}
