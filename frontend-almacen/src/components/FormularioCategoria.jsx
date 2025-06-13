import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Formularios.css'
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
    <div className="form-container">
      <h2>Crear Nueva Categoría</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la Categoría:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Guardar Categoría</button>
        {mensaje && <p style={{ textAlign: 'center', marginTop: '1rem' }}>{mensaje}</p>}
      </form>
    </div>
  );
}
