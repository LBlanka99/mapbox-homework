import "./Map.css";
import {useEffect, useRef, useState} from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const Map = () => {
    const markers = useRef([]);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [distance, setDistance] = useState([0, "m"]);
    const [lineColor, setLineColor] = useState("#52358c");
    const [lineWidth, setLineWidth] = useState(5);

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

        const createMarker = (coordinates) => {
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
            markers.current = [...markers.current, newMarker];
        };

        const handleMapClick = (e) => {
            const lng = e.lngLat.lng;
            const lat = e.lngLat.lat;
            createMarker([lng, lat]);
        }

        map.current.on("click", handleMapClick);
    }, []);


    async function getRoute(coords, mode) {
        if (markers.current.length < 2) return;
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/${mode}/${coords}?steps=false&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            {method: 'GET'}
        );
        const json = await query.json();
        const data = json.routes[0];
        computeDetails(data);
        const route = data.geometry.coordinates;
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

    const computeDetails = (data) => {
        const time = Math.ceil(data.duration / 60);
        if (time >= 60) {
            setHours(Math.floor(time/60));
            setMinutes(time % 60);
        } else {
            setMinutes(time);
            setHours(0);
        }

        const meter = Math.round(data.distance);
        if (meter >= 2000) {
            setDistance([(meter/1000).toFixed(1), "km"]);
        } else {
            setDistance([meter, "m"]);
        }
    }

    const planRoute = (mode) => {
        let coords = "";
        for (const marker of markers.current) {
            coords += marker.getLngLat().lng + ",";
            coords += marker.getLngLat().lat + ";";
        }
        getRoute(coords.slice(0, -1), mode);
    }

    const deleteMarkers = () => {
        for (const marker of markers.current) {
            marker.remove();
        }

        if (map.current.getSource("route")) {
            map.current.removeLayer("route");
            map.current.removeSource("route");
            setDistance(0);
        }

        markers.current = [];
    }

    useEffect(() => {
        if (map.current.getSource('route')) {
            map.current.setPaintProperty("route", "line-color", lineColor);
        }
    }, [lineColor]);

    useEffect(() => {
        if (map.current.getSource('route')) {
            map.current.setPaintProperty("route", "line-width", lineWidth);
        }
    }, [lineWidth]);

    return (
        <div>
            <div id={"map"}></div>
            <div className={"sidebar"}>
                <div id={"modes"}>
                    <button onClick={() => planRoute("walking")}>Plan by 🚶</button>
                    <button onClick={() => planRoute("cycling")}>Plan by 🚴</button>
                    <button onClick={() => planRoute("driving")}>Plan by 🚗</button>
                    <button id={"clear-markers"} onClick={deleteMarkers}>Clear all markers</button>

                </div>
                {distance[0] !== 0 ?
                    <div id={"trip-infos"}>
                        {hours > 0 ? `Trip duration: ${hours} hour(s) and ` : "Trip duration: "} {minutes} min(s)
                        <br/> Trip distance: {distance[0]} {distance[1]}
                    </div>
                    : <div></div>
                }
            </div>
            <div className="map-settings">
                <h3>Map Settings</h3>
                <div className={"input-line"}>
                    <span>Route line color: </span>
                    <input type={"color"} value={lineColor} onChange={(e) => setLineColor(e.target.value)}/>
                </div>
                <div className={"input-line"}>
                    <span>Route line width:</span>
                    <input type={"number"} value={lineWidth} min={1} max={30} onChange={(e) => setLineWidth(Number(e.target.value))}/>
                </div>
            </div>

        </div>
    );
};

export default Map;
