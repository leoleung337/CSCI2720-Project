//Search for keywords (User action #3)
import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<><h1>Search for location:</h1>
     <form action="http://localhost:8080/weather/location" method="post">

        <label for="eventid">Keywords</label>
        <input type="text" id="kw" name="kw">
        <button type="button" id="loadKW" onclick="loadKW()">load</button>
        <br>

        <button type="submit">GO</button>


    </form> 

<script>
    function loadKW() {
        let kw = document.querySelector("#kw").value;
        fetch("http://localhost:8080/" + kw)
            .then(res => res.json())
            .then(data => {
                document.querySelector("#name").value = data.name;
                document.querySelector("#locId").value = data.loc.locId;
                document.querySelector("#quota").value = data.quota;
            });
    }


</script></>
        )  
    }
}

export default Search
