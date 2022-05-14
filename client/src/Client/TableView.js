/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/

//Table view of location (User action #1)

import React, { useEffect, useState } from "react";
import EachLocation from "./EachLocation";
import { Route, Routes, Link, useParams } from 'react-router-dom';

export default function TableView() {
    const [arr, setarr] = useState([]);
    const params = useParams().username;

    useEffect(() => {
        const fet = async () => {
            const response = await fetch(`http://localhost:8080/weather`);
            const res = await response.json();
            setarr(res)

        };
        fet();
    }, []);

    let sorting = function () {
        let sortby = document.querySelector("#sort").value;
        if (sortby == 0) return;
        let s = [], s_sort = [];
        let tab = document.querySelector("#tab");
        for (let i = 1; i < tab.children.length; i++) {
            s[i - 1] = parseFloat(tab.children[i].children[sortby].innerText);
            s_sort[i - 1] = parseFloat(tab.children[i].children[sortby].innerText);
        }

        if (document.querySelector("#order").value == 0)
            s_sort.sort((x, y) => x - y);
        else s_sort.sort((x, y) => y - x);

        let index = [-1]
        for (let i = 1; i < tab.children.length; i++) {
            index[i] = s.indexOf(s_sort[i - 1]) + 1 //The i-th element is the index-i th chiled of tab;
            s[index[i] - 1] = 9999999
        }

        for (let i = 1; i < tab.children.length; i++) {
            let loc = tab.children[index[i]]
            tab.appendChild(loc)
            for (let k = 0; k < index.length; k++) {
                if (index[k] > index[i]) index[k]--;
            }

        }
    }

    return (<>
        <h2>Table View</h2>
        <form>
            <label style={{ paddingTop: 30 }}>Sort by:</label>
            <select id="sort">
                <option value="0">Default</option>
                <option value="1">temp_c</option>
                <option value="2">wind_kph</option>
                <option value="4">humidity</option>
                <option value="5">precip_mm</option>
                <option value="6">vis_km</option>
            </select>
            <label style={{ paddingTop: 30 }}>Order:</label>
            <select id="order">
                <option value="0">ascending</option>
                <option value="1">descending</option>
            </select>
            <button type="button" id="sort" onClick={() => sorting()}>enter</button>
        </form>

        <div style={{ paddingTop: 30 }} />
        <table id="tab">
            <tr><td>location</td><td>temp_c</td><td>wind_kph</td><td>wind_dir</td><td>humidity</td><td>precip_mm</td><td>vis_km</td><td>last updated time</td></tr>
            {arr.map((weather, index) =>
                <tr id={index}>
                    <td><Link to={`/user/${params}/${weather.location.locationName}`}>{weather.location.locationName}</Link></td>
                    <td>{weather.temp_c}</td>
                    <td>{weather.wind_kph}</td>
                    <td>{weather.wind_dir}</td>
                    <td>{weather.humidity}</td>
                    <td>{weather.precip_mm}</td>
                    <td>{weather.vis_km}</td>
                    <td>{weather.time}</td></tr>

            )}

        </table></>
    );
}
