import "./Map.css";
import {useEffect, useRef, useState} from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const Map = () => {
    const markers = useRef([]);
    const [minutes, setMinutes] = useState(0);
    const [distance, setDistance] = useState(0);

    const map = useRef(null);


    mapboxgl.accessToken = "pk.eyJ1IjoiYmxhbmthOTkiLCJhIjoiY2xudmZ4ZHI3MHBtajJrb2p4cGJuN2FkZiJ9.F8-MFO-f6jbjFS1zhItYgA";

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
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

        map.current.addControl(geocoder, "top-right");

        map.current.addControl(new mapboxgl.FullscreenControl({container: document.querySelector("body")}), "bottom-right");
        map.current.addControl(new mapboxgl.GeolocateControl(), "bottom-right");

        const createMarker = (coordinates, mapInstance) => {
            //TODO check if there is already a marker at these coordinates
            const rotationDegree = Math.random() < 0.5 ? 10 : -10;
            const newMarker = new mapboxgl.Marker({
                draggable: true,
                color: "orange",
                rotation: rotationDegree
            }).setLngLat(coordinates)
                .addTo(mapInstance);
            console.log(markers.current);
            markers.current = [...markers.current, newMarker];
        };

        const handleMapClick = (e) => {
            const lng = e.lngLat.lng;
            const lat = e.lngLat.lat;
            createMarker([lng, lat], map.current);
        }

        map.current.on("click", handleMapClick);
    }, []);


    // create a function to make a directions request
    async function getRoute(coords) {
        if (markers.current.length < 2) return;
        // make a directions request using cycling profile
        // TODO: választható legyen: cycling/walking/driving
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/cycling/${coords}?steps=false&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            {method: 'GET'}
        );
        const json = await query.json();
        const data = json.routes[0];
        const time = Math.floor(data.duration / 60);
        setMinutes(time);
        setDistance(Math.round(data.distance));
        const route = data.geometry.coordinates;
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };
        // if the route already exists on the map, we'll reset it using setData
        if (map.current.getSource('route')) {
            map.current.getSource('route').setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
            map.current.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#52358c',
                    'line-width': 5,
                    'line-opacity': 0.85
                }
            });
        }
    }

    const planRoute = () => {
        let coords = "";
        for (const marker of markers.current) {
            coords += marker.getLngLat().lng + ",";
            coords += marker.getLngLat().lat + ";";
        }
        getRoute(coords.slice(0, -1));
    }

    return (
        <div>
            <div id={"map"}></div>
            <div className={"sidebar"}>
                <button onClick={planRoute}>Plan a route</button>
                {distance !== 0 ?
                    <div id={"trip-infos"}>Trip duration: ${minutes} min(s) 🚴 <br/> Trip distance: ${distance} m</div>
                    : <div></div>
                }
            </div>

        </div>
    );
};

export default Map;
