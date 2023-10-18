import "./Map.css";
import {useEffect} from "react";
import mapboxgl from "mapbox-gl";

const Map = () => {

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiYmxhbmthOTkiLCJhIjoiY2xudmZ4ZHI3MHBtajJrb2p4cGJuN2FkZiJ9.F8-MFO-f6jbjFS1zhItYgA";

        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/outdoors-v12",
            center: [17.915, 47.093],
            zoom: 12.5,
        });

        return () => map.remove();
    }, []);

    return (
        <div id={"map"}>

        </div>
    );
};

export default Map;
