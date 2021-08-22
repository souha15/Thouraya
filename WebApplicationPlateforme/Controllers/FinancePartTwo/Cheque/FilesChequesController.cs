using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.FinancePartTwo.Cheques;

namespace WebApplicationPlateforme.Controllers.FinancePartTwo.Cheque
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesChequesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesChequesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesCheques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesCheque>>> GetfilesCheques()
        {
            return await _context.filesCheques.ToListAsync();
        }

        // GET: api/FilesCheques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesCheque>> GetFilesCheque(int id)
        {
            var filesCheque = await _context.filesCheques.FindAsync(id);

            if (filesCheque == null)
            {
                return NotFound();
            }

            return filesCheque;
        }

        // PUT: api/FilesCheques/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesCheque(int id, FilesCheque filesCheque)
        {
            if (id != filesCheque.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesCheque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesChequeExists(id))
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

        // POST: api/FilesCheques
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesCheque>> PostFilesCheque(FilesCheque filesCheque)
        {
            _context.filesCheques.Add(filesCheque);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesCheque", new { id = filesCheque.Id }, filesCheque);
        }

        // DELETE: api/FilesCheques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesCheque>> DeleteFilesCheque(int id)
        {
            var filesCheque = await _context.filesCheques.FindAsync(id);
            if (filesCheque == null)
            {
                return NotFound();
            }

            _context.filesCheques.Remove(filesCheque);
            await _context.SaveChangesAsync();

            return filesCheque;
        }

        private bool FilesChequeExists(int id)
        {
            return _context.filesCheques.Any(e => e.Id == id);
        }
    }
}
