using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.SideMenuSettings;

namespace WebApplicationPlateforme.Controllers.SideMenuSettings
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleSideMenusController : ControllerBase
    {
        private readonly MainContext _context;

        public ModuleSideMenusController(MainContext context)
        {
            _context = context;
        }

        // GET: api/ModuleSideMenus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ModuleSideMenu>>> GetModuleSideMenu()
        {
            return await _context.ModuleSideMenu.ToListAsync();
        }

        // GET: api/ModuleSideMenus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ModuleSideMenu>> GetModuleSideMenu(int id)
        {
            var moduleSideMenu = await _context.ModuleSideMenu.FindAsync(id);

            if (moduleSideMenu == null)
            {
                return NotFound();
            }

            return moduleSideMenu;
        }

        // PUT: api/ModuleSideMenus/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModuleSideMenu(int id, ModuleSideMenu moduleSideMenu)
        {
            if (id != moduleSideMenu.Id)
            {
                return BadRequest();
            }

            _context.Entry(moduleSideMenu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModuleSideMenuExists(id))
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

        // POST: api/ModuleSideMenus
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ModuleSideMenu>> PostModuleSideMenu(ModuleSideMenu moduleSideMenu)
        {
            _context.ModuleSideMenu.Add(moduleSideMenu);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetModuleSideMenu", new { id = moduleSideMenu.Id }, moduleSideMenu);
        }

        // DELETE: api/ModuleSideMenus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ModuleSideMenu>> DeleteModuleSideMenu(int id)
        {
            var moduleSideMenu = await _context.ModuleSideMenu.FindAsync(id);
            if (moduleSideMenu == null)
            {
                return NotFound();
            }

            _context.ModuleSideMenu.Remove(moduleSideMenu);
            await _context.SaveChangesAsync();

            return moduleSideMenu;
        }

        private bool ModuleSideMenuExists(int id)
        {
            return _context.ModuleSideMenu.Any(e => e.Id == id);
        }
    }
}
