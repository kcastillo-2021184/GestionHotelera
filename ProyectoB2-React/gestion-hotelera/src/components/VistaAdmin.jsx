import { useNavigate } from "react-router-dom";
/*import inventarioImg from './img/inventario.png';
import movimientosImg from './img/movimientos.png';
import alertasImg from './img/alertas.png';
import estadisticasImg from './img/estadisticas.png';
import gestionImg from './img/gestion.png';*/
import "./vistaDashboard.css";
 
export const VistaAdmin = () => {
  const navigate = useNavigate();
 
  const secciones = [
    { titulo: "Agregar Hotel", imagen: 'inventarioImg', ruta: "/resumen-inventario" },
    { titulo: "Editar Hotel", imagen: 'movimientosImg', ruta: "/movimientos-recientes" },
    { titulo: "Eliminar Hotel", imagen: 'alertasImg', ruta: "/alertas" },
    { titulo: "Listar Hoteles", imagen: 'gestionImg', ruta: "/gestion" },
  ];
 
  return (
    <div className="vista-admin">
      <h1>Panel de Administrador</h1>
      <div className="vista-grid">
        {secciones.map((sec, idx) => (
          <div key={idx} className="vista-card" onClick={() => navigate(sec.ruta)}>
            <img src={sec.imagen} alt={sec.titulo} />
            <div className="titulo">{sec.titulo}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default VistaAdmin;