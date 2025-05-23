import { useEffect, useState } from "react";
import '../components/ActualizarHotel.css';
import { Link } from "react-router-dom";

const API_LIST = "http://localhost:3616/v1/hotel/";
const API_UPDATE = "http://localhost:3616/v1/hotel/update/";

const ActualizarHotel = () => {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editHotel, setEditHotel] = useState(null);
  const [form, setForm] = useState({ name: "", address: "", category: "" });

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
      const lista = Array.isArray(data.data) ? data.data : [];
      setHoteles(lista);
    } catch {
      setHoteles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    listarHoteles();
  }, []);

  const handleEditarClick = (hotel) => {
    setEditHotel(hotel);
    setForm({ name: hotel.name, address: hotel.address, category: hotel.category });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const res = await fetch(`${API_UPDATE}${editHotel._id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Hotel actualizado correctamente.");
        setEditHotel(null);
        listarHoteles();
      } else {
        alert(data.message || "Error al actualizar.");
      }
    } catch {
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="actualizar-hotel-container">
      <h1 className="actualizar-hotel-title">Actualizar Hotel</h1>

      {editHotel && (
        <form className="actualizar-hotel-form" onSubmit={handleActualizar}>
          <h2>Editar Hotel</h2>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Dirección"
            required
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Categoría"
            required
          />
          <button type="submit" className="actualizar-hotel-btn">Guardar Cambios</button>
        </form>
      )}

      <div className="actualizar-hotel-grid">
        {loading ? (
          <div className="actualizar-hotel-vacio">Cargando hoteles...</div>
        ) : !Array.isArray(hoteles) || hoteles.length === 0 ? (
          <div className="actualizar-hotel-vacio">No hay hoteles registrados.</div>
        ) : (
          hoteles.map((hotel) => (
            <div className="actualizar-hotel-card" key={hotel._id}>
              <h3>{hotel.name}</h3>
              <p>{hotel.address}</p>
              <button
                className="actualizar-hotel-btn"
                onClick={() => handleEditarClick(hotel)}
              >
                Editar
              </button>
            </div>
          ))
        )}
      </div>
      <Link to="/admin">Volver</Link>
    </div>
  );
};

export default ActualizarHotel;
