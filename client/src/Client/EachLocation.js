/*
A separate view for one single location 
Add location into a list of user’s favourite locations
(user action #4,5)
*/
import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import './EachLocation.css'
const { REACT_APP_URL } = process.env;

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "60vh",
    textAlign: "center"
};

export default function EachLocation(props) {
    const { username } = useParams();
    const { location } = useParams();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [time, setTime] = useState();
    const [temp_c, setTemp] = useState();
    const [wind_kph, setwind_kph] = useState();
    const [wind_dir, setwind_dir] = useState();
    const [humidity, sethumidity] = useState();
    const [precip_mm, setprecip_mm] = useState();
    const [vis_km, setvis_km] = useState();

    //refresh the weather information by clicking the button
    const clickupdate = function () {
        updateweather();
        getLocation();
        window.alert("Time updated!")
    }

    //update the newest weather location before getting the weather
    const updateweather = async () => {
        const response = await fetch(`http://localhost:8080/weather/update/${location}`)
            .then(res => res.json())
            .then(res => { console.log(res) })
    };

    //getting single location details from database

    const getLocation = async () => {
        updateweather();
        const response = await fetch(`http://localhost:8080/weather/${location}`);
        const res = await response.json();

        setLat(res.location.latitude)
        setLng(res.location.longitude)
        setTime(res.time)
        setTemp(res.temp_c)
        setwind_kph(res.wind_kph)
        setwind_dir(res.wind_dir)
        sethumidity(res.humidity)
        setprecip_mm(res.precip_mm)
        setvis_km(res.vis_km)
        console.log(res)
    };
    useEffect(() => { getLocation() }, [])

    //getting single location comments from database
    const [comment, setcomment] = useState([]);
    useEffect(() => {
        const fetchComment = async () => {
            const response = await fetch(`http://localhost:8080/location/${location}/loadComment`);
            const res = await response.json();
            setcomment(res)
        };
        fetchComment();

    }, [comment]);
    // useEffect(()=>{fetchComment()},[]) //update comments when new comments had been made 

    //add favourite locations to the database
    const addfavloc = function () {
        fetch(`http://localhost:8080/location/addFavourite/${location}/${username}`)
            .then(res => res.json())
            .then(res => {
                window.alert(res.msg)
                console.log(res)
            })

    };
    //setting the latitude and longtitude of the map
    const Center = {
        lat: lat,
        lng: lng
    };

    //loading the map by using an Api Key
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyB91UVLhKv--pecJHLAMwS2JpmGgYbsTps",
        libraries,
    });
    if (loadError) return "error loading map";
    if (!isLoaded) return "loading map";

    //posting comments to database
    const addcomment = (text) => {
        let data = {
            author: username,
            content: text,
        }
        fetch(`http://localhost:8080/location/${location}/addComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: "cors"

        })
            .then(res => res.json())

            .then(res => {
                console.log('posted a comment', res)
            })
    }

    return (
        <div>
            <button className="button" onClick={() => addfavloc()}> Add to Favourite </button>

            <h2 style={{ paddingTop: 70 }}>{location}</h2>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={Center} id="map" />
            <button className="button" onClick={() => clickupdate()}> Refresh time </button>

            <div style={{ paddingTop: 120 }}>
                <table className="center">
                    <tr>
                        <th colspan="2">Location Details</th>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "rgb(203, 225, 225)" }}>Last Updated Time</td>
                        <td style={{ backgroundColor: "rgb(203, 225, 225)" }}>{time}</td>
                    </tr>
                    <tr>
                        <td>Temp_c</td>
                        <td>{temp_c}</td>
                    </tr>
                    <tr>
                        <td>Wind_kph</td>
                        <td>{wind_kph}</td>
                    </tr>
                    <tr>
                        <td>Wind_dir</td>
                        <td>{wind_dir}</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>{humidity}</td>
                    </tr>
                    <tr>
                        <td>Precip_mm</td>
                        <td>{precip_mm}</td>
                    </tr>
                    <tr>
                        <td>Vis_km</td>
                        <td>{vis_km}</td>
                    </tr>

                </table>

            </div>


            <div class="container">
                <div class="row">
                    <section class="col-sm-6 col-md-7 col-xl-8">

                        <h4 style={{ paddingTop: 50 }}>Comments</h4>


                        {(comment || []).map((comment, index) => (
                            <div className="card" id="everycomment" key={index} >
                                <div className="card-body" id="001">
                                    <p > #{index + 1} <span style={{ fontSize: 17 }} id="username">{comment.author} </span><span style={{ fontSize: 14 }}></span></p>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        )
                        )}
                    </section>

                    <section id="res-web" class="col-sm-6 col-md-5 col-xl-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addcomment(e.target[0].value)
                            }}>



                            <div className="form-group" style={{ paddingTop: 30 }}>
                                <h4 style={{ paddingTop: 30 }}>Add Comments</h4>

                                <textarea name="content" id="new-comment" className="form-control" placeholder="Write Something..." rows={10} required></textarea>
                            </div>
                            <button type="submit" className="button" >Submit</button>

                        </form>
                    </section>
                </div></div>

        </div >
    );
}
