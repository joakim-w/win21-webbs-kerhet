﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using asp.net_xss.Data;
using asp.net_xss.Models;
using System.Text.RegularExpressions;
using System.Web;

namespace asp.net_xss.Controllers
{
    public class MessagesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private string[] _tagsAllowed = new string[] { "<b>", "</b>", "<i>", "</i>", "<h2>", "</h2>" };

        public MessagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Messages
        public async Task<IActionResult> Index()
        {
            List<MessageEntity> Messages = await _context.Messages.ToListAsync();
            foreach (var message in Messages)
            {
                message.Body = HttpUtility.HtmlEncode(message.Body);
            }

            

              return View(Messages);
        }

        // GET: Messages/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.Messages == null)
            {
                return NotFound();
            }

            var messageEntity = await _context.Messages
                .FirstOrDefaultAsync(m => m.Id == id);
            if (messageEntity == null)
            {
                return NotFound();
            }

            return View(messageEntity);
        }

        // GET: Messages/Create
        public IActionResult Create()
        {
            return View();
        }



        // POST: Messages/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Body")] MessageEntity messageEntity)
        {
            if (ModelState.IsValid)
            {
                messageEntity.Id = Guid.NewGuid();

                /*
                Regex scriptRegEx = new Regex(@"<script[^>]*>[\s\S]*?</script>");
                messageEntity.Body = scriptRegEx.Replace(messageEntity.Body, "");

                Regex onRegEx = new Regex(@"on[a-zA-Z=""'?&\-<>()0-9]*");
                messageEntity.Body = onRegEx.Replace(messageEntity.Body, "");
                */

                // &lt;b&gt; == <b>

                
                string encodedBody = HttpUtility.HtmlEncode(messageEntity.Body);

                foreach(var tag in _tagsAllowed)
                {
                    var encodedTag = HttpUtility.HtmlEncode(tag);
                    encodedBody = encodedBody.Replace(encodedTag, tag);
                }

                messageEntity.Body = encodedBody;
                


                _context.Add(messageEntity);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(messageEntity);
        }






        // GET: Messages/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.Messages == null)
            {
                return NotFound();
            }

            var messageEntity = await _context.Messages.FindAsync(id);
            if (messageEntity == null)
            {
                return NotFound();
            }
            return View(messageEntity);
        }

        // POST: Messages/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,Title,Body")] MessageEntity messageEntity)
        {
            if (id != messageEntity.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(messageEntity);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MessageEntityExists(messageEntity.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(messageEntity);
        }

        // GET: Messages/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.Messages == null)
            {
                return NotFound();
            }

            var messageEntity = await _context.Messages
                .FirstOrDefaultAsync(m => m.Id == id);
            if (messageEntity == null)
            {
                return NotFound();
            }

            return View(messageEntity);
        }

        // POST: Messages/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.Messages == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Messages'  is null.");
            }
            var messageEntity = await _context.Messages.FindAsync(id);
            if (messageEntity != null)
            {
                _context.Messages.Remove(messageEntity);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MessageEntityExists(Guid id)
        {
          return _context.Messages.Any(e => e.Id == id);
        }
    }
}
