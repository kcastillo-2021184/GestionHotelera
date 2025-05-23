import { useNavigate } from "react-router-dom";
import editar from '../assets/editar.png';
import agregar from '../assets/agregar.png';
import eliminar from '../assets/eliminar.png';
import listar from '../assets/listar.png';
import cliente from '../assets/cliente.png'
import "./vistaDashboard.css";
 
export const VistaAdmin = () => {
  const navigate = useNavigate();
 
  const secciones = [
    { titulo: "Agregar Hotel", imagen: agregar, ruta: "/agregar-hotel" },
    { titulo: "Editar Hotel", imagen: editar, ruta: "/editar-hotel" },
    { titulo: "Eliminar Hotel", imagen: eliminar, ruta: "/eliminar-hotel" },
    { titulo: "Listar Hoteles", imagen: listar, ruta: "/listar-hotel" },
    { titulo: "Vista de Cliente", imagen: cliente, ruta: "/client" },
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