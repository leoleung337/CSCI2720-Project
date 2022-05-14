/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/
import React, { useEffect, useState } from 'react';
import './ManageUser.css'

class ManageUser extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
                <div>
                    <CreateUser />
                    <br></br>
                    <UpdateUser />
                    <br></br>
                    <DeleteUser />
                    <br></br>
                    <ReadUser />
                </div>
            </>
        );
    }
}

function ReadUser() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/searchAllUser')
            .then(res => res.json())
            .then(setData);
    }, []);

    const refresh = function() {
        fetch('http://localhost:8080/searchAllUser')
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
                            <th>Username</th>
                        </tr>
                        {
                            data.map((e) =>
                                <>
                                    <tr>
                                        <td>{ e.username }</td>
                                    </tr>
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
                <button className="button" onClick={ () => refresh() }> Refresh </button>
        </>
    )
}

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.username.length < 4 || this.state.username.length > 20){
            window.alert("Please input 4-20 characters username")
        }else if (this.state.password.length < 4 || this.state.password.length > 20){
            window.alert("Please input 4-20 characters password")
        }else{
            fetch("http://localhost:8080/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        }).then(response =>{
            response.json().then(df=>{
                window.alert(df.msg)
            })
        })
        event.preventDefault();

        }
        
    }
    render() {
        return (
            <div>
                <h2>Create</h2>
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

class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', changeUsername: '', changePassword: '' };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleChangeUsernameChange = this.handleChangeUsernameChange.bind(this);
        this.handleChangePasswordChange = this.handleChangePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handleChangeUsernameChange(event) {
        this.setState({ changeUsername: event.target.value });
    }

    handleChangePasswordChange(event) {
        this.setState({ changePassword: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.changeUsername.length < 4 || this.state.changeUsername.length > 20){
            window.alert("Please input 4-20 characters username")
        }else if (this.state.changePassword.length < 4 || this.state.changePassword.length > 20){
            window.alert("Please input 4-20 characters password")
        }else{
            fetch("http://localhost:8080/admin/update/" + this.state.username, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, changeUsername: this.state.changeUsername, changePassword: this.state.changePassword })
        }).then(response =>{
            response.json().then(df=>{
                window.alert(df.msg)
            })
        })
        event.preventDefault();

        }
        
    }
    render() {
        return (
            <div>
                <h2>Update</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Old Username:
                        <br></br>
                        <input type="text" value={ this.state.username } onChange={ this.handleUsernameChange } />
                    </label>
                    <br></br>
                    <label>
                        New Username:
                        <br></br>
                        <input type="text" value={ this.state.changeUsername } onChange={ this.handleChangeUsernameChange } />
                    </label>
                    <br></br>
                    <label>
                        New Password:
                        <br></br>
                        <input type="text" value={ this.state.changePassword } onChange={ this.handleChangePasswordChange } />
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
        fetch("http://localhost:8080/admin/user/delete/" + this.state.value, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.value })
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
