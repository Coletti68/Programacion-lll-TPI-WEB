import { useNavigate } from 'react-router-dom';
import { isAuthenticated, cerrarSesion } from '../utils/authService';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow-sm neon-navbar fixed-top">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4 neon-text" href="/">CarRentalEasy</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <a className="nav-link fw-semibold neon-link" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold neon-link" href="/vehiculos">Flota</a>
            </li>

            {!isAuthenticated() && (
              <>
                <li className="nav-item">
                  <a className="nav-link fw-semibold neon-link" href="/login">Iniciar Sesión</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-semibold neon-link" href="/registro">Registrarse</a>
                </li>
              </>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
                <button
                  className="btn neon-btn-rojo ms-2"
                  onClick={() => {
                    cerrarSesion();
                    navigate('/');
                  }}
                >
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}