import "./MapSettings.css";
import {useEffect} from "react";

const MapSettings = ({map, lineColor, setLineColor, lineWidth, setLineWidth}) => {

    useEffect(() => {
        if (map?.getSource('route')) {
            map?.setPaintProperty("route", "line-color", lineColor);
        }
    }, [lineColor]);

    useEffect(() => {
        if (map?.getSource('route')) {
            map?.setPaintProperty("route", "line-width", lineWidth);
        }
    }, [lineWidth]);

    return (
        <div className="map-settings">
            <h3>Map Settings</h3>
            <div className={"input-line"}>
                <span>Route line color: </span>
                <input type={"color"} value={lineColor} onChange={(e) => setLineColor(e.target.value)}/>
            </div>
            <div className={"input-line"}>
                <span>Route line width:</span>
                <input type={"number"} value={lineWidth} min={1} max={30}
                       onChange={(e) => setLineWidth(Number(e.target.value))}/>
            </div>
        </div>
    );
};

export default MapSettings;
