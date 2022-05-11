import React, {useEffect, useState } from "react";
import {useParams , Link} from 'react-router-dom';
import "./FavLoc.css"

  export default function FavLoc(props){
    const {username} = useParams();
    const [favloc, setfavloc] = useState();

    useEffect(() =>{
        const getFavLoc = async()=>{
            const response = await fetch(`http://localhost:8080/location/listAllFavourite/${username}`);
            const res = await response.json();
            setfavloc(res)
            console.log(res)
        };
        getFavLoc();
    },[]);

    const deleteloc =function(location){
        fetch(`http://localhost:8080/location/deleteFavourite/${location}/${username}` )
       .then(res=>res.json())
       .then(res=>{
          window.alert(res.msg)
          console.log(res)
       })
    
       const reloadPage = () => {
         window.location.reload()
       }
       reloadPage();
     }

    return(
        <div>
            <h2>Your Favourite Locations</h2>
            <div  style={{paddingTop:30}}>
            {(favloc||[]).map((favloc)=>(
                <div>
                    <table className="center" id="favtable">
                        <tr>
                            <td id="loctd"><Link to ={`/user/${username}/${favloc.locationName}`}>{favloc.locationName}</Link></td>
                            <td id="loctd"><button onClick={()=>deleteloc(favloc.locationName)}>Remove</button></td>
                        </tr>
                            
                    </table>
                </div>
                )
            )}
            </div>
        </div>
    );
  }