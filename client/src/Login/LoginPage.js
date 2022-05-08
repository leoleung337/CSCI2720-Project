
/**
This js is for login page.
It will link to registration, forgetPw ,admin and User Home Page 
according to users' action
*/
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import {Link,Navigate,useNavigate} from "react-router-dom";
import { instanceOf } from "prop-types";
import Cookies from "universal-cookie"


class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {username: "",
                      password: "",
                      isUser: false,
                      isAdmin: false
                    }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)  
                  
    }
    //the cookie will expire in 30 min 
    setToken(username, role){
        const d = new Date()
        const cookies = new Cookies()
        d.setTime(d.getTime() + 30*60*1000)
        cookies.set("username",username,{path:"/",expires:d})
        cookies.set("role",role,{path:"/",expires:d})
        
    }
    componentDidMount(){
        const cookies = new Cookies()
        if(cookies.get("username")!=null){
            if(cookies.get("username")!="admin"){
                this.setState({isUser:true,username:cookies.get("username")})
            }else{
                this.setState({isAdmin:true,username:cookies.get("username")})
            }
        }
    }
    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
        //console.log(this.state.email)
        //console.log(event.target.name)
        //console.log(event.target)
    }
    async handleSubmit(event){
        event.preventDefault();
        console.log(this.state.username);
        //console.log(this.state.password);
        if (this.state.username === "" || this.state.password === ""){
            window.alert("Please fill in all the blanks")
        } else {
            await fetch(`http://localhost:8080/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.state.username, password: this.state.password }),
                mode: 'cors'
            })
            .then(response => {
                response.json().then(df => {
                    window.alert(df.msg)
                    if (response.status==200){
                        console.log(df.username)
                        this.setState({username:df.username})
                        
                        this.setState({isUser:true})
                        //saved the login info in session 
                        this.setToken(this.state.username,"user")
                    } else if (response.status==201){
                        this.setState({ isAdmin: true})
                        this.setToken("admin","admin")
                    }
                })
            })
        }
    }

    render(){

        return(
            <>
            {this.state.isAdmin?<Navigate to={`admin`}/>:<></>}
            {this.state.isUser?<Navigate to={`user/${this.state.username}`}/>:<></>}
            <div >
                <br/>
                <h1 className ="d-flex justify-content-center">Login</h1>
                <br/>
                <div className = "d-flex justify-content-center align-middle">
                    <form onSubmit = { this.handleSubmit }>
                        <label>
                            Username:
                            <input type='text' name='username' value ={this.state.username} onChange={ this.handleChange } className='form-control' />
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input type='password' name='password' value ={this.state.password} onChange={this.handleChange} className='form-control' />
                        </label>
                        <br/><br/>
                        <div className="d-flex justify-content-center">
                        <button type = 'submit'  className = "button">Login</button>
                        </div>
                    </form>
                </div>
                
                <br/>
                <div className="d-flex justify-content-center" id="login">
                    <li style={{ listStyleType: "none"}}><Link to="/register" id="link" >Don't have an account?</Link></li>
                    
                    </div>
                <div style={{paddingTop:20}}> </div>
            </div>    
            </>
        )
    }



}

/* function LoginPage(){
    let navigate = useNavigate()
    const handleSubmit= ()=>{
        navigate("/user")
    }
    return(
        <>
        <div >
            <br/>
            <h3 className ="d-flex justify-content-center">ZINNIA</h3>
            <br/>
            <div className = "d-flex justify-content-center align-middle">
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type='text' className = 'form-control' />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type='password' className = 'form-control' />
                    </label>
                    <br/><br/>
                    <div className="d-flex justify-content-center">
                    <button type = 'submit'  className = "button">Login</button>
                    </div>
                    
                </form>
            </div>
            
            <br/>
            <div className="d-flex justify-content-center">
                <li><Link to="/registration" >Don't have an account?</Link></li>
                <li><Link to="/forgotPassword" >Forgot Password?</Link></li>
            </div>
            <div className="d-flex justify-content-center">
                <li><Link to="/admin" >Temporary Link for AdminPage</Link></li>
            </div>
        </div>    
        </>
    )
}
 */


export default LoginPage

/* //login page of the website

import React from "react";

class LoginPage extends React.Component{
  constructor(props){
      super(props)
    }
    render(){
      return(
        <div> 
          <h1>Login page</h1>
          <div className = "d-flex justify-content-center align-middle">
                    <form>
                        <label>
                            Username:
                            <input type='email' name='email'  className='form-control' />
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input type='password' name='password' className='form-control' />
                        </label>
                        <br/><br/>
                        <div className="d-flex justify-content-center">
                        <button type = 'submit'  className = "button">Login</button>
                        </div>
                    </form>
                </div>
        </div>
      )
    }
  }

  export default LoginPage */