using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspecialidadeController : ControllerBase
    {
        private IEspecialidadeRepository _repository;
        public EspecialidadeController()
        {
            _repository = new EspecialidadeRepository();
        }

        [HttpGet]
<<<<<<< HEAD
        public ActionResult Get() 
=======
        public IActionResult Get() 
>>>>>>> kallan
        {
            return Ok(_repository.Listar());
        }

        [HttpPost] 
<<<<<<< HEAD
        public ActionResult Post(Especialidade especialidade)
=======
        public IActionResult Post(Especialidade especialidade)
>>>>>>> kallan
        {
            _repository.Cadastrar(especialidade);
            
            return StatusCode(201);
        }

    }
}
