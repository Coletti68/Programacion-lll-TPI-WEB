using System.Net.Http.Json;
using MVCAlquilerAutos.Models;
using MVCAlquilerAutos.Services;
using System.Text;
using System.Text.Json;

namespace MVCAlquilerAutos.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly HttpClient _http;
        private readonly JsonSerializerOptions _jsonOptions;

        public UsuarioService(HttpClient http)
        {
            _http = http;
            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
        }

        public async Task<List<UsuarioViewModel>> ObtenerUsuariosAsync()
        {
            var response = await _http.GetAsync("api/usuario");
            if (!response.IsSuccessStatusCode) return new List<UsuarioViewModel>();

            var usuarios = await response.Content.ReadFromJsonAsync<List<UsuarioViewModel>>(_jsonOptions);
            return usuarios ?? new List<UsuarioViewModel>();
        }

        public async Task<UsuarioViewModel?> ObtenerPorIdAsync(int id)
        {
            var response = await _http.GetAsync($"api/usuario/{id}");
            if (!response.IsSuccessStatusCode) return null;

            return await response.Content.ReadFromJsonAsync<UsuarioViewModel>(_jsonOptions);
        }

        public async Task<bool> ActualizarAsync(UsuarioViewModel model)
        {
            var content = new StringContent(JsonSerializer.Serialize(model), Encoding.UTF8, "application/json");
            var response = await _http.PutAsync($"api/usuario/{model.UsuarioId}", content);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> EliminarAsync(int id)
        {
            var response = await _http.DeleteAsync($"api/usuario/{id}");
            return response.IsSuccessStatusCode;
        }
    }
}