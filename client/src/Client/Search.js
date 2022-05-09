//Search for keywords (User action #3)

import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<><h1>Search for attributes</h1>
            <form>

                <label>Attribute:</label>
                <select id="kw">
                    <option value="temp_c">temp_c</option>
                    <option value="wind_kph">wind_kph</option>
                    <option value="wind_dir">wind_dir</option>
                    <option value="humidity">humidity</option>
                    <option value="precip_mm">precip_mm</option>
                    <option value="vis_km">vis_km</option>
                </select>

                <button type="button" id="search" onclick="search()">load</button>
            </form>

            <div>
                <h2>Results:</h2>
                <table id="results"></table>
            </div>
            <script>
                {function search() {
                    let kw = document.querySelector("#kw").value;
                    fetch("http://localhost:8080/weather")
                        .then(res => res.json())
                        .then(data => {
                            document.querySelector("#results").appendChild(<tr><td>Location</td><td>{kw}</td></tr>);
                            for (let i=0;i<15;i=i+1){
                                let loc=data[i].locationName;
                                let field=data[i].kw;
                                document.querySelector("#results").appendChild(<tr><td>{loc}</td><td>{field}</td></tr>);
                            }
                        });
                }
                }

            </script></>)
    }
}
export default Search
