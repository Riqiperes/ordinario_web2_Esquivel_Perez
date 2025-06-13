

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const cargarProductos = () => {
    api.get("productos/")
      .then(res => setProductos(res.data))
      .catch(err => {
        console.error("Error al cargar productos:", err);
        setMensaje("Error al cargar la lista de productos.");
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);
  
  const handleDelete = async (id) => {
    
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await api.delete(`productos/${id}/`);
        setMensaje("Producto eliminado correctamente.");
        
        cargarProductos();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        setMensaje("Error al eliminar el producto.");
      }
    }
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      {mensaje && <p>{mensaje}</p>}
      <table className="table-container">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.stock}</td>
              <td>
                <Link to={`/productos/editar/${producto.id}`} className="btn-editar">Editar</Link>
                <button onClick={() => handleDelete(producto.id)} className="btn-eliminar">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}