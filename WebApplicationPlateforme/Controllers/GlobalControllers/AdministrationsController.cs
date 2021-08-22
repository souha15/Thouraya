using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Global;

namespace WebApplicationPlateforme.Controllers.GlobalControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministrationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdministrationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Administrations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Administration>>> Getadministrations()
        {
            return await _context.administrations.ToListAsync();
        }

        // GET: api/Administrations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Administration>> GetAdministration(int? id)
        {
            var administration = await _context.administrations.FindAsync(id);

            if (administration == null)
            {
                return NotFound();
            }

            return administration;
        }

        // PUT: api/Administrations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdministration(int? id, Administration administration)
        {
            if (id != administration.Id)
            {
                return BadRequest();
            }

            _context.Entry(administration).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdministrationExists(id))
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

        // POST: api/Administrations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Administration>> PostAdministration(Administration administration)
        {
            _context.administrations.Add(administration);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdministration", new { id = administration.Id }, administration);
        }

        // DELETE: api/Administrations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Administration>> DeleteAdministration(int? id)
        {
            var administration = await _context.administrations.FindAsync(id);
            if (administration == null)
            {
                return NotFound();
            }

            _context.administrations.Remove(administration);
            await _context.SaveChangesAsync();

            return administration;
        }

        private bool AdministrationExists(int? id)
        {
            return _context.administrations.Any(e => e.Id == id);
        }
    }
}
