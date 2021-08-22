using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProprietairesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ProprietairesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Proprietaires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Proprietaire>>> Getproprietaires()
        {
            return await _context.proprietaires.ToListAsync();
        }

        // GET: api/Proprietaires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Proprietaire>> GetProprietaire(int id)
        {
            var proprietaire = await _context.proprietaires.FindAsync(id);

            if (proprietaire == null)
            {
                return NotFound();
            }

            return proprietaire;
        }

        // PUT: api/Proprietaires/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProprietaire(int id, Proprietaire proprietaire)
        {
            if (id != proprietaire.Id)
            {
                return BadRequest();
            }

            _context.Entry(proprietaire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProprietaireExists(id))
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

        // POST: api/Proprietaires
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Proprietaire>> PostProprietaire(Proprietaire proprietaire)
        {
            _context.proprietaires.Add(proprietaire);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProprietaire", new { id = proprietaire.Id }, proprietaire);
        }

        // DELETE: api/Proprietaires/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Proprietaire>> DeleteProprietaire(int id)
        {
            var proprietaire = await _context.proprietaires.FindAsync(id);
            if (proprietaire == null)
            {
                return NotFound();
            }

            _context.proprietaires.Remove(proprietaire);
            await _context.SaveChangesAsync();

            return proprietaire;
        }

        private bool ProprietaireExists(int id)
        {
            return _context.proprietaires.Any(e => e.Id == id);
        }
    }
}
