// frontend-almacen/src/components/FormularioProducto.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import '../styles/Formularios.css';

export default function FormularioProducto() {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: 0,
    categoria: "", 
  });
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); 

  
  useEffect(() => {
    if (id) {
      setCargando(true);
      api.get(`productos/${id}/`)
        .then(res => {
          setProducto({
            nombre: res.data.nombre,
            descripcion: res.data.descripcion,
            precio: res.data.precio,
            stock: res.data.stock,
            categoria: res.data.categoria.id,
          });
        })
        .catch(err => {
          console.error("Error al cargar el producto:", err);
          setMensaje("No se pudo cargar el producto para editar.");
        })
        .finally(() => setCargando(false));
    }
  }, [id]);

  
  useEffect(() => {
    api.get("categorias/")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error al cargar categorías:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const payload = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock, 10),
      categoria_id: producto.categoria, 
      disponible: true 
    };

    
    delete payload.categoria;

    try {
      if (id) {
        
        await api.put(`productos/${id}/`, payload);
        setMensaje("Producto actualizado exitosamente ✅");
      } else {
        
        await api.post("productos/", payload);
        setMensaje("Producto creado exitosamente ✅");
      }
      setTimeout(() => navigate("/productos"), 1500);
    } catch (error) {
      console.error("Error completo:", error);
      const errorData = error.response?.data;
      let errorMessage = `Error al ${id ? 'actualizar' : 'crear'} el producto.`;

      
      if (errorData) {
        
        const messages = Object.values(errorData).flat().join(' ');
        if (messages) {
            errorMessage = messages;
        }
      }
      setMensaje(errorMessage + " ❌");
    }
  };
  
  if (cargando) return <p>Cargando datos del producto...</p>;

  return (
    <div className="form-container">
      <h2>{id ? "Editar Producto" : "Crear Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input type="number" name="precio" value={producto.precio} onChange={handleChange} required step="0.01" />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input type="number" name="stock" value={producto.stock} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <select name="categoria" value={producto.categoria} onChange={handleChange} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="form-button">
          {id ? "Actualizar Producto" : "Crear Producto"}
        </button>
        {mensaje && <p style={{ textAlign: 'center', marginTop: '1rem' }}>{mensaje}</p>}
      </form>
    </div>
  );
}