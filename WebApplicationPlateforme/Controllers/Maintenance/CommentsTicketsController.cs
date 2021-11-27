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
    public class CommentsTicketsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public CommentsTicketsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/CommentsTickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentsTickets>>> GetCommentsTickets()
        {
            return await _context.CommentsTickets.ToListAsync();
        }

        // GET: api/CommentsTickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentsTickets>> GetCommentsTickets(int id)
        {
            var commentsTickets = await _context.CommentsTickets.FindAsync(id);

            if (commentsTickets == null)
            {
                return NotFound();
            }

            return commentsTickets;
        }

        // PUT: api/CommentsTickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommentsTickets(int id, CommentsTickets commentsTickets)
        {
            if (id != commentsTickets.Id)
            {
                return BadRequest();
            }

            _context.Entry(commentsTickets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentsTicketsExists(id))
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

        // POST: api/CommentsTickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CommentsTickets>> PostCommentsTickets(CommentsTickets commentsTickets)
        {
            _context.CommentsTickets.Add(commentsTickets);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommentsTickets", new { id = commentsTickets.Id }, commentsTickets);
        }

        // DELETE: api/CommentsTickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CommentsTickets>> DeleteCommentsTickets(int id)
        {
            var commentsTickets = await _context.CommentsTickets.FindAsync(id);
            if (commentsTickets == null)
            {
                return NotFound();
            }

            _context.CommentsTickets.Remove(commentsTickets);
            await _context.SaveChangesAsync();

            return commentsTickets;
        }

        private bool CommentsTicketsExists(int id)
        {
            return _context.CommentsTickets.Any(e => e.Id == id);
        }
    }
}
