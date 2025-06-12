import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    api.get("productos/")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al obtener productos:", err));
  }, []);

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.categoria?.nombre?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div id="div-lista-productos">
      <h2>Listado de Productos</h2>

      <div id="div-filtro-productos">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div id="div-tabla-productos">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Disponible</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map(producto => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria?.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.disponible ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
