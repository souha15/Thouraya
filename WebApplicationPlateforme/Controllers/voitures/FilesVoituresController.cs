using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.voitures;

namespace WebApplicationPlateforme.Controllers.voitures
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesVoituresController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesVoituresController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesVoitures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesVoiture>>> GetfilesVoitures()
        {
            return await _context.filesVoitures.ToListAsync();
        }

        // GET: api/FilesVoitures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesVoiture>> GetFilesVoiture(int id)
        {
            var filesVoiture = await _context.filesVoitures.FindAsync(id);

            if (filesVoiture == null)
            {
                return NotFound();
            }

            return filesVoiture;
        }

        // PUT: api/FilesVoitures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesVoiture(int id, FilesVoiture filesVoiture)
        {
            if (id != filesVoiture.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesVoiture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesVoitureExists(id))
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

        // POST: api/FilesVoitures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesVoiture>> PostFilesVoiture(FilesVoiture filesVoiture)
        {
            _context.filesVoitures.Add(filesVoiture);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesVoiture", new { id = filesVoiture.Id }, filesVoiture);
        }

        // DELETE: api/FilesVoitures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesVoiture>> DeleteFilesVoiture(int id)
        {
            var filesVoiture = await _context.filesVoitures.FindAsync(id);
            if (filesVoiture == null)
            {
                return NotFound();
            }

            _context.filesVoitures.Remove(filesVoiture);
            await _context.SaveChangesAsync();

            return filesVoiture;
        }

        private bool FilesVoitureExists(int id)
        {
            return _context.filesVoitures.Any(e => e.Id == id);
        }
    }
}
