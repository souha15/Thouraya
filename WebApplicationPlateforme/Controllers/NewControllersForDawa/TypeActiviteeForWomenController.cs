using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ActivitePart;

namespace WebApplicationPlateforme.Controllers.NewControllersForDawa
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeActiviteeForWomenController : ControllerBase
    {
        private readonly DawaaContext _context;

        public TypeActiviteeForWomenController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/TypeActiviteeForWomen
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeActiviteeForWomen>>> GetTypeActiviteeForWomens()
        {
            return await _context.TypeActiviteeForWomens.ToListAsync();
        }

        // GET: api/TypeActiviteeForWomen/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeActiviteeForWomen>> GetTypeActiviteeForWomen(int id)
        {
            var typeActiviteeForWomen = await _context.TypeActiviteeForWomens.FindAsync(id);

            if (typeActiviteeForWomen == null)
            {
                return NotFound();
            }

            return typeActiviteeForWomen;
        }

        // PUT: api/TypeActiviteeForWomen/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeActiviteeForWomen(int id, TypeActiviteeForWomen typeActiviteeForWomen)
        {
            if (id != typeActiviteeForWomen.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeActiviteeForWomen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeActiviteeForWomenExists(id))
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

        // POST: api/TypeActiviteeForWomen
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeActiviteeForWomen>> PostTypeActiviteeForWomen(TypeActiviteeForWomen typeActiviteeForWomen)
        {
            _context.TypeActiviteeForWomens.Add(typeActiviteeForWomen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeActiviteeForWomen", new { id = typeActiviteeForWomen.Id }, typeActiviteeForWomen);
        }

        // DELETE: api/TypeActiviteeForWomen/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeActiviteeForWomen>> DeleteTypeActiviteeForWomen(int id)
        {
            var typeActiviteeForWomen = await _context.TypeActiviteeForWomens.FindAsync(id);
            if (typeActiviteeForWomen == null)
            {
                return NotFound();
            }

            _context.TypeActiviteeForWomens.Remove(typeActiviteeForWomen);
            await _context.SaveChangesAsync();

            return typeActiviteeForWomen;
        }

        private bool TypeActiviteeForWomenExists(int id)
        {
            return _context.TypeActiviteeForWomens.Any(e => e.Id == id);
        }
    }
}
