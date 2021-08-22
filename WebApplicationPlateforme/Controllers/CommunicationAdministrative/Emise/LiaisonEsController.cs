using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Emise;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Emise
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiaisonEsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public LiaisonEsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/LiaisonEs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LiaisonE>>> GetliaisonsE()
        {
            return await _context.liaisonsE.ToListAsync();
        }

        // GET: api/LiaisonEs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LiaisonE>> GetLiaisonE(int id)
        {
            var liaisonE = await _context.liaisonsE.FindAsync(id);

            if (liaisonE == null)
            {
                return NotFound();
            }

            return liaisonE;
        }

        // PUT: api/LiaisonEs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLiaisonE(int id, LiaisonE liaisonE)
        {
            if (id != liaisonE.Id)
            {
                return BadRequest();
            }

            _context.Entry(liaisonE).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LiaisonEExists(id))
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

        // POST: api/LiaisonEs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LiaisonE>> PostLiaisonE(LiaisonE liaisonE)
        {
            _context.liaisonsE.Add(liaisonE);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLiaisonE", new { id = liaisonE.Id }, liaisonE);
        }

        // DELETE: api/LiaisonEs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LiaisonE>> DeleteLiaisonE(int id)
        {
            var liaisonE = await _context.liaisonsE.FindAsync(id);
            if (liaisonE == null)
            {
                return NotFound();
            }

            _context.liaisonsE.Remove(liaisonE);
            await _context.SaveChangesAsync();

            return liaisonE;
        }

        private bool LiaisonEExists(int id)
        {
            return _context.liaisonsE.Any(e => e.Id == id);
        }
    }
}
