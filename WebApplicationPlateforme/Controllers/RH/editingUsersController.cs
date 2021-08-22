using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class editingUsersController : ControllerBase
    {
        private readonly FinanceContext _context;

        public editingUsersController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/editingUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<editingUser>>> GeteditingUsers()
        {
            return await _context.editingUsers.ToListAsync();
        }

        // GET: api/editingUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<editingUser>> GeteditingUser(int id)
        {
            var editingUser = await _context.editingUsers.FindAsync(id);

            if (editingUser == null)
            {
                return NotFound();
            }

            return editingUser;
        }

        // PUT: api/editingUsers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PuteditingUser(int id, editingUser editingUser)
        {
            if (id != editingUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(editingUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!editingUserExists(id))
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

        // POST: api/editingUsers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<editingUser>> PosteditingUser(editingUser editingUser)
        {
            _context.editingUsers.Add(editingUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GeteditingUser", new { id = editingUser.Id }, editingUser);
        }

        // DELETE: api/editingUsers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<editingUser>> DeleteeditingUser(int id)
        {
            var editingUser = await _context.editingUsers.FindAsync(id);
            if (editingUser == null)
            {
                return NotFound();
            }

            _context.editingUsers.Remove(editingUser);
            await _context.SaveChangesAsync();

            return editingUser;
        }

        private bool editingUserExists(int id)
        {
            return _context.editingUsers.Any(e => e.Id == id);
        }
    }
}
