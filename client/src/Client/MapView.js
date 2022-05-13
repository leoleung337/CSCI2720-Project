//Map view of location (User action #2)

import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker,InfoBox} from '@react-google-maps/api';
import { Route, Routes, Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import EachLocation from "./EachLocation";

const mapContainerStyle = {
    width: "100%",
    height: "60vh",
    textAlign: "center"
  };
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
        <GoogleMap zoom={2} center={centre} mapContainerStyle={mapContainerStyle}>
            {arr.map((info, index) => {
                const loc = { lat: info.location.latitude, lng: info.location.longitude };
                <>
                <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: info.location.latitude, lng: info.location.longitude}} />
                
                <InfoBox position={loc}><Link to={`/user/${params}/${info.location.locationName}`}>{info.location.locationName}</Link></InfoBox>
                </>
            })}
                        <Routes>
                        <Route path="/:location" element={<EachLocation username={params} />} />
                    </Routes>
        </GoogleMap>
        <h1>hi</h1>
        
        
</>)
}


/* function Map() {
    return(<>
    <div style={{ height: '1000px', width: '1000px' }}>
    <GoogleMap
        zoom={10}
        center={{lat:44, lng:-80}}
        mapContainerStyle={mapContainerStyle}
        >
        <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 44, lng: -88}} />
        </GoogleMap>
        <h1>hi</h1>
        </div>
        </>)
} */