using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.PartageMedia;

namespace WebApplicationPlateforme.Controllers.MediaCenter.ParMedia
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartageMediasController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PartageMediasController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PartageMedias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartageMedia>>> GetPartageMedia()
        {
            return await _context.PartageMedia.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/PartageMedias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PartageMedia>> GetPartageMedia(int id)
        {
            var partageMedia = await _context.PartageMedia.FindAsync(id);

            if (partageMedia == null)
            {
                return NotFound();
            }

            return partageMedia;
        }

        // PUT: api/PartageMedias/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartageMedia(int id, PartageMedia partageMedia)
        {
            if (id != partageMedia.Id)
            {
                return BadRequest();
            }

            _context.Entry(partageMedia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartageMediaExists(id))
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

        // POST: api/PartageMedias
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PartageMedia>> PostPartageMedia(PartageMedia partageMedia)
        {
            _context.PartageMedia.Add(partageMedia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPartageMedia", new { id = partageMedia.Id }, partageMedia);
        }

        // DELETE: api/PartageMedias/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PartageMedia>> DeletePartageMedia(int id)
        {
            var partageMedia = await _context.PartageMedia.FindAsync(id);
            if (partageMedia == null)
            {
                return NotFound();
            }

            _context.PartageMedia.Remove(partageMedia);
            await _context.SaveChangesAsync();

            return partageMedia;
        }

        private bool PartageMediaExists(int id)
        {
            return _context.PartageMedia.Any(e => e.Id == id);
        }
    }
}
