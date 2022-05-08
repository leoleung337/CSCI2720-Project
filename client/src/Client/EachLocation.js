//user action q4-5

import React from "react";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
const {REACT_APP_URL} = process.env;

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
            <div>hi</div>
        )
    }



}
export default EachLocation;