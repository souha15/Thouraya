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
    public class FilesOrgsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesOrgsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesOrgs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesOrg>>> GetfilesOrgs()
        {
            return await _context.filesOrgs.ToListAsync();
        }

        // GET: api/FilesOrgs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesOrg>> GetFilesOrg(int id)
        {
            var filesOrg = await _context.filesOrgs.FindAsync(id);

            if (filesOrg == null)
            {
                return NotFound();
            }

            return filesOrg;
        }

        // PUT: api/FilesOrgs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesOrg(int id, FilesOrg filesOrg)
        {
            if (id != filesOrg.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesOrg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesOrgExists(id))
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

        // POST: api/FilesOrgs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesOrg>> PostFilesOrg(FilesOrg filesOrg)
        {
            _context.filesOrgs.Add(filesOrg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesOrg", new { id = filesOrg.Id }, filesOrg);
        }

        // DELETE: api/FilesOrgs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesOrg>> DeleteFilesOrg(int id)
        {
            var filesOrg = await _context.filesOrgs.FindAsync(id);
            if (filesOrg == null)
            {
                return NotFound();
            }

            _context.filesOrgs.Remove(filesOrg);
            await _context.SaveChangesAsync();

            return filesOrg;
        }

        private bool FilesOrgExists(int id)
        {
            return _context.filesOrgs.Any(e => e.Id == id);
        }
    }
}
