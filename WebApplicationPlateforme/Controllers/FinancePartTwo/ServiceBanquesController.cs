using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.FinancePartTwo.Comptes;

namespace WebApplicationPlateforme.Controllers.FinancePartTwo
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceBanquesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ServiceBanquesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ServiceBanques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceBanque>>> GetserviceBanques()
        {
            return await _context.serviceBanques.ToListAsync();
        }

        // GET: api/ServiceBanques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceBanque>> GetServiceBanque(int id)
        {
            var serviceBanque = await _context.serviceBanques.FindAsync(id);

            if (serviceBanque == null)
            {
                return NotFound();
            }

            return serviceBanque;
        }

        // PUT: api/ServiceBanques/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceBanque(int id, ServiceBanque serviceBanque)
        {
            if (id != serviceBanque.Id)
            {
                return BadRequest();
            }

            _context.Entry(serviceBanque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceBanqueExists(id))
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

        // POST: api/ServiceBanques
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ServiceBanque>> PostServiceBanque(ServiceBanque serviceBanque)
        {
            _context.serviceBanques.Add(serviceBanque);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceBanque", new { id = serviceBanque.Id }, serviceBanque);
        }

        // DELETE: api/ServiceBanques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceBanque>> DeleteServiceBanque(int id)
        {
            var serviceBanque = await _context.serviceBanques.FindAsync(id);
            if (serviceBanque == null)
            {
                return NotFound();
            }

            _context.serviceBanques.Remove(serviceBanque);
            await _context.SaveChangesAsync();

            return serviceBanque;
        }

        private bool ServiceBanqueExists(int id)
        {
            return _context.serviceBanques.Any(e => e.Id == id);
        }
    }
}
