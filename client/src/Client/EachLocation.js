//user action q4-5 single location details


import React, {useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import {useParams} from 'react-router-dom';

const {REACT_APP_URL} = process.env;

const libraries = ["places"];
const mapContainerStyle = {
  width: "50vw",
  height: "50vh"
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
            center={Center}/>
            <div>
                <h6>Temp_c: {temp_c}</h6>
                <h6>Wind_kph: {wind_kph} </h6>
                <h6>Wind_dir: {wind_dir}</h6>
                <h6>Humidity: {humidity}</h6>
                <h6>Precip_mm: {precip_mm}</h6>
                <h6>Vis_km: {vis_km}</h6>
                <h5>User Comments</h5>
            </div>

        </div>
      );


 }



/*
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