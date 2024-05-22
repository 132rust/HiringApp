import Header from "../../components/Header"


export default function Register(){
    
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
                     type="email" 
                     placeholder="Email"
                     name="email"
                     autoComplete='off'
                     title="Введите корректный email адрес (например, example@gmail.com)"
                     />
              
                    <label>Пароль</label>
                    <input 
                    type="password"
                    name="password"
                    placeholder="Password"
               
                    />
                     
                    <label>Подтвердите пароль</label>
                    <input
                     type="password" 
                     placeholder="Password"
                     name="confirmPassword"
                  
                     />
                    
                    <label>Название компании</label>
                    <input 
                    type="text" 
                    placeholder="Company name"
                    name='companyName'
                
                    />
          
                    <button>Зарегистрироваться</button>
                    <div className="label_text">
                    <span className="check-label">Запомнить меня</span>
                    <span className="forgot-label">Забыли пароль?</span>
                    </div>
                </form>

          </div>


        </>
    )


};


