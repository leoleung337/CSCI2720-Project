/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/

//Search for keywords (User action #3)

import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";

class Search extends React.Component {
    search() {
        let kw = document.querySelector("#kw").value;
        fetch("http://localhost:8080/weather")
            .then(res => res.json())
            .then(data => {
                let res = document.querySelector("#results");
                let len = data.length;
                let tab = document.createElement("table"), header = document.createElement("tr");
                tab.id="tab";
                let name1 = document.createElement("td"), name2 = document.createElement("td");

                name1.innerText = "Location";
                header.appendChild(name1);
                name2.innerText = kw;
                header.appendChild(name2);
                tab.appendChild(header);
                for (let i = 0; i < len; i = i + 1) {
                    let loc = data[i].location.locationName;
                    let field = data[i][kw];
                    let row = document.createElement("tr");
                    let col1 = document.createElement("td"), col2 = document.createElement("td");
                    col1.innerText = loc;
                    row.appendChild(col1);
                    col2.innerText = field;
                    row.appendChild(col2);
                    tab.appendChild(row);
                }
                if (res.children.length===0){
                let title = document.createElement("h2");
                title.innerText = "Results:";
                res.appendChild(title);
                res.appendChild(tab);
                }
                else {
                    document.querySelector("#tab").remove();
                    res.appendChild(tab);

                }
            });
    }
    render() {
        return (<><h2>Search for fields</h2>
            <form>

                <label style={{paddingTop:30}}>Field: </label>
                <select id="kw">
                    <option value="temp_c">temp_c</option>
                    <option value="wind_kph">wind_kph</option>
                    <option value="wind_dir">wind_dir</option>
                    <option value="humidity">humidity</option>
                    <option value="precip_mm">precip_mm</option>
                    <option value="vis_km">vis_km</option>
                </select>

                <button type="button" id="search" onClick={() => this.search()}>load</button>
            </form>

            <div id="results" style={{paddingTop:30}}>
            </div>
        </>)
    }
}
export default Search
