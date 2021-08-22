using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServiceRh;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class newFormationRequestsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public newFormationRequestsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/newFormationRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<newFormationRequest>>> GetnewFormationRequests()
        {
            return await _context.newFormationRequests.ToListAsync();
        }

        // GET: api/newFormationRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<newFormationRequest>> GetnewFormationRequest(int id)
        {
            var newFormationRequest = await _context.newFormationRequests.FindAsync(id);

            if (newFormationRequest == null)
            {
                return NotFound();
            }

            return newFormationRequest;
        }

        // PUT: api/newFormationRequests/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutnewFormationRequest(int id, newFormationRequest newFormationRequest)
        {
            if (id != newFormationRequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(newFormationRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!newFormationRequestExists(id))
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

        // POST: api/newFormationRequests
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<newFormationRequest>> PostnewFormationRequest(newFormationRequest newFormationRequest)
        {
            _context.newFormationRequests.Add(newFormationRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetnewFormationRequest", new { id = newFormationRequest.Id }, newFormationRequest);
        }

        // DELETE: api/newFormationRequests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<newFormationRequest>> DeletenewFormationRequest(int id)
        {
            var newFormationRequest = await _context.newFormationRequests.FindAsync(id);
            if (newFormationRequest == null)
            {
                return NotFound();
            }

            _context.newFormationRequests.Remove(newFormationRequest);
            await _context.SaveChangesAsync();

            return newFormationRequest;
        }

        private bool newFormationRequestExists(int id)
        {
            return _context.newFormationRequests.Any(e => e.Id == id);
        }
    }
}
