/* import React from "react";
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
 */

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
                    <ListAllUser />
                </div>
            </>
        );
    }
}
class ListAllUser extends React.Component{
    constructor(props){
        super(props);
        this.state={userdf:[]}
    }
    componentDidMount(){
        console.log(process.env.REACT_APP_URL)
        fetch(`http://localhost:8080/searchAllUser`,{
            method: "GET",
            headers: {
            'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        .then(res =>res.json())
        .then(json=>{
            this.setState({userdf:json})
            console.log('get')
        })
    }
        render(){
            return(
                <>
                <br></br>
                <h2>Username List</h2>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Username List</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.userdf.map((user,index)=>
                    <tr key ={index} >
                        <td>{user.username}</td>
                    </tr>
                    )}
                    </tbody>
                </table>
                <br></br>
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
