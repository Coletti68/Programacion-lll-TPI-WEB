using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using MVCAlquilerAutos.Models;
namespace MVCAlquilerAutos.Services;



public class AuthService : IAuthService
{
    private readonly HttpClient _http;

    public AuthService(HttpClient http)
    {
        _http = http;
    }

    public async Task<string> LoginAsync(Login model)
    {
        var response = await _http.PostAsJsonAsync("/api/Auth/login", model);
        if (!response.IsSuccessStatusCode) return null;

        var result = await response.Content.ReadFromJsonAsync<AuthResponse>();
        return result?.Token;
    }

    public async Task<bool> RegisterAsync(Register model)
    {
        var response = await _http.PostAsJsonAsync("/api/Usuario", model);
        return response.IsSuccessStatusCode;
    }
}

public class AuthResponse
{
    public string Token { get; set; }
}