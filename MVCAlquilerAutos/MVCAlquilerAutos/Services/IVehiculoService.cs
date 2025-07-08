using MVCAlquilerAutos.Models;

namespace MVCAlquilerAutos.Services
{
    public interface IVehiculoService
    {
        Task<List<Vehiculo>> GetVehiculosAsync();
        Task<Vehiculo?> GetVehiculoByIdAsync(int id);
        Task<bool> CreateVehiculoAsync(Vehiculo vehiculo);
    }
}
