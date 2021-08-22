using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Ressource_Humaines;

namespace WebApplicationPlateforme.Controllers.ServiceRh
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoldeCongeEmployeesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public SoldeCongeEmployeesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/SoldeCongeEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SoldeCongeEmployee>>> GetsoldeCongeEmployees()
        {
            return await _context.soldeCongeEmployees.ToListAsync();
        }

        // GET: api/SoldeCongeEmployees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SoldeCongeEmployee>> GetSoldeCongeEmployee(int id)
        {
            var soldeCongeEmployee = await _context.soldeCongeEmployees.FindAsync(id);

            if (soldeCongeEmployee == null)
            {
                return NotFound();
            }

            return soldeCongeEmployee;
        }

        // PUT: api/SoldeCongeEmployees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSoldeCongeEmployee(int id, SoldeCongeEmployee soldeCongeEmployee)
        {
            if (id != soldeCongeEmployee.Id)
            {
                return BadRequest();
            }

            _context.Entry(soldeCongeEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SoldeCongeEmployeeExists(id))
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

        // POST: api/SoldeCongeEmployees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SoldeCongeEmployee>> PostSoldeCongeEmployee(SoldeCongeEmployee soldeCongeEmployee)
        {
            _context.soldeCongeEmployees.Add(soldeCongeEmployee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSoldeCongeEmployee", new { id = soldeCongeEmployee.Id }, soldeCongeEmployee);
        }

        // DELETE: api/SoldeCongeEmployees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SoldeCongeEmployee>> DeleteSoldeCongeEmployee(int id)
        {
            var soldeCongeEmployee = await _context.soldeCongeEmployees.FindAsync(id);
            if (soldeCongeEmployee == null)
            {
                return NotFound();
            }

            _context.soldeCongeEmployees.Remove(soldeCongeEmployee);
            await _context.SaveChangesAsync();

            return soldeCongeEmployee;
        }

        private bool SoldeCongeEmployeeExists(int id)
        {
            return _context.soldeCongeEmployees.Any(e => e.Id == id);
        }
    }
}
