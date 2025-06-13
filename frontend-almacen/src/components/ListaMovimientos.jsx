

export default function ListaMovimientos({ movimientos }) {
    if (!movimientos || movimientos.length === 0) {
        return <p>No hay movimientos registrados.</p>;
    }
    
    
    const formatearFecha = (fechaISO) => {
        const opciones = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        };
        return new Date(fechaISO).toLocaleString('es-MX', opciones);
    };

    return (
        <table className="table-container">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th>Usuario</th>
                    <th>Comentario</th>
                </tr>
            </thead>
            <tbody>
                {}
                {[...movimientos].reverse().map(mov => (
                    <tr key={mov.id}>
                        <td>{mov.id}</td>
                        {}
                        <td>{mov.producto?.nombre || 'Producto no encontrado'}</td>
                        <td style={{ 
                            color: mov.tipo_movimiento === 'entrada' ? '#27ae60' : '#c0392b', 
                            fontWeight: 'bold', 
                            textTransform: 'capitalize' 
                        }}>
                            {mov.tipo_movimiento}
                        </td>
                        <td>{mov.cantidad}</td>
                        <td>{formatearFecha(mov.fecha)}</td>
                        <td>{mov.usuario?.username || 'Usuario no encontrado'}</td>
                        <td>{mov.comentario || '—'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}