using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.AdministrativeCommunication;
using WebApplicationPlateforme.Model.AdministrativeCommunication.Interne;
using WebApplicationPlateforme.ViewModels;

namespace WebApplicationPlateforme.Controllers.CommunicationAdministrative.Interne
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiAffectationsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TiAffectationsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TiAffectations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TiAffectation>>> GettiAffectations()
        {
            return await _context.tiAffectations.ToListAsync();
        }

        // GET: api/TiAffectations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TiAffectation>> GetTiAffectation(int id)
        {
            var tiAffectation = await _context.tiAffectations.FindAsync(id);

            if (tiAffectation == null)
            {
                return NotFound();
            }

            return tiAffectation;
        }

        // PUT: api/TiAffectations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiAffectation(int id, TiAffectation tiAffectation)
        {
            if (id != tiAffectation.Id)
            {
                return BadRequest();
            }

            _context.Entry(tiAffectation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiAffectationExists(id))
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

        // POST: api/TiAffectations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TiAffectation>> PostTiAffectation(TiAffectation tiAffectation)
        {
            _context.tiAffectations.Add(tiAffectation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTiAffectation", new { id = tiAffectation.Id }, tiAffectation);
        }

        // DELETE: api/TiAffectations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TiAffectation>> DeleteTiAffectation(int id)
        {
            var tiAffectation = await _context.tiAffectations.FindAsync(id);
            if (tiAffectation == null)
            {
                return NotFound();
            }

            _context.tiAffectations.Remove(tiAffectation);
            await _context.SaveChangesAsync();

            return tiAffectation;
        }

        [HttpGet]
        [Route("GetAffectations/{idAdmin}")]

        public List<TransactionsAffectationsViewModel> GetAffectations(int idAdmin)
        {
            List<TransactionsAffectationsViewModel> trAffListI = new List<TransactionsAffectationsViewModel>();
            List<TransactionsAffectationsViewModel> trAffListR = new List<TransactionsAffectationsViewModel>();
            List<TransactionsAffectationsViewModel> trAffList = new List<TransactionsAffectationsViewModel>();         
            TiAffectation tiAff = new TiAffectation();
            List<TransactionI> trI = new List<TransactionI>();
            TrAffectation trAff = new TrAffectation();
            List<Transaction> trR = new List<Transaction>();

            trI = _context.transactionsI.Where(item => item.etat != "محفوظة").ToList();
           foreach(TransactionI tr in trI)
            {
                tiAff = _context.tiAffectations.Where(item => item.idTransaction == tr.Id)
                    .OrderByDescending(item => item.Id)
                    .FirstOrDefault();
            
                if(tiAff!= null &&  tiAff.idAdministration == idAdmin)
                {
                    TransactionsAffectationsViewModel traffv = new TransactionsAffectationsViewModel()
                    {
                        Id = tr.Id,
                        datenereg = tiAff.datenereg,
                        numAutorite = tr.numAutorite,
                        date = tr.date,
                        orgEnregTr = tr.orgEnregTr,
                        nomOrganisme = tiAff.nomOrganisme,
                        etat = tiAff.attribut2,
                        idAff = tiAff.Id,
                        type = tr.type,
                    };
                    trAffListI.Add(traffv);
                    
                }
                
            }


            trR = _context.transactions.Where(item => item.etat != "محفوظة").ToList();
            foreach (Transaction tr in trR)
            {
                trAff = _context.trAffectations.Where(item => item.idTransaction == tr.Id)
                    .OrderByDescending(item => item.Id)
                    .FirstOrDefault();

                if (trAff!= null && trAff.attribut1 == idAdmin)
                {
                    TransactionsAffectationsViewModel traffR = new TransactionsAffectationsViewModel()
                    {
                        Id = tr.Id,
                        datenereg = trAff.datenereg,
                        numAutorite = tr.numAutorite,
                        date = tr.date,
                        orgEnregTr = tr.nomOrg,
                        nomOrganisme = trAff.attribut3,
                        etat = trAff.attribut2,
                        idAff = trAff.Id,
                        type = tr.type,
                    }; 
                    trAffListR.Add(traffR);

                }
            }

            trAffList = trAffListI.Concat(trAffListR).ToList();

            return trAffList;
        }


        [HttpGet]
        [Route("GetAffectationsList/{id}")]

        public List<TiAffectation> GetAffectationsList(int id)
        {
            List<TiAffectation> trAffList = new List<TiAffectation>();

            trAffList = _context.tiAffectations
                .Where(item => item.idTransaction == id)
                .OrderBy(item => item.Id).ToList();
            
            return trAffList;


        }

        [HttpGet]
        [Route("GetAffectationsListR/{id}")]

        public List<TrAffectation> GetAffectationsListR(int id)
        {
            List<TrAffectation> trAffList = new List<TrAffectation>();

            trAffList = _context.trAffectations
                .Where(item => item.idTransaction == id)
                .OrderBy(item => item.Id).ToList();

            return trAffList;


        }

        private bool TiAffectationExists(int id)
        {
            return _context.tiAffectations.Any(e => e.Id == id);
        }
    }
//    trAffListR = _context.transactions
//.Join(_context.trAffectations,
//tr => tr.Id,
//          aff => aff.idTransaction,
//          (tr, aff) => new { Tr = tr, Aff = aff
//})
//          .Where(item => item.Aff.attribut1 == idAdmin && item.Tr.etat != "محفوظة")
//          .OrderByDescending(item => item.Aff.Id)
//          //.Take(1)
//          .Select(item => new TransactionsAffectationsViewModel()
//{
//    Id = item.Tr.Id,
//              datenereg = item.Aff.datenereg,
//              numAutorite = item.Tr.numAutorite,
//              date = item.Tr.date,
//              orgEnregTr = item.Tr.nomOrg,
//              nomOrganisme = item.Aff.attribut3,
//              etat = item.Aff.attribut2,
//              idAff = item.Aff.Id,
//              type = item.Tr.type
//          })
//          .ToList();
}
