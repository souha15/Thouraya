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
    public class CommentsTicketFilesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public CommentsTicketFilesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/CommentsTicketFiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentsTicketFiles>>> GetCommentsTicketFiles()
        {
            return await _context.CommentsTicketFiles.ToListAsync();
        }

        // GET: api/CommentsTicketFiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentsTicketFiles>> GetCommentsTicketFiles(int id)
        {
            var commentsTicketFiles = await _context.CommentsTicketFiles.FindAsync(id);

            if (commentsTicketFiles == null)
            {
                return NotFound();
            }

            return commentsTicketFiles;
        }

        // PUT: api/CommentsTicketFiles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommentsTicketFiles(int id, CommentsTicketFiles commentsTicketFiles)
        {
            if (id != commentsTicketFiles.Id)
            {
                return BadRequest();
            }

            _context.Entry(commentsTicketFiles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentsTicketFilesExists(id))
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

        // POST: api/CommentsTicketFiles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CommentsTicketFiles>> PostCommentsTicketFiles(CommentsTicketFiles commentsTicketFiles)
        {
            _context.CommentsTicketFiles.Add(commentsTicketFiles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommentsTicketFiles", new { id = commentsTicketFiles.Id }, commentsTicketFiles);
        }

        // DELETE: api/CommentsTicketFiles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CommentsTicketFiles>> DeleteCommentsTicketFiles(int id)
        {
            var commentsTicketFiles = await _context.CommentsTicketFiles.FindAsync(id);
            if (commentsTicketFiles == null)
            {
                return NotFound();
            }

            _context.CommentsTicketFiles.Remove(commentsTicketFiles);
            await _context.SaveChangesAsync();

            return commentsTicketFiles;
        }

        private bool CommentsTicketFilesExists(int id)
        {
            return _context.CommentsTicketFiles.Any(e => e.Id == id);
        }
    }
}
