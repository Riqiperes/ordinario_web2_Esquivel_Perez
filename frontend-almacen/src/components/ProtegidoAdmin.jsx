import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtegidoAdmin({ children }) {
  const [autorizado, setAutorizado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (!userData) {
      navigate("/login");
    } else {
      const usuario = JSON.parse(userData);
      if (usuario.rol === "admin") {
        setAutorizado(true);
      } else {
        alert("Acceso denegado: solo para administradores");
        navigate("/");
      }
    }
  }, []);

  return autorizado ? children : null;
}
