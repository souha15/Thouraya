using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.RecordingArchive;

namespace WebApplicationPlateforme.Controllers.MediaCenter.RecordingOneArchive
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordingArchivesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public RecordingArchivesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/RecordingArchives
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecordingArchive>>> GetRecordingArchive()
        {
            return await _context.RecordingArchive.ToListAsync();
        }

        // GET: api/RecordingArchives/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecordingArchive>> GetRecordingArchive(int id)
        {
            var recordingArchive = await _context.RecordingArchive.FindAsync(id);

            if (recordingArchive == null)
            {
                return NotFound();
            }

            return recordingArchive;
        }

        // PUT: api/RecordingArchives/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecordingArchive(int id, RecordingArchive recordingArchive)
        {
            if (id != recordingArchive.Id)
            {
                return BadRequest();
            }

            _context.Entry(recordingArchive).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordingArchiveExists(id))
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

        // POST: api/RecordingArchives
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RecordingArchive>> PostRecordingArchive(RecordingArchive recordingArchive)
        {
            _context.RecordingArchive.Add(recordingArchive);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecordingArchive", new { id = recordingArchive.Id }, recordingArchive);
        }

        // DELETE: api/RecordingArchives/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RecordingArchive>> DeleteRecordingArchive(int id)
        {
            var recordingArchive = await _context.RecordingArchive.FindAsync(id);
            if (recordingArchive == null)
            {
                return NotFound();
            }

            _context.RecordingArchive.Remove(recordingArchive);
            await _context.SaveChangesAsync();

            return recordingArchive;
        }

        private bool RecordingArchiveExists(int id)
        {
            return _context.RecordingArchive.Any(e => e.Id == id);
        }
    }
}
