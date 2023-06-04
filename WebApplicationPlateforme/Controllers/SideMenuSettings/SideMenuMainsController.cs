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
    public class SideMenuMainsController : ControllerBase
    {
        private readonly MainContext _context;

        public SideMenuMainsController(MainContext context)
        {
            _context = context;
        }

        // GET: api/SideMenuMains
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SideMenuMain>>> GetSideMenuMain()
        {
            return await _context.SideMenuMain.ToListAsync();
        }

        // GET: api/SideMenuMains/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SideMenuMain>> GetSideMenuMain(int id)
        {
            var sideMenuMain = await _context.SideMenuMain.FindAsync(id);

            if (sideMenuMain == null)
            {
                return NotFound();
            }

            return sideMenuMain;
        }

        // PUT: api/SideMenuMains/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSideMenuMain(int id, SideMenuMain sideMenuMain)
        {
            if (id != sideMenuMain.Id)
            {
                return BadRequest();
            }

            _context.Entry(sideMenuMain).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SideMenuMainExists(id))
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

        // POST: api/SideMenuMains
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SideMenuMain>> PostSideMenuMain(SideMenuMain sideMenuMain)
        {
            _context.SideMenuMain.Add(sideMenuMain);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSideMenuMain", new { id = sideMenuMain.Id }, sideMenuMain);
        }

        // DELETE: api/SideMenuMains/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SideMenuMain>> DeleteSideMenuMain(int id)
        {
            var sideMenuMain = await _context.SideMenuMain.FindAsync(id);
            if (sideMenuMain == null)
            {
                return NotFound();
            }

            _context.SideMenuMain.Remove(sideMenuMain);
            await _context.SaveChangesAsync();

            return sideMenuMain;
        }

        private bool SideMenuMainExists(int id)
        {
            return _context.SideMenuMain.Any(e => e.Id == id);
        }
    }
}
