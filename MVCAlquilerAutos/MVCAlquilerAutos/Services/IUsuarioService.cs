using MVCAlquilerAutos.Models;

namespace MVCAlquilerAutos.Services
{
    public interface IUsuarioService
    {
        Task<List<UsuarioViewModel>> ObtenerUsuariosAsync();
        Task<UsuarioViewModel?> ObtenerPorIdAsync(int id);
        Task<bool> ActualizarAsync(UsuarioViewModel model);
        Task<bool> EliminarAsync(int id);
    }
}