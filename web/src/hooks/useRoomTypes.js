import { useEffect, useState } from "react";
import { apiUrl } from "../apiClient.js";

export const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState({
    loading: true,
    data: [],
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchRoomTypes = async () => {
      try {
        const res = await fetch(apiUrl("/room-types"), {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRoomTypes({ loading: false, data, error: null });
      } catch (err) {
        if (err.name === "AbortError") return;
        setRoomTypes({ loading: false, data: [], error: err });
      }
    };

    fetchRoomTypes();

    return () => controller.abort();
  }, []);

  return roomTypes;
};
