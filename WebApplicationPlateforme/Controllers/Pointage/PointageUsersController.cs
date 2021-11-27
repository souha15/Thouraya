using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Text;
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
           

            /*foreach (NetworkInterface nic in NetworkInterface.GetAllNetworkInterfaces())
            {
                if (nic.OperationalStatus == OperationalStatus.Up)
                {
                    macAddresses += nic.GetPhysicalAddress().ToString();
                    break;
                }
            }

            var builder = new StringBuilder(macAddresses);
            for (int i = builder.Length - 2; i > 0; i -= 2)
            {
                builder.Insert(i, ':');
            }
            pointageUser.adresseMac = builder.ToString();
            Console.WriteLine(builder.ToString());*/

           //var ip = _accessor.ActionContext.HttpContext.Connection.RemoteIpAddress.ToString();
           var ip = HttpContext.Connection.RemoteIpAddress.ToString();
            pointageUser.adresseIP = ip;
            pointageUser.adresseMac = GetClientMAC(ip);

           
            _context.PointageUsers.Add(pointageUser);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPointageUser", new { id = pointageUser.Id }, pointageUser);
        }


        //get MAC Address

        [DllImport("Iphlpapi.dll")]
        private static extern int SendARP(Int32 dest, Int32 host, ref Int64 mac, ref Int32 length);
        [DllImport("Ws2_32.dll")]
        private static extern Int32 inet_addr(string ip);

        private static string GetClientMAC(string strClientIP)
        {
            string mac_dest = "";
            try
            {
                Int32 ldest = inet_addr(strClientIP);
                Int32 lhost = inet_addr("");
                Int64 macinfo = new Int64();
                Int32 len = 6;
                int res = SendARP(ldest, 0, ref macinfo, ref len);
                string mac_src = macinfo.ToString("X");

                while (mac_src.Length < 12)
                {
                    mac_src = mac_src.Insert(0, "0");
                }

                for (int i = 0; i < 11; i++)
                {
                    if (0 == (i % 2))
                    {
                        if (i == 10)
                        {
                            mac_dest = mac_dest.Insert(0, mac_src.Substring(i, 2));
                        }
                        else
                        {
                            mac_dest = "-" + mac_dest.Insert(0, mac_src.Substring(i, 2));
                        }
                    }
                }
            }
            catch (Exception err)
            {
                throw new Exception("L?i " + err.Message);
            }
            return mac_dest;
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
