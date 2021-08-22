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
    public class ClassProjetsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ClassProjetsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ClassProjets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassProjet>>> GetclassProjets()
        {
            return await _context.classProjets.ToListAsync();
        }

        // GET: api/ClassProjets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassProjet>> GetClassProjet(int id)
        {
            var classProjet = await _context.classProjets.FindAsync(id);

            if (classProjet == null)
            {
                return NotFound();
            }

            return classProjet;
        }

        // PUT: api/ClassProjets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassProjet(int id, ClassProjet classProjet)
        {
            if (id != classProjet.Id)
            {
                return BadRequest();
            }

            _context.Entry(classProjet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassProjetExists(id))
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

        // POST: api/ClassProjets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ClassProjet>> PostClassProjet(ClassProjet classProjet)
        {
            _context.classProjets.Add(classProjet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClassProjet", new { id = classProjet.Id }, classProjet);
        }

        // DELETE: api/ClassProjets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClassProjet>> DeleteClassProjet(int id)
        {
            var classProjet = await _context.classProjets.FindAsync(id);
            if (classProjet == null)
            {
                return NotFound();
            }

            _context.classProjets.Remove(classProjet);
            await _context.SaveChangesAsync();

            return classProjet;
        }

        private bool ClassProjetExists(int id)
        {
            return _context.classProjets.Any(e => e.Id == id);
        }
    }
}
