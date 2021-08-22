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
    public class ProjetClientsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ProjetClientsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ProjetClients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjetClient>>> GetProjetClient()
        {
            return await _context.ProjetClient.ToListAsync();
        }

        // GET: api/ProjetClients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjetClient>> GetProjetClient(int id)
        {
            var projetClient = await _context.ProjetClient.FindAsync(id);

            if (projetClient == null)
            {
                return NotFound();
            }

            return projetClient;
        }

        // PUT: api/ProjetClients/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjetClient(int id, ProjetClient projetClient)
        {
            if (id != projetClient.Id)
            {
                return BadRequest();
            }

            _context.Entry(projetClient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjetClientExists(id))
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

        // POST: api/ProjetClients
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProjetClient>> PostProjetClient(ProjetClient projetClient)
        {
            _context.ProjetClient.Add(projetClient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjetClient", new { id = projetClient.Id }, projetClient);
        }

        // DELETE: api/ProjetClients/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjetClient>> DeleteProjetClient(int id)
        {
            var projetClient = await _context.ProjetClient.FindAsync(id);
            if (projetClient == null)
            {
                return NotFound();
            }

            _context.ProjetClient.Remove(projetClient);
            await _context.SaveChangesAsync();

            return projetClient;
        }

        private bool ProjetClientExists(int id)
        {
            return _context.ProjetClient.Any(e => e.Id == id);
        }
    }
}
