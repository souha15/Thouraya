using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Interne;
using WebApplicationPlateforme.ViewModels;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Interne
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceptionIsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ReceptionIsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ReceptionIs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceptionI>>> GetreceptionIs()
        {
            return await _context.receptionIs.ToListAsync();
        }

        // GET: api/ReceptionIs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceptionI>> GetReceptionI(int id)
        {
            var receptionI = await _context.receptionIs.FindAsync(id);

            if (receptionI == null)
            {
                return NotFound();
            }

            return receptionI;
        }

        // PUT: api/ReceptionIs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceptionI(int id, ReceptionI receptionI)
        {
            if (id != receptionI.Id)
            {
                return BadRequest();
            }

            _context.Entry(receptionI).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceptionIExists(id))
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

        // POST: api/ReceptionIs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ReceptionI>> PostReceptionI(ReceptionI receptionI)
        {
            _context.receptionIs.Add(receptionI);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceptionI", new { id = receptionI.Id }, receptionI);
        }

        // DELETE: api/ReceptionIs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ReceptionI>> DeleteReceptionI(int id)
        {
            var receptionI = await _context.receptionIs.FindAsync(id);
            if (receptionI == null)
            {
                return NotFound();
            }

            _context.receptionIs.Remove(receptionI);
            await _context.SaveChangesAsync();

            return receptionI;
        }
        [HttpGet]
        [Route("GetReceivedAffectations/{id}")]
        public List<TransactionsReceptionsViewModel> GetReceivedAffectations(int id)
        {
            List<TransactionsReceptionsViewModel> TrReceivingAff = new List<TransactionsReceptionsViewModel>();
            TrReceivingAff = _context.tiAffectations
                .Join(_context.receptionIs,
                aff => aff.Id,
                rec => rec.idAffectation,
                (aff, rec) => new { Aff = aff, Rec = rec })
                .Where(item => item.Aff.idTransaction == id)
                .Select(item => new TransactionsReceptionsViewModel()
                {
                    idAff = item.Aff.Id,
                    idTr = item.Aff.idTransaction,
                    idRec = item.Rec.Id,
                    dateAff = item.Aff.datenereg,
                    userSender = item.Aff.nomUserQuiAffecte,
                    receiver = item.Aff.nomOrganisme,
                    userReceiver = item.Rec.userName,
                    dateReceiving = item.Rec.date
                }).ToList();

            return TrReceivingAff;

        }
        private bool ReceptionIExists(int id)
        {
            return _context.receptionIs.Any(e => e.Id == id);
        }
    }
}
