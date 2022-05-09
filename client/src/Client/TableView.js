//Table view of location (User action #1)

import React from "react";

class TableView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        fetch("http://localhost:3000/weather")
            .then(res => res.json())
            .then(data => {
                return (<><h1>TableView</h1>
                    <table>
                        <td>location</td><td>time</td><td>temp_c</td><td>wind_kph</td><td>wind_dir</td><td>humidity</td><td>precip_mm</td><td>vis_km</td>
                        {data.map((weather, index) => <tr>
                            <td><a href="http://localhost:8080/weather/${weather.location}">{weather.location.locationName}</a></td>
                            <td>{weather.temp_c}</td>
                            <td>{weather.wind_kph}</td>
                            <td>{weather.wind_dir}</td>
                            <td>{weather.humidity}</td>
                            <td>{weather.precip_mm}</td>
                            <td>{weather.vis_km}</td></tr>
                        )}
                    </table></>)
            })
    }
}



export default TableView
