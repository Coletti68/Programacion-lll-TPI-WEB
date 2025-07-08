using System.ComponentModel.DataAnnotations;
namespace MVCAlquilerAutos.Models;
public class Register
{
	[Required]
	public string Nombre { get; set; }

	[Required]
	public string Usuario { get; set; }

	[Required]
	[EmailAddress]
	public string Email { get; set; }

	[Required]
	[DataType(DataType.Password)]
	public string Contrasena { get; set; }
}