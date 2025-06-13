

import { useState, useEffect } from "react";
import FormularioMovimiento from "./FormularioMovimiento";
import ListaMovimientos from "./ListaMovimientos";
import api from "../api/axios";

export default function VistaMovimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  const cargarMovimientos = () => {
    setCargando(true);
    api.get("movimientos/")
      .then(res => {
        setMovimientos(res.data);
      })
      .catch(err => {
        console.error("Error al cargar movimientos:", err);
        setMensaje("Error al cargar el historial de movimientos.");
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarMovimientos();
  }, []);

  return (
    <div>
      <h1>Gestión de Movimientos</h1>
      <p>Registra las entradas y salidas de productos del inventario.</p>
      
      {}
      <FormularioMovimiento onMovimientoAgregado={cargarMovimientos} />

      <hr style={{margin: '2rem 0'}} />

      {}
      <h2>Historial de Movimientos</h2>
      {cargando ? <p>Cargando historial...</p> : <ListaMovimientos movimientos={movimientos} />}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}