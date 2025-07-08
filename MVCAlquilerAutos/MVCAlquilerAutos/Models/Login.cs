
using System.ComponentModel.DataAnnotations;

namespace MVCAlquilerAutos.Models;

public class Login
{
    [Required]
    public string Usuario { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Contrasena { get; set; }
}