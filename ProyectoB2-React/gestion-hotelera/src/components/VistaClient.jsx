import { useHotels } from "../components/shared/hooks/useHotels";
import HotelCard from "../components/HotelCard";
import { useState } from "react";
import "../components/VistaClient.css";
import Navbar from "./Navbar";

const VistaClient = () => {
  const { hotels, isLoading } = useHotels();
  const [search, setSearch] = useState("");

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p className="loading-msg">Cargando hoteles...</p>;

  return (
    <>
    <Navbar onSearch={setSearch} />
      <header className="main-header">
      </header>
      <section className="hotels-container">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </section>
    </>
  );
};

export default VistaClient;