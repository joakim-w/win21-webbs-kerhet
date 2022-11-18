using bloggi.Data;
using bloggi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace bloggi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly DataContext _context;

        public PostsController(DataContext context)
        {
            _context = context;
        }


        // GET: api/Posts
        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            return new OkObjectResult(await _context.Posts.ToListAsync());
        }


        [HttpPost]
        public async Task<IActionResult> CreatePost(PostRequest post)
        {
            try
            {
                var postEntity = new PostEntity
                {
                    Title = post.Title,
                    Body = post.Body
                };

                _context.Posts.Add(postEntity);
                await _context.SaveChangesAsync();
                return new CreatedResult($"https://localhost:7164/api/Posts/{postEntity.Id}", postEntity);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
            return new BadRequestResult();
        }
    }
}
