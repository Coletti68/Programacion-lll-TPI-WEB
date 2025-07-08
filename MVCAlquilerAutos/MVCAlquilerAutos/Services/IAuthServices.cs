using System.Threading.Tasks;
using MVCAlquilerAutos.Models;
namespace MVCAlquilerAutos.Services;


public interface IAuthService
{
    Task<string> LoginAsync(Login model);
    Task<bool> RegisterAsync(Register model);
}