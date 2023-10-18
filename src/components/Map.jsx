import "./Map.css";
import {useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";

const Map = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiYmxhbmthOTkiLCJhIjoiY2xudmZ4ZHI3MHBtajJrb2p4cGJuN2FkZiJ9.F8-MFO-f6jbjFS1zhItYgA";

        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/outdoors-v12",
            center: [17.915, 47.093],
            zoom: 12.5,
        });

        map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector("body")}));
        map.addControl(new mapboxgl.GeolocateControl());


            const createMarker = (coordinates, mapInstance) => {
                //TODO check if there is already a marker at these coordinates
                const newMarker = new mapboxgl.Marker({draggable: true}).setLngLat(coordinates).addTo(mapInstance);
                setMarkers([...markers, newMarker]);
            };

            const handleMapClick = (e) => {
                const lng = e.lngLat.lng;
                const lat = e.lngLat.lat;
                createMarker([lng, lat], map);
            }

            map.on("click", handleMapClick);


        return () => map.remove();
    }, []);

    return (
        <div id={"map"}></div>
    );
};

export default Map;
