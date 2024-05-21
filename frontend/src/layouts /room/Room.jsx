import React from "react";
import Header from "../components/Header";
import '../../App.css'




export default function Room() {
    
    
    return(
            <>
            <Header/>
            <div className="room">
            <div className="container">
                <div className="container_inner">
                    <p>Имя</p> 
                    <p>Название теста</p>
                    <p>Ссылка</p>
                </div>
            </div>

            <div className="room_btn">
                <button>Показать ответ</button>
                <button>Оценка</button>
                <button>Следующий вопрос</button>
            </div>
                
            <div className="info">
                <h1>Задание</h1>
                  <div className="task">
                    <p>Что такое компонента?</p>
                  </div>
                <h1>Ответ</h1>
                <div className="answer">
                    <p>Компонента это компонента</p>
                </div>
            </div>
            </div>
            </>  
    )



};