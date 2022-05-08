//user action q4-5

import React, {useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import {useParams} from 'react-router-dom';

const {REACT_APP_URL} = process.env;

const libraries = ["places"];
const mapContainerStyle = {
  width: "50vw",
  height: "50vh"
};
 const center1={
   lat:22.329680,
   lng:114.179162
 };

 export default function EachLocation(props){
    const{location} = useParams();
    const [center] = useState([]);
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();

    useEffect(() =>{
    const getLocation = async()=>{
        const response = await fetch(`${REACT_APP_URL}/weather/${location}`);
        const res = await response.json();
        setLat(res.location.latitude)
        setLng(res.location.longitude)
        console.log(res)
        console.log(res.location.latitude)
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