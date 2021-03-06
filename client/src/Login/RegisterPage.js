/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/

/*
This js is for registration
 
*/
import React from "react";
import {Link,Navigate} from "react-router-dom";
//import './Registration.css'

class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state={username:"",password:"",confirmPw:"",IsWrong:false,alert:"",redirect:false}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit(event){
        event.preventDefault();
        //console.log(JSON.stringify({email: this.state.email,username:this.state.username,password: this.state.password,isAdmin:false,photo:this.state.photo}))
        if(this.state.username==="" || this.state.password === "" ||this.state.confirmPw ===""){
            this.setState({alert:"Please fill in all the blanks"})
            this.setState({IsWrong:true})
        }else if (this.state.username.length < 4 || this.state.username.length > 20){
            window.alert("Please input 4-20 characters username")
        }else if (this.state.password.length < 4 || this.state.password.length > 20){
            window.alert("Please input 4-20 characters password")
        }else if (this.state.password !== this.state.confirmPw){
            this.setState({alert:"Confirmed Password is not match with Password"})
            this.setState({IsWrong:true})
        }else{
            this.setState({IsWrong:false})
            fetch(`http://localhost:8080/register`,{
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.state.username,password: this.state.password}),
                mode: 'cors'
            })
            .then(response =>{
                response.json().then(df=>{
                    window.alert(df.msg)
                    this.setState({redirect:true})
                    console.log(this.state.redirect)
                })
            })

        }   
    }
    render(){
        return(
            <div>
            <h1 className ="d-flex justify-content-center">Account Registration</h1>
            <div style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <div >
                    <label>
                        Username:
                        <input type="text" name = "username" value ={this.state.username}  onChange={this.handleChange} className = 'form-control' />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type='password' name = "password" value ={this.state.password} onChange={this.handleChange} className = 'form-control' />
                    </label>
                    <br/>
                    <label>
                        Confirmed Password:
                        <input type='password' name = "confirmPw" value ={this.state.confirmPw}  onChange={this.handleChange} className = 'form-control' />
                    </label>
                    </div>
                    <br/>

                    <div className="d-flex justify-content-center ">
                    <button type = 'submit button'  className = "button" id="register">Register </button>
                    </div>
                    {this.state.IsWrong?<div className="text-danger">{this.state.alert}</div>:<></>}
                </form>
            </div>
            
            <br/>
            <Link to="/" id="link" className="d-flex justify-content-center" >Back to Login Page</Link>
            {this.state.redirect?<Navigate to="/"/>:null}
        </div>    
        )
    }
}

export default Registration
