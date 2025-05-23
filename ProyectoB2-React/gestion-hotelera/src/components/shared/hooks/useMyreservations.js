import { useEffect, useState } from "react";
import axios from "axios";

const useMyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3616/v1/reservation/my-reservations",
        {
          headers: { Authorization: token }
        }
      );
      setReservations(res.data.reservations || []);
    } catch (err) {
      console.error("Error al obtener reservaciones", err);
      setError("No se pudieron cargar tus reservaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (reservationId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3616/v1/reservation/update/${reservationId}`,
        { status: "cancelled" },
        {
          headers: { Authorization: token }
        }
      );

      setReservations((prev) =>
        prev.map((res) =>
          res._id === reservationId ? { ...res, status: "cancelled" } : res
        )
      );

      alert("Reservación cancelada correctamente.");
    } catch (err) {
      console.error("Error al cancelar reservación", err);
      alert("No se pudo cancelar la reservación.");
    }
  };

  return { reservations, loading, error, handleCancel };
};

export default useMyReservations;
