using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiecesJointesTrsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PiecesJointesTrsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PiecesJointesTrs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PiecesJointesTr>>> GetpiecesJointesTrs()
        {
            return await _context.piecesJointesTrs.ToListAsync();
        }

        // GET: api/PiecesJointesTrs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PiecesJointesTr>> GetPiecesJointesTr(int id)
        {
            var piecesJointesTr = await _context.piecesJointesTrs.FindAsync(id);

            if (piecesJointesTr == null)
            {
                return NotFound();
            }

            return piecesJointesTr;
        }

        // PUT: api/PiecesJointesTrs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPiecesJointesTr(int id, PiecesJointesTr piecesJointesTr)
        {
            if (id != piecesJointesTr.Id)
            {
                return BadRequest();
            }

            _context.Entry(piecesJointesTr).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PiecesJointesTrExists(id))
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

        // POST: api/PiecesJointesTrs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PiecesJointesTr>> PostPiecesJointesTr(PiecesJointesTr piecesJointesTr)
        {
            _context.piecesJointesTrs.Add(piecesJointesTr);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPiecesJointesTr", new { id = piecesJointesTr.Id }, piecesJointesTr);
        }

        // DELETE: api/PiecesJointesTrs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PiecesJointesTr>> DeletePiecesJointesTr(int id)
        {
            var piecesJointesTr = await _context.piecesJointesTrs.FindAsync(id);
            if (piecesJointesTr == null)
            {
                return NotFound();
            }

            _context.piecesJointesTrs.Remove(piecesJointesTr);
            await _context.SaveChangesAsync();

            return piecesJointesTr;
        }

        private bool PiecesJointesTrExists(int id)
        {
            return _context.piecesJointesTrs.Any(e => e.Id == id);
        }
    }
}
