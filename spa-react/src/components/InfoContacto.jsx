export default function InfoContacto() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="contact-info">
            <h3 className="mb-4">Información de Contacto</h3>
            <p><i className="fas fa-phone me-2"></i> Teléfono: 3777-885466</p>
            <p><i className="fas fa-phone me-2"></i> Teléfono Secundario: 3777-996577</p>
            <p><i className="fas fa-envelope me-2"></i> Email: AlquilerFacil@gmail.com</p>
            <p><i className="fas fa-map-marker-alt me-2"></i> Dirección: Av. Sarmiento 500, Goya, Corrientes</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!...tu_link..."
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Goya"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}