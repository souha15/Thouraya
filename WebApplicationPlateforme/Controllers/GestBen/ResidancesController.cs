using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.gestion_beneficiaire;

namespace WebApplicationPlateforme.Controllers.GestBen
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResidancesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ResidancesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Residances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Residance>>> Getresidances()
        {
            return await _context.residances.ToListAsync();
        }

        // GET: api/Residances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Residance>> GetResidance(int id)
        {
            var residance = await _context.residances.FindAsync(id);

            if (residance == null)
            {
                return NotFound();
            }

            return residance;
        }

        // PUT: api/Residances/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResidance(int id, Residance residance)
        {
            if (id != residance.Id)
            {
                return BadRequest();
            }

            _context.Entry(residance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResidanceExists(id))
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

        // POST: api/Residances
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Residance>> PostResidance(Residance residance)
        {
            _context.residances.Add(residance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResidance", new { id = residance.Id }, residance);
        }

        // DELETE: api/Residances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Residance>> DeleteResidance(int id)
        {
            var residance = await _context.residances.FindAsync(id);
            if (residance == null)
            {
                return NotFound();
            }

            _context.residances.Remove(residance);
            await _context.SaveChangesAsync();

            return residance;
        }

        private bool ResidanceExists(int id)
        {
            return _context.residances.Any(e => e.Id == id);
        }
    }
}
