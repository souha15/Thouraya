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
    public class PartageMediaTypesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public PartageMediaTypesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/PartageMediaTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartageMediaType>>> GetPartageMediaType()
        {
            return await _context.PartageMediaType.ToListAsync();
        }

        // GET: api/PartageMediaTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PartageMediaType>> GetPartageMediaType(int id)
        {
            var partageMediaType = await _context.PartageMediaType.FindAsync(id);

            if (partageMediaType == null)
            {
                return NotFound();
            }

            return partageMediaType;
        }

        // PUT: api/PartageMediaTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartageMediaType(int id, PartageMediaType partageMediaType)
        {
            if (id != partageMediaType.Id)
            {
                return BadRequest();
            }

            _context.Entry(partageMediaType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartageMediaTypeExists(id))
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

        // POST: api/PartageMediaTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PartageMediaType>> PostPartageMediaType(PartageMediaType partageMediaType)
        {
            _context.PartageMediaType.Add(partageMediaType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPartageMediaType", new { id = partageMediaType.Id }, partageMediaType);
        }

        // DELETE: api/PartageMediaTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PartageMediaType>> DeletePartageMediaType(int id)
        {
            var partageMediaType = await _context.PartageMediaType.FindAsync(id);
            if (partageMediaType == null)
            {
                return NotFound();
            }

            _context.PartageMediaType.Remove(partageMediaType);
            await _context.SaveChangesAsync();

            return partageMediaType;
        }

        private bool PartageMediaTypeExists(int id)
        {
            return _context.PartageMediaType.Any(e => e.Id == id);
        }
    }
}
