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
    public class InterviewsController : ControllerBase
    {
        private readonly FinanceContext _context;

        public InterviewsController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/Interviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Interview>>> GetInterviews()
        {
            return await _context.Interviews.OrderBy(item => item.Id).ToListAsync();
        }

        // GET: api/Interviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Interview>> GetInterview(int id)
        {
            var interview = await _context.Interviews.FindAsync(id);

            if (interview == null)
            {
                return NotFound();
            }

            return interview;
        }

        // PUT: api/Interviews/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInterview(int id, Interview interview)
        {
            if (id != interview.Id)
            {
                return BadRequest();
            }

            _context.Entry(interview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InterviewExists(id))
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

        // POST: api/Interviews
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Interview>> PostInterview(Interview interview)
        {
            _context.Interviews.Add(interview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInterview", new { id = interview.Id }, interview);
        }

        // DELETE: api/Interviews/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Interview>> DeleteInterview(int id)
        {
            var interview = await _context.Interviews.FindAsync(id);
            if (interview == null)
            {
                return NotFound();
            }

            _context.Interviews.Remove(interview);
            await _context.SaveChangesAsync();

            return interview;
        }

        private bool InterviewExists(int id)
        {
            return _context.Interviews.Any(e => e.Id == id);
        }
    }
}
