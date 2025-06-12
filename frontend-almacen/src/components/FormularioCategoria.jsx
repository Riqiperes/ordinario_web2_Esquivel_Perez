import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function FormularioCategoria() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("categorias/", { nombre });
      setMensaje("Categoría creada exitosamente ✅");
      setTimeout(() => navigate("/productos/nuevo"), 1500);
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear la categoría ❌");
    }
  };

  return (
    <div id="div-formulario-categoria">
      <h2>Registrar nueva categoría</h2>
      <form onSubmit={handleSubmit} id="div-formulario">
        <div id="div-nombre-categoria">
          <label>Nombre de categoría:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div id="div-boton-categoria">
          <button type="submit">Guardar</button>
        </div>

        {mensaje && <div id="div-mensaje">{mensaje}</div>}
      </form>
    </div>
  );
}
