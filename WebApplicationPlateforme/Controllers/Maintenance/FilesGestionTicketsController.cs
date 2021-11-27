using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.GestionDestTickets;

namespace WebApplicationPlateforme.Controllers.Maintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesGestionTicketsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public FilesGestionTicketsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/FilesGestionTickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesGestionTickets>>> GetFilesGestionTickets()
        {
            return await _context.FilesGestionTickets.ToListAsync();
        }

        // GET: api/FilesGestionTickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesGestionTickets>> GetFilesGestionTickets(int id)
        {
            var filesGestionTickets = await _context.FilesGestionTickets.FindAsync(id);

            if (filesGestionTickets == null)
            {
                return NotFound();
            }

            return filesGestionTickets;
        }

        // PUT: api/FilesGestionTickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesGestionTickets(int id, FilesGestionTickets filesGestionTickets)
        {
            if (id != filesGestionTickets.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesGestionTickets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesGestionTicketsExists(id))
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

        // POST: api/FilesGestionTickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesGestionTickets>> PostFilesGestionTickets(FilesGestionTickets filesGestionTickets)
        {
            _context.FilesGestionTickets.Add(filesGestionTickets);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesGestionTickets", new { id = filesGestionTickets.Id }, filesGestionTickets);
        }

        // DELETE: api/FilesGestionTickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesGestionTickets>> DeleteFilesGestionTickets(int id)
        {
            var filesGestionTickets = await _context.FilesGestionTickets.FindAsync(id);
            if (filesGestionTickets == null)
            {
                return NotFound();
            }

            _context.FilesGestionTickets.Remove(filesGestionTickets);
            await _context.SaveChangesAsync();

            return filesGestionTickets;
        }

        private bool FilesGestionTicketsExists(int id)
        {
            return _context.FilesGestionTickets.Any(e => e.Id == id);
        }
    }
}
