import "./Map.css";
import {useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [minutes, setMinutes] = useState(0);
    const [distance, setDistance] = useState(0);

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


        const start = [17.915123, 47.093123];

        // create a function to make a directions request
        async function getRoute(end) {
            // make a directions request using cycling profile
            // an arbitrary start will always be the same
            // only the end or destination will change
            // a fetchben a cycling helyett lehet driving vagy walking
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=false&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                {method: 'GET'}
            );
            const json = await query.json();
            const data = json.routes[0];
            const time = Math.floor(data.duration / 60);
            setMinutes(time);
            setDistance(data.distance);
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
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
            }
            // otherwise, we'll make a new request
            else {
                map.addLayer({
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

        map.on('load', () => {
            // make an initial directions request that
            // starts and ends at the same location
            getRoute(start);

            // Add starting point to the map
            map.addLayer({
                id: 'point',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: start
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#3887be'
                }
            });
            map.on('click', (event) => {
                const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);

                getRoute(coords);
            });
        });


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
        <div>
            <div id={"map"}></div>
            {distance &&
            <div id={"trip-infos"}>Trip duration: ${minutes} min(s) 🚴 <br/> Trip distance: ${distance} m</div>
            }
        </div>
    );
};

export default Map;
