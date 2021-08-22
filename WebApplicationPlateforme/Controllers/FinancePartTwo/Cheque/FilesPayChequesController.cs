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
    public class FilesPayChequesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesPayChequesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesPayCheques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesPayCheque>>> GetfilesPays()
        {
            return await _context.filesPays.ToListAsync();
        }

        // GET: api/FilesPayCheques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesPayCheque>> GetFilesPayCheque(int id)
        {
            var filesPayCheque = await _context.filesPays.FindAsync(id);

            if (filesPayCheque == null)
            {
                return NotFound();
            }

            return filesPayCheque;
        }

        // PUT: api/FilesPayCheques/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesPayCheque(int id, FilesPayCheque filesPayCheque)
        {
            if (id != filesPayCheque.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesPayCheque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesPayChequeExists(id))
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

        // POST: api/FilesPayCheques
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesPayCheque>> PostFilesPayCheque(FilesPayCheque filesPayCheque)
        {
            _context.filesPays.Add(filesPayCheque);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesPayCheque", new { id = filesPayCheque.Id }, filesPayCheque);
        }

        // DELETE: api/FilesPayCheques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesPayCheque>> DeleteFilesPayCheque(int id)
        {
            var filesPayCheque = await _context.filesPays.FindAsync(id);
            if (filesPayCheque == null)
            {
                return NotFound();
            }

            _context.filesPays.Remove(filesPayCheque);
            await _context.SaveChangesAsync();

            return filesPayCheque;
        }

        private bool FilesPayChequeExists(int id)
        {
            return _context.filesPays.Any(e => e.Id == id);
        }
    }
}
