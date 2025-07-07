import { useState } from 'react';
import { registrarUsuario } from '../api/auth/register';
import { useNavigate } from 'react-router-dom';

export default function RegisterView() {
  const [pais, setPais] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const usuario = {
      pais,
      nombre,
      password,
      dni,
      fechaNacimiento,
      telefono,
      email,
      direccion,
    };

    const reglasDni = {
      Argentina: 8,
      Brasil: 11,
      Paraguay: 6,
      Chile: 9,
    };

    if (reglasDni[pais]) {
      const longitudEsperada = reglasDni[pais];
      if (!dni || dni.length !== longitudEsperada) {
        alert(`El DNI debe tener ${longitudEsperada} dígitos para ${pais}`);
        return;
      }
    }

    try {
      await registrarUsuario(usuario);
      setMostrarModalRegistro(true);
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  return (
    <>
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
        <div className="container">
          <div
            className="auth-container mx-auto p-4 p-md-5 rounded shadow-lg text-white neon-glow"
            style={{ maxWidth: '600px' }}
          >
            <h2 className="text-center mb-4 neon-text-b">Crear Cuenta</h2>
            <form onSubmit={handleRegister}>
              {/* País */}
              <div className="mb-3">
                <label className="form-label">País</label>
                <select className="form-select neon-input" value={pais} onChange={(e) => setPais(e.target.value)}>
                  <option value="">Seleccione su país</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Chile">Chile</option>
                </select>
              </div>

              {/* Nombre */}
              <div className="mb-3">
                <label className="form-label">Nombre completo *</label>
                <input
                  type="text"
                  className="form-control neon-input"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label className="form-label">Contraseña *</label>
                <input
                  type="password"
                  className="form-control neon-input"
                  placeholder="Mínimo 6 caracteres"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* DNI */}
              <div className="mb-3">
                <label className="form-label">DNI</label>
                <input
                  type="text"
                  className="form-control neon-input"
                  placeholder="Ingrese su documento"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />
              </div>

              {/* Fecha de nacimiento */}
              <div className="mb-3">
                <label className="form-label">Fecha de nacimiento</label>
                <input
                  type="date"
                  className="form-control neon-input"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>

              {/* Teléfono */}
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control neon-input"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Correo electrónico *</label>
                <input
                  type="email"
                  className="form-control neon-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Dirección */}
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control neon-input"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn neon-btn-black">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 🟢 Modal de confirmación post-registro */}
      {mostrarModalRegistro && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border border-success">
              <div className="modal-header">
                <h5 className="modal-title text-success">✅ Registro Exitoso</h5>
                <button className="btn-close" onClick={() => setMostrarModalRegistro(false)}></button>
              </div>
              <div className="modal-body">
                <p>¡Tu cuenta fue creada correctamente! ¿Querés iniciar sesión ahora?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-success" onClick={() => navigate('/login')}>
                  Iniciar Sesión
                </button>
                <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
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
