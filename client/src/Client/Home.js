/* 
This is the home page of user interface
*/

import React from "react";
import Weather from "./Weather";
import EachLocation from "./EachLocation";
import {Route,Routes,useNavigate,Navigate, useParams} from 'react-router-dom';
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";



class Home extends React.Component{
    constructor(props){
        super(props)
    }

    removeCookies =() =>{
        const c= new Cookies()
        c.remove("username", { path: '/' })
        c.remove("role", { path: '/' })
        console.log('remove')
    }
    render(){
        const CallRoute = (props)=>{
            let params = useParams().username
            const cookie = new Cookies()
            let tokenusername= cookie.get('username')
            if (!tokenusername){
                window.alert("please login first")
                return(<Navigate to="/"/>)
            }
            if (tokenusername!=params){
                window.alert("You can't access other users' page")
                return <Navigate to="/"/>
            }
            return(
            <div className="container">
               
                 <div style={{paddingTop:20}}/>
                <h1 style={{fontSize:45}}> <a href={`/user/${params}`}>Main Page</a></h1>
                <div className="icon-bar" >  
                    <a href="/" onClick={this.removeCookies}><i className="fa fa-sign-out" ></i></a> 
                    <a href={`/user/${params}/`}><i className="fa fa-user"></i></a> 
                    <a href={`/user/${params}/`} ><i className="fa fa-search"></i></a>
                </div>           
                <Routes>
                    <Route path = "/*" element= {<Weather username={params}/>}/>
                    <Route path = "/:location" element={<EachLocation username={params} />}/>
                </Routes>
                </div>
            )
        }
        return(
            <CallRoute />  
        );
    }
}


        

export default Home