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
    public class connectionsController : ControllerBase
    {
        private readonly NotificationContext _context;

        public connectionsController(NotificationContext context)
        {
            _context = context;
        }

        // GET: api/connections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<connection>>> GetConnections()
        {
            return await _context.Connections.ToListAsync();
        }

        // GET: api/connections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<connection>> Getconnection(int id)
        {
            var connection = await _context.Connections.FindAsync(id);

            if (connection == null)
            {
                return NotFound();
            }

            return connection;
        }

        // PUT: api/connections/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putconnection(int id, connection connection)
        {
            if (id != connection.Id)
            {
                return BadRequest();
            }

            _context.Entry(connection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!connectionExists(id))
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

        // POST: api/connections
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<connection>> Postconnection(connection connection)
        {
            _context.Connections.Add(connection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getconnection", new { id = connection.Id }, connection);
        }

        // DELETE: api/connections/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<connection>> Deleteconnection(int id)
        {
            var connection = await _context.Connections.FindAsync(id);
            if (connection == null)
            {
                return NotFound();
            }

            _context.Connections.Remove(connection);
            await _context.SaveChangesAsync();

            return connection;
        }
        [HttpGet]
        [Route("GetLastConnection/{idUser}")]
        public connection GetLastConnection(string idUser)
        {
            var lastCon = _context.Connections.Where(item => item.userId == idUser)
                .OrderBy(item => item.timeStamp)
                .Last();

            var list = _context.Connections.Where(item => item.userId == idUser)
               .ToList();

            if (list.Count() > 1)
            {

                for (var i = 0; i < list.Count(); i++)

                {
                    if (list[i].Id != lastCon.Id)
                    {
                        _context.Connections.Remove(list[i]);
                        _context.SaveChangesAsync();
                    }
                }
            }
            return lastCon;
        }

        // Get Connection from Userid

        [HttpGet]
        [Route("GetConnectionByIdUser/{idUser}")]
        public connection GetConnection(string idUser)
        {
            var lastCon = _context.Connections.Where(item => item.userId == idUser)
                .OrderBy(item => item.timeStamp)
                .Last();
            return lastCon;
        }

        // Get Conected User 
        [HttpGet]
        [Route("GetConnectionList/{currUserId}")]
        public List<connection> GetConnectionList(string currUserId) { 
        List<connection> onlineUsers = new List<connection>();
        onlineUsers = _context.Connections.Where(item => item.userId != currUserId).ToList();
        return onlineUsers;
    
        }

        [HttpGet]
        [Route("TestIfUserConnected/{currUserId}")]
        public bool TestIfUserConnected(string currUserId)
        {
            connection user = new connection();
            List<connection> onlineUsers = new List<connection>();
            onlineUsers = _context.Connections.ToList();
            if (onlineUsers.Count > 0)
            {
                user = _context.Connections.Where(item => item.userId == currUserId).FirstOrDefault();
            }
                return onlineUsers.Contains(user);
           
  
        }

        //async Task<ActionResult<connection>> Getconnection(int id)
        //{
        //    var connection = await _context.Connections.FindAsync(id);

        //    if (connection == null)
        //    {
        //        return NotFound();
        //    }

        //    return connection;


            private bool connectionExists(int id)
        {
            return _context.Connections.Any(e => e.Id == id);
        }
    }
}
