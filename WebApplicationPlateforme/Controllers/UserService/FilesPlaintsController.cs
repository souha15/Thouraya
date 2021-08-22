using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.User_Services;

namespace WebApplicationPlateforme.Controllers.UserService
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesPlaintsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesPlaintsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesPlaints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesPlaint>>> GetfilesPlaints()
        {
            return await _context.filesPlaints.ToListAsync();
        }

        // GET: api/FilesPlaints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesPlaint>> GetFilesPlaint(int id)
        {
            var filesPlaint = await _context.filesPlaints.FindAsync(id);

            if (filesPlaint == null)
            {
                return NotFound();
            }

            return filesPlaint;
        }

        // PUT: api/FilesPlaints/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesPlaint(int id, FilesPlaint filesPlaint)
        {
            if (id != filesPlaint.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesPlaint).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesPlaintExists(id))
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

        // POST: api/FilesPlaints
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesPlaint>> PostFilesPlaint(FilesPlaint filesPlaint)
        {
            _context.filesPlaints.Add(filesPlaint);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesPlaint", new { id = filesPlaint.Id }, filesPlaint);
        }

        // DELETE: api/FilesPlaints/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesPlaint>> DeleteFilesPlaint(int id)
        {
            var filesPlaint = await _context.filesPlaints.FindAsync(id);
            if (filesPlaint == null)
            {
                return NotFound();
            }

            _context.filesPlaints.Remove(filesPlaint);
            await _context.SaveChangesAsync();

            return filesPlaint;
        }

        private bool FilesPlaintExists(int id)
        {
            return _context.filesPlaints.Any(e => e.Id == id);
        }
    }
}
