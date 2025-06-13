

import { useState, useEffect } from 'react';

export default function Home() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    
    const datosUsuario = localStorage.getItem("usuario");
    if (datosUsuario) {
      setUsuario(JSON.parse(datosUsuario));
    }
  }, []);

  return (
    <div>
      <h1>¡Bienvenido al Sistema de Almacén!</h1>
      {usuario && (
        <h2>Hola, {usuario.username}</h2>
      )}
      <p>
        Este es el panel principal de tu aplicación de gestión de inventario.
        Desde aquí puedes navegar a las diferentes secciones utilizando la barra de navegación superior.
      </p>
      <p>
        Funciones disponibles:
      </p>
      <ul>
        <li><b>Productos:</b> Visualiza, crea, edita y elimina productos de tu inventario.</li>
        <li><b>Movimientos:</b> Registra las entradas y salidas de stock para cada producto y consulta el historial.</li>
        <li><b>Agregar Categoría:</b> Crea nuevas categorías para organizar tus productos.</li>
      </ul>
    </div>
  );
}