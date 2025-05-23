import Navbar from "./Navbar";
import useMyReservations from "./shared/hooks/useMyreservations";
import "./VistaReservation.css";

const VistaMisReservaciones = () => {
  const { reservations, loading, error, handleCancel } = useMyReservations();

  return (
    <>
      <Navbar onSearch={() => {}} />
      <div className="reservation-container">
        <div className="reservation-header">
          <h1>Mis Reservaciones</h1>
        </div>

        {loading && <p>Cargando reservaciones...</p>}
        {error && <p>{error}</p>}
        {!loading && reservations.length === 0 && <p>Sin reservaciones registradas.</p>}

        <div className="room-list">
          {reservations.map((res) => (
            <div key={res._id} className="room-card">
              <h3>{res.room?.hotel?.name || "Hotel Desconocido"}</h3>
              <p><strong>Habitación:</strong> {res.room?.number || "No aplica"}</p>
              <p><strong>Entrada:</strong> {new Date(res.checkInDate).toLocaleDateString()}</p>
              <p><strong>Salida:</strong> {new Date(res.checkOutDate).toLocaleDateString()}</p>
              <p><strong>Estado:</strong> {res.status || "Confirmada"}</p>
              {res.status !== "cancelled" && (
                    <button onClick={() => handleCancel(res._id)}>
                    Cancelar Reservación
                    </button>
                )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VistaMisReservaciones;
