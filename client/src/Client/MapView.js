//Map view of location (User action #2)

import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Route, Routes, Link, useParams } from 'react-router-dom';

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

function Map() {
    const params = useParams().username;
    const [arr, setarr] = useState([]);
    const centre = {
        lat: 0,
        lng: 0
    };

    const clickupdate = function () {
        fet();
        window.alert("Location updated!")
    }

    const fet = async () => {
        const response = await fetch(`http://localhost:8080/weather`);
        const res = await response.json();
        setarr(res);
    }


    useEffect(() => {
        fet();
    }, []);
    console.log(arr)

    return (<><h2>Map View</h2>
        <GoogleMap zoom={2} center={centre} mapContainerStyle={mapContainerStyle}>
            {arr.map((info, index) => <IW lat={info.location.latitude} lng={info.location.longitude} name={info.location.locationName} params={params} />)}
        </GoogleMap>
        <button className="button" onClick={() => clickupdate()}>Refresh</button>

    </>)
}

class IW extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const name = this.props.name;
        const lati = this.props.lat;
        const long = this.props.lng;
        const loc = { lat: lati, lng: long };
        const params = this.props.params;
        return <InfoWindow position={loc}><Link to={`/user/${params}/${name}`}>{name}</Link></InfoWindow>
    }
}
