using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebApi_Cors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {

        [HttpGet]
        [Route("test1")]
        [EnableCors("react")]
        public IActionResult Test1()
        {
            return new OkObjectResult(JsonConvert.SerializeObject(new { message = "test1" }));
        }

        [HttpGet]
        [Route("test2")]
        [EnableCors("liveserver")]
        public IActionResult Test2()
        {
            return new OkObjectResult(JsonConvert.SerializeObject(new { message = "test2" }));
        }

    }
}
