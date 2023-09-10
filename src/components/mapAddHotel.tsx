import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

type Props = {};

const containerStyle = {
  width: "800px",
  height: "500px",
};

const center = {
  lat: 18.3170581,
  lng: 99.3986862,
};

const MapAddHotel = (props: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBG1czcWgot1iEkNTFkz2Bg_BAZueBvaiM",
    libraries: ["places", "marker"],
  });

  const [maps, setMap] = useState<any>(null);
  const [marker, setMarker] = useState(center);

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
    <>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          ค้นหา
        </label>
        <Autocomplete>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ค้นหา"
          />
        </Autocomplete>
      </div>
      <div className="flex justify-center p-5 bg-white m-5 rounded-md">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={onLoad}
          onRightClick={(e) => {
            console.log(marker);
            const lat = e.latLng?.lat();
            const lng = e.latLng?.lng();

            setMarker({ lat: lat ?? 0, lng: lng ?? 0 });
          }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <Marker position={marker} />
        </GoogleMap>
      </div>
    </>
  ) : (
    <></>
  );
};

export default MapAddHotel;
