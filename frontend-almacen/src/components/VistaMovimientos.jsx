import FormularioMovimiento from "./FormularioMovimiento";
import ListaMovimientos from "./ListaMovimientos";

export default function VistaMovimientos() {
  return (
    <div id="div-vista-movimientos">
      <FormularioMovimiento />
      <hr />
      <ListaMovimientos />
    </div>
  );
}
