using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Media_Center.InterviewPart;

namespace WebApplicationPlateforme.Controllers.MediaCenter.InterviewPart
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeInterviewsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TypeInterviewsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/TypeInterviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeInterview>>> GetTypeInterviews()
        {
            return await _context.TypeInterviews.ToListAsync();
        }

        // GET: api/TypeInterviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeInterview>> GetTypeInterview(int id)
        {
            var typeInterview = await _context.TypeInterviews.FindAsync(id);

            if (typeInterview == null)
            {
                return NotFound();
            }

            return typeInterview;
        }

        // PUT: api/TypeInterviews/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeInterview(int id, TypeInterview typeInterview)
        {
            if (id != typeInterview.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeInterview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeInterviewExists(id))
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

        // POST: api/TypeInterviews
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypeInterview>> PostTypeInterview(TypeInterview typeInterview)
        {
            _context.TypeInterviews.Add(typeInterview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeInterview", new { id = typeInterview.Id }, typeInterview);
        }

        // DELETE: api/TypeInterviews/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypeInterview>> DeleteTypeInterview(int id)
        {
            var typeInterview = await _context.TypeInterviews.FindAsync(id);
            if (typeInterview == null)
            {
                return NotFound();
            }

            _context.TypeInterviews.Remove(typeInterview);
            await _context.SaveChangesAsync();

            return typeInterview;
        }

        private bool TypeInterviewExists(int id)
        {
            return _context.TypeInterviews.Any(e => e.Id == id);
        }
    }
}
