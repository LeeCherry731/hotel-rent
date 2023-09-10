import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

type Props = {};

const containerStyle = {
  width: "800px",
  height: "500px",
};

const center = {
  lat: 18.3170581,
  lng: 99.3986862,
};

const GoogleMapShowHotel = (props: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBG1czcWgot1iEkNTFkz2Bg_BAZueBvaiM",
  });

  const [maps, setMap] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="flex justify-center p-5 bg-white m-5 rounded-md">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default GoogleMapShowHotel;
