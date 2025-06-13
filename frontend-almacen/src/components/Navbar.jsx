import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem("usuario");
      setUsuario(userData ? JSON.parse(userData) : null);
    };

    checkUser();

    
    window.addEventListener('storage', checkUser);
    
    
    return () => {
      window.removeEventListener('storage', checkUser);
    }
  }, [navigate]); 

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null); 
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">🧮 Almacén App</span>
        {/* Si hay un usuario, muestra los enlaces protegidos */}
        {usuario && (
          <>
            <Link to="/" className="navbar-link">Inicio</Link>
            <Link to="/productos" className="navbar-link">Productos</Link>
            <Link to="/movimientos" className="navbar-link">Movimientos</Link>

            {usuario.rol === "admin" && (
              <>
                <Link to="/productos/nuevo" className="navbar-link">Agregar producto</Link>
                <Link to="/categorias/nueva" className="navbar-link">Agregar categoría</Link>
              </>
            )}
          </>
        )}
      </div>

      <div className="navbar-right">
        {/* Si hay un usuario, muestra el botón de cerrar sesión */}
        {usuario ? (
          <button className="logout-button" onClick={logout}>Cerrar sesión</button>
        ) : (
          <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
}