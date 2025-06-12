import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("login/", {
      username,
      password: contraseña
    });

    const usuario = res.data;

    if (usuario.rol === "admin") {
      setMensaje("Bienvenido, administrador 🛠️");
    } else {
      setMensaje("Inicio de sesión exitoso ✅");
    }

    localStorage.setItem("usuario", JSON.stringify(usuario));
    setTimeout(() => navigate("/"), 1000);

  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 401) {
      setMensaje("Contraseña incorrecta ❌");
    } else if (error.response && error.response.status === 404) {
      setMensaje("Usuario no encontrado ❌");
    } else {
      setMensaje("Error al conectar con el servidor");
    }
  }
};


  return (
    <div id="div-login">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} id="div-formulario">
        <div id="div-usuario">
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div id="div-contraseña">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>

        <div id="div-boton-login">
          <button type="submit">Entrar</button>
        </div>

        {mensaje && <div id="div-mensaje">{mensaje}</div>}
      </form>
    </div>
  );
}
