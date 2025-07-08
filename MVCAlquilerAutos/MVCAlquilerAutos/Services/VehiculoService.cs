using MVCAlquilerAutos.Models;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;

namespace MVCAlquilerAutos.Services
{
    public class VehiculoService : IVehiculoService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl = "api/Vehiculos/listado";

        public VehiculoService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Vehiculo>> GetVehiculosAsync()
        {
            var response = await _httpClient.GetFromJsonAsync<Vehiculo[]>(_baseUrl);
            return response?.ToList() ?? new List<Vehiculo>();
        }

        public async Task<Vehiculo?> GetVehiculoByIdAsync(int id)
        {
            return await _httpClient.GetFromJsonAsync<Vehiculo>($"{_baseUrl}/{id}");
        }

        public async Task<bool> CreateVehiculoAsync(Vehiculo vehiculo)
        {
            var response = await _httpClient.PostAsJsonAsync(_baseUrl, vehiculo);
            return response.IsSuccessStatusCode;
        }
    }
}

