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
    public class BrancheOnesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public BrancheOnesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/BrancheOnes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrancheOne>>> GetbrancheOnes()
        {
            return await _context.brancheOnes.ToListAsync();
        }

        // GET: api/BrancheOnes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BrancheOne>> GetBrancheOne(int id)
        {
            var brancheOne = await _context.brancheOnes.FindAsync(id);

            if (brancheOne == null)
            {
                return NotFound();
            }

            return brancheOne;
        }

        // PUT: api/BrancheOnes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrancheOne(int id, BrancheOne brancheOne)
        {
            if (id != brancheOne.Id)
            {
                return BadRequest();
            }

            _context.Entry(brancheOne).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrancheOneExists(id))
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

        // POST: api/BrancheOnes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BrancheOne>> PostBrancheOne(BrancheOne brancheOne)
        {
            _context.brancheOnes.Add(brancheOne);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBrancheOne", new { id = brancheOne.Id }, brancheOne);
        }

        // DELETE: api/BrancheOnes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BrancheOne>> DeleteBrancheOne(int id)
        {
            var brancheOne = await _context.brancheOnes.FindAsync(id);
            if (brancheOne == null)
            {
                return NotFound();
            }

            _context.brancheOnes.Remove(brancheOne);
            await _context.SaveChangesAsync();

            return brancheOne;
        }

        private bool BrancheOneExists(int id)
        {
            return _context.brancheOnes.Any(e => e.Id == id);
        }
    }
}
