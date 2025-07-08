using System.Text.Json.Serialization;


namespace MVCAlquilerAutos.Models;


    public class UsuarioViewModel
    {
        public int UsuarioId { get; set; }

        [JsonPropertyName("nombreCompleto")]
        public string NombreCompleto { get; set; }

        public string DNI { get; set; }

        public DateTime FechaNacimiento { get; set; }

        public string Telefono { get; set; }

        public string Email { get; set; }

        public string Pais { get; set; }

        public string Direccion { get; set; }

        public DateTime FechaRegistro { get; set; }

        public bool Activo { get; set; }
    }