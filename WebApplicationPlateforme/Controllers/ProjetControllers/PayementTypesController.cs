using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Projets;

namespace WebApplicationPlateforme.Controllers.ProjetControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayementTypesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public PayementTypesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/PayementTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayementType>>> GetpayementTypes()
        {
            return await _context.payementTypes.ToListAsync();
        }

        // GET: api/PayementTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayementType>> GetPayementType(int id)
        {
            var payementType = await _context.payementTypes.FindAsync(id);

            if (payementType == null)
            {
                return NotFound();
            }

            return payementType;
        }

        // PUT: api/PayementTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayementType(int id, PayementType payementType)
        {
            if (id != payementType.Id)
            {
                return BadRequest();
            }

            _context.Entry(payementType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayementTypeExists(id))
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

        // POST: api/PayementTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PayementType>> PostPayementType(PayementType payementType)
        {
            _context.payementTypes.Add(payementType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayementType", new { id = payementType.Id }, payementType);
        }

        // DELETE: api/PayementTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PayementType>> DeletePayementType(int id)
        {
            var payementType = await _context.payementTypes.FindAsync(id);
            if (payementType == null)
            {
                return NotFound();
            }

            _context.payementTypes.Remove(payementType);
            await _context.SaveChangesAsync();

            return payementType;
        }

        private bool PayementTypeExists(int id)
        {
            return _context.payementTypes.Any(e => e.Id == id);
        }
    }
}
