
import React from "react";
import {Route,Routes,Link, useParams,useLocation,Navigate} from 'react-router-dom';
import ManageUser from "./ManageUser";

class Admin extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1>AdminPage</h1>
                <br/>
                <ul className = "nav nav-tabs text-light">
                    <Link to="/admin/ManageUser" className = "nav-link">Manage User</Link>
                </ul>
                <br/>
                <Routes>
                    <Route path = "/ManageUser" element={<ManageUser />}/>
                </Routes>
            </div>
        );
    }
}
export default Admin