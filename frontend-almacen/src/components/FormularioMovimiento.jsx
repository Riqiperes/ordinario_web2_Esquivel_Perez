import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function FormularioMovimiento({ onMovimientoAgregado }) {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [cantidad, setCantidad] = useState(1);
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    api.get("productos/")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const movimiento = {
        producto_id: productoId,
        usuario: usuario.id,
        tipo,
        cantidad,
        comentario
      };

      await api.post("movimientos/", movimiento);
      setMensaje("Movimiento registrado exitosamente ✅");

      // Limpiar campos
      setProductoId("");
      setCantidad(1);
      setComentario("");

      // Llamar recarga del historial
      if (onMovimientoAgregado) {
        onMovimientoAgregado();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error );
      setMensaje("Error al registrar el movimiento ❌");
    }
  };    

  return (
    <div id="div-formulario-movimiento">
      <h2>Registrar movimiento</h2>
      <form onSubmit={handleSubmit} id="div-formulario">
        <div id="div-producto">
          <label>Producto:</label>
          <select value={productoId} onChange={e => setProductoId(e.target.value)} required>
            <option value="">Seleccione un producto</option>
            {productos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>

        <div id="div-tipo">
          <label>Tipo:</label>
          <select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
            <option value="ajuste">Ajuste</option>
          </select>
        </div>

        <div id="div-cantidad">
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
            min="1"
            required
          />
        </div>

        <div id="div-comentario">
          <label>Comentario (opcional):</label>
          <textarea
            value={comentario}
            onChange={e => setComentario(e.target.value)}
          />
        </div>

        <div id="div-boton">
          <button type="submit">Registrar</button>
        </div>

        {mensaje && <div id="div-mensaje">{mensaje}</div>}
      </form>
    </div>
  );
}
