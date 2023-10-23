import "./Map.css";
import {useEffect, useRef, useState} from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import ErrorModal from "./ErrorModal";
import Sidebar from "./Sidebar";
import MapSettings from "./MapSettings";


const Map = () => {
    const maxAmountOfMarkers = 25;
    const markers = useRef([]);
    const [lineColor, setLineColor] = useState("#52358c");
    const [lineWidth, setLineWidth] = useState(5);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An error occurred.");
    const travelMode = useRef("cycling");
    const [travelData, setTravelData] = useState(null);

    const map = useRef(null);

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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
            mapboxgl: mapboxgl,
        });

        geocoder.on("result", (e) => {
            const coordinates = e.result.center;
            createMarker(coordinates);
            geocoder.clear();
        })

        map.current.addControl(geocoder, "top-right");
        map.current.addControl(new mapboxgl.FullscreenControl({container: document.querySelector("body")}), "bottom-right");
        map.current.addControl(new mapboxgl.GeolocateControl(), "bottom-right");

        map.current.on("click", handleMapClick);
    }, []);

    const createMarker = (coordinates) => {
        if (markers.current.length >= maxAmountOfMarkers) {
            setErrorMessage(`You can't put down more than ${maxAmountOfMarkers} markers!`);
            setIsErrorModalOpen(true);
            return;
        }

        //check if there is already a marker at these coordinates
        for (const marker of markers.current) {
            if ((marker.getLngLat().lng.toFixed(4) === coordinates[0].toFixed(4)) && (marker.getLngLat().lat.toFixed(4) === coordinates[1].toFixed(4))) {
                return;
            }
        }

        const rotationDegree = Math.random() < 0.5 ? 10 : -10;
        const newMarker = new mapboxgl.Marker({
            draggable: true,
            color: "orange",
            rotation: rotationDegree
        }).setLngLat(coordinates)
            .addTo(map.current);

        newMarker.on("dragend", () => {
            if (map.current.getSource('route')) {
                planRoute(travelMode.current);
            }
        });

        markers.current = [...markers.current, newMarker];
    };

    const handleMapClick = (e) => {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;
        createMarker([lng, lat]);
    }

    async function getRoute(coords) {
        if (markers.current.length < 2) return;

        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/${travelMode.current}/${coords}?steps=false&geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const json = await query.json();
        if (json.routes === undefined || json.routes?.length < 1) {
            setErrorMessage("We couldn't find a route for your request.");
            setIsErrorModalOpen(true);
            deleteRouteFromMap();
            return;
        }
        const data = json.routes[0];
        setTravelData(data);
        const route = data.geometry.coordinates;
        drawRoute(route);
    }

    const drawRoute = (route) => {
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };

        if (map.current.getSource('route')) {
            map.current.getSource('route').setData(geojson);
        } else {
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
                    'line-color': lineColor,
                    'line-width': lineWidth,
                    'line-opacity': 0.85
                }
            });
        }
    }

    const deleteRouteFromMap = () => {
        if (map.current.getSource("route")) {
            map.current.removeLayer("route");
            map.current.removeSource("route");
            setTravelData(null);
        }
    }

    const planRoute = (mode) => {
        let coords = "";
        for (const marker of markers.current) {
            coords += marker.getLngLat().lng + ",";
            coords += marker.getLngLat().lat + ";";
        }
        travelMode.current = mode;
        getRoute(coords.slice(0, -1));
    }

    const deleteMarkers = () => {
        for (const marker of markers.current) {
            marker.remove();
        }
        deleteRouteFromMap()
        markers.current = [];
    }

    return (
        <div>
            <div id={"map"}></div>
            <Sidebar travelData={travelData} planRoute={planRoute} deleteMarkers={deleteMarkers} />
            <ErrorModal isOpen={isErrorModalOpen} closeModal={() => setIsErrorModalOpen(false)} message={errorMessage}/>
            <MapSettings map={map.current} lineColor={lineColor} setLineColor={setLineColor} lineWidth={lineWidth} setLineWidth={setLineWidth}/>
        </div>
    );
};

export default Map;
