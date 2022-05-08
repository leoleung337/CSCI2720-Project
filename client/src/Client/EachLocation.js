//user action q4-5 single location details

import React, {useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import {useParams} from 'react-router-dom';
import './EachLocation.css'
const {REACT_APP_URL} = process.env;

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "60vh",
  textAlign: "center"
};

 export default function EachLocation(props){
    const{location} = useParams();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [temp_c, setTemp] = useState();
    const [wind_kph, setwind_kph] = useState();
    const [wind_dir, setwind_dir] = useState();
    const [humidity, sethumidity] = useState();
    const [precip_mm, setprecip_mm] = useState();
    const [ vis_km, setvis_km] = useState();
   
    useEffect(() =>{
    const getLocation = async()=>{
        const response = await fetch(`http://localhost:8080/weather/${location}`);
        const res = await response.json();
        setLat(res.location.latitude)
        setLng(res.location.longitude)
        setTemp(res.temp_c)
        setwind_kph(res.wind_kph)
        setwind_dir(res.wind_dir)
        sethumidity(res.humidity)
        setprecip_mm(res.precip_mm)
        setvis_km(res. vis_km)
       
        console.log(res)
    };
    getLocation();
    },[]);
    const Center={
        lat:lat,
        lng:lng
      };
  
    const {isLoaded , loadError} =useLoadScript({
        googleMapsApiKey: "AIzaSyB91UVLhKv--pecJHLAMwS2JpmGgYbsTps",
        libraries,
      });
      if(loadError) return "error loading map";
      if(!isLoaded) return "loading map";
      return (
    
        <div>
            <h2>{location}</h2>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={Center} id="map"/>
            <div style={{paddingTop:30}}>
                
                <table className="center">
                    <tr>
                        <th colspan="2">Location Details</th>
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
              
                <h4 style={{paddingTop:50}}>User Comments</h4>
            </div>

        </div>
      );


 }



/*
  <h6>Temp_c: {temp_c}</h6>
                <h6>Wind_kph: {wind_kph} </h6>
                <h6>Wind_dir: {wind_dir}</h6>
                <h6>Humidity: {humidity}</h6>
                <h6>Precip_mm: {precip_mm}</h6>
                <h6>Vis_km: {vis_km}</h6>
class EachLocation extends React.Component{
    constructor(props){
        super(props);
    }
    
    async componentDidMount(){
        const response = await fetch(`${REACT_APP_URL}/location/create/:location`)
        await response.json()
        .then(json=>{
            this.setState({posts:json,showposts:json})
            console.log(json) 
        })   
    }
    
    render(){
   
        return(

            <div>hi
             
            <Map
                google = {this.props.google}
                style ={{width:"50%",height:"50%"}}
                zoom={10}
                initialCenter = {
                    {
                        lat:51.506078,
                        lng:-0.127305
                    }
                }
                />
                </div>
        );
    }



}
export default GoogleApiWrapper({
    apiKey: "AIzaSyB91UVLhKv--pecJHLAMwS2JpmGgYbsTps"
}) (EachLocation);

 center={{ lat:{lat},lng:{lng}}}>
*/