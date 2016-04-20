using Chloe.Server.Dtos;
using Chloe.Server.Services.Contracts;
using System.Web.Http;
using System.Web.Http.Description;

namespace Chloe.Server.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        public UserController(IUserService service)
        {
            this.service = service;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        [ResponseType(typeof(RegistrationResponseDto))]
        public IHttpActionResult Register(RegistrationRequestDto request)
        {
            return Ok(this.service.Register(request));
        }

        protected readonly IUserService service;
    }
}
