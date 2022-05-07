//login page of the website

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

  export default LoginPage
