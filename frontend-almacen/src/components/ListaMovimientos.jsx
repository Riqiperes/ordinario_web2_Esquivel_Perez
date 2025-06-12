import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ListaMovimientos() {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    api.get("movimientos/")
      .then(res => setMovimientos(res.data))
      .catch(err => console.error("Error al obtener movimientos:", err));
  }, []);

  return (
    <div id="div-lista-movimientos">
      <h2>Historial de movimientos</h2>

      <div id="div-tabla-movimientos">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Usuario</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map(m => (
              <tr key={m.id}>
                <td>{new Date(m.fecha).toLocaleString()}</td>
                <td>{m.producto?.nombre || "Sin nombre"}</td>
                <td>{m.tipo}</td>
                <td>{m.cantidad}</td>
                <td>{m.usuario || "—"}</td>
                <td>{m.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
