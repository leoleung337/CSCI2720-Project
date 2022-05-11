//Frontend user actions 1-3 

import React from "react";
import {Link} from 'react-router-dom';
class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={username:this.props.username}
    }
    render(){
        return(
            <div>
                <h1>Home Page</h1>
              
                <Link to={`/user/${this.props.username}/London`}>London (Testing)</Link> 
                <Link to={`/user/${this.props.username}/Seoul`}>Seoul (Testing)</Link> 
            </div>
        )
    }


}
export default Weather;