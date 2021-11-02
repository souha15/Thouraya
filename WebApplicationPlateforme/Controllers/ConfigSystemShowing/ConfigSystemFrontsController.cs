using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ConfigSystemShowing;

namespace WebApplicationPlateforme.Controllers.ConfigSystemShowing
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigSystemFrontsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ConfigSystemFrontsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ConfigSystemFronts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfigSystemFront>>> GetConfigSystemFront()
        {
            return await _context.ConfigSystemFront.ToListAsync();
        }

        // GET: api/ConfigSystemFronts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ConfigSystemFront>> GetConfigSystemFront(int id)
        {
            var configSystemFront = await _context.ConfigSystemFront.FindAsync(id);

            if (configSystemFront == null)
            {
                return NotFound();
            }

            return configSystemFront;
        }

        // PUT: api/ConfigSystemFronts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConfigSystemFront(int id, ConfigSystemFront configSystemFront)
        {
            if (id != configSystemFront.Id)
            {
                return BadRequest();
            }

            _context.Entry(configSystemFront).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConfigSystemFrontExists(id))
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

        // POST: api/ConfigSystemFronts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ConfigSystemFront>> PostConfigSystemFront(ConfigSystemFront configSystemFront)
        {
            _context.ConfigSystemFront.Add(configSystemFront);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConfigSystemFront", new { id = configSystemFront.Id }, configSystemFront);
        }

        // DELETE: api/ConfigSystemFronts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ConfigSystemFront>> DeleteConfigSystemFront(int id)
        {
            var configSystemFront = await _context.ConfigSystemFront.FindAsync(id);
            if (configSystemFront == null)
            {
                return NotFound();
            }

            _context.ConfigSystemFront.Remove(configSystemFront);
            await _context.SaveChangesAsync();

            return configSystemFront;
        }

        private bool ConfigSystemFrontExists(int id)
        {
            return _context.ConfigSystemFront.Any(e => e.Id == id);
        }
    }
}
