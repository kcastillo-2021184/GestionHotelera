import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import { useRoomsByHotel } from "../components/shared/hooks/useReservationByHotel.js";
import axios from "axios";
import "./VistaReservation.css";

const VistaReservation = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const hotel = state?.hotel;

  const rooms = useRoomsByHotel(id);

  const [form, setForm] = useState({
    name: "",
    startDate: "",
    exitDate: ""
  });

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
  };

  const handleReserve = async (roomId) => {
    const { name, startDate, exitDate } = form;

    if (!name || !startDate || !exitDate) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const uid = JSON.parse(atob(token.split('.')[1])).uid;

      const res = await axios.post(
        "http://localhost:3616/v1/reservation/",
        {
          user: uid,
          room: roomId,
          checkInDate: startDate,
          checkOutDate: exitDate,
          services: []
        },
        {
          headers: { Authorization: token }
        }
      );

      alert("¡Reservación realizada con éxito!");
      console.log(res.data);
    } catch (err) {
      console.error("Error al reservar:", err);
      alert("Error al realizar la reservación.");
    }
  };

  if (!hotel) return <p>Cargando hotel...</p>;

  return (
    <>
      <Navbar onSearch={() => {}} />
      <div className="reservation-container">
        <div className="reservation-header">
          <h1>{hotel.name}</h1>
          <p>{hotel.address}</p>
          <p>{hotel.category}</p>
        </div>

        <div className="room-list">
          <h2>Habitaciones disponibles</h2>
          {rooms.map((room) => (
            <div key={room._id} className="room-card">
              <h3>Habitación {room.number || "N/A"}</h3>
              <p><strong>Tipo:</strong> {room.type || "No especificado"}</p>
              <p><strong>Capacidad:</strong> {room.capacity || "No especificada"}</p>
              <p><strong>Precio:</strong> {room.price ? `Q${room.price}` : "No definido"}</p>
              <p><strong>Descripción:</strong> {room.description || "Sin descripción"}</p>
              <button onClick={() => handleReserve(room._id)}>Reservar esta</button>
            </div>
          ))}
        </div>

        <div className="reservation-form">
          <h2>Hacer reservación</h2>
          <input name="name" placeholder="Tu nombre" onChange={handleChange} />
          <input name="startDate" type="date" onChange={handleChange} />
          <input name="exitDate" type="date" onChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default VistaReservation;
