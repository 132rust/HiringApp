import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useState } from "react"




const SignIn = () => {


        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [emailDirty, setEmailDirty] = useState(false)
        const [passwordDirty, setPasswordDirty] = useState(false)
        const [emailError, setEmailError] = useState('Email не может быть пустым')
        const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
        const [formValid, setFormValid] = useState(false)

        useEffect( () => {
            if(emailError || passwordError){
                setFormValid(false)
            } else{
                setFormValid(true)
            }
        }, [emailError, passwordError])

const emailHandler = (e) => {
    setEmail(e.target.value)
    const re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(e.target.value).toLowerCase())){
        setEmailError('Некоректный email')
    } else{
        setEmailError("")
    }
}

const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8){
        setPasswordError('Пароль должен быть длинее 3 и меньше 8 символов')
        if(!e.target.value){
            setPasswordError('Пароль не может быть пустым')
        }
    } else{
        setPasswordError("")
    }
}

const blurHandle = (e) =>{
    switch (e.target.name) {
        case 'email':
            setEmailDirty(true)
            break
        case 'password':
            setPasswordDirty(true)
            break
    }
}


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://127.0.0.1:8000/login/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            // Обработка успешного входа
            console.log('Login successful:', data);
        } else {
            // Обработка ошибки
            console.error('Login failed:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

    
        
    return(
            <>
            <Header />
          <div className="wrapper">
            
            <div className="wrapper_header">
                <h3>Авторизация</h3>
                <button>Регистрация</button>
            
            </div>
                <form onSubmit={handleSubmit}>
               
                    <input  
                    onChange={e => emailHandler(e)}
                    onBlur={e => blurHandle(e)} 
                    value={email}
                    name="email"
                    type="text" 
                    placeholder="Enter your email"/>
            {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
             
                    <input  
                    onChange={e => passwordHandler(e)}
                    onBlur={e => blurHandle(e)} 
                    value={password}
                    name="password"
                    type="password" 
                    placeholder="Enter your password"/>
            {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
                    <button disabled={!formValid} type="sumbit">Войти</button>
                    <div className="label_text">
                    </div>
                </form>

          </div>
            
          
            </>  
    )



};

export default SignIn;