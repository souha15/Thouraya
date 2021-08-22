using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenements;

namespace WebApplicationPlateforme.Controllers.Evenements
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediasEvsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public MediasEvsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/MediasEvs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MediasEv>>> GetmediasEvs()
        {
            return await _context.mediasEvs.ToListAsync();
        }

        // GET: api/MediasEvs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MediasEv>> GetMediasEv(int id)
        {
            var mediasEv = await _context.mediasEvs.FindAsync(id);

            if (mediasEv == null)
            {
                return NotFound();
            }

            return mediasEv;
        }

        // PUT: api/MediasEvs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMediasEv(int id, MediasEv mediasEv)
        {
            if (id != mediasEv.Id)
            {
                return BadRequest();
            }

            _context.Entry(mediasEv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MediasEvExists(id))
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

        // POST: api/MediasEvs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MediasEv>> PostMediasEv(MediasEv mediasEv)
        {
            _context.mediasEvs.Add(mediasEv);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMediasEv", new { id = mediasEv.Id }, mediasEv);
        }

        // DELETE: api/MediasEvs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MediasEv>> DeleteMediasEv(int id)
        {
            var mediasEv = await _context.mediasEvs.FindAsync(id);
            if (mediasEv == null)
            {
                return NotFound();
            }

            _context.mediasEvs.Remove(mediasEv);
            await _context.SaveChangesAsync();

            return mediasEv;
        }

        private bool MediasEvExists(int id)
        {
            return _context.mediasEvs.Any(e => e.Id == id);
        }
    }
}
