using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServiceRh;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongeFilesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public CongeFilesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/CongeFiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CongeFiles>>> GetCongeFiles()
        {
            return await _context.CongeFiles.ToListAsync();
        }

        // GET: api/CongeFiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CongeFiles>> GetCongeFiles(int id)
        {
            var CongeFiles = await _context.CongeFiles.FindAsync(id);

            if (CongeFiles == null)
            {
                return NotFound();
            }

            return CongeFiles;
        }

        // PUT: api/CongeFiles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCongeFiles(int id, CongeFiles CongeFiles)
        {
            if (id != CongeFiles.Id)
            {
                return BadRequest();
            }

            _context.Entry(CongeFiles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CongeFilesExists(id))
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

        // POST: api/CongeFiles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CongeFiles>> PostCongeFiles(CongeFiles CongeFiles)
        {
            _context.CongeFiles.Add(CongeFiles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCongeFiles", new { id = CongeFiles.Id }, CongeFiles);
        }

        // DELETE: api/CongeFiles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CongeFiles>> DeleteCongeFiles(int id)
        {
            var CongeFiles = await _context.CongeFiles.FindAsync(id);
            if (CongeFiles == null)
            {
                return NotFound();
            }

            _context.CongeFiles.Remove(CongeFiles);
            await _context.SaveChangesAsync();

            return CongeFiles;
        }
        [HttpGet]
        [Route("GetByCongesId/{IdConge}")]
        public List<CongeFiles> GetByCongesId(int IdConge)
        {
            List<CongeFiles> FilesList = new List<CongeFiles>();
            FilesList = _context.CongeFiles.Where(item => item.idConge == IdConge).ToList();
            return FilesList;
        }
        private bool CongeFilesExists(int id)
        {
            return _context.CongeFiles.Any(e => e.Id == id);
        }
    }
}
