using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Orphelin;

namespace WebApplicationPlateforme.Controllers.OrphelinGestion
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesOrphelinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesOrphelinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesOrphelins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesOrphelin>>> GetFilesOrphelins()
        {
            return await _context.FilesOrphelins.ToListAsync();
        }

        // GET: api/FilesOrphelins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesOrphelin>> GetFilesOrphelin(int id)
        {
            var filesOrphelin = await _context.FilesOrphelins.FindAsync(id);

            if (filesOrphelin == null)
            {
                return NotFound();
            }

            return filesOrphelin;
        }

        // PUT: api/FilesOrphelins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesOrphelin(int id, FilesOrphelin filesOrphelin)
        {
            if (id != filesOrphelin.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesOrphelin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesOrphelinExists(id))
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

        // POST: api/FilesOrphelins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesOrphelin>> PostFilesOrphelin(FilesOrphelin filesOrphelin)
        {
            _context.FilesOrphelins.Add(filesOrphelin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesOrphelin", new { id = filesOrphelin.Id }, filesOrphelin);
        }

        // DELETE: api/FilesOrphelins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesOrphelin>> DeleteFilesOrphelin(int id)
        {
            var filesOrphelin = await _context.FilesOrphelins.FindAsync(id);
            if (filesOrphelin == null)
            {
                return NotFound();
            }

            _context.FilesOrphelins.Remove(filesOrphelin);
            await _context.SaveChangesAsync();

            return filesOrphelin;
        }

        private bool FilesOrphelinExists(int id)
        {
            return _context.FilesOrphelins.Any(e => e.Id == id);
        }
    }
}
