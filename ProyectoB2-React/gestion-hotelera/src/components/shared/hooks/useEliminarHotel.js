import { useEffect, useState } from "react";
import { API_DELETE, API_LIST } from "../services/api";
import { getToken } from "../utils/auth";

const useHoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);

  const listarHoteles = async () => {
    try {
      const token = getToken();
      const res = await fetch(API_LIST, {
        headers: {
          Authorization: token
        }
      });
      const data = await res.json();
      setHoteles(data.hoteles || []);
    } catch {
      setHoteles([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarHotel = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este hotel?")) return false;

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
        setHoteles((prev) => prev.filter((hotel) => hotel._id !== id));
        alert("Hotel eliminado correctamente.");
        return true;
      } else {
        alert(data.message || "No se pudo eliminar el hotel.");
      }
    } catch {
      alert("Error al eliminar el hotel.");
    }
    return false;
  };

  useEffect(() => {
    listarHoteles();
  }, []);

  return { hoteles, loading, eliminarHotel };
};

export default useEliminarHoteles;
