using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Interne;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Interne
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiaisonIsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public LiaisonIsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/LiaisonIs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LiaisonI>>> GetliaisonsI()
        {
            return await _context.liaisonsI.ToListAsync();
        }

        // GET: api/LiaisonIs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LiaisonI>> GetLiaisonI(int id)
        {
            var liaisonI = await _context.liaisonsI.FindAsync(id);

            if (liaisonI == null)
            {
                return NotFound();
            }

            return liaisonI;
        }

        // PUT: api/LiaisonIs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLiaisonI(int id, LiaisonI liaisonI)
        {
            if (id != liaisonI.Id)
            {
                return BadRequest();
            }

            _context.Entry(liaisonI).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LiaisonIExists(id))
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

        // POST: api/LiaisonIs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LiaisonI>> PostLiaisonI(LiaisonI liaisonI)
        {
            _context.liaisonsI.Add(liaisonI);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLiaisonI", new { id = liaisonI.Id }, liaisonI);
        }

        // DELETE: api/LiaisonIs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LiaisonI>> DeleteLiaisonI(int id)
        {
            var liaisonI = await _context.liaisonsI.FindAsync(id);
            if (liaisonI == null)
            {
                return NotFound();
            }

            _context.liaisonsI.Remove(liaisonI);
            await _context.SaveChangesAsync();

            return liaisonI;
        }

        private bool LiaisonIExists(int id)
        {
            return _context.liaisonsI.Any(e => e.Id == id);
        }
    }
}
