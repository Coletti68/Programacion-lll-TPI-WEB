using Microsoft.AspNetCore.Mvc;
using MVCAlquilerAutos.Services;

using Microsoft.AspNetCore.Mvc;
using MVCAlquilerAutos.Models;
using MVCAlquilerAutos.Services;

namespace MVCAlquilerAutos.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        // GET: /Usuario
        public async Task<IActionResult> Index()
        {
            var usuarios = await _usuarioService.ObtenerUsuariosAsync();
            return View(usuarios);
        }

        // GET: /Usuario/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            var usuario = await _usuarioService.ObtenerPorIdAsync(id);
            if (usuario == null) return NotFound();
            return View(usuario);
        }

        // POST: /Usuario/Edit
        [HttpPost]
        public async Task<IActionResult> Edit(UsuarioViewModel model)
        {
            if (!ModelState.IsValid) return View(model);

            var actualizado = await _usuarioService.ActualizarAsync(model);
            if (!actualizado) return BadRequest("No se pudo actualizar el usuario.");

            return RedirectToAction("Index");
        }

        // GET: /Usuario/Delete/5
        public async Task<IActionResult> Delete(int id)
        {
            var eliminado = await _usuarioService.EliminarAsync(id);
            if (!eliminado) return BadRequest("No se pudo eliminar el usuario.");

            return RedirectToAction("Index");
        }
    }
}