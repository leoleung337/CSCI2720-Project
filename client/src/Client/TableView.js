//Table view of location (User action #1)

import React, { useEffect, useState } from "react";
import EachLocation from "./EachLocation";
import { Route, Routes, Link, useParams } from 'react-router-dom';

    export default function TableView() {
        const [arr, setarr] = useState([]);
        const params=useParams().username;
    
        useEffect(() => {
            const fet = async () => {
                const response = await fetch(`http://localhost:8080/weather`);
                const res = await response.json();
                setarr(res)
    
            };
            fet();
        }, []);
    
        let sorting=function() {
            let sortby = document.querySelector("#sort").value;
            if (sortby == 0) return;
            let s = [],t=[],s_sort=[];
            let tab=document.querySelector("#tab");
            for (let i = 1; i < tab.children.length; i++) {
                let row = []            
                for (let j = 0; j < 8; j++) {
                row[j] = tab.children[i].children[j].innerText;
                }
                t[i-1]=row
                s[i-1] = parseFloat(tab.children[i].children[sortby].innerText);
                s_sort[i-1] = parseFloat(tab.children[i].children[sortby].innerText);
            
        }
            s_sort.sort((x, y) => x - y);
    
            for (let i = 1; i < tab.children.length; i++) {
                let newIndex = s.indexOf(s_sort[i]);
                for (let j=0;j<8;j++){
                    tab.children[i].children[j].innerText=t[newIndex][j];
    
                }
                s[newIndex]=9999999
            }
        }
    return (
        <>
            <h1>TableView</h1>
            <form>
                <label>Sort by:</label>
                <select id="sort">
                    <option value="0">Default</option>
                    <option value="1">temp_c</option>
                    <option value="2">wind_kph</option>
                    <option value="4">humidity</option>
                    <option value="5">precip_mm</option>
                    <option value="6">vis_km</option>
                </select>

                <button type="button" id="sort" onClick={()=>sorting()}>enter</button>
            </form>


            <table id="tab">
                <tr><td>location</td><td>temp_c</td><td>wind_kph</td><td>wind_dir</td><td>humidity</td><td>precip_mm</td><td>vis_km</td><td>last updated time</td></tr>
                {arr.map((weather, index) =>
                    <tr id={index}>
                        <td><Link to ={`/user/${params}/${weather.location.locationName}`}>{weather.location.locationName}</Link></td>
                        <td>{weather.temp_c}</td>
                        <td>{weather.wind_kph}</td>
                        <td>{weather.wind_dir}</td>
                        <td>{weather.humidity}</td>
                        <td>{weather.precip_mm}</td>
                        <td>{weather.vis_km}</td>
                        <td>{weather.time}</td></tr>

                )}

            </table>
            <Routes>
                        <Route path="/:location" element={<EachLocation username={params} />} />
                    </Routes>
            </>
    );
}
