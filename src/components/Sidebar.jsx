import "./Sidebar.css";
import {useEffect, useState} from "react";

const Sidebar = ({travelData, planRoute, deleteMarkers}) => {
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [distance, setDistance] = useState([0, "m"]);

    const computeDetails = () => {
        if (travelData) {
            const time = Math.ceil(travelData.duration / 60);
            if (time >= 60) {
                setHours(Math.floor(time / 60));
                setMinutes(time % 60);
            } else {
                setMinutes(time);
                setHours(0);
            }

            const meter = Math.round(travelData.distance);
            if (meter >= 2000) {
                setDistance([(meter / 1000).toFixed(1), "km"]);
            } else {
                setDistance([meter, "m"]);
            }
        }
    }

    useEffect(() => {
        computeDetails();
    }, [travelData]);


    return (
        <div>
            <div className={"travel-sidebar"}>
                <div id={"modes"}>
                    <button onClick={() => planRoute("walking")}>Plan by 🚶</button>
                    <button onClick={() => planRoute("cycling")}>Plan by 🚴</button>
                    <button onClick={() => planRoute("driving")}>Plan by 🚗</button>
                </div>
                {travelData &&
                    <div id={"trip-infos"}>
                        {hours > 0 ? `Trip duration: ${hours} hour(s) and ` : "Trip duration: "} {minutes} min(s)
                        <br/> Trip distance: {distance[0]} {distance[1]}
                    </div>
                }
            </div>
            <div id={"clear-button"}>
                <button onClick={deleteMarkers}>Clear all markers</button>
            </div>
        </div>
    );
};

export default Sidebar;
