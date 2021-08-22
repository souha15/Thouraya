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
    public class PrivelegesRequestsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PrivelegesRequestsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PrivelegesRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrivelegesRequests>>> GetprivelegesRequests()
        {
            return await _context.privelegesRequests.ToListAsync();
        }

        // GET: api/PrivelegesRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PrivelegesRequests>> GetPrivelegesRequests(int id)
        {
            var privelegesRequests = await _context.privelegesRequests.FindAsync(id);

            if (privelegesRequests == null)
            {
                return NotFound();
            }

            return privelegesRequests;
        }

        // PUT: api/PrivelegesRequests/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrivelegesRequests(int id, PrivelegesRequests privelegesRequests)
        {
            if (id != privelegesRequests.Id)
            {
                return BadRequest();
            }

            _context.Entry(privelegesRequests).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrivelegesRequestsExists(id))
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

        // POST: api/PrivelegesRequests
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PrivelegesRequests>> PostPrivelegesRequests(PrivelegesRequests privelegesRequests)
        {
            _context.privelegesRequests.Add(privelegesRequests);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrivelegesRequests", new { id = privelegesRequests.Id }, privelegesRequests);
        }

        // DELETE: api/PrivelegesRequests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PrivelegesRequests>> DeletePrivelegesRequests(int id)
        {
            var privelegesRequests = await _context.privelegesRequests.FindAsync(id);
            if (privelegesRequests == null)
            {
                return NotFound();
            }

            _context.privelegesRequests.Remove(privelegesRequests);
            await _context.SaveChangesAsync();

            return privelegesRequests;
        }

        private bool PrivelegesRequestsExists(int id)
        {
            return _context.privelegesRequests.Any(e => e.Id == id);
        }
    }
}
