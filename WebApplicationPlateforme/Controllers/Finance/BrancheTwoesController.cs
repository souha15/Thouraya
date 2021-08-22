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
    public class BrancheTwoesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public BrancheTwoesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/BrancheTwoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrancheTwo>>> GetbrancheTwos()
        {
            return await _context.brancheTwos.ToListAsync();
        }

        // GET: api/BrancheTwoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BrancheTwo>> GetBrancheTwo(int id)
        {
            var brancheTwo = await _context.brancheTwos.FindAsync(id);

            if (brancheTwo == null)
            {
                return NotFound();
            }

            return brancheTwo;
        }

        // PUT: api/BrancheTwoes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrancheTwo(int id, BrancheTwo brancheTwo)
        {
            if (id != brancheTwo.Id)
            {
                return BadRequest();
            }

            _context.Entry(brancheTwo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrancheTwoExists(id))
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

        // POST: api/BrancheTwoes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BrancheTwo>> PostBrancheTwo(BrancheTwo brancheTwo)
        {
            _context.brancheTwos.Add(brancheTwo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBrancheTwo", new { id = brancheTwo.Id }, brancheTwo);
        }

        // DELETE: api/BrancheTwoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BrancheTwo>> DeleteBrancheTwo(int id)
        {
            var brancheTwo = await _context.brancheTwos.FindAsync(id);
            if (brancheTwo == null)
            {
                return NotFound();
            }

            _context.brancheTwos.Remove(brancheTwo);
            await _context.SaveChangesAsync();

            return brancheTwo;
        }

        private bool BrancheTwoExists(int id)
        {
            return _context.brancheTwos.Any(e => e.Id == id);
        }
    }
}
