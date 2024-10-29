import React from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import Navbar2 from "./components/NavBar2";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

import Inicio from "./components/Inicio";
import Nosotros from "./components/Nosotros";
import Experiencia from "./components/Experiencia";
import Cursos from "./components/Cursos";
import RegisterForm from "./components/RegisterForm";
import SesionForm from "./components/SesionForm";
import Classroom from "./components/classroom";
import AulaInteractiva from "./components/AulaInteractiva";
import Noticias from "./components/Noticias";
import IndicadoresDeStock from "./components/IndicadoresDeStock";
import Caja from "./components/Caja";
import ChatBot from "./components/ChatBot";
import Videoconferencias from "./components/Videoconferencias"; // VideoCall and Chat
import Formulario from "./components/Formulario";

import Acciones from "./components/acciones";
import Fondos from "./components/fondos";
import Futuros from "./components/futuros";
import Indices from "./components/indices";
import Bonos from "./components/bonos";
import Economias from "./components/economias";

import Room from "./components/Room";
import PayPal from "./components/PayPal";

import CajaInicio from "./components/CajaInicio";

function MainContent() {
  const location = useLocation();

  const showNavbar = [
    "/",
    "/nosotros",
    "/experiencia",
    "/cursos",
    "/register",
    "/login",
  ];
  const showNavbar2 = [
    "/classroom",
    "/AulaInteractiva",
    "/Noticias",
    "/IndicadoresDeStock",
    "/Caja",
    "/ChatBot",
    "/Videoconferencias",
    "/acciones",
    "/fondos",
    "/futuros",
    "/indices",
    "/bonos",
    "/economias",
  ];
  const showFooter = [
    "/",
    "/nosotros",
    "/experiencia",
    "/cursos",
    "/register",
    "/login",
    "/classroom",
    "/AulaInteractiva",
    "/Noticias",
    "/IndicadoresDeStock",
    "/Caja",
    "/ChatBot",
    "/Videoconferencias",
    "/acciones",
    "/fondos",
    "/futuros",
    "/indices",
    "/bonos",
    "/economias",
    "/form",
  ];

  return (
    <>
      {showNavbar.includes(location.pathname) && <Navbar />}
      {showNavbar2.includes(location.pathname) && <Navbar2 />}

      <div className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/experiencia" element={<Experiencia />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<SesionForm />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/AulaInteractiva" element={<AulaInteractiva />} />
          <Route path="/Noticias" element={<Noticias />} />
          <Route path="/IndicadoresDeStock" element={<IndicadoresDeStock />} />
          <Route path="/Caja" element={<Caja />} />
          <Route path="/ChatBot" element={<ChatBot />} />
          <Route path="/acciones" element={<Acciones />} />
          <Route path="/fondos" element={<Fondos />} />
          <Route path="/futuros" element={<Futuros />} />
          <Route path="/indices" element={<Indices />} />
          <Route path="/bonos" element={<Bonos />} />
          <Route path="/economias" element={<Economias />} />
          <Route path="/form" element={<Formulario />} />

          {/* Ruta para la página de videoconferencias */}
          <Route path="/Videoconferencias" element={<Videoconferencias />} />
          <Route path="/room/:roomID" element={<Room />} />

          <Route path="/PayPal" element={<PayPal />} />

          <Route path="/CajaInicio" element={<CajaInicio />} />
        </Routes>
      </div>

      {showFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
