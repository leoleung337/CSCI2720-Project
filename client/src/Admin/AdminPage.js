/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/
import React from "react";
import {Route,Routes,Link, useParams,useLocation,Navigate} from 'react-router-dom';
import Cookies from "universal-cookie";
import ManageUser from "./ManageUser";
import ManageLocation from "./ManageLocation";
import './AdminPage.css'

class Admin extends React.Component{
    constructor(props){
        super(props)
    }
    removeCookies = () => {
        const c = new Cookies()
        c.remove("username", { path: '/' })
        c.remove("role", { path: '/' })
        console.log('remove')
    }
    updateDatabase = () => {
        fetch('http://localhost:8080/location').then(res => res.json()).then((locations) => locations.forEach((location) => {
            /* comments for testing if the weather is updated */
            /*fetch("http://localhost:8080/weather/" + location.locationName).then((res) => res.json()).then((weather) => {
                console.log("[Old]: " + location.locationName + ": " + weather.temp_c);
            });*/
            fetch("http://localhost:8080/weather/update/" + location.locationName).then((res) => res.json());
            /*fetch("http://localhost:8080/weather/" + location.locationName).then((res) => res.json()).then((weather) => {
                console.log("[New]: " + location.locationName + ": " + weather.temp_c);
            });*/
        }))
        window.alert("Weather have been updated")
    
    }
    render(){
        const BackToLogin = (props) =>{
            const cookie = new Cookies()
            let tokenusername= cookie.get('username')
            if (!tokenusername){
                window.alert("please login first")
                return(<Navigate to="/"/>)
            }
            if (tokenusername != "admin"){
                window.alert("You can't access admin page")
                return <Navigate to="/"/>
            }
            return <></>
        }
        return(
            <div>
                <h1>Admin Page</h1>
                <ul className = "nav nav-tabs text-light">
                    <Link to="/admin/ManageUser" className="nav-link">Manage User</Link>
                    <Link to="/admin/ManageLocation" className="nav-link">Manage Location</Link>
                    <Link to="/admin" className="nav-link" onClick={ this.updateDatabase }>Update Database</Link>
                    <Link to="/" className="nav-link" onClick={ this.removeCookies }>Logout</Link>
                </ul>
                <br/>
                <Routes>
                    <Route path = "/ManageUser" element={ <ManageUser /> } />
                    <Route path = "/ManageLocation" element={ <ManageLocation /> } />
                </Routes>
                <BackToLogin />
            </div>
        );
    }
}
export default Admin
