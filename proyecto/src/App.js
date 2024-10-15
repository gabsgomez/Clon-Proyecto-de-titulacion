import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/NavBar';
import Navbar2 from './components/NavBar2';
import NavbarAdmin from './components/NavBarAdmin';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Inicio from './components/Inicio';
import Nosotros from './components/Nosotros';
import Experiencia from './components/Experiencia';
import Cursos from './components/Cursos';
import RegisterForm from './components/RegisterForm';
import SesionForm from './components/SesionForm';
import Classroom from './components/classroom';
import AulaInteractiva from './components/AulaInteractiva';
import Noticias from './components/Noticias';
import IndicadoresDeStock from './components/IndicadoresDeStock';
import Caja from './components/Caja';
import ChatBot from './components/ChatBot';
import Videoconferencias from './components/Videoconferencias'; // VideoCall and Chat

import Acciones from './components/acciones';
import Fondos from './components/fondos';
import Futuros from './components/futuros';
import Indices from './components/indices';
import Bonos from './components/bonos';
import Economias from './components/economias';

import Room from './components/Room';
import PayPal from './components/PayPal';

import CajaInicio from './components/CajaInicio';

import Administradores from './components/administradores';
import LoginAdministradores from './components/LoginAdministradores';

import AulaInteractivaAdmins from './components/AulaInteractivaAdmins';
import Alumnos from './components/Alumnos';
import Documentos from './components/Documentos';
import DocumentosAdmins from './components/DocumentosAdmins';

import ControlAdmins from './components/ControlAdmins';
import VideoconferenciasAdmins from './components/VideoconferenciasAdmins';

import CajaAdmins from './components/CajaAdmins';
import Precios from './components/Precios';
import Finanzas from './components/Finanzas';


function MainContent() {
  const location = useLocation();

  const showNavbar = ["/", "/nosotros", "/experiencia", "/cursos", "/register", "/login", "/LoginAdministradores"];
  const showNavbar2 = ["/classroom", "/AulaInteractiva", "/Documentos", "/Noticias", "/IndicadoresDeStock", "/Caja", "/ChatBot", "/Videoconferencias", "/acciones", "/fondos", "/futuros", "/indices", "/bonos", "/economias"];
  const showFooter = ["/", "/nosotros", "/experiencia", "/Documentos", "/cursos", "/register", "/login", "/classroom", "/AulaInteractiva", "/Noticias", "/IndicadoresDeStock", "/Caja", "/ChatBot", "/Videoconferencias", "/acciones", "/fondos", "/futuros", "/indices", "/bonos", "/economias"];
  const showNavBarAdmin = ["/administradores", "/AulaInteractivaAdmins", "/Precios", "/CajaAdmins", "/DocumentosAdmins", "/Finanzas", "/Alumnos", "/ControlAdmins", "/VideoconferenciasAdmins"];
  
  return (
    <>
      {showNavbar.includes(location.pathname) && <Navbar />}
      {showNavbar2.includes(location.pathname) && <Navbar2 />}
      {showNavBarAdmin.includes(location.pathname) && <NavbarAdmin />}
      
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
          <Route path="/Documentos" element={<Documentos/>} />
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
          <Route path="/administradores" element={<Administradores />} />
          <Route path="/LoginAdministradores" element={<LoginAdministradores />} />
          
          {/* Ruta para la página de videoconferencias */}
          <Route path="/Videoconferencias" element={<Videoconferencias />} />
          <Route path='/room/:roomID' element={<Room/>}/>


          <Route path="/PayPal" element={<PayPal/>}/>

          <Route path="/CajaInicio" element={<CajaInicio/>}/>
          
          <Route path="/AulaInteractivaAdmins" element={<AulaInteractivaAdmins />} />
          <Route path="/Alumnos" element={<Alumnos />} />
          <Route path="/DocumentosAdmins" element={<DocumentosAdmins/>} />
          <Route path="/ControlAdmins" element={<ControlAdmins />} />
          <Route path="/VideoconferenciasAdmins" element={<VideoconferenciasAdmins />} />
          
          <Route path="/CajaAdmins" element={<CajaAdmins />} />
          <Route path="/Finanzas" element={<Finanzas />} />
          <Route path="/Precios" element={<Precios />} />
          
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
