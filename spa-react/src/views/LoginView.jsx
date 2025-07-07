import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../api/auth/login';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarModalInicio, setMostrarModalInicio] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = await iniciarSesion(email, password);
      setMostrarModalInicio(true); // Mostramos el modal facherito
    } catch (error) {
      alert('❌ Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <>
      <section className="py-5" style={{ backgroundColor: '#16213e' }}>
        <div className="container">
          <div
            className="auth-container mx-auto p-4 p-md-5 rounded shadow"
            style={{ maxWidth: '500px', backgroundColor: '#ffffff' }}
          >
            <h2 className="text-center mb-4 neon-text-b">Inicie sesión</h2>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control neon-input-light"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="position-relative">
                  <input
                    type="password"
                    className="form-control pe-5"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0"
                    tabIndex="-1"
                  >
                    <i className="bi bi-eye-fill fs-5 text-primary"></i>
                  </button>
                </div>
              </div>

              <a href="#" className="d-block mb-3 text-decoration-none text-secondary">
                ¿Olvidaste tu contraseña?
              </a>

              <div className="d-grid mt-4">
                <button type="submit" className="btn neon-btn-black">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ✅ Modal pos-login */}
      {mostrarModalInicio && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border border-success">
              <div className="modal-header">
                <h5 className="modal-title text-success">🎉 Inicio de sesión exitoso</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarModalInicio(false)}></button>
              </div>
              <div className="modal-body">
                <p>¡Bienvenido/a! ¿Querés ir a ver la flota y arrancar tu alquiler?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-success"
                  onClick={() => {
                    setMostrarModalInicio(false);
                    navigate('/vehiculos');
                  }}
                >
                  Ver Flota 🚗
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setMostrarModalInicio(false);
                    navigate('/');
                  }}
                >
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}