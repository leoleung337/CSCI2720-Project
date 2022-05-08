
import React from "react";
import {Route,Routes} from 'react-router-dom';
import Weather from "./Weather";
import EachLocation from "./EachLocation";

class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const CallRoute = (props)=>{
        return(
             
                <div>
                  
                    <Routes>
                        <Route path = "/*" element= {<Weather/>}/>
                        <Route path = "/London" element={<EachLocation/>}/>
                    </Routes>
                </div>
        );
        }
        return(
            <CallRoute />  
        );

    }

}
export default Home