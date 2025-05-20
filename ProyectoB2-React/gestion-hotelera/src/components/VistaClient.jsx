import { useNavigate } from "react-router-dom";
/*import registroImg from './img/registro.png';
import historialImg from './img/historial.png';
import stockImg from './img/stock.png';
import filtrosImg from './img/filtros.png';*/
import "./vistaDashboard.css";
 
export const VistaClient = () => {
  const navigate = useNavigate();
 
  const secciones = [
    { titulo: "Hacer una reservacion", imagen: 'registroImg', ruta: "/registro" },
    { titulo: "Mis reservaciones", imagen: 'historialImg', ruta: "/historial" },
  ];
 
  return (
    <div className="vista-admin">
      <h1>Reservations</h1>
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
 
export default VistaClient;