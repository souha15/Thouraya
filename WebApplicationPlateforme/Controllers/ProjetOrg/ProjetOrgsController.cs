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
    public class ProjetOrgsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ProjetOrgsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ProjetOrgs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WebApplicationPlateforme.Model.ProjetOrg.ProjetOrg>>> GetProjetOrgs()
        {
            return await _context.ProjetOrgs.ToListAsync();
        }

        // GET: api/ProjetOrgs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WebApplicationPlateforme.Model.ProjetOrg.ProjetOrg>> GetProjetOrg(int id)
        {
            var projetOrg = await _context.ProjetOrgs.FindAsync(id);

            if (projetOrg == null)
            {
                return NotFound();
            }

            return projetOrg;
        }

        // PUT: api/ProjetOrgs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjetOrg(int id, WebApplicationPlateforme.Model.ProjetOrg.ProjetOrg projetOrg)
        {
            if (id != projetOrg.Id)
            {
                return BadRequest();
            }

            _context.Entry(projetOrg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjetOrgExists(id))
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

        // POST: api/ProjetOrgs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WebApplicationPlateforme.Model.ProjetOrg.ProjetOrg>> PostProjetOrg(WebApplicationPlateforme.Model.ProjetOrg.ProjetOrg projetOrg)
        {
            _context.ProjetOrgs.Add(projetOrg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjetOrg", new { id = projetOrg.Id }, projetOrg);
        }

        // DELETE: api/ProjetOrgs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WebApplicationPlateforme.Model.ProjetOrg.ProjetOrg>> DeleteProjetOrg(int id)
        {
            var projetOrg = await _context.ProjetOrgs.FindAsync(id);
            if (projetOrg == null)
            {
                return NotFound();
            }

            _context.ProjetOrgs.Remove(projetOrg);
            await _context.SaveChangesAsync();

            return projetOrg;
        }

        private bool ProjetOrgExists(int id)
        {
            return _context.ProjetOrgs.Any(e => e.Id == id);
        }
    }
}
