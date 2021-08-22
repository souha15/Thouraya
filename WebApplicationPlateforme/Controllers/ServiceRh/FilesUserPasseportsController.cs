using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesUserPasseportsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesUserPasseportsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesUserPasseports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesUserPasseport>>> GetfilesUserPasseports()
        {
            return await _context.filesUserPasseports.ToListAsync();
        }

        // GET: api/FilesUserPasseports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesUserPasseport>> GetFilesUserPasseport(int id)
        {
            var filesUserPasseport = await _context.filesUserPasseports.FindAsync(id);

            if (filesUserPasseport == null)
            {
                return NotFound();
            }

            return filesUserPasseport;
        }

        // PUT: api/FilesUserPasseports/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesUserPasseport(int id, FilesUserPasseport filesUserPasseport)
        {
            if (id != filesUserPasseport.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesUserPasseport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesUserPasseportExists(id))
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

        // POST: api/FilesUserPasseports
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesUserPasseport>> PostFilesUserPasseport(FilesUserPasseport filesUserPasseport)
        {
            _context.filesUserPasseports.Add(filesUserPasseport);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesUserPasseport", new { id = filesUserPasseport.Id }, filesUserPasseport);
        }

        // DELETE: api/FilesUserPasseports/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesUserPasseport>> DeleteFilesUserPasseport(int id)
        {
            var filesUserPasseport = await _context.filesUserPasseports.FindAsync(id);
            if (filesUserPasseport == null)
            {
                return NotFound();
            }

            _context.filesUserPasseports.Remove(filesUserPasseport);
            await _context.SaveChangesAsync();

            return filesUserPasseport;
        }

        private bool FilesUserPasseportExists(int id)
        {
            return _context.filesUserPasseports.Any(e => e.Id == id);
        }
    }
}
