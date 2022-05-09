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
                    <form action="http://localhost:8080/weather/location" method="post">

                        <label>Sort by:</label>
                        <select id="sort">
                            <option value="0">Default</option>
                            <option value="1">temp_c</option>
                            <option value="2">wind_kph</option>
                            <option value="3">wind_dir</option>
                            <option value="4">humidity</option>
                            <option value="5">precip_mm</option>
                            <option value="6">vis_km</option>
                        </select>

                        <button type="button" id="sort" onclick="sorting()">enter</button>
                    </form>

                    <table>
                        <td>location</td><td>time</td><td>temp_c</td><td>wind_kph</td><td>wind_dir</td><td>humidity</td><td>precip_mm</td><td>vis_km</td>
                        {data.map((weather, index) => <tr id={index}>
                            <td><a href="http://localhost:8080/weather/${weather.location}">{weather.location.locationName}</a></td>
                            <td>{weather.temp_c}</td>
                            <td>{weather.wind_kph}</td>
                            <td>{weather.wind_dir}</td>
                            <td>{weather.humidity}</td>
                            <td>{weather.precip_mm}</td>
                            <td>{weather.vis_km}</td></tr>
                        )}
                    </table>
                    
                    <script>
                        {function sorting() {
                            let sortby = document.querySelector("#sort").value;
                            if (sortby == 0) return;
                            let row = [], s = [];
                            for (let i = 0; i < 15; i = i + 1) {
                                row[i] = document.getElementById(i);
                                s[i] == parseInt(row[i].children[sortby].innerHTML);
                            }
                            let t = s;
                            t.sort((x, y) => x - y);
                            for (let i = 0; i < 15; i = i + 1) {
                                let newIndex = s.indexOf(t[i]);
                                document.getElementById(i).replaceWith(row[newIndex]);
                            }
                        }}
                    </script></>)
            })
    }
}

export default TableView
