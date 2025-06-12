import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function FormularioProducto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState(0);
  const [disponible, setDisponible] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("categorias/")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error al cargar categorías:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoProducto = {
        nombre,
        descripcion,
        categoria_id: categoriaId,
        precio,
        stock,
        disponible
      };
      await api.post("productos/", nuevoProducto);
      setMensaje("Producto creado exitosamente ✅");
      setTimeout(() => navigate("/productos"), 1500);
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear el producto ❌");
    }
  };

  return (
    <div id="div-formulario-producto">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit} id="div-formulario">
        <div id="div-nombre">
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>

        <div id="div-descripcion">
          <label>Descripción:</label>
          <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </div>

        <div id="div-categoria">
          <label>Categoría:</label>
          <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)} required>
            <option value="">Seleccione una categoría</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div id="div-precio">
          <label>Precio:</label>
          <input type="number" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} required />
        </div>

        <div id="div-stock">
          <label>Stock:</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} required />
        </div>

        <div id="div-disponible">
          <label>
            <input type="checkbox" checked={disponible} onChange={e => setDisponible(e.target.checked)} />
            Disponible
          </label>
        </div>

        <div id="div-boton-submit">
          <button type="submit">Guardar producto</button>
        </div>

        {mensaje && <div id="div-mensaje">{mensaje}</div>}
      </form>
    </div>
  );
}
