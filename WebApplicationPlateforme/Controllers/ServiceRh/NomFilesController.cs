using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServiceRh;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class NomFilesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public NomFilesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/NomFiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NomFiles>>> GetnomFiles()
        {
            return await _context.nomFiles.ToListAsync();
        }

        // GET: api/NomFiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NomFiles>> GetNomFiles(int id)
        {
            var nomFiles = await _context.nomFiles.FindAsync(id);

            if (nomFiles == null)
            {
                return NotFound();
            }

            return nomFiles;
        }

        // PUT: api/NomFiles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNomFiles(int id, NomFiles nomFiles)
        {
            if (id != nomFiles.Id)
            {
                return BadRequest();
            }

            _context.Entry(nomFiles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NomFilesExists(id))
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

        // POST: api/NomFiles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NomFiles>> PostNomFiles(NomFiles nomFiles)
        {
            _context.nomFiles.Add(nomFiles);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNomFiles", new { id = nomFiles.Id }, nomFiles);
        }

        // DELETE: api/NomFiles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NomFiles>> DeleteNomFiles(int id)
        {
            var nomFiles = await _context.nomFiles.FindAsync(id);
            if (nomFiles == null)
            {
                return NotFound();
            }

            _context.nomFiles.Remove(nomFiles);
            await _context.SaveChangesAsync();

            return nomFiles;
        }

        private bool NomFilesExists(int id)
        {
            return _context.nomFiles.Any(e => e.Id == id);
        }
    }
}
