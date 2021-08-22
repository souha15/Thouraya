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
    public class PlaintsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PlaintsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Plaints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plaint>>> Getplaints()
        {
            return await _context.plaints.ToListAsync();
        }

        // GET: api/Plaints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plaint>> GetPlaint(int id)
        {
            var plaint = await _context.plaints.FindAsync(id);

            if (plaint == null)
            {
                return NotFound();
            }

            return plaint;
        }

        // PUT: api/Plaints/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaint(int id, Plaint plaint)
        {
            if (id != plaint.Id)
            {
                return BadRequest();
            }

            _context.Entry(plaint).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaintExists(id))
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

        // POST: api/Plaints
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Plaint>> PostPlaint(Plaint plaint)
        {
            _context.plaints.Add(plaint);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlaint", new { id = plaint.Id }, plaint);
        }

        // DELETE: api/Plaints/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Plaint>> DeletePlaint(int id)
        {
            var plaint = await _context.plaints.FindAsync(id);
            if (plaint == null)
            {
                return NotFound();
            }

            _context.plaints.Remove(plaint);
            await _context.SaveChangesAsync();

            return plaint;
        }

        private bool PlaintExists(int id)
        {
            return _context.plaints.Any(e => e.Id == id);
        }
    }
}
