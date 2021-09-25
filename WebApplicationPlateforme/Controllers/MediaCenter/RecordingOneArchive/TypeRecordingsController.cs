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
    public class TypeRecordingsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeRecordingsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeRecordings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeRecording>>> GetTypeRecording()
        {
            return await _context.TypeRecording.ToListAsync();
        }

        // GET: api/TypeRecordings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeRecording>> GetTypeRecording(int id)
        {
            var typeRecording = await _context.TypeRecording.FindAsync(id);

            if (typeRecording == null)
            {
                return NotFound();
            }

            return typeRecording;
        }

        // PUT: api/TypeRecordings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeRecording(int id, TypeRecording typeRecording)
        {
            if (id != typeRecording.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeRecording).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeRecordingExists(id))
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

        // POST: api/TypeRecordings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeRecording>> PostTypeRecording(TypeRecording typeRecording)
        {
            _context.TypeRecording.Add(typeRecording);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeRecording", new { id = typeRecording.Id }, typeRecording);
        }

        // DELETE: api/TypeRecordings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeRecording>> DeleteTypeRecording(int id)
        {
            var typeRecording = await _context.TypeRecording.FindAsync(id);
            if (typeRecording == null)
            {
                return NotFound();
            }

            _context.TypeRecording.Remove(typeRecording);
            await _context.SaveChangesAsync();

            return typeRecording;
        }

        private bool TypeRecordingExists(int id)
        {
            return _context.TypeRecording.Any(e => e.Id == id);
        }
    }
}
