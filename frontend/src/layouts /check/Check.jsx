import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../../App.css";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Check() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false); // Добавляем состояние для отображения ответа
  const navigate = useNavigate();
  
  useEffect(() => {
    // Получение room_id из URL
    const room_id = window.location.pathname.split("/").pop();
    
    const fetchData = async () => {
      try {
        const token = Cookies.get('access_token');
        const response = await fetch(`http://127.0.0.1:8000/check/${room_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          
            setQuestion(data.description);
            if (data.answer) {
              setAnswer(data.answer);
              setShowAnswer(true); // Показываем элемент
            } else {
              setShowAnswer(false); // Скрываем элемент
            }
         
        
        } else {
          navigate('/finish');
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    // Выполнение GET-запроса при загрузке страницы
    fetchData();

    // Установка интервала для выполнения GET-запроса каждую секунду
    const intervalId = setInterval(fetchData, 1000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="room">
        <div className="info">
          <h1>Задание</h1>
          <div className="question_text">
            <textarea readOnly value={question} />
          </div>
          {showAnswer && ( // Условный рендеринг для отображения ответа
            <div className="answer_text">
              <h1>Ответ</h1>
              <textarea readOnly value={answer} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
