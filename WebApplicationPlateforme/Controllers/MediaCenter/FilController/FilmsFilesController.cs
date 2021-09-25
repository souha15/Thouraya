using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.FilmPart;

namespace WebApplicationPlateforme.Controllers.MediaCenter.FilController
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsFilesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilmsFilesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilmsFiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilmsFiles>>> GetFilmsFiles()
        {
            return await _context.FilmsFiles.ToListAsync();
        }

        // GET: api/FilmsFiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilmsFiles>> GetFilmsFiles(int id)
        {
            var filmsFiles = await _context.FilmsFiles.FindAsync(id);

            if (filmsFiles == null)
            {
                return NotFound();
            }

            return filmsFiles;
        }

        // PUT: api/FilmsFiles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilmsFiles(int id, FilmsFiles filmsFiles)
        {
            if (id != filmsFiles.Id)
            {
                return BadRequest();
            }

            _context.Entry(filmsFiles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilmsFilesExists(id))
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

        // POST: api/FilmsFiles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilmsFiles>> PostFilmsFiles(FilmsFiles filmsFiles)
        {
            _context.FilmsFiles.Add(filmsFiles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilmsFiles", new { id = filmsFiles.Id }, filmsFiles);
        }

        // DELETE: api/FilmsFiles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilmsFiles>> DeleteFilmsFiles(int id)
        {
            var filmsFiles = await _context.FilmsFiles.FindAsync(id);
            if (filmsFiles == null)
            {
                return NotFound();
            }

            _context.FilmsFiles.Remove(filmsFiles);
            await _context.SaveChangesAsync();

            return filmsFiles;
        }

        private bool FilmsFilesExists(int id)
        {
            return _context.FilmsFiles.Any(e => e.Id == id);
        }
    }
}
