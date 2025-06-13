

import { useEffect, useState } from "react";
import api from "../api/axios";
import '../styles/Formularios.css';

export default function FormularioMovimiento({ onMovimientoAgregado }) {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [cantidad, setCantidad] = useState(1);
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState(null);

  
  useEffect(() => {
    const datosUsuario = localStorage.getItem("usuario");
    if (datosUsuario) {
      setUsuario(JSON.parse(datosUsuario));
    }
  }, []);

  
  useEffect(() => {
    api.get("productos/")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(""); 

    if (!productoId) {
      setMensaje("Por favor, selecciona un producto.");
      return;
    }
    if (!usuario) {
      setMensaje("Error: no se pudo identificar al usuario.");
      return;
    }

    
    const payload = {
      producto_id: productoId,      
      usuario: usuario.id,
      tipo: tipo,                   
      cantidad: Number(cantidad),
      comentario,
    };

    try {
      
      await api.post("movimientos/", payload);
      setMensaje("Movimiento registrado exitosamente ✅");

      
      setProductoId("");
      setTipo("entrada");
      setCantidad(1);
      setComentario("");

      if (onMovimientoAgregado) {
        onMovimientoAgregado();
      }
      setTimeout(() => setMensaje(""), 3000);

    } catch (error) {
      console.error("Respuesta completa del error:", error.response);
      let errorMessage = "Ocurrió un error al registrar el movimiento.";

      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (typeof errorData === 'object') {
          const messages = Object.values(errorData).flat().join(' ');
          if (messages) {
            errorMessage = messages;
          }
        }
      }
      setMensaje(errorMessage + " ❌");
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '700px' }}>
      <h2>Registrar Movimiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Producto:</label>
          <select name="producto" value={productoId} onChange={(e) => setProductoId(e.target.value)} required>
            <option value="">Selecciona un producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} (Stock actual: {p.stock})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tipo de Movimiento:</label>
          <select name="tipo_movimiento" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>
        </div>
        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Comentario (Opcional):</label>
          <textarea
            name="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button">Registrar Movimiento</button>
        {mensaje && <p style={{ textAlign: 'center', marginTop: '1rem' }}>{mensaje}</p>}
      </form>
    </div>
  );
}