using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.ServicesConfiguration;

namespace WebApplicationPlateforme.Controllers.ServicesConfiguration
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigServicesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ConfigServicesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ConfigServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfigService>>> GetConfigServices()
        {
            return await _context.ConfigServices.ToListAsync();
        }

        // GET: api/ConfigServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ConfigService>> GetConfigService(int id)
        {
            var configService = await _context.ConfigServices.FindAsync(id);

            if (configService == null)
            {
                return NotFound();
            }

            return configService;
        }

        // PUT: api/ConfigServices/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConfigService(int id, ConfigService configService)
        {
            if (id != configService.Id)
            {
                return BadRequest();
            }

            _context.Entry(configService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConfigServiceExists(id))
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

        // POST: api/ConfigServices
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ConfigService>> PostConfigService(ConfigService configService)
        {
            _context.ConfigServices.Add(configService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConfigService", new { id = configService.Id }, configService);
        }

        // DELETE: api/ConfigServices/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ConfigService>> DeleteConfigService(int id)
        {
            var configService = await _context.ConfigServices.FindAsync(id);
            if (configService == null)
            {
                return NotFound();
            }

            _context.ConfigServices.Remove(configService);
            await _context.SaveChangesAsync();

            return configService;
        }
        [HttpGet]
        [Route("TestIfServiceExist/{id}")]
        public bool TestIfServiceExist(int id)
        {
            
            return _context.ConfigServices.Any(item => item.serviceId == id);
          
        }

        private bool ConfigServiceExists(int id)
        {
            return _context.ConfigServices.Any(e => e.Id == id);
        }
    }
}
