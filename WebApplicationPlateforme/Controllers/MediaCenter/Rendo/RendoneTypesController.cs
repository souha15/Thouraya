using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.Rondonnee;

namespace WebApplicationPlateforme.Controllers.MediaCenter.Rendo
{
    [Route("api/[controller]")]
    [ApiController]
    public class RendoneTypesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public RendoneTypesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/RendoneTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RendoneType>>> GetRendoneType()
        {
            return await _context.RendoneType.ToListAsync();
        }

        // GET: api/RendoneTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RendoneType>> GetRendoneType(int id)
        {
            var rendoneType = await _context.RendoneType.FindAsync(id);

            if (rendoneType == null)
            {
                return NotFound();
            }

            return rendoneType;
        }

        // PUT: api/RendoneTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRendoneType(int id, RendoneType rendoneType)
        {
            if (id != rendoneType.Id)
            {
                return BadRequest();
            }

            _context.Entry(rendoneType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RendoneTypeExists(id))
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

        // POST: api/RendoneTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RendoneType>> PostRendoneType(RendoneType rendoneType)
        {
            _context.RendoneType.Add(rendoneType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRendoneType", new { id = rendoneType.Id }, rendoneType);
        }

        // DELETE: api/RendoneTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RendoneType>> DeleteRendoneType(int id)
        {
            var rendoneType = await _context.RendoneType.FindAsync(id);
            if (rendoneType == null)
            {
                return NotFound();
            }

            _context.RendoneType.Remove(rendoneType);
            await _context.SaveChangesAsync();

            return rendoneType;
        }

        private bool RendoneTypeExists(int id)
        {
            return _context.RendoneType.Any(e => e.Id == id);
        }
    }
}
