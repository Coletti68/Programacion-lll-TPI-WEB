import BienvenidaHero from '../components/BienvenidaHero';
import InfoContacto from '../components/InfoContacto';

export default function HomeView() {
  return (
    <section id="home-section">
      <BienvenidaHero />
      <InfoContacto />
    </section>
  );
}