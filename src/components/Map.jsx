import "./Map.css";
import {useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

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

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: {
                color: "red"
            },
            mapboxgl: mapboxgl,
        });

        map.addControl(geocoder, "top-right");

        map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector("body")}), "bottom-right");
        map.addControl(new mapboxgl.GeolocateControl(), "bottom-right");


        const createMarker = (coordinates, mapInstance) => {
            //TODO check if there is already a marker at these coordinates
            const rotationDegree = Math.random() < 0.5 ? 10 : -10;
            const newMarker = new mapboxgl.Marker({
                draggable: true,
                color: "orange",
                rotation: rotationDegree
            }).setLngLat(coordinates)
                .addTo(mapInstance);

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
