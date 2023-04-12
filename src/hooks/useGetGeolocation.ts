import { useEffect, useState } from "react";

const useGetGeolocation = () => {
  const [isLocationAvailable, setIsLocationAvailable] = useState(false);

  useEffect(() => {
    // Check if the user's device supports geolocation
    if (!navigator.geolocation) {
      setIsLocationAvailable(false);
      return;
    }

    navigator.permissions.query({ name: "geolocation" }).then(({ state }) => {
      switch (state) {
        case "granted":
        case "prompt":
          setIsLocationAvailable(true);
          break;

        default:
          setIsLocationAvailable(false);
          break;
      }
    });
  }, []);

  return { isLocationAvailable };
};

export default useGetGeolocation;
