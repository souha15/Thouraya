using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.FilmPart;

namespace WebApplicationPlateforme.Controllers.MediaCenter.FilController
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsTypesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilmsTypesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilmsTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilmsType>>> GetFilmsType()
        {
            return await _context.FilmsType.ToListAsync();
        }

        // GET: api/FilmsTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilmsType>> GetFilmsType(int id)
        {
            var filmsType = await _context.FilmsType.FindAsync(id);

            if (filmsType == null)
            {
                return NotFound();
            }

            return filmsType;
        }

        // PUT: api/FilmsTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilmsType(int id, FilmsType filmsType)
        {
            if (id != filmsType.Id)
            {
                return BadRequest();
            }

            _context.Entry(filmsType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilmsTypeExists(id))
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

        // POST: api/FilmsTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilmsType>> PostFilmsType(FilmsType filmsType)
        {
            _context.FilmsType.Add(filmsType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilmsType", new { id = filmsType.Id }, filmsType);
        }

        // DELETE: api/FilmsTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilmsType>> DeleteFilmsType(int id)
        {
            var filmsType = await _context.FilmsType.FindAsync(id);
            if (filmsType == null)
            {
                return NotFound();
            }

            _context.FilmsType.Remove(filmsType);
            await _context.SaveChangesAsync();

            return filmsType;
        }

        private bool FilmsTypeExists(int id)
        {
            return _context.FilmsType.Any(e => e.Id == id);
        }
    }
}
