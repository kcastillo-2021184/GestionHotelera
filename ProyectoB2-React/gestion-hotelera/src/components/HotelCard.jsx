import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/reserva/${hotel._id}`, { state: { hotel } });
  };

  return (
    <div className="hotel-card" onClick={handleClick}>
      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <p>{hotel.address}</p>
        <p>{hotel.category}</p>
      </div>
      <img
        src={hotel.image || 'https://via.placeholder.com/400x200?text=Sin+imagen'}
        alt={hotel.name}
        className="hotel-img"
      />
    </div>
  );
};

export default HotelCard;
