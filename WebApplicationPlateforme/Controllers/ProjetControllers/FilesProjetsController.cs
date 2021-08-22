using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Projets;

namespace WebApplicationPlateforme.Controllers.ProjetControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesProjetsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesProjetsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesProjets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesProjet>>> GetfilesProjets()
        {
            return await _context.filesProjets.ToListAsync();
        }

        // GET: api/FilesProjets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesProjet>> GetFilesProjet(int id)
        {
            var filesProjet = await _context.filesProjets.FindAsync(id);

            if (filesProjet == null)
            {
                return NotFound();
            }

            return filesProjet;
        }

        // PUT: api/FilesProjets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesProjet(int id, FilesProjet filesProjet)
        {
            if (id != filesProjet.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesProjet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesProjetExists(id))
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

        // POST: api/FilesProjets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesProjet>> PostFilesProjet(FilesProjet filesProjet)
        {
            _context.filesProjets.Add(filesProjet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesProjet", new { id = filesProjet.Id }, filesProjet);
        }

        // DELETE: api/FilesProjets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesProjet>> DeleteFilesProjet(int id)
        {
            var filesProjet = await _context.filesProjets.FindAsync(id);
            if (filesProjet == null)
            {
                return NotFound();
            }

            _context.filesProjets.Remove(filesProjet);
            await _context.SaveChangesAsync();

            return filesProjet;
        }

        private bool FilesProjetExists(int id)
        {
            return _context.filesProjets.Any(e => e.Id == id);
        }
    }
}
