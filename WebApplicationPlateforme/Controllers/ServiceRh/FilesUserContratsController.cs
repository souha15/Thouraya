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
    public class FilesUserContratsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesUserContratsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesUserContrats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesUserContrat>>> GetfilesUserContrats()
        {
            return await _context.filesUserContrats.ToListAsync();
        }

        // GET: api/FilesUserContrats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesUserContrat>> GetFilesUserContrat(int id)
        {
            var filesUserContrat = await _context.filesUserContrats.FindAsync(id);

            if (filesUserContrat == null)
            {
                return NotFound();
            }

            return filesUserContrat;
        }

        // PUT: api/FilesUserContrats/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesUserContrat(int id, FilesUserContrat filesUserContrat)
        {
            if (id != filesUserContrat.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesUserContrat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesUserContratExists(id))
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

        // POST: api/FilesUserContrats
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesUserContrat>> PostFilesUserContrat(FilesUserContrat filesUserContrat)
        {
            _context.filesUserContrats.Add(filesUserContrat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesUserContrat", new { id = filesUserContrat.Id }, filesUserContrat);
        }

        // DELETE: api/FilesUserContrats/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesUserContrat>> DeleteFilesUserContrat(int id)
        {
            var filesUserContrat = await _context.filesUserContrats.FindAsync(id);
            if (filesUserContrat == null)
            {
                return NotFound();
            }

            _context.filesUserContrats.Remove(filesUserContrat);
            await _context.SaveChangesAsync();

            return filesUserContrat;
        }

        private bool FilesUserContratExists(int id)
        {
            return _context.filesUserContrats.Any(e => e.Id == id);
        }
    }
}
