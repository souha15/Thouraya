using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.FinancePartTwo.Comptes;

namespace WebApplicationPlateforme.Controllers.FinancePartTwo
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesEtatComptesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesEtatComptesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesEtatComptes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesEtatCompte>>> GetfilesEtatComptes()
        {
            return await _context.filesEtatComptes.ToListAsync();
        }

        // GET: api/FilesEtatComptes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesEtatCompte>> GetFilesEtatCompte(int id)
        {
            var filesEtatCompte = await _context.filesEtatComptes.FindAsync(id);

            if (filesEtatCompte == null)
            {
                return NotFound();
            }

            return filesEtatCompte;
        }

        // PUT: api/FilesEtatComptes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesEtatCompte(int id, FilesEtatCompte filesEtatCompte)
        {
            if (id != filesEtatCompte.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesEtatCompte).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesEtatCompteExists(id))
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

        // POST: api/FilesEtatComptes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesEtatCompte>> PostFilesEtatCompte(FilesEtatCompte filesEtatCompte)
        {
            _context.filesEtatComptes.Add(filesEtatCompte);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesEtatCompte", new { id = filesEtatCompte.Id }, filesEtatCompte);
        }

        // DELETE: api/FilesEtatComptes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesEtatCompte>> DeleteFilesEtatCompte(int id)
        {
            var filesEtatCompte = await _context.filesEtatComptes.FindAsync(id);
            if (filesEtatCompte == null)
            {
                return NotFound();
            }

            _context.filesEtatComptes.Remove(filesEtatCompte);
            await _context.SaveChangesAsync();

            return filesEtatCompte;
        }

        private bool FilesEtatCompteExists(int id)
        {
            return _context.filesEtatComptes.Any(e => e.Id == id);
        }
    }
}
