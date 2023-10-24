import "./MapSettings.css";
import {useEffect} from "react";
import {MAX_ROUTE_LINE_WIDTH, MIN_ROUTE_LINE_WIDTH} from "../config";

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
                <input type={"color"} value={lineColor} name={"line-color"}
                       onChange={(e) => setLineColor(e.target.value)}/>
            </div>
            <div className={"input-line"}>
                <span>Route line width:</span>
                <input type={"number"} value={lineWidth} min={MIN_ROUTE_LINE_WIDTH} max={MAX_ROUTE_LINE_WIDTH} name={"line-width"}
                       onChange={(e) => setLineWidth(Number(e.target.value))}/>
            </div>
        </div>
    );
};

export default MapSettings;
