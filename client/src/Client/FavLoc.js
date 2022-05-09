import React, {useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
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
            <div>


            {(favloc||[]).map((favloc)=>(
                
              
              <div>
                  <table className="center" id="favtable">
                               
                               <tr>
                                   <td id="loctd">{favloc.locationName}</td>
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



/*
class FavLoc extends React.Component{
    constructor(props){
        super(props);
        this.state={username:this.props.username,favloc:[]}
    }

    async componentDidMount(){
        const response = await fetch(`http://localhost:8080/location/listAllFavourite/${this.state.username}`)
        await response.json()

        .then(json=>{
            this.setState({favloc:json})
            console.log(json) 
            console.log(this.state.username)
        })   
    }

    async removeloc(){
        const response = await fetch(`http://localhost:8080/location/deleteFavourite/:location/:username/${this.state.username}`)
        await response.json()

    }



    render(){
        return(
            <div>
                <h2>Your Favourite Locations</h2>
                {this.state.favloc.map((favloc,index)=>{
                  
                return <table className="center" id="favtable">
                               
                            <tr>
                                <td>{favloc.locationName}</td>
                                <td><button>Remove</button></td>
                            </tr>
                           

                        </table>
                         
                    
                           
                        
             
                    
            })}
              
            </div>
        )
    }


}
export default FavLoc;
*/