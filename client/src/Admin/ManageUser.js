import React from "react";
import './ManageUser.css'

class ManageUser extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
                <div>
                    <UpdateUser />
                    <br></br>
                    <DeleteUser />
                </div>
            </>
        );
    }
}

class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' , password: '' };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username : event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password : event.target.value });
    }

    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ changeUsername: this.state.username, changePassword: this.state.password })
        };
        fetch("http://localhost:8080/" + this.state.username + "/update", requestOptions).then((res) => res.json());
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Update</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <br></br>
                        <input type="text" value={ this.state.username } onChange={ this.handleUsernameChange } />
                    </label>
                    <br></br>
                    <label>
                        Password:
                        <br></br>
                        <input type="text" value={ this.state.password } onChange={ this.handlePasswordChange } />
                    </label>
                    <br></br>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

class DeleteUser extends React.Component {
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
        fetch("http://localhost:8080/" + this.state.value + "/delete").then((res) => res.json());
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Delete</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
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

export default ManageUser;
