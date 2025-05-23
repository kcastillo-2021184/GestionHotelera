import { useEffect, useState } from "react";
import '../components/EliminarHoteles.css'

const API_LIST = "http://localhost:3616/v1/hotel/";
const API_DELETE = "http://localhost:3616/v1/hotel/delete/";

const EliminarHotel = () => {
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
      let lista = Array.isArray(data.hoteles)
        ? data.hoteles
        : Array.isArray(data)
        ? data
        : [];
      setHoteles(lista);
    } catch {
      setHoteles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    listarHoteles();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este hotel?")) return;
    try {
      const token = getToken();
      const res = await fetch(`${API_DELETE}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok) {
        setHoteles(hoteles.filter(hotel => hotel._id !== id));
        alert("Hotel eliminado correctamente.");
      } else {
        alert(data.message || "No se pudo eliminar el hotel. Verifica el ID.");
      }
    } catch {
      alert("Error al eliminar el hotel.");
    }
  };

  return (
    <div className="eliminar-hotel-container">
      <h1 className="eliminar-hotel-title">Eliminar Hotel</h1>
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
              <button
                className="eliminar-hotel-btn"
                onClick={() => handleEliminar(hotel._id)}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EliminarHotel;
