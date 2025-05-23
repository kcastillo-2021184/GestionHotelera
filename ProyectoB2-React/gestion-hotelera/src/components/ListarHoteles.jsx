import { useEffect, useState } from "react";
import '../components/EliminarHoteles.css';
import { Link } from "react-router-dom";

const API_LIST = "http://localhost:3616/v1/hotel/";

const ListarHoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");

  const listarHoteles = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(API_LIST, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        setHoteles([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      let lista = Array.isArray(data.data) ? data.data : [];
      setHoteles(lista);
    } catch {
      setHoteles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    listarHoteles();
  }, []);

  return (
    <div className="eliminar-hotel-container">
      <h1 className="eliminar-hotel-title">Lista de Hoteles</h1>
      <div className="eliminar-hotel-grid">
        {loading ? (
          <div className="eliminar-hotel-vacio">Cargando hoteles...</div>
        ) : !Array.isArray(hoteles) || hoteles.length === 0 ? (
          <div className="eliminar-hotel-vacio">No hay hoteles registrados.</div>
        ) : (
          hoteles.map((hotel) => (
            <div className="eliminar-hotel-card" key={hotel._id}>
              <h3>{hotel.name}</h3>
              <p>{hotel.address}</p>
            </div>
          ))
        )}
      </div>
      <br />
      <Link to="/admin">Volver</Link>
    </div>
  );
};

export default ListarHoteles;
