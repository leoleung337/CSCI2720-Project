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
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        fetch("http://localhost:8080/admin/location/create/" + this.state.value, {
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
                <h2>Create</h2>
                <form onSubmit={this.handleSubmit}>
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

class DeleteLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
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
                <form onSubmit={this.handleSubmit}>
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
                                        <td>{e.locationName}</td>
                                        <td>{e.latitude}</td>
                                        <td>{e.longitude}</td>
                                    </tr>
                                </>
                            ) }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManageLocation
