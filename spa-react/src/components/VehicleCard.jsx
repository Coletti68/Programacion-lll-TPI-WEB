export default function VehicleCard({ vehiculo, onAlquilar }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="vehicle-card p-3 rounded shadow text-white">
        <img src={vehiculo.imagen} alt={vehiculo.modelo} className="img-fluid mb-3 vehicle-img" />
        <h5>{vehiculo.marca} {vehiculo.modelo}</h5>
        <p>{vehiculo.descripcion}</p>
        <p><strong>Precio por día:</strong> ARS {vehiculo.precio}</p>
        <button className="btn neon-btn mt-2" onClick={() => onAlquilar(vehiculo)}>
          Alquilar
        </button>
      </div>
    </div>
  );
}