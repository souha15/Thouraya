using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Emise;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Emise
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeAffectationsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TeAffectationsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TeAffectations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeAffectation>>> GetTeAffectations()
        {
            return await _context.TeAffectations.ToListAsync();
        }

        // GET: api/TeAffectations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeAffectation>> GetTeAffectation(int id)
        {
            var teAffectation = await _context.TeAffectations.FindAsync(id);

            if (teAffectation == null)
            {
                return NotFound();
            }

            return teAffectation;
        }

        // PUT: api/TeAffectations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeAffectation(int id, TeAffectation teAffectation)
        {
            if (id != teAffectation.Id)
            {
                return BadRequest();
            }

            _context.Entry(teAffectation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeAffectationExists(id))
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

        // POST: api/TeAffectations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TeAffectation>> PostTeAffectation(TeAffectation teAffectation)
        {
            _context.TeAffectations.Add(teAffectation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeAffectation", new { id = teAffectation.Id }, teAffectation);
        }

        // DELETE: api/TeAffectations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TeAffectation>> DeleteTeAffectation(int id)
        {
            var teAffectation = await _context.TeAffectations.FindAsync(id);
            if (teAffectation == null)
            {
                return NotFound();
            }

            _context.TeAffectations.Remove(teAffectation);
            await _context.SaveChangesAsync();

            return teAffectation;
        }

        private bool TeAffectationExists(int id)
        {
            return _context.TeAffectations.Any(e => e.Id == id);
        }
    }
}
