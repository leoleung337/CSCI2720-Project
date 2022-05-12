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
                    <br></br>
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
        this.state = { username: '' , changeUsername: '', changePassword: '' };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleChangeUsernameChange = this.handleChangeUsernameChange.bind(this);
        this.handleChangePasswordChange = this.handleChangePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleUsernameChange(event) {
        this.setState({ username : event.target.value });
    }

    handleChangeUsernameChange(event) {
        this.setState({ changeUsername : event.target.value });
    }

    handleChangePasswordChange(event) {
        this.setState({ changePassword : event.target.value });
    }



    handleSubmit(event) {
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
