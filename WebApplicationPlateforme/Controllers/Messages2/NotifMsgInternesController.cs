using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Msg_Interne;

namespace WebApplicationPlateforme.Controllers.Messages2
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotifMsgInternesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public NotifMsgInternesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/NotifMsgInternes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotifMsgInterne>>> GetnotifMsgInternes()
        {
            return await _context.notifMsgInternes.ToListAsync();
        }

        // GET: api/NotifMsgInternes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NotifMsgInterne>> GetNotifMsgInterne(int id)
        {
            var notifMsgInterne = await _context.notifMsgInternes.FindAsync(id);

            if (notifMsgInterne == null)
            {
                return NotFound();
            }

            return notifMsgInterne;
        }

        // PUT: api/NotifMsgInternes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotifMsgInterne(int id, NotifMsgInterne notifMsgInterne)
        {
            if (id != notifMsgInterne.Id)
            {
                return BadRequest();
            }

            _context.Entry(notifMsgInterne).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotifMsgInterneExists(id))
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

        // POST: api/NotifMsgInternes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NotifMsgInterne>> PostNotifMsgInterne(NotifMsgInterne notifMsgInterne)
        {
            _context.notifMsgInternes.Add(notifMsgInterne);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotifMsgInterne", new { id = notifMsgInterne.Id }, notifMsgInterne);
        }

        // DELETE: api/NotifMsgInternes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NotifMsgInterne>> DeleteNotifMsgInterne(int id)
        {
            var notifMsgInterne = await _context.notifMsgInternes.FindAsync(id);
            if (notifMsgInterne == null)
            {
                return NotFound();
            }

            _context.notifMsgInternes.Remove(notifMsgInterne);
            await _context.SaveChangesAsync();

            return notifMsgInterne;
        }

        private bool NotifMsgInterneExists(int id)
        {
            return _context.notifMsgInternes.Any(e => e.Id == id);
        }
    }
}
