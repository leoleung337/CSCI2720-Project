import React, { useEffect, useState } from 'react';
import './ManageLocation.css'

class ManageLocation extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <CreateLocation />
                <br></br>
                <DeleteLocation />
                <br></br>
                <ReadLocation />
            </div>
        );
    }
}

class CreateLocation extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const location = document.getElementById('location').options[document.getElementById('location').selectedIndex].value;
        fetch("http://localhost:8080/admin/location/create/" + location, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: location })
        }).then(response =>{
            response.json().then(df=>{
                window.alert(df.msg)
            })
        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Create</h2>
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        Location:
                        <br></br>
                        <select name="location" id="location">
                            <option value="Atlanta">Atlanta</option>
                            <option value="BangKok">BangKok</option>
                            <option value="Beijing">Beijing</option>
                            <option value="Canberra">Canberra</option>
                            <option value="Chicago">Chicago</option>
                            <option value="Fukuoka-Shi">Fukuoka-Shi</option>
                            <option value="Hakodate">Hakodate</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Istanbul">Istanbul</option>
                            <option value="Las Vegas">Las Vegas</option>
                            <option value="London">London</option>
                            <option value="Los Angeles">Los Angeles</option>
                            <option value="Manila">Manila</option>
                            <option value="Mexico City">Mexico City</option>
                            <option value="Moscow">Moscow</option>
                            <option value="Nagoya-Shi">Nagoya-Shi</option>
                            <option value="Osaka-Shi">Osaka-Shi</option>
                            <option value="Rio De Janeiro">Rio De Janeiro</option>
                            <option value="Roman">Roman</option>
                            <option value="Seoul">Seoul</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="Toronto">Toronto</option>
                            <option value="Vancouver">Vancouver</option>
                            <option value="Washington">Washington</option>
                        </select>
                    </label>
                    <br></br>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

class DeleteLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        fetch("http://localhost:8080/admin/location/delete/" + this.state.value, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: this.state.value })
        }).then(response =>{
            response.json().then(df=>{
                window.alert(df.msg)
            })
        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Delete</h2>
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        Location:
                        <br></br>
                        <input type="text" value={ this.state.value } onChange={ this.handleChange } />
                    </label>
                    <br></br>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

function ReadLocation(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8080/location')
            .then(res => res.json())
            .then(setData);
    }, []);

    const refresh = function() {
        fetch('http://localhost:8080/location')
            .then(res => res.json())
            .then(setData);
    }

    return (
        <>
            <div>
                <h2>Read</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                        {
                            data.map((e) =>
                                <>
                                    <tr>
                                        <td>{ e.locationName }</td>
                                        <td>{ e.latitude }</td>
                                        <td>{ e.longitude }</td>
                                    </tr>
                                </>
                            ) }
                    </tbody>
                </table>
                <button className="button" onClick={ () => refresh() }> Refresh </button>
            </div>
        </>
    );
}

export default ManageLocation
