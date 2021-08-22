using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;

using WebApplicationPlateforme.Model.Maintenance;

namespace WebApplicationPlateforme.Controllers.Maintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly FinanceContext _context;
        private SmtpClient smtpClient;
        //private readonly IMailer _mailer;

        public TicketsController(FinanceContext context, SmtpClient smtpClient)
        {
            _context = context;
            this.smtpClient = smtpClient;


        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> Gettickets()
        {
            return await _context.tickets.ToListAsync();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.tickets.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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

        // POST: api/Tickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            _context.tickets.Add(ticket);
            await _context.SaveChangesAsync();
            // await _mailer.SendEmailAsync("souhakhemiri20@gmail.com", ticket.titre, ticket.details);
            try { 
            var fromAddress = new MailAddress("souhakhemiri20@gmail.com", "From Client Abo Areesh");
            var toAddress = new MailAddress("info@almukhashi-it.com", "Almukhashi-it");
            const string fromPassword = "bassoumamamaty2010";
            const string subject = "A new maintenance request";
            const string body = " Check this Link To access The List of requests ==>  http://2rtq.w.time4vps.cloud/page-frwarded-to-ticket-list-for-agent-code";


            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                //EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };

            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }

            }catch(SmtpFailedRecipientsException smtpex)
            {
                Console.WriteLine(smtpex);
                throw;
                
            }
            /*smtpClient.UseDefaultCredentials = false;
            smtpClient.Port = 587;
            await this.smtpClient.SendMailAsync(new MailMessage(
           from: "souhakhemiri20@gmail.com",
           to: "khemirisouhaa@gmail.com",
           subject: "Test message subject",
           body: "Test message body"
           )); */
            return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);

        }


        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket>> DeleteTicket(int id)
        {
            var ticket = await _context.tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }

        private bool TicketExists(int id)
        {
            return _context.tickets.Any(e => e.Id == id);
        }
    }
}
