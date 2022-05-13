//Map view of location (User action #2)

import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker,InfoBox} from '@react-google-maps/api';
import { Route, Routes, Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import EachLocation from "./EachLocation";

export default function MapView() {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB91UVLhKv--pecJHLAMwS2JpmGgYbsTps",
    });

    if (!isLoaded) return <div>Loading</div>;
    return <Map />;

}
    const centre = {
        lat: 0,
        lng: 0
    };

function Map() {
    const params=useParams().username;
    const [arr, setarr] = useState([]);

    useEffect(() => {
        const fet = async () => {
            const response = await fetch(`http://localhost:8080/weather`);
            const res = await response.json();
            setarr(res);
        };
        fet();
    }, []);

    return (<><h2>Map View</h2>
        <GoogleMap zoom={2} center={centre} width="100%" height="70vh">
            {arr.map((info, index) => {
                const loc = { lat: info.location.latitude, lng: info.location.longitude };
                <><Marker position={loc} />
                <InfoBox position={loc}><Link to={`/user/${params}/${info.location.locationName}`}>{info.location.locationName}</Link></InfoBox>
                </>
            })}
                        <Routes>
                        <Route path="/:location" element={<EachLocation username={params} />} />
                    </Routes>
        </GoogleMap>
</>)
}
