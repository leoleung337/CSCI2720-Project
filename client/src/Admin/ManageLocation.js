import React, { useEffect, useState } from 'react';

class ManageLocation extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <CreateLocation />
                <DeleteLocation />
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
        fetch("localhost:8080/location/create/" + this.state.value).then((res) => res.json());
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Create</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Location:
                        <input type="text" value={ this.state.value } onChange={ this.handleChange } />
                    </label>
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
        fetch("localhost:8080/location/delete/" + this.state.value).then((res) => res.json());
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Delete</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Location:
                        <input type="text" value={ this.state.value } onChange={ this.handleChange } />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

function ReadLocation(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('localhost:8080/location')
            .then(response => response.json())
            .then(setData);
    }, []);

    return (
        <>
            <div>
                <h2>Read</h2>
                <table>
                    <tbody>
                        { data.map((e) => <><tr><td>{e.location.name}</td><td>{e.location.lat}</td><td>{e.location.lon}</td></tr></>) }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManageLocation
