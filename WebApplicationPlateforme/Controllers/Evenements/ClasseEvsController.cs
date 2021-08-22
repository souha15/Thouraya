using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Evenements;

namespace WebApplicationPlateforme.Controllers.Evenements
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClasseEvsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ClasseEvsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ClasseEvs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClasseEv>>> GetclasseEvs()
        {
            return await _context.classeEvs.ToListAsync();
        }

        // GET: api/ClasseEvs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClasseEv>> GetClasseEv(int id)
        {
            var classeEv = await _context.classeEvs.FindAsync(id);

            if (classeEv == null)
            {
                return NotFound();
            }

            return classeEv;
        }

        // PUT: api/ClasseEvs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClasseEv(int id, ClasseEv classeEv)
        {
            if (id != classeEv.Id)
            {
                return BadRequest();
            }

            _context.Entry(classeEv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClasseEvExists(id))
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

        // POST: api/ClasseEvs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ClasseEv>> PostClasseEv(ClasseEv classeEv)
        {
            _context.classeEvs.Add(classeEv);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClasseEv", new { id = classeEv.Id }, classeEv);
        }

        // DELETE: api/ClasseEvs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClasseEv>> DeleteClasseEv(int id)
        {
            var classeEv = await _context.classeEvs.FindAsync(id);
            if (classeEv == null)
            {
                return NotFound();
            }

            _context.classeEvs.Remove(classeEv);
            await _context.SaveChangesAsync();

            return classeEv;
        }

        private bool ClasseEvExists(int id)
        {
            return _context.classeEvs.Any(e => e.Id == id);
        }
    }
}
