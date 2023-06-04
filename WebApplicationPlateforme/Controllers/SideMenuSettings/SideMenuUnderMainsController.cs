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
    public class SideMenuUnderMainsController : ControllerBase
    {
        private readonly MainContext _context;

        public SideMenuUnderMainsController(MainContext context)
        {
            _context = context;
        }

        // GET: api/SideMenuUnderMains
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SideMenuUnderMain>>> GetSideMenuUnderMain()
        {
            return await _context.SideMenuUnderMain.ToListAsync();
        }

        // GET: api/SideMenuUnderMains/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SideMenuUnderMain>> GetSideMenuUnderMain(int id)
        {
            var sideMenuUnderMain = await _context.SideMenuUnderMain.FindAsync(id);

            if (sideMenuUnderMain == null)
            {
                return NotFound();
            }

            return sideMenuUnderMain;
        }

        // PUT: api/SideMenuUnderMains/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSideMenuUnderMain(int id, SideMenuUnderMain sideMenuUnderMain)
        {
            if (id != sideMenuUnderMain.Id)
            {
                return BadRequest();
            }

            _context.Entry(sideMenuUnderMain).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SideMenuUnderMainExists(id))
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

        // POST: api/SideMenuUnderMains
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SideMenuUnderMain>> PostSideMenuUnderMain(SideMenuUnderMain sideMenuUnderMain)
        {
            _context.SideMenuUnderMain.Add(sideMenuUnderMain);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSideMenuUnderMain", new { id = sideMenuUnderMain.Id }, sideMenuUnderMain);
        }

        // DELETE: api/SideMenuUnderMains/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SideMenuUnderMain>> DeleteSideMenuUnderMain(int id)
        {
            var sideMenuUnderMain = await _context.SideMenuUnderMain.FindAsync(id);
            if (sideMenuUnderMain == null)
            {
                return NotFound();
            }

            _context.SideMenuUnderMain.Remove(sideMenuUnderMain);
            await _context.SaveChangesAsync();

            return sideMenuUnderMain;
        }

        private bool SideMenuUnderMainExists(int id)
        {
            return _context.SideMenuUnderMain.Any(e => e.Id == id);
        }
    }
}
