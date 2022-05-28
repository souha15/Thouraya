using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.NotifSignalR;

namespace WebApplicationPlateforme.Controllers.NotifSystem
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotifsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public NotifsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/Notifs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notif>>> GetNotifs()
        {
            return await _context.Notifs.ToListAsync();
        }

        // GET: api/Notifs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Notif>> GetNotif(int id)
        {
            var notif = await _context.Notifs.FindAsync(id);

            if (notif == null)
            {
                return NotFound();
            }

            return notif;
        }

        // PUT: api/Notifs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotif(int id, Notif notif)
        {
            if (id != notif.Id)
            {
                return BadRequest();
            }

            _context.Entry(notif).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotifExists(id))
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

        // POST: api/Notifs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Notif>> PostNotif(Notif notif)
        {
            _context.Notifs.Add(notif);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotif", new { id = notif.Id }, notif);
        }

        // DELETE: api/Notifs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Notif>> DeleteNotif(int id)
        {
            var notif = await _context.Notifs.FindAsync(id);
            if (notif == null)
            {
                return NotFound();
            }

            _context.Notifs.Remove(notif);
            await _context.SaveChangesAsync();

            return notif;
        }

        private bool NotifExists(int id)
        {
            return _context.Notifs.Any(e => e.Id == id);
        }

        [HttpGet]
        [Route("GetByUserAll/{Id}")]
        public List<Notif> GetByUserAll(string Id)
        {
            var NotifList = _context.Notifs.Where(item => item.userReceiverId == Id).ToList();
            return NotifList;
        }

        [HttpGet]
        [Route("GetByUserRead/{Id}")]
        public List<Notif> GetByUserRead(string Id)
        {
            var NotifList = _context.Notifs.Where(item => item.userReceiverId == Id && item.readUnread=="1").ToList();
            return NotifList;
        }

        [HttpGet]
        [Route("GetByUserUnRead/{Id}")]
        public List<Notif> GetByUserUnRead(string Id)
        {
            var NotifList = _context.Notifs.Where(item => item.userReceiverId == Id && item.readUnread == "0").ToList();
            return NotifList;
        }
    }
}
