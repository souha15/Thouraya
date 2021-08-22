using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.OrgPart;

namespace WebApplicationPlateforme.Controllers.OrgPart
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrgPartisController : ControllerBase
    {
        private readonly FinanceContext _context;

        public OrgPartisController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/OrgPartis
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrgParti>>> GetorgPartis()
        {
            return await _context.orgPartis.ToListAsync();
        }

        // GET: api/OrgPartis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrgParti>> GetOrgParti(int id)
        {
            var orgParti = await _context.orgPartis.FindAsync(id);

            if (orgParti == null)
            {
                return NotFound();
            }

            return orgParti;
        }

        // PUT: api/OrgPartis/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrgParti(int id, OrgParti orgParti)
        {
            if (id != orgParti.Id)
            {
                return BadRequest();
            }

            _context.Entry(orgParti).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrgPartiExists(id))
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

        // POST: api/OrgPartis
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrgParti>> PostOrgParti(OrgParti orgParti)
        {
            _context.orgPartis.Add(orgParti);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrgParti", new { id = orgParti.Id }, orgParti);
        }

        // DELETE: api/OrgPartis/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrgParti>> DeleteOrgParti(int id)
        {
            var orgParti = await _context.orgPartis.FindAsync(id);
            if (orgParti == null)
            {
                return NotFound();
            }

            _context.orgPartis.Remove(orgParti);
            await _context.SaveChangesAsync();

            return orgParti;
        }

        private bool OrgPartiExists(int id)
        {
            return _context.orgPartis.Any(e => e.Id == id);
        }
    }
}
