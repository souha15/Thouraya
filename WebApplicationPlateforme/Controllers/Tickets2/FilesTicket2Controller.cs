using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ticket;

namespace WebApplicationPlateforme.Controllers.Tickets2
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesTicket2Controller : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesTicket2Controller(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesTicket2
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesTicket2>>> GetFilesTickets()
        {
            return await _context.FilesTickets.ToListAsync();
        }

        // GET: api/FilesTicket2/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesTicket2>> GetFilesTicket2(int id)
        {
            var filesTicket2 = await _context.FilesTickets.FindAsync(id);

            if (filesTicket2 == null)
            {
                return NotFound();
            }

            return filesTicket2;
        }

        // PUT: api/FilesTicket2/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesTicket2(int id, FilesTicket2 filesTicket2)
        {
            if (id != filesTicket2.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesTicket2).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesTicket2Exists(id))
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

        // POST: api/FilesTicket2
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesTicket2>> PostFilesTicket2(FilesTicket2 filesTicket2)
        {
            _context.FilesTickets.Add(filesTicket2);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesTicket2", new { id = filesTicket2.Id }, filesTicket2);
        }

        // DELETE: api/FilesTicket2/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesTicket2>> DeleteFilesTicket2(int id)
        {
            var filesTicket2 = await _context.FilesTickets.FindAsync(id);
            if (filesTicket2 == null)
            {
                return NotFound();
            }

            _context.FilesTickets.Remove(filesTicket2);
            await _context.SaveChangesAsync();

            return filesTicket2;
        }

        private bool FilesTicket2Exists(int id)
        {
            return _context.FilesTickets.Any(e => e.Id == id);
        }
    }
}
