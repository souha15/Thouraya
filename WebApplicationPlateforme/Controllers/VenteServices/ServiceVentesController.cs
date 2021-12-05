using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.VenteServices;

namespace WebApplicationPlateforme.Controllers.VenteServices
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceVentesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ServiceVentesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ServiceVentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceVente>>> GetServiceVentes()
        {
            return await _context.ServiceVentes.ToListAsync();
        }

        // GET: api/ServiceVentes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceVente>> GetServiceVente(int id)
        {
            var serviceVente = await _context.ServiceVentes.FindAsync(id);

            if (serviceVente == null)
            {
                return NotFound();
            }

            return serviceVente;
        }

        // PUT: api/ServiceVentes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceVente(int id, ServiceVente serviceVente)
        {
            if (id != serviceVente.Id)
            {
                return BadRequest();
            }

            _context.Entry(serviceVente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceVenteExists(id))
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

        // POST: api/ServiceVentes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ServiceVente>> PostServiceVente(ServiceVente serviceVente)
        {
            _context.ServiceVentes.Add(serviceVente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceVente", new { id = serviceVente.Id }, serviceVente);
        }

        // DELETE: api/ServiceVentes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceVente>> DeleteServiceVente(int id)
        {
            var serviceVente = await _context.ServiceVentes.FindAsync(id);
            if (serviceVente == null)
            {
                return NotFound();
            }

            _context.ServiceVentes.Remove(serviceVente);
            await _context.SaveChangesAsync();

            return serviceVente;
        }

        private bool ServiceVenteExists(int id)
        {
            return _context.ServiceVentes.Any(e => e.Id == id);
        }
    }
}
