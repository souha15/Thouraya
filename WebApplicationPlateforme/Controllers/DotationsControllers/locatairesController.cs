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
    public class locatairesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public locatairesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/locataires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<locataire>>> Getlocataires()
        {
            return await _context.locataires.ToListAsync();
        }

        // GET: api/locataires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<locataire>> Getlocataire(int id)
        {
            var locataire = await _context.locataires.FindAsync(id);

            if (locataire == null)
            {
                return NotFound();
            }

            return locataire;
        }

        // PUT: api/locataires/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putlocataire(int id, locataire locataire)
        {
            if (id != locataire.Id)
            {
                return BadRequest();
            }

            _context.Entry(locataire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!locataireExists(id))
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

        // POST: api/locataires
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<locataire>> Postlocataire(locataire locataire)
        {
            _context.locataires.Add(locataire);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getlocataire", new { id = locataire.Id }, locataire);
        }

        // DELETE: api/locataires/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<locataire>> Deletelocataire(int id)
        {
            var locataire = await _context.locataires.FindAsync(id);
            if (locataire == null)
            {
                return NotFound();
            }

            _context.locataires.Remove(locataire);
            await _context.SaveChangesAsync();

            return locataire;
        }

        private bool locataireExists(int id)
        {
            return _context.locataires.Any(e => e.Id == id);
        }
    }
}
