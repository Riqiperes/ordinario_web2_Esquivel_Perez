import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css"; // archivo que crearemos

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) setUsuario(JSON.parse(userData));
  }, []);

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  if (!usuario) return null;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">🧮 Almacén App</span>
        <Link to="/" className="navbar-link">Inicio</Link>
        <Link to="/productos" className="navbar-link">Productos</Link>
        <Link to="/movimientos" className="navbar-link">Movimientos</Link>

        {usuario.rol === "admin" && (
          <>
            <Link to="/productos/nuevo" className="navbar-link">Agregar producto</Link>
            <Link to="/categorias/nueva" className="navbar-link">Agregar categoría</Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        <button className="logout-button" onClick={logout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
