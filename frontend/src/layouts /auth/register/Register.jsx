import { useEffect, useState } from "react"
import React from "react";
import Header from "../../components/Header"


const Register = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [companyName, setComapnyName] = useState('')
const [emailDirty, setEmailDirty] = useState(false)
const [passwordDirty, setPasswordDirty] = useState(false)
const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false)
const [companyNameDirty, setComapnyNameDirty] = useState(false)
const [emailError, setEmailError] = useState('Email не может быть пустым')
const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
const [confirmPasswordError, setConfirmPasswordError] = useState('Пароли не совпадают')
const [companyNameError, setComapnyNameError] = useState('Строка не должна быть пуста')
const [formValid, setFormValid] = useState(false)


useEffect( () => {
    if(emailError || passwordError || confirmPasswordError || companyNameError ){
        setFormValid(false)
    } else{
        setFormValid(true)
    }
}, [emailError, passwordError, confirmPasswordError, companyNameError])





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

const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8){
    setConfirmPasswordError('Пароль должен быть длинее 3 и меньше 8 символов')
    if(!e.target.value){
        setConfirmPasswordError('Пароль не может быть пустым')
    }
    } else if (passwordHandler===confirmPasswordHandler){

    } else
    { 
        setConfirmPasswordError("")
     }
    }
    
    const companyNameHandler = (e) => {
        setComapnyName(e.target.value)
        const re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())){
        setComapnyNameError('Строка не должна быть пуста')
        } else{
        setComapnyNameError("")
        }
        }


const blurHandler = (e) =>{
    switch (e.target.name) {
        case 'email':
            setEmailDirty(true)
            break
        case 'password':
            setPasswordDirty(true)
            break
        case 'confirmPassword':
            setConfirmPasswordDirty(true)
            break
        case 'companyName':
            setComapnyNameDirty(true)
            break
    }
}





    
    return(
        
        <>
        
        <Header />
          <div className="wrapper_register">
            <div className="wrapper_header_register">
                <h3>Регистрация</h3>
                <button>Авторизация</button>
            
            </div>
                <form>
                    <label>Email</label>

                    <input
                     onBlur={e => blurHandler(e)}
                     onChange={e => emailHandler(e)}
                     type="email" 
                     placeholder="Enter your Email"
                     name="text"
                     value={email}
                     />
                 {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}



                    <label>Пароль</label>

                    <input 
                    onBlur={e => blurHandler(e)}
                    onChange={e => passwordHandler(e)}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    />

{(passwordDirty && passwordDirty) && <div style={{color:'red'}}>{passwordError}</div>}

                     
                    <label>Подтвердите пароль</label>
                   
                    <input
                    onBlur={e => blurHandler(e)}
                    onChange={e => confirmPasswordHandler(e)}
                    type="password" 
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={confirmPassword}
                     />
                     {(confirmPasswordDirty && confirmPasswordError) && <div style={{color:'red'}}>{confirmPasswordError}</div>}

                    <label>Название компании</label>
                    
                    <input 
                    onBlur={e => blurHandler(e)}
                    onChange={e => companyNameHandler(e)}
                    type="text" 
                    placeholder="Enter yor company name"
                    name='companyName'
                    value={companyName}
                    />
          {(companyNameDirty && companyNameError) && <div style={{color:'red'}}>{companyNameError}</div>}
                    <button disabled={!formValid} type="sumbit">Зарегистрироваться</button>
                 
                </form>

          </div>


        </>
    )


};

export default Register;
