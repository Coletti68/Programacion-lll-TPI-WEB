using Microsoft.AspNetCore.Mvc;
using MVCAlquilerAutos.Models;
using MVCAlquilerAutos.Services;

namespace MVCAlquilerAutos.Controllers
{
    public class VehiculosController : Controller
    {
        private readonly VehiculoService _vehiculoService;

        public VehiculosController()
        {
            _vehiculoService = new VehiculoService();
        }

        public async Task<IActionResult> Index()
        {
            var vehiculos = await _vehiculoService.GetListadoDetalladoAsync();
            return View(vehiculos);
        }


        // GET: /Vehiculos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: /Vehiculos/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Vehiculo vehiculo)
        {
            if (ModelState.IsValid)
            {
                var success = await _vehiculoService.CreateVehiculoAsync(vehiculo);
                if (success)
                    return RedirectToAction(nameof(Index));
            }
            return View(vehiculo);
        }

        // GET: /Vehiculos/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            var vehiculo = await _vehiculoService.GetVehiculoByIdAsync(id);
            if (vehiculo == null)
                return NotFound();
            return View(vehiculo);
        }

        // POST: /Vehiculos/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Vehiculo vehiculo)
        {
            if (id != vehiculo.VehiculoId)
                return BadRequest();

            if (ModelState.IsValid)
            {
                var success = await _vehiculoService.UpdateVehiculoAsync(id, vehiculo);
                if (success)
                    return RedirectToAction(nameof(Index));
            }
            return View(vehiculo);
        }

        // GET: /Vehiculos/Delete/5
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _vehiculoService.DeleteVehiculoAsync(id);
            return RedirectToAction(nameof(Index));
        }

        // POST: /Vehiculos/CambiarEstado/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CambiarEstado(int id)
        {
            var vehiculo = await _vehiculoService.GetVehiculoByIdAsync(id);
            if (vehiculo == null)
                return NotFound();

            // Cambiar "Activo" <-> "Inactivo"
            var nuevoEstado = vehiculo.Estado == "Activo" ? "Inactivo" : "Activo";

            var success = await _vehiculoService.CambiarEstadoVehiculoAsync(id, nuevoEstado);
            return RedirectToAction(nameof(Index));
        }
    }
}
