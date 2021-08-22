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
    public class ChequeClassesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ChequeClassesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ChequeClasses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChequeClasse>>> GetChequeClasses()
        {
            return await _context.ChequeClasses.ToListAsync();
        }

        // GET: api/ChequeClasses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChequeClasse>> GetChequeClasse(int id)
        {
            var chequeClasse = await _context.ChequeClasses.FindAsync(id);

            if (chequeClasse == null)
            {
                return NotFound();
            }

            return chequeClasse;
        }

        // PUT: api/ChequeClasses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChequeClasse(int id, ChequeClasse chequeClasse)
        {
            if (id != chequeClasse.Id)
            {
                return BadRequest();
            }

            _context.Entry(chequeClasse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChequeClasseExists(id))
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

        // POST: api/ChequeClasses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChequeClasse>> PostChequeClasse(ChequeClasse chequeClasse)
        {
            _context.ChequeClasses.Add(chequeClasse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChequeClasse", new { id = chequeClasse.Id }, chequeClasse);
        }

        // DELETE: api/ChequeClasses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChequeClasse>> DeleteChequeClasse(int id)
        {
            var chequeClasse = await _context.ChequeClasses.FindAsync(id);
            if (chequeClasse == null)
            {
                return NotFound();
            }

            _context.ChequeClasses.Remove(chequeClasse);
            await _context.SaveChangesAsync();

            return chequeClasse;
        }

        private bool ChequeClasseExists(int id)
        {
            return _context.ChequeClasses.Any(e => e.Id == id);
        }
    }
}
