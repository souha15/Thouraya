using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Pointage;

namespace WebApplicationPlateforme.Controllers.Pointage
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddresseMacsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public AddresseMacsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/AddresseMacs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddresseMac>>> GetAddresseMacs()
        {
            return await _context.AddresseMacs.ToListAsync();
        }

        // GET: api/AddresseMacs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AddresseMac>> GetAddresseMac(int id)
        {
            var addresseMac = await _context.AddresseMacs.FindAsync(id);

            if (addresseMac == null)
            {
                return NotFound();
            }

            return addresseMac;
        }

        // PUT: api/AddresseMacs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddresseMac(int id, AddresseMac addresseMac)
        {
            if (id != addresseMac.Id)
            {
                return BadRequest();
            }

            _context.Entry(addresseMac).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddresseMacExists(id))
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

        // POST: api/AddresseMacs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AddresseMac>> PostAddresseMac(AddresseMac addresseMac)
        {
            _context.AddresseMacs.Add(addresseMac);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAddresseMac", new { id = addresseMac.Id }, addresseMac);
        }

        // DELETE: api/AddresseMacs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AddresseMac>> DeleteAddresseMac(int id)
        {
            var addresseMac = await _context.AddresseMacs.FindAsync(id);
            if (addresseMac == null)
            {
                return NotFound();
            }

            _context.AddresseMacs.Remove(addresseMac);
            await _context.SaveChangesAsync();

            return addresseMac;
        }

        private bool AddresseMacExists(int id)
        {
            return _context.AddresseMacs.Any(e => e.Id == id);
        }
    }
}
