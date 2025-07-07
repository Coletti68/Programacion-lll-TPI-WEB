import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleCard from '../components/VehicleCard';
import ReservaModal from '../components/ReservaModal';
import { isAuthenticated } from '../utils/authService';

export default function VehicleCatalog() {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [mostrarModalAviso, setMostrarModalAviso] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/vehiculos')
      .then(res => res.json())
      .then(setVehiculos);
  }, []);

  const cerrarModal = () => setVehiculoSeleccionado(null);

  const handleAlquilar = (vehiculo) => {
    if (!isAuthenticated()) {
      setMostrarModalAviso(true);
      return;
    }
    setVehiculoSeleccionado(vehiculo);
  };

  return (
    <section className="py-5" style={{ background: 'linear-gradient(135deg, #0f0f1a, #1b1b3a)' }}>
      <div className="container text-white">
        <h2 className="text-center mb-5 neon-text">Nuestra Flota</h2>
        <div className="row">
          {vehiculos.map(vehiculo => (
            <VehicleCard key={vehiculo.id} vehiculo={vehiculo} onAlquilar={handleAlquilar} />
          ))}
        </div>
      </div>

      {/* Modal de reserva (solo si está logueado) */}
      {vehiculoSeleccionado && (
        <ReservaModal
          vehiculo={vehiculoSeleccionado}
          onClose={cerrarModal}
          onConfirm={() => {
            // lógica de POST /alquiler acá
            cerrarModal();
          }}
        />
      )}

      {/* Modal de aviso si no está logueado */}
      {mostrarModalAviso && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border border-danger">
              <div className="modal-header">
                <h5 className="modal-title text-danger fw-bold">🔒 Tenés que iniciar sesión</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarModalAviso(false)}></button>
              </div>
              <div className="modal-body">
                <p>Para realizar un alquiler necesitás estar registrado e iniciar sesión en el sistema.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-danger" onClick={() => navigate('/login')}>Iniciar Sesión</button>
                <button className="btn btn-outline-secondary" onClick={() => setMostrarModalAviso(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}