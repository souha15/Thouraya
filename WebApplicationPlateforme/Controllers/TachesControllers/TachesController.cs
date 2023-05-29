﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Model.Taches;

namespace WebApplicationPlateforme.Controllers.TachesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TachesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TachesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Taches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tache>>> Gettache()
        {
            return await _context.tache.ToListAsync();
        }

        // GET: api/Taches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tache>> GetTache(int id)
        {
            var tache = await _context.tache.FindAsync(id);

            if (tache == null)
            {
                return NotFound();
            }

            return tache;
        }

        // PUT: api/Taches/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTache(int id, Tache tache)
        {
            if (id != tache.Id)
            {
                return BadRequest();
            }

            _context.Entry(tache).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TacheExists(id))
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

        // POST: api/Taches
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Tache>> PostTache(Tache tache)
        {
            _context.tache.Add(tache);
           // var tacheId = tache.Id;
       
         /*   tache.attachments.forEache(Attachment =>
            {
                Attachment.setTacheId(tache.id);
                _context.File.add(file);
            });*/
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTache", new { id = tache.Id }, tache);
        }

        // DELETE: api/Taches/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tache>> DeleteTache(int id)
        {
            var tache = await _context.tache.FindAsync(id);
            if (tache == null)
            {
                return NotFound();
            }

            _context.tache.Remove(tache);
            await _context.SaveChangesAsync();

            return tache;
        }

        private bool TacheExists(int id)
        {
            return _context.tache.Any(e => e.Id == id);
        }

        [HttpGet]
        [Route("SearchByEmployee/{Id}")]
        public List<Tache> SearchByAllEmployee(string Id)
        {
            return _context.tache.Where(item => item.AffectedName == Id).OrderByDescending(item => item.Id).ToList();
        }



        [HttpGet]
        [Route("SearchByEtat/{Etat}/{IdUser}")]
        public List<Tache> SearchByEtat(string Etat, string IdUser)
        {
            List<Tache> ListTaches = new List<Tache>();

            if (Etat == "1")
            {
                ListTaches = _context.tache.Where(item => item.Etat == "في الإنتظار" && item.AffectedName == IdUser).OrderByDescending(item => item.Id).ToList();

            }

            else if (Etat == "2")
            {
                ListTaches = _context.tache.Where(item => item.Etat == "تحت الإجراء" && item.AffectedName == IdUser).OrderByDescending(item => item.Id).ToList();
            }
            else if (Etat == "3")
            {
                ListTaches = _context.tache.Where(item => item.Etat == "منجزة" && item.AffectedName == IdUser).OrderByDescending(item => item.Id).ToList();
            }
            else if (Etat == "4")
            {
                ListTaches = _context.tache.Where(item => item.Etat == "غير منجزة" && item.AffectedName == IdUser).OrderByDescending(item => item.Id).ToList();
            }
            else if (Etat == "5")
            {
                ListTaches = _context.tache.Where(item => item.Etat == "متاخرة" && item.AffectedName == IdUser).OrderByDescending(item => item.Id).ToList();
            }
            else if (Etat == "6")
            {
                ListTaches = _context.tache.Where(item => item.Etat == "للتقييم" && item.AffectedName == IdUser).OrderByDescending(item => item.Id).ToList();
            }
            else if (Etat == "7")
            {
                ListTaches = _context.tache.Where(item => item.Etat == "مغلقة" && item.AffectedName == IdUser).OrderByDescending(item => item.Id).ToList();
            }
            return ListTaches;
        }
    }
}
