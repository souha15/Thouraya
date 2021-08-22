using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.User;

namespace WebApplicationPlateforme.Controllers.UserControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrivilegesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PrivilegesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Privileges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Privileges>>> Getprivileges()
        {
            return await _context.privileges.ToListAsync();
        }

        // GET: api/Privileges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Privileges>> GetPrivileges(string id)
        {
            var privileges = await _context.privileges.FindAsync(id);

            if (privileges == null)
            {
                return NotFound();
            }

            return privileges;
        }

        // PUT: api/Privileges/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrivileges(string id, Privileges privileges)
        {
            if (id != privileges.Id)
            {
                return BadRequest();
            }

            _context.Entry(privileges).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrivilegesExists(id))
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

        // POST: api/Privileges
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Privileges>> PostPrivileges(Privileges privileges)
        {
            _context.privileges.Add(privileges);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PrivilegesExists(privileges.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPrivileges", new { id = privileges.Id }, privileges);
        }

        // DELETE: api/Privileges/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Privileges>> DeletePrivileges(string id)
        {
            var privileges = await _context.privileges.FindAsync(id);
            if (privileges == null)
            {
                return NotFound();
            }

            _context.privileges.Remove(privileges);
            await _context.SaveChangesAsync();

            return privileges;
        }

        private bool PrivilegesExists(string id)
        {
            return _context.privileges.Any(e => e.Id == id);
        }
    }
}
