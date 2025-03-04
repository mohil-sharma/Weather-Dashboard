import { useState, useEffect } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  position: {
    latitude: number;
    longitude: number;
  } | null;
}

const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    position: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: 'Geolocation is not supported by your browser',
        position: null,
      });
      return;
    }

    const geoSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        error: null,
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    };

    const geoError = (error: GeolocationPositionError) => {
      setState({
        loading: false,
        error: error.message,
        position: null,
      });
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []);

  return state;
};

export default useGeolocation;