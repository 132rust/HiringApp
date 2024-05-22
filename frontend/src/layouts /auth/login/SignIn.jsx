import React from "react";
import Header from "../../components/Header";





export default function SignIn() {
    
    
    return(
            <>
            <Header />
          <div className="wrapper">
            
            <div className="wrapper_header">
                <h3>Авторизация</h3>
                <button>Регистрация</button>
            
            </div>
                <form>

                    <input type="text" placeholder="My name is"/>
                    <input type="password" placeholder="Password"/>
                    <button>Войти</button>
                    <div className="label_text">
                    <span className="check-label">Запомнить меня</span>
                    <span className="forgot-label">Забыли пароль?</span>
                    </div>
                </form>

          </div>
            
          
            </>  
    )



};