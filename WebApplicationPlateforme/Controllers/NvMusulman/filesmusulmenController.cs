using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.NouveauMusulman;

namespace WebApplicationPlateforme.Controllers.NvMusulman
{
    [Route("api/[controller]")]
    [ApiController]
    public class filesmusulmenController : ControllerBase
    {
        private readonly FinanceContext _context;

        public filesmusulmenController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/filesmusulmen
        [HttpGet]
        public async Task<ActionResult<IEnumerable<filesmusulman>>> Getfilesmusulmans()
        {
            return await _context.filesmusulmans.ToListAsync();
        }

        // GET: api/filesmusulmen/5
        [HttpGet("{id}")]
        public async Task<ActionResult<filesmusulman>> Getfilesmusulman(int id)
        {
            var filesmusulman = await _context.filesmusulmans.FindAsync(id);

            if (filesmusulman == null)
            {
                return NotFound();
            }

            return filesmusulman;
        }

        // PUT: api/filesmusulmen/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putfilesmusulman(int id, filesmusulman filesmusulman)
        {
            if (id != filesmusulman.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesmusulman).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!filesmusulmanExists(id))
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

        // POST: api/filesmusulmen
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<filesmusulman>> Postfilesmusulman(filesmusulman filesmusulman)
        {
            _context.filesmusulmans.Add(filesmusulman);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getfilesmusulman", new { id = filesmusulman.Id }, filesmusulman);
        }

        // DELETE: api/filesmusulmen/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<filesmusulman>> Deletefilesmusulman(int id)
        {
            var filesmusulman = await _context.filesmusulmans.FindAsync(id);
            if (filesmusulman == null)
            {
                return NotFound();
            }

            _context.filesmusulmans.Remove(filesmusulman);
            await _context.SaveChangesAsync();

            return filesmusulman;
        }

        private bool filesmusulmanExists(int id)
        {
            return _context.filesmusulmans.Any(e => e.Id == id);
        }
    }
}
