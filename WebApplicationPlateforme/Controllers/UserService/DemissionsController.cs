using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.User_Services;

namespace WebApplicationPlateforme.Controllers.UserService
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemissionsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DemissionsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Demissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Demission>>> Getdemissions()
        {
            return await _context.demissions.ToListAsync();
        }

        // GET: api/Demissions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Demission>> GetDemission(int id)
        {
            var demission = await _context.demissions.FindAsync(id);

            if (demission == null)
            {
                return NotFound();
            }

            return demission;
        }

        // PUT: api/Demissions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemission(int id, Demission demission)
        {
            if (id != demission.Id)
            {
                return BadRequest();
            }

            _context.Entry(demission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemissionExists(id))
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

        // POST: api/Demissions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Demission>> PostDemission(Demission demission)
        {
            _context.demissions.Add(demission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDemission", new { id = demission.Id }, demission);
        }

        // DELETE: api/Demissions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Demission>> DeleteDemission(int id)
        {
            var demission = await _context.demissions.FindAsync(id);
            if (demission == null)
            {
                return NotFound();
            }

            _context.demissions.Remove(demission);
            await _context.SaveChangesAsync();

            return demission;
        }

        private bool DemissionExists(int id)
        {
            return _context.demissions.Any(e => e.Id == id);
        }
    }
}
