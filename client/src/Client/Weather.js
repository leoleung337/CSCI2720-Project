//Frontend user actions 1-3 

import React from "react";

class Weather extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>Home Page</h1>
                <a href={"/home/London"}>London</a> 
              
            </div>
        )
    }


}
export default Weather;