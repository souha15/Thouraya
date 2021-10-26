using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MusulumanFemme;

namespace WebApplicationPlateforme.Controllers.NewControllersForDawa
{
    [Route("api/[controller]")]
    [ApiController]
    public class filesmusulmanWomenController : ControllerBase
    {
        private readonly DawaaContext _context;

        public filesmusulmanWomenController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/filesmusulmanWomen
        [HttpGet]
        public async Task<ActionResult<IEnumerable<filesmusulmanWoman>>> GetfilesmusulmanWoman()
        {
            return await _context.filesmusulmanWoman.ToListAsync();
        }

        // GET: api/filesmusulmanWomen/5
        [HttpGet("{id}")]
        public async Task<ActionResult<filesmusulmanWoman>> GetfilesmusulmanWoman(int id)
        {
            var filesmusulmanWoman = await _context.filesmusulmanWoman.FindAsync(id);

            if (filesmusulmanWoman == null)
            {
                return NotFound();
            }

            return filesmusulmanWoman;
        }

        // PUT: api/filesmusulmanWomen/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutfilesmusulmanWoman(int id, filesmusulmanWoman filesmusulmanWoman)
        {
            if (id != filesmusulmanWoman.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesmusulmanWoman).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!filesmusulmanWomanExists(id))
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

        // POST: api/filesmusulmanWomen
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<filesmusulmanWoman>> PostfilesmusulmanWoman(filesmusulmanWoman filesmusulmanWoman)
        {
            _context.filesmusulmanWoman.Add(filesmusulmanWoman);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetfilesmusulmanWoman", new { id = filesmusulmanWoman.Id }, filesmusulmanWoman);
        }

        // DELETE: api/filesmusulmanWomen/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<filesmusulmanWoman>> DeletefilesmusulmanWoman(int id)
        {
            var filesmusulmanWoman = await _context.filesmusulmanWoman.FindAsync(id);
            if (filesmusulmanWoman == null)
            {
                return NotFound();
            }

            _context.filesmusulmanWoman.Remove(filesmusulmanWoman);
            await _context.SaveChangesAsync();

            return filesmusulmanWoman;
        }

        private bool filesmusulmanWomanExists(int id)
        {
            return _context.filesmusulmanWoman.Any(e => e.Id == id);
        }
    }
}
