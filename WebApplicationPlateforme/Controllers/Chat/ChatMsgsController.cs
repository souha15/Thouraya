using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Chat;

namespace WebApplicationPlateforme.Controllers.Chat
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatMsgsController : ControllerBase
    {
        private readonly DawaaContext _context;

        public ChatMsgsController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/ChatMsgs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChatMsg>>> GetChatMsgs()
        {
            return await _context.ChatMsgs.ToListAsync();
        }

        // GET: api/ChatMsgs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChatMsg>> GetChatMsg(int id)
        {
            var chatMsg = await _context.ChatMsgs.FindAsync(id);

            if (chatMsg == null)
            {
                return NotFound();
            }

            return chatMsg;
        }

        // PUT: api/ChatMsgs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChatMsg(int id, ChatMsg chatMsg)
        {
            if (id != chatMsg.Id)
            {
                return BadRequest();
            }

            _context.Entry(chatMsg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChatMsgExists(id))
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

        // POST: api/ChatMsgs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChatMsg>> PostChatMsg(ChatMsg chatMsg)
        {
            chatMsg.timeEnvoi = DateTime.Now.ToShortTimeString().ToString();
            chatMsg.dateEnvoi = DateTime.Now.ToShortDateString().ToString();
            _context.ChatMsgs.Add(chatMsg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChatMsg", new { id = chatMsg.Id }, chatMsg);
        }

        [HttpGet]
        [Route("GetMessagesWithUserSelected/{IdEmeteur}/{IdRecepteur}")]
        public List<ChatMsg> GetMessagesWithUserSelected(string IdEmeteur, string IdRecepteur)
        {
            List<ChatMsg> Conversation = new List<ChatMsg>();
            Conversation = _context.ChatMsgs.Where(item => (item.emeteurId == IdEmeteur && item.recepteurId == IdRecepteur) || (item.emeteurId == IdRecepteur && item.recepteurId == IdEmeteur)).ToList();
            return Conversation;
        }
        // DELETE: api/ChatMsgs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChatMsg>> DeleteChatMsg(int id)
        {
            var chatMsg = await _context.ChatMsgs.FindAsync(id);
            if (chatMsg == null)
            {
                return NotFound();
            }

            _context.ChatMsgs.Remove(chatMsg);
            await _context.SaveChangesAsync();

            return chatMsg;
        }

        private bool ChatMsgExists(int id)
        {
            return _context.ChatMsgs.Any(e => e.Id == id);
        }
    }
}
