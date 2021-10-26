using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.NotificationSettings;

namespace WebApplicationPlateforme.Controllers.NotificationSettings
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotifTextsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public NotifTextsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/NotifTexts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotifText>>> GetNotifTexts()
        {
            return await _context.NotifTexts.ToListAsync();
        }

        // GET: api/NotifTexts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NotifText>> GetNotifText(int id)
        {
            var notifText = await _context.NotifTexts.FindAsync(id);

            if (notifText == null)
            {
                return NotFound();
            }

            return notifText;
        }

        // PUT: api/NotifTexts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotifText(int id, NotifText notifText)
        {
            if (id != notifText.Id)
            {
                return BadRequest();
            }

            _context.Entry(notifText).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotifTextExists(id))
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

        // POST: api/NotifTexts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NotifText>> PostNotifText(NotifText notifText)
        {
            _context.NotifTexts.Add(notifText);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotifText", new { id = notifText.Id }, notifText);
        }

        // DELETE: api/NotifTexts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NotifText>> DeleteNotifText(int id)
        {
            var notifText = await _context.NotifTexts.FindAsync(id);
            if (notifText == null)
            {
                return NotFound();
            }

            _context.NotifTexts.Remove(notifText);
            await _context.SaveChangesAsync();

            return notifText;
        }

        private bool NotifTextExists(int id)
        {
            return _context.NotifTexts.Any(e => e.Id == id);
        }
    }
}
