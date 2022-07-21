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
    public class TypeDetailsActivitesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeDetailsActivitesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeDetailsActivites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeDetailsActivite>>> GetTypeDetailsActivites()
        {
            return await _context.TypeDetailsActivites.ToListAsync();
        }

        // GET: api/TypeDetailsActivites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeDetailsActivite>> GetTypeDetailsActivite(int id)
        {
            var typeDetailsActivite = await _context.TypeDetailsActivites.FindAsync(id);

            if (typeDetailsActivite == null)
            {
                return NotFound();
            }

            return typeDetailsActivite;
        }

        // PUT: api/TypeDetailsActivites/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeDetailsActivite(int id, TypeDetailsActivite typeDetailsActivite)
        {
            if (id != typeDetailsActivite.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeDetailsActivite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeDetailsActiviteExists(id))
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

        // POST: api/TypeDetailsActivites
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeDetailsActivite>> PostTypeDetailsActivite(TypeDetailsActivite typeDetailsActivite)
        {
            _context.TypeDetailsActivites.Add(typeDetailsActivite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeDetailsActivite", new { id = typeDetailsActivite.Id }, typeDetailsActivite);
        }

        // DELETE: api/TypeDetailsActivites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeDetailsActivite>> DeleteTypeDetailsActivite(int id)
        {
            var typeDetailsActivite = await _context.TypeDetailsActivites.FindAsync(id);
            if (typeDetailsActivite == null)
            {
                return NotFound();
            }

            _context.TypeDetailsActivites.Remove(typeDetailsActivite);
            await _context.SaveChangesAsync();

            return typeDetailsActivite;
        }

        private bool TypeDetailsActiviteExists(int id)
        {
            return _context.TypeDetailsActivites.Any(e => e.Id == id);
        }
    }
}
