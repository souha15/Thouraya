using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Maintenance;

namespace WebApplicationPlateforme.Controllers.Maintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesTicketsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesTicketsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesTickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesTickets>>> GetfilesTickets()
        {
            return await _context.filesTickets.ToListAsync();
        }

        // GET: api/FilesTickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesTickets>> GetFilesTickets(int id)
        {
            var filesTickets = await _context.filesTickets.FindAsync(id);

            if (filesTickets == null)
            {
                return NotFound();
            }

            return filesTickets;
        }

        // PUT: api/FilesTickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesTickets(int id, FilesTickets filesTickets)
        {
            if (id != filesTickets.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesTickets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesTicketsExists(id))
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

        // POST: api/FilesTickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesTickets>> PostFilesTickets(FilesTickets filesTickets)
        {
            _context.filesTickets.Add(filesTickets);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesTickets", new { id = filesTickets.Id }, filesTickets);
        }

        // DELETE: api/FilesTickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesTickets>> DeleteFilesTickets(int id)
        {
            var filesTickets = await _context.filesTickets.FindAsync(id);
            if (filesTickets == null)
            {
                return NotFound();
            }

            _context.filesTickets.Remove(filesTickets);
            await _context.SaveChangesAsync();

            return filesTickets;
        }

        private bool FilesTicketsExists(int id)
        {
            return _context.filesTickets.Any(e => e.Id == id);
        }
    }
}
