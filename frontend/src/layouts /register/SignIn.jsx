import React from "react";
import Header from "../components/Header";





export default function SignIn() {
    
    
    return(
            <>
            <Header />
          <div className="wrapper">
            
            <div className="wrapper_header">
                <h3>Sign in</h3>
                <button>Register</button>
            
            </div>
                <form>

                    <input type="text" placeholder="My name is"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sign In</button>
                    <div className="label_text">
                    <span className="check-label">Remeber me</span>
                    <span className="forgot-label">Lost your password</span>
                    </div>
                </form>

          </div>
            
          
            </>  
    )



};