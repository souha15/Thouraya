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
    public class FilesUserCinsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesUserCinsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesUserCins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesUserCin>>> GetfilesUserCins()
        {
            return await _context.filesUserCins.ToListAsync();
        }

        // GET: api/FilesUserCins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesUserCin>> GetFilesUserCin(int id)
        {
            var filesUserCin = await _context.filesUserCins.FindAsync(id);

            if (filesUserCin == null)
            {
                return NotFound();
            }

            return filesUserCin;
        }

        // PUT: api/FilesUserCins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesUserCin(int id, FilesUserCin filesUserCin)
        {
            if (id != filesUserCin.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesUserCin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesUserCinExists(id))
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

        // POST: api/FilesUserCins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesUserCin>> PostFilesUserCin(FilesUserCin filesUserCin)
        {
            _context.filesUserCins.Add(filesUserCin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesUserCin", new { id = filesUserCin.Id }, filesUserCin);
        }

        // DELETE: api/FilesUserCins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesUserCin>> DeleteFilesUserCin(int id)
        {
            var filesUserCin = await _context.filesUserCins.FindAsync(id);
            if (filesUserCin == null)
            {
                return NotFound();
            }

            _context.filesUserCins.Remove(filesUserCin);
            await _context.SaveChangesAsync();

            return filesUserCin;
        }

        private bool FilesUserCinExists(int id)
        {
            return _context.filesUserCins.Any(e => e.Id == id);
        }
    }
}
