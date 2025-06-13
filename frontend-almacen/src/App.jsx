// frontend-almacen/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import ListaProductos from "./components/ListaProductos";
import FormularioProducto from "./components/FormularioProducto";
import ProtegidoAdmin from "./components/ProtegidoAdmin";
import FormularioCategoria from "./components/FormularioCategoria";
import VistaMovimientos from "./components/VistaMovimientos";
import Navbar from "./components/Navbar";

// Importamos los estilos globales
import './App.css';
import './styles/Listas.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container"> {/* Añadimos un 'main' con la clase container */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ListaProductos />} />
          
          {/* Rutas de Administrador */}
          <Route path="/productos/nuevo" element={<ProtegidoAdmin><FormularioProducto /></ProtegidoAdmin>}/>
          <Route path="/productos/editar/:id" element={<ProtegidoAdmin><FormularioProducto /></ProtegidoAdmin>}/>
          <Route path="/categorias/nueva" element={<ProtegidoAdmin><FormularioCategoria /></ProtegidoAdmin>}/>
          <Route path="/movimientos" element={<ProtegidoAdmin><VistaMovimientos /></ProtegidoAdmin>}/>
          
        </Routes>
      </main>
    </Router>
  );
}

export default App;