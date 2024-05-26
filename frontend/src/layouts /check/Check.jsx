import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../../App.css";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function Check() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    // Получение room_id из URL
    const room_id = window.location.pathname.split("/").pop();

    // Выполнение GET-запроса при загрузке страницы
    const fetchData = async () => {
      try {
        const token = Cookies.get('access_token');
        const response = await fetch(`http://127.0.0.1:8000/room/${room_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setQuestion(data.description);
            setAnswer(data.answer);
          } else {
            navigate('/main');
          }
        } else {
          console.error("Failed to fetch room data");
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();
  }, [navigate]);


  
  return (
    <>
    <Header/>
      <div className="room">

        <div className="info">
          <h1>Задание</h1>
          <div className="question">
            <textarea readOnly value={question} />
            <h1>Ответ</h1>
            <div className="answer">
              <textarea readOnly value={answer} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
