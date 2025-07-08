using Microsoft.AspNetCore.Mvc;
using MVCAlquilerAutos.Models;
using MVCAlquilerAutos.Services;



public class AccountController : Controller
{
    private readonly IAuthService _authService;

    public AccountController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpGet]
    public IActionResult Login() => View();

    [HttpPost]
    public async Task<IActionResult> Login(Login model)
    {
        if (!ModelState.IsValid) return View(model);

        var token = await _authService.LoginAsync(model);
        if (token == null)
        {
            ModelState.AddModelError("", "Credenciales inválidas.");
            return View(model);
        }

        HttpContext.Session.SetString("JWT", token);
        return RedirectToAction("Index", "Home");
    }

    [HttpGet]
    public IActionResult Register() => View();

    [HttpPost]
    public async Task<IActionResult> Register(Register model)
    {
        if (!ModelState.IsValid) return View(model);

        var success = await _authService.RegisterAsync(model);
        if (!success)
        {
            ModelState.AddModelError("", "Error al registrar usuario.");
            return View(model);
        }

        return RedirectToAction("Login");
    }

    public IActionResult Logout()
    {
        HttpContext.Session.Remove("JWT");
        return RedirectToAction("Login");
    }
}