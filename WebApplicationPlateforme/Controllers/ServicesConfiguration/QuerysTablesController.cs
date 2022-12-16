using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;

namespace WebApplicationPlateforme.Controllers.ServicesConfiguration
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuerysTablesController : ControllerBase
    {
        private readonly DawaaContext _context;

        public QuerysTablesController(DawaaContext context)
        {
            _context = context;
        }

        // GET: api/QuerysTables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuerysTable>>> GetQuerysTables()
        {
            return await _context.QuerysTables.ToListAsync();
        }

        // GET: api/QuerysTables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuerysTable>> GetQuerysTable(int id)
        {
            var querysTable = await _context.QuerysTables.FindAsync(id);

            if (querysTable == null)
            {
                return NotFound();
            }

            return querysTable;
        }

        // PUT: api/QuerysTables/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuerysTable(int id, QuerysTable querysTable)
        {
            if (id != querysTable.Id)
            {
                return BadRequest();
            }

            _context.Entry(querysTable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuerysTableExists(id))
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

        // POST: api/QuerysTables
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<QuerysTable>> PostQuerysTable(QuerysTable querysTable)
        {
            _context.QuerysTables.Add(querysTable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuerysTable", new { id = querysTable.Id }, querysTable);
        }

        // DELETE: api/QuerysTables/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuerysTable>> DeleteQuerysTable(int id)
        {
            var querysTable = await _context.QuerysTables.FindAsync(id);
            if (querysTable == null)
            {
                return NotFound();
            }

            _context.QuerysTables.Remove(querysTable);
            await _context.SaveChangesAsync();

            return querysTable;
        }

        private bool QuerysTableExists(int id)
        {
            return _context.QuerysTables.Any(e => e.Id == id);
        }
    }
}
