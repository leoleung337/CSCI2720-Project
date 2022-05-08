//Frontend user actions 1-3 

import React from "react";

class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={username:this.props.username}
    }
    render(){
        return(
            <div>
                <h1>Home Page</h1>
              
                <a href={`/user/${this.props.username}/London`}>London (Testing)</a> 
                <a href={`/user/${this.props.username}/Seoul`}>Seoul (Testing)</a> 
            </div>
        )
    }


}
export default Weather;