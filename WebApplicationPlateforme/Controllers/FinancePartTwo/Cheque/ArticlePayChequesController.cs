using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.FinancePartTwo.Cheques;

namespace WebApplicationPlateforme.Controllers.FinancePartTwo.Cheque
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlePayChequesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ArticlePayChequesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/ArticlePayCheques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticlePayCheque>>> GetarticlePayCheques()
        {
            return await _context.articlePayCheques.ToListAsync();
        }

        // GET: api/ArticlePayCheques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ArticlePayCheque>> GetArticlePayCheque(int id)
        {
            var articlePayCheque = await _context.articlePayCheques.FindAsync(id);

            if (articlePayCheque == null)
            {
                return NotFound();
            }

            return articlePayCheque;
        }

        // PUT: api/ArticlePayCheques/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticlePayCheque(int id, ArticlePayCheque articlePayCheque)
        {
            if (id != articlePayCheque.Id)
            {
                return BadRequest();
            }

            _context.Entry(articlePayCheque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticlePayChequeExists(id))
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

        // POST: api/ArticlePayCheques
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ArticlePayCheque>> PostArticlePayCheque(ArticlePayCheque articlePayCheque)
        {
            _context.articlePayCheques.Add(articlePayCheque);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticlePayCheque", new { id = articlePayCheque.Id }, articlePayCheque);
        }

        // DELETE: api/ArticlePayCheques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArticlePayCheque>> DeleteArticlePayCheque(int id)
        {
            var articlePayCheque = await _context.articlePayCheques.FindAsync(id);
            if (articlePayCheque == null)
            {
                return NotFound();
            }

            _context.articlePayCheques.Remove(articlePayCheque);
            await _context.SaveChangesAsync();

            return articlePayCheque;
        }

        private bool ArticlePayChequeExists(int id)
        {
            return _context.articlePayCheques.Any(e => e.Id == id);
        }
    }
}
