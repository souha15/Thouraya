using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Pointage;

namespace WebApplicationPlateforme.Controllers.Pointage
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointageUsersController : ControllerBase
    {
        private readonly FinanceContext _context;
        private readonly IActionContextAccessor _accessor;

        public PointageUsersController(FinanceContext context, IActionContextAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
        }

        // GET: api/PointageUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PointageUser>>> GetPointageUsers()
        {
            return await _context.PointageUsers.ToListAsync();
        }

        // GET: api/PointageUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PointageUser>> GetPointageUser(int id)
        {
            var pointageUser = await _context.PointageUsers.FindAsync(id);

            if (pointageUser == null)
            {
                return NotFound();
            }

            return pointageUser;
        }

        // PUT: api/PointageUsers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPointageUser(int id, PointageUser pointageUser)
        {
            if (id != pointageUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(pointageUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PointageUserExists(id))
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

        // POST: api/PointageUsers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PointageUser>> PostPointageUser(PointageUser pointageUser)
        {
            //var ip = _accessor.ActionContext.HttpContext.Connection.RemoteIpAddress.ToString();
            var ip = HttpContext.Connection.RemoteIpAddress.ToString();
            pointageUser.adresseIP = ip;
            _context.PointageUsers.Add(pointageUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPointageUser", new { id = pointageUser.Id }, pointageUser);
        }

        // DELETE: api/PointageUsers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PointageUser>> DeletePointageUser(int id)
        {
            var pointageUser = await _context.PointageUsers.FindAsync(id);
            if (pointageUser == null)
            {
                return NotFound();
            }

            _context.PointageUsers.Remove(pointageUser);
            await _context.SaveChangesAsync();

            return pointageUser;
        }

        private bool PointageUserExists(int id)
        {
            return _context.PointageUsers.Any(e => e.Id == id);
        }
    }
}
