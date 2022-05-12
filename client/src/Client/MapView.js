//Map view of location (User action #2)

import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useParams } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import EachLocation from "./EachLocation";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "70vh",
    textAlign: "center"
};

export default function MapView() {




    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyB91UVLhKv--pecJHLAMwS2JpmGgYbsTps",
    });

    if (!isLoaded) return <div>Loading</div>;
    return <Map />;

}

function Map() {
    const centre = {
        lat: 0,
        lng: 0
    };

    const [arr, setarr] = useState([]);

    useEffect(() => {
        const fet = async () => {
            const response = await fetch(`http://localhost:8080/weather`);
            const res = await response.json();
            setarr(res);
        };
        fet();
    }, []);

    return (<><h1>Map View</h1>
        <GoogleMap zoom={2} center={centre}>
            {arr.map((info, index) => {
                const marker = { lat: info.location.latitude, lng: info.location.longitude };
                <Marker position={marker} />
            })}
        </GoogleMap></>
    )

}






/*
    const ref = useRef(null);
    const [map, setMap] = useState();
    
    useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
      }
    }, [ref, map]);
    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyB91UVLhKv--pecJHLAMwS2JpmGgYbsTps",
        libraries,
    });
    if (loadError) return "error loading map";
    if (!isLoaded) return "loading map";


    const Marker = (options) => {
        const [marker, setMarker] = useState();

        useEffect(() => {
            if (!marker) {
                setMarker(new google.maps.Marker());
            }

            // remove marker from map on unmount
            return () => {
                if (marker) {
                    marker.setMap(null);
                }
            };
        }, [marker]);
        useEffect(() => {
            if (marker) {
                marker.setOptions(options);
            }
        }, [marker, options]);
        return null;
    };

    return (
        <div>
            <h2>Map View</h2>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={2}
                center={centre} id="map" />

            <Wrapper apiKey={googleMapsApiKey}>
                <Map center={centre}>
                    {arr.map((info, index) => {
                        const place = {
                            lat: info.location.lat,
                            lng: info.location.lng
                        };
                        <Marker position={place} />
                    })
                    }
                </Map>
            </Wrapper>

            {/*(map,google)=>{
                var marker = new google.maps.Marker({ 
                    position: place,
                    map:map,
                });
                var infoWin=new google.maos.InfoWindow({
                content:<p>{info.location.locationName}</p>
                     
                    })
                    marker.addListener("click",()=>{infoWin.open(map, marker)})
                }





        </div>

    );
}*/
