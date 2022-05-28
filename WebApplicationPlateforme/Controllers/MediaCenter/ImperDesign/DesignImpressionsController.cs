
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.MediaCenter.ImpressionDesign;

namespace WebApplicationPlateforme.Controllers.MediaCenter.ImperDesign
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignImpressionsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public DesignImpressionsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/DesignImpressions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DesignImpression>>> GetDesignImpression()
        {
            return await _context.DesignImpression.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/DesignImpressions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DesignImpression>> GetDesignImpression(int id)
        {
            var designImpression = await _context.DesignImpression.FindAsync(id);

            if (designImpression == null)
            {
                return NotFound();
            }

            return designImpression;
        }

        // PUT: api/DesignImpressions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDesignImpression(int id, DesignImpression designImpression)
        {
            if (id != designImpression.Id)
            {
                return BadRequest();
            }

            _context.Entry(designImpression).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DesignImpressionExists(id))
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

        // POST: api/DesignImpressions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DesignImpression>> PostDesignImpression(DesignImpression designImpression)
        {
            _context.DesignImpression.Add(designImpression);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDesignImpression", new { id = designImpression.Id }, designImpression);
        }

        // DELETE: api/DesignImpressions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DesignImpression>> DeleteDesignImpression(int id)
        {
            var designImpression = await _context.DesignImpression.FindAsync(id);
            if (designImpression == null)
            {
                return NotFound();
            }

            _context.DesignImpression.Remove(designImpression);
            await _context.SaveChangesAsync();

            return designImpression;
        }

        private bool DesignImpressionExists(int id)
        {
            return _context.DesignImpression.Any(e => e.Id == id);
        }
    }
}
