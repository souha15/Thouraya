using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ProjetOrg;

namespace WebApplicationPlateforme.Controllers.ProjetOrg
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesProjetOrgsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesProjetOrgsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesProjetOrgs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesProjetOrg>>> GetFilesProjetOrg()
        {
            return await _context.FilesProjetOrg.ToListAsync();
        }

        // GET: api/FilesProjetOrgs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesProjetOrg>> GetFilesProjetOrg(int id)
        {
            var filesProjetOrg = await _context.FilesProjetOrg.FindAsync(id);

            if (filesProjetOrg == null)
            {
                return NotFound();
            }

            return filesProjetOrg;
        }

        // PUT: api/FilesProjetOrgs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesProjetOrg(int id, FilesProjetOrg filesProjetOrg)
        {
            if (id != filesProjetOrg.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesProjetOrg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesProjetOrgExists(id))
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

        // POST: api/FilesProjetOrgs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesProjetOrg>> PostFilesProjetOrg(FilesProjetOrg filesProjetOrg)
        {
            _context.FilesProjetOrg.Add(filesProjetOrg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesProjetOrg", new { id = filesProjetOrg.Id }, filesProjetOrg);
        }

        // DELETE: api/FilesProjetOrgs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesProjetOrg>> DeleteFilesProjetOrg(int id)
        {
            var filesProjetOrg = await _context.FilesProjetOrg.FindAsync(id);
            if (filesProjetOrg == null)
            {
                return NotFound();
            }

            _context.FilesProjetOrg.Remove(filesProjetOrg);
            await _context.SaveChangesAsync();

            return filesProjetOrg;
        }

        private bool FilesProjetOrgExists(int id)
        {
            return _context.FilesProjetOrg.Any(e => e.Id == id);
        }
    }
}
