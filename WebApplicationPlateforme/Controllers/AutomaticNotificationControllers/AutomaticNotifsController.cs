using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AutomaticNotification;

namespace WebApplicationPlateforme.Controllers.AutomaticNotificationControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutomaticNotifsController : ControllerBase
    {
        private readonly NotificationContext _context;

        public AutomaticNotifsController(NotificationContext context)
        {
            _context = context;
        }

        // GET: api/AutomaticNotifs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AutomaticNotif>>> GetAutomaticNotifs()
        {
            return await _context.AutomaticNotifs.ToListAsync();
        }

        // GET: api/AutomaticNotifs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AutomaticNotif>> GetAutomaticNotif(int id)
        {
            var automaticNotif = await _context.AutomaticNotifs.FindAsync(id);

            if (automaticNotif == null)
            {
                return NotFound();
            }

            return automaticNotif;
        }

        // PUT: api/AutomaticNotifs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAutomaticNotif(int id, AutomaticNotif automaticNotif)
        {
            if (id != automaticNotif.Id)
            {
                return BadRequest();
            }

            _context.Entry(automaticNotif).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AutomaticNotifExists(id))
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

        // POST: api/AutomaticNotifs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AutomaticNotif>> PostAutomaticNotif(AutomaticNotif automaticNotif)
        {
            automaticNotif.dateSend = DateTime.Now;
            automaticNotif.shortDate = DateTime.Now.ToShortDateString().ToString();
            automaticNotif.shortTime = DateTime.Now.ToShortTimeString().ToString();
            _context.AutomaticNotifs.Add(automaticNotif);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAutomaticNotif", new { id = automaticNotif.Id }, automaticNotif);
        }

        // DELETE: api/AutomaticNotifs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AutomaticNotif>> DeleteAutomaticNotif(int id)
        {
            var automaticNotif = await _context.AutomaticNotifs.FindAsync(id);
            if (automaticNotif == null)
            {
                return NotFound();
            }

            _context.AutomaticNotifs.Remove(automaticNotif);
            await _context.SaveChangesAsync();

            return automaticNotif;
        }
        [HttpPut]
        [Route("GetReadUnread/{idTransmitter}/{idReceiver}")]
        public async Task<IActionResult> GetReadUnread(string idTransmitter, string idReceiver)
        {
            AutomaticNotif notification = new AutomaticNotif();
            List<AutomaticNotif> notifList = new List<AutomaticNotif>();
            notification = GetLast(idTransmitter, idReceiver);
            if (notification.vu == "0")
            {
                notifList = _context.AutomaticNotifs.Where(item => item.transmitterId == idTransmitter && item.receiverId == idReceiver && item.vu == "0").ToList();

                if (notifList.Count != 0)
                {
                    for (var i = 0; i < notifList.Count(); i++)
                    {
                        notifList[i].vu = "1";
                        _context.Entry(notifList[i]).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                    }
                }
            }

            else
            {
                return BadRequest();
            }

            return NoContent();
        }

        public AutomaticNotif GetLast(string idTransmitter, string idReceiver)
        {
            List<AutomaticNotif> notifList = new List<AutomaticNotif>();
            AutomaticNotif notif = new AutomaticNotif();
            notifList = _context.AutomaticNotifs.Where(item => item.transmitterId == idTransmitter && item.receiverId == idReceiver).ToList();
            if (notifList.Count != 0) { notif = notifList.Last(); }
            return notif;
        }

        [HttpGet]
        [Route("GetLastNotif/{idTransmitter}/{idReceiver}")]
        public AutomaticNotif GetLastNotif(string idTransmitter, string idReceiver)
        {
            List<AutomaticNotif> notifList = new List<AutomaticNotif>();
            AutomaticNotif notif = new AutomaticNotif();
            notifList = _context.AutomaticNotifs.Where(item => item.transmitterId == idTransmitter && item.receiverId == idReceiver).ToList();
            if (notifList.Count != 0) { notif = notifList.Last(); 
            }
            return notif;
        }


        [HttpGet]
        [Route("GetNotificationsNumber/{idReceiver}")]
        public int GetNotificationsNumber(string idReceiver)
        {
            int count = 0;
            var list = _context.AutomaticNotifs.Where(item => item.receiverId == idReceiver && item.vu == "0")
                .ToList();
            if (list.Count != 0) count = list.Count();
            else count = 0;
            return count;

        }

        [HttpGet]
        [Route("GetNotificationByUser/{idReceiver}")]
        public List<AutomaticNotif> GetNotificationByUser(string idReceiver)
        {
            var list = _context.AutomaticNotifs.Where(item => item.receiverId == idReceiver)
                .OrderByDescending(item => item.dateSend)
                .ToList();
            return list;
        }

        [HttpGet]
        [Route("GetUnreadNotificationByUser/{idReceiver}")]
        public List<AutomaticNotif> GetUnreadNotificationByUser(string idReceiver)
        {
            var list = _context.AutomaticNotifs.Where(item => item.receiverId == idReceiver && item.vu=="0")
                .OrderByDescending(item => item.dateSend)
                .ToList();
            return list;
        }

        [HttpGet]
        [Route("GetUnreadServicesNotificationByUser/{idReceiver}")]
        public List<AutomaticNotif> GetUnreadServicesNotificationByUser(string idReceiver)
        {
            var list = _context.AutomaticNotifs.Where(item => item.receiverId == idReceiver && item.vu == "0" && item.idService == 0)
                .OrderByDescending(item => item.dateSend)
                .ToList();
            return list;
        }

        [HttpGet]
        [Route("GetUnreadDotationsNotificationByUser/{idReceiver}")]
        public List<AutomaticNotif> GetUnreadDotationsNotificationByUser(string idReceiver)
        {
            var list = _context.AutomaticNotifs.Where(item => item.receiverId == idReceiver && item.vu == "0" && item.idService ==2)
                .OrderByDescending(item => item.dateSend)
                .ToList();
            return list;
        }

        [HttpGet]
        [Route("GetUnreadMediaNotificationByUser/{idReceiver}")]
        public List<AutomaticNotif> GetUnreadMediaNotificationByUser(string idReceiver)
        {
            var list = _context.AutomaticNotifs.Where(item => item.receiverId == idReceiver && item.vu == "0" && item.reponse =="media" && item.Id!=0)
                .OrderByDescending(item => item.dateSend)
                .ToList();
            return list;
        }

        [HttpGet]
        [Route("GetNotification/{idReceiver}/{idSender}")]
        public int GetNotification(string idReceiver, string idSender)
        {
            int count = 0;
            var list = _context.AutomaticNotifs.Where(item => item.receiverId == idReceiver && item.transmitterId == idSender && item.vu == "0")
                .GroupBy(item =>
                 new { item.transmitterId, item.receiverId })
                .Select(g => new AutomaticNotif())
                .ToList();
            if (list.Count != 0) count = list.Count();
            else count = 0;
            return count;
        }

        public int CountNotif(string idReceiver)
        {
            int count = 0;
            //List<Notification> notifList;
            count = _context.AutomaticNotifs.Where(item => item.receiverId == idReceiver && item.vu == "0")
                .GroupBy(item =>
                 new { item.transmitterId, item.receiverId })
                .Select(g => new AutomaticNotif())
                .ToList().Count();
            return count;
        }
        private bool AutomaticNotifExists(int id)
        {
            return _context.AutomaticNotifs.Any(e => e.Id == id);
        }
    }
}
