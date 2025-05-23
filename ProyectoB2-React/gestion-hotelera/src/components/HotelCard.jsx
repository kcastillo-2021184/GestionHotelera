import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/reserva/${hotel._id}`, { state: { hotel } });
  };

  return (
    <div className="hotel-card" onClick={handleClick}>
      <h2>{hotel.name}</h2>
      <p>{hotel.address}</p>
      <p>{hotel.category}</p>
    </div>
  );
};

export default HotelCard;
