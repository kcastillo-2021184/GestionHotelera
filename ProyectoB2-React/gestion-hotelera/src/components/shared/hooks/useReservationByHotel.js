import { useState, useEffect } from "react";
import axios from "axios";

export const useRoomsByHotel = (hotelId) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3616/v1/room/by-hotel?hid=${hotelId}`,
          {
            headers: { Authorization: token }
          }
        );
        setRooms(res.data.rooms || []);
      } catch (err) {
        console.error("Error al obtener habitaciones", err);
      }
    };

    fetchRooms();
  }, [hotelId]);

  return rooms;
};
