using Microsoft.AspNetCore.Mvc;
using MVCAlquilerAutos.Models;
using MVCAlquilerAutos.Services;

namespace MVCAlquilerAutos.Controllers
{
    public class VehiculosController : Controller
    {
        private readonly IVehiculoService _vehiculoService;

        public VehiculosController(IVehiculoService vehiculoService)
        {
            _vehiculoService = vehiculoService;
        }

        public async Task<IActionResult> Index()
        {
            var vehiculos = await _vehiculoService.GetVehiculosAsync();
            return View(vehiculos.ToList());
        }

        public IActionResult Create()
        {
            return View();
        }

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
    }
}