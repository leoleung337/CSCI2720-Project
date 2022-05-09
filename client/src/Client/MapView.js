//Map view of location (User action #2)

import React from "react";

class MapView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        fetch("http://localhost:3000/weather")
        .then(res => res.json())
        .then(data => {
        return <>
            <h1>MapView</h1>
            <div id="map" style="width:100%;height:600px;"></div>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUkPIk0dlSSf6s0w7WGkSLUmmiozaFcBQ&callback=mapCB">
                {
                function mapCB() {
                    var mapProp = {
                        center: new google.maps.LatLng(0, 0),
                        zoom: 5,
                    };
                    var map = new google.maps.Map(document.getElementById("map"), mapProp);
                    data.map((weather, index) => {
                    var marker = new google.maps.Marker({ 
                        position: {Lat:weather.location.latitude,Lng:weather.location.longitude},
                        map:map,
                    });
                    var infoWin=new google.maos.InfoWindow({
                        content:<h2><a href='http://www.localhost:8080/weather/${weather.location.locationName}'>{weather.location.locationName}</a></h2>
                    })
                    marker.addListener("click",()=>{infoWin.open(map,marker)})
                    })

                    marker.setMap(map);
                }
                }
            </script>
        </>;
        })
    }
}

export default MapView
