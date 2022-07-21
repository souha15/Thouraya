using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Controllers.RH
{
    [Route("api/[controller]")]
    [ApiController]
    public class soldeCongesInfosUpdatesController : ControllerBase
    {
        private readonly DawaaContext _context;
        private readonly FinanceContext _context1;

        public soldeCongesInfosUpdatesController(DawaaContext context,FinanceContext context1)
        {
            _context = context;
            _context1 = context1;
        }

        // GET: api/soldeCongesInfosUpdates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<soldeCongesInfosUpdate>>> GetsoldeCongesInfosUpdates()
        {
            return await _context.soldeCongesInfosUpdates.ToListAsync();
        }

        // GET: api/soldeCongesInfosUpdates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<soldeCongesInfosUpdate>> GetsoldeCongesInfosUpdate(int id)
        {
            var soldeCongesInfosUpdate = await _context.soldeCongesInfosUpdates.FindAsync(id);

            if (soldeCongesInfosUpdate == null)
            {
                return NotFound();
            }

            return soldeCongesInfosUpdate;
        }

        // PUT: api/soldeCongesInfosUpdates/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutsoldeCongesInfosUpdate(int id, soldeCongesInfosUpdate soldeCongesInfosUpdate)
        {
            if (id != soldeCongesInfosUpdate.Id)
            {
                return BadRequest();
            }

            _context.Entry(soldeCongesInfosUpdate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!soldeCongesInfosUpdateExists(id))
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

        // POST: api/soldeCongesInfosUpdates
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<soldeCongesInfosUpdate>> PostsoldeCongesInfosUpdate(soldeCongesInfosUpdate soldeCongesInfosUpdate)
        {
            _context.soldeCongesInfosUpdates.Add(soldeCongesInfosUpdate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetsoldeCongesInfosUpdate", new { id = soldeCongesInfosUpdate.Id }, soldeCongesInfosUpdate);
        }

        // DELETE: api/soldeCongesInfosUpdates/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<soldeCongesInfosUpdate>> DeletesoldeCongesInfosUpdate(int id)
        {
            var soldeCongesInfosUpdate = await _context.soldeCongesInfosUpdates.FindAsync(id);
            if (soldeCongesInfosUpdate == null)
            {
                return NotFound();
            }

            _context.soldeCongesInfosUpdates.Remove(soldeCongesInfosUpdate);
            await _context.SaveChangesAsync();

            return soldeCongesInfosUpdate;
        }

        private bool soldeCongesInfosUpdateExists(int id)
        {
            return _context.soldeCongesInfosUpdates.Any(e => e.Id == id);
        }

        [HttpPost]
        [Route("PutAutomatically")]
        public List<SoldeConge> PutAutomatically()
        {

            List<SoldeConge> ListConges = new List<SoldeConge>();
            soldeCongesInfosUpdate sculast = new soldeCongesInfosUpdate();
            soldeCongesInfosUpdate scu = new soldeCongesInfosUpdate();
            DateTime dateOnly = DateTime.Now;
            
            sculast = _context.soldeCongesInfosUpdates.OrderByDescending(item=> item.Id).FirstOrDefault();
            if (sculast!=null)
            {
                if(sculast.month < dateOnly.Month && sculast.year == dateOnly.Year)
                {
                        ListConges = _context1.soldeConges.ToList();
                        scu.updated = "Yes";
                        scu.date = dateOnly;
                        scu.day = dateOnly.Day;
                        scu.month = dateOnly.Month;
                        scu.year = dateOnly.Year;
                        scu.cuurentdate = dateOnly.ToString();
                        _context.soldeCongesInfosUpdates.Add(scu);
                         _context.SaveChangesAsync();
                    }
                   
            }else
            {
                    ListConges = _context1.soldeConges.ToList();
                    scu.updated = "Yes";
                    scu.date = dateOnly;
                    scu.day = dateOnly.Day;
                    scu.month = dateOnly.Month;
                    scu.year = dateOnly.Year;
                    scu.cuurentdate = dateOnly.ToString();
                    _context.soldeCongesInfosUpdates.Add(scu);
                     _context.SaveChangesAsync();                
                }


            return ListConges;

        }
    }
}
