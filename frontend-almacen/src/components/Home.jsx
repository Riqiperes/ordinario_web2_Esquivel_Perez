import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div id="div-home">
      <h2>Bienvenido al Almacén</h2>
      {usuario && (
        <div id="div-botones-home">
          <p>Rol: {usuario.rol}</p>

          <div id="div-boton-productos">
            <button onClick={() => navigate("/productos")}>Ver productos</button>
          </div>

          <div id="div-boton-movimientos">
            <button onClick={() => navigate("/movimientos")}>
                Movimientos de Inventario
            </button>
        </div>

          {usuario.rol === "admin" && (
            <>
            <div id="div-boton-agregar">
              <button onClick={() => navigate("/productos/nuevo")}>Agregar producto</button>


            </div>
            <div id="div-boton-categorias">
              <button onClick={() => navigate("/categorias/nueva")}>Agregar categoría</button>
            </div>
            </>
            
            
            
          )}

          <div id="div-boton-logout">
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      )}
    </div>
  );
}
