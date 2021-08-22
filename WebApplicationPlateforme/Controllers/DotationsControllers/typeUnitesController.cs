using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Dotations;

namespace WebApplicationPlateforme.Controllers.DotationsControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class typeUnitesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public typeUnitesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/typeUnites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<typeUnite>>> GettypeUnites()
        {
            return await _context.typeUnites.ToListAsync();
        }

        // GET: api/typeUnites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<typeUnite>> GettypeUnite(int id)
        {
            var typeUnite = await _context.typeUnites.FindAsync(id);

            if (typeUnite == null)
            {
                return NotFound();
            }

            return typeUnite;
        }

        // PUT: api/typeUnites/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PuttypeUnite(int id, typeUnite typeUnite)
        {
            if (id != typeUnite.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeUnite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!typeUniteExists(id))
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

        // POST: api/typeUnites
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<typeUnite>> PosttypeUnite(typeUnite typeUnite)
        {
            _context.typeUnites.Add(typeUnite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GettypeUnite", new { id = typeUnite.Id }, typeUnite);
        }

        // DELETE: api/typeUnites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<typeUnite>> DeletetypeUnite(int id)
        {
            var typeUnite = await _context.typeUnites.FindAsync(id);
            if (typeUnite == null)
            {
                return NotFound();
            }

            _context.typeUnites.Remove(typeUnite);
            await _context.SaveChangesAsync();

            return typeUnite;
        }

        private bool typeUniteExists(int id)
        {
            return _context.typeUnites.Any(e => e.Id == id);
        }
    }
}
