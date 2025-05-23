import { useEffect, useState } from "react";
import axios from "axios";

export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://localhost:3616/v1/hotel/");
      setHotels(res.data.data || []);
    } catch (error) {
      console.error("Error fetching hotels", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return { hotels, isLoading };
};
