/* 
This is the home page of user interface
*/

import React from "react";
import Weather from "./Weather";
import EachLocation from "./EachLocation";
import {Route,Routes,Link,useNavigate,Navigate, useParams} from 'react-router-dom';
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
            //navbar
            <div className="container">
                 <div style={{paddingTop:20}}/>
                <h1 style={{fontSize:45}}> <a href={`/user/${params}`}>Main Page</a></h1>
{/*                 <div className="icon-bar" >  
                    <a href="/" onClick={this.removeCookies}>Logout  <i class="bi bi-box-arrow-in-left"></i></a>
                    <a href={`/user/${params}/`}></a> 
                    <a href={`/user/${params}/`}></a> 
                    <a href={`/user/${params}/`}></a>
                </div> */}

                <br/>
                <ul className = "nav nav-tabs text-light">
                    
                    <a class="nav-item nav-link" href={`/user/${params}/`}>Favourite Locations</a> 
                    <a class="nav-item nav-link" href={`/user/${params}/`}>B</a> 
                    <a class="nav-item nav-link" href={`/user/${params}/`}>C</a>
                    <a class="nav-item nav-link" href="/" onClick={this.removeCookies}>Logout<i class="bi bi-box-arrow-in-left"></i></a>
                </ul>
                <br/>

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