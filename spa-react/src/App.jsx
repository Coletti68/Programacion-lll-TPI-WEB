import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import VehicleCatalog from './views/VehicleCatalog';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ContactoView from './views/ContactoView';
import PerfilView from './views/PerfilView';

// import HistorialAlquileres from './views/HistorialAlquileres'; // si lo usás después

function App() {
  return (
    <Router>
      <NavBar/>
      <main className="mt-5 pt-4">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/vehiculos" element={<VehicleCatalog />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/registro" element={<RegisterView />} />
          <Route path="/contacto" element={<ContactoView />} />
          <Route path="/perfil" element={<PerfilView />} />

          {/* <Route path="/historial" element={<HistorialAlquileres />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;