import { useEffect, useState } from "react";
import { apiUrl } from "../apiClient.js";

export const useTestProbe = () => {
  const [testProbe, setTestProbe] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchTest = async () => {
      try {
        const url = new URL(apiUrl("/test"), window.location.origin);
        url.searchParams.set("test_id", 123);

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTestProbe({ loading: false, data, error: null });
      } catch (err) {
        if (err.name === "AbortError") return;
        setTestProbe({ loading: false, data: null, error: err });
      }
    };

    fetchTest();
    return () => controller.abort();
  }, []);

  return testProbe;
};
