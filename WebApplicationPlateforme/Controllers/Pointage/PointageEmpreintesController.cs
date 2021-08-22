using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using ExcelDataReader;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Pointage;
using Microsoft.AspNetCore.Hosting;
using System.Net;
using WebApplicationPlateforme.Controllers.UserControllers;
using Microsoft.AspNetCore.Authorization;

namespace WebApplicationPlateforme.Controllers.Pointage
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointageEmpreintesController : ControllerBase
    {
        private readonly FinanceContext _context;

        private IHostingEnvironment _hostingEnvironment;
        public PointageEmpreintesController(FinanceContext context, IHostingEnvironment environment)
        {
            _context = context;
            _hostingEnvironment = environment;
        }



        [HttpPost]
        [Route("downloadPresence")]
        public async Task<ActionResult<IEnumerable<PointageEmpreinte>>> UploadReadPresence(string file)
        {

            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            var filePath = Path.Combine(uploads, file);
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyToAsync(memory);
                stream.Flush();

            }
            var empreintes = this.GetViaEmpreinteListPresence(filePath);
            //return empreintes;
            empreintes.ToArray();
            for (int i = 0; i < empreintes.Count; i++)
            {
                _context.PointageEmpreintes.Add(empreintes[i]);
                await _context.SaveChangesAsync();

            }
            return empreintes.ToArray();
        }

        private List<PointageEmpreinte> GetViaEmpreinteListPresence(string fName)
        {
            List<PointageEmpreinte> empreintes = new List<PointageEmpreinte>();

            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            var fileName = Path.Combine(uploads, fName);
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            if (Directory.Exists(uploads))
            {
                if (System.IO.File.Exists(fileName))
                {
                    using (var stream = System.IO.File.Open(fileName, FileMode.Open, FileAccess.Read))
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            while (reader.Read())
                            {
                                empreintes.Add(new PointageEmpreinte()
                                {
                                    attribut1 = fName.Substring(fName.IndexOf("uploads") + 8),
                                    numEmp = reader.GetValue(0).ToString(),
                                    date = reader.GetValue(1).ToString(),
                                    heureAssister = reader.GetValue(2).ToString(),
                                    present = "Presence" + reader.GetValue(1).ToString(),

                                });



                            }

                        }
                    }

                }
            }
            return empreintes;
        }

        [HttpPost]
        [Route("download")]
        public async Task<ActionResult<IEnumerable<PointageEmpreinte>>> UploadRead(string file)
        {

            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            var filePath = Path.Combine(uploads, file);
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyToAsync(memory);
                stream.Flush();

            }
            var empreintes = this.GetViaEmpreinteList(filePath);
            //return empreintes;
            empreintes.ToArray();
            for (int i = 0; i < empreintes.Count; i++)
            {
                _context.PointageEmpreintes.Add(empreintes[i]);
                await _context.SaveChangesAsync();

            }
            return empreintes.ToArray();
        }


        private List<PointageEmpreinte> GetViaEmpreinteList(string fName)
        {
            List<PointageEmpreinte> empreintes = new List<PointageEmpreinte>();

            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            var fileName = Path.Combine(uploads, fName);
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            if (Directory.Exists(uploads))
            {
                if (System.IO.File.Exists(fileName))
                {
                    using (var stream = System.IO.File.Open(fileName, FileMode.Open, FileAccess.Read))
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            while (reader.Read())
                            {
                                empreintes.Add(new PointageEmpreinte()
                                {
                                    attribut1 = fName.Substring(fName.IndexOf("uploads") + 8),
                                    numEmp = reader.GetValue(0).ToString(),
                                    date = reader.GetValue(1).ToString(),
                                    heureAssister = reader.GetValue(2).ToString(),
                                    heurePartir = reader.GetValue(3).ToString(),

                                });



                            }

                        }
                    }

                }
            }
            return empreintes;
        }
        // GET: api/PointageEmpreintes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PointageEmpreinte>>> GetPointageEmpreintes()
        {
            return await _context.PointageEmpreintes.ToListAsync();
        }

        // GET: api/PointageEmpreintes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PointageEmpreinte>> GetPointageEmpreinte(int id)
        {
            var pointageEmpreinte = await _context.PointageEmpreintes.FindAsync(id);

            if (pointageEmpreinte == null)
            {
                return NotFound();
            }

            return pointageEmpreinte;
        }

        // PUT: api/PointageEmpreintes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPointageEmpreinte(int id, PointageEmpreinte pointageEmpreinte)
        {
            if (id != pointageEmpreinte.Id)
            {
                return BadRequest();
            }

            _context.Entry(pointageEmpreinte).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PointageEmpreinteExists(id))
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

        // POST: api/PointageEmpreintes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
       /* [HttpPost]
        public async Task<ActionResult<PointageEmpreinte>> PostPointageEmpreinte(PointageEmpreinte pointageEmpreinte)
        {
            _context.PointageEmpreintes.Add(pointageEmpreinte);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPointageEmpreinte", new { id = pointageEmpreinte.Id }, pointageEmpreinte);
        }*/

        // DELETE: api/PointageEmpreintes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PointageEmpreinte>> DeletePointageEmpreinte(int id)
        {
            var pointageEmpreinte = await _context.PointageEmpreintes.FindAsync(id);
            if (pointageEmpreinte == null)
            {
                return NotFound();
            }

            _context.PointageEmpreintes.Remove(pointageEmpreinte);
            await _context.SaveChangesAsync();

            return pointageEmpreinte;
        }

        private bool PointageEmpreinteExists(int id)
        {
            return _context.PointageEmpreintes.Any(e => e.Id == id);
        }
    }
}
