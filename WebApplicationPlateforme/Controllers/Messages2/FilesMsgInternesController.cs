using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Msg_Interne;

namespace WebApplicationPlateforme.Controllers.Messages2
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesMsgInternesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesMsgInternesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesMsgInternes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesMsgInterne>>> GetfilesMsgInternes()
        {
            return await _context.filesMsgInternes.ToListAsync();
        }

        // GET: api/FilesMsgInternes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesMsgInterne>> GetFilesMsgInterne(int id)
        {
            var filesMsgInterne = await _context.filesMsgInternes.FindAsync(id);

            if (filesMsgInterne == null)
            {
                return NotFound();
            }

            return filesMsgInterne;
        }

        // PUT: api/FilesMsgInternes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesMsgInterne(int id, FilesMsgInterne filesMsgInterne)
        {
            if (id != filesMsgInterne.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesMsgInterne).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesMsgInterneExists(id))
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

        // POST: api/FilesMsgInternes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesMsgInterne>> PostFilesMsgInterne(FilesMsgInterne filesMsgInterne)
        {
            _context.filesMsgInternes.Add(filesMsgInterne);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesMsgInterne", new { id = filesMsgInterne.Id }, filesMsgInterne);
        }

        // DELETE: api/FilesMsgInternes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesMsgInterne>> DeleteFilesMsgInterne(int id)
        {
            var filesMsgInterne = await _context.filesMsgInternes.FindAsync(id);
            if (filesMsgInterne == null)
            {
                return NotFound();
            }

            _context.filesMsgInternes.Remove(filesMsgInterne);
            await _context.SaveChangesAsync();

            return filesMsgInterne;
        }

        private bool FilesMsgInterneExists(int id)
        {
            return _context.filesMsgInternes.Any(e => e.Id == id);
        }
    }
}
