import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import ListaProductos from "./components/ListaProductos";
import FormularioProducto from "./components/FormularioProducto";
import ProtegidoAdmin from "./components/ProtegidoAdmin";
import FormularioCategoria from "./components/FormularioCategoria";
import FormularioMovimiento from "./components/FormularioMovimiento";
import ListaMovimientos from "./components/ListaMovimientos";
import VistaMovimientos from "./components/VistaMovimientos";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ListaProductos />} />
        <Route path="/productos/nuevo" element={<ProtegidoAdmin><FormularioProducto /></ProtegidoAdmin>}/>
        <Route path="/categorias/nueva" element={<ProtegidoAdmin><FormularioCategoria /></ProtegidoAdmin>}/>
        
        <Route path="/movimientos" element={<ProtegidoAdmin><VistaMovimientos /></ProtegidoAdmin>}/>



        {/* Rutas futuras */}
      </Routes>
    </Router>
  );
}

export default App;
