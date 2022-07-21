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
    public class FilesDecisionTwoesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public FilesDecisionTwoesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/FilesDecisionTwoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilesDecisionTwoes>>> GetFilesDecisionTwoes()
        {
            return await _context.filesDecisionTwoes.ToListAsync();
        }

        // GET: api/FilesDecisionTwoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilesDecisionTwoes>> GetFilesDecisionTwoes(int id)
        {
            var filesDecisionTwoes = await _context.filesDecisionTwoes.FindAsync(id);

            if (filesDecisionTwoes == null)
            {
                return NotFound();
            }

            return filesDecisionTwoes;
        }

        // PUT: api/FilesDecisionTwoes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilesDecisionTwoes(int id, FilesDecisionTwoes filesDecisionTwoes)
        {
            if (id != filesDecisionTwoes.Id)
            {
                return BadRequest();
            }

            _context.Entry(filesDecisionTwoes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilesDecisionTwoesExists(id))
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

        // POST: api/FilesDecisionTwoes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FilesDecisionTwoes>> PostFilesDecisionTwoes(FilesDecisionTwoes filesDecisionTwoes)
        {
            _context.filesDecisionTwoes.Add(filesDecisionTwoes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFilesDecisionTwoes", new { id = filesDecisionTwoes.Id }, filesDecisionTwoes);
        }

        [HttpGet]
        [Route("GetFileByDecisionFD/{idDecision}")]
        public List<FilesDecisionTwoes> GetFileByDecisionFD(int idDecision)
        {
            List<FilesDecisionTwoes> List = new List<FilesDecisionTwoes>();
            List = _context.filesDecisionTwoes.Where(item => item.idDecision == idDecision).ToList();
            return List;
        }

        // DELETE: api/FilesDecisionTwoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FilesDecisionTwoes>> DeleteFilesDecisionTwoes(int id)
        {
            var filesDecisionTwoes = await _context.filesDecisionTwoes.FindAsync(id);
            if (filesDecisionTwoes == null)
            {
                return NotFound();
            }

            _context.filesDecisionTwoes.Remove(filesDecisionTwoes);
            await _context.SaveChangesAsync();

            return filesDecisionTwoes;
        }

        private bool FilesDecisionTwoesExists(int id)
        {
            return _context.filesDecisionTwoes.Any(e => e.Id == id);
        }
    }
}
