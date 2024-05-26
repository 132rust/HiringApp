import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../../App.css";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Link from "../components/Link";

export default function Room() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [buttonColor, setButtonColor] = useState("green"); // Изначально зеленый цвет
  const [evaluation, setEvaluation] = useState(""); // Состояние для значения оценки
  const [errorMessage, setErrorMessage] = useState('');
  const [showAnswer, setShowAnswer] = useState(false); // Состояние для отображения ответа
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

  const handleStartTest = async () => {
    const room_id = window.location.pathname.split("/").pop();
    const token = Cookies.get('access_token');
    await fetch(`http://127.0.0.1:8000/room/change_visibility/${room_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // Проверяем текущий цвет кнопки
    if (buttonColor === "green") {
      // Выполняем запрос и изменяем цвет кнопки на "red"
      setButtonColor("red");
      setShowAnswer(true); // Показываем ответ
    } else {
      // Изменяем цвет кнопки обратно на "green"
      setButtonColor("green");
      setShowAnswer(false); // Скрываем ответ
    }
  }

  // Обработчик изменения значения ввода оценки
  const handleEvaluationChange = (event) => {
    setEvaluation(event.target.value);
  }

  // Обработчик отправки оценки
  const handleEvaluationSubmit = async () => {
    const room_id = window.location.pathname.split("/").pop();
    const token = Cookies.get('access_token');

    try {
      const response = await fetch(`http://127.0.0.1:8000/room/set`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ "score": evaluation, room_id }) // Отправляем значение оценки
      });

      if (response.ok) {
        // Успешная отправка оценки
      } else {
        console.error('Failed to submit evaluation');
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error);
    }
  }

  // Обработчик нажатия на кнопку "Следующий вопрос"
  const handleNextQuestion = async () => {
    const room_id = window.location.pathname.split("/").pop();
    const token = Cookies.get('access_token');

    try {
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
          setButtonColor("green"); // Сбрасываем цвет кнопки в исходное значение
          setShowAnswer(false); // Скрываем ответ
          setEvaluation(''); // Обнуляем поле ввода оценки
          setErrorMessage(''); // Сбрасываем сообщение об ошибке
        } else {
          navigate('/main'); // Перенаправляем на главную страницу, если нет следующего вопроса
        }
      } else {
        setErrorMessage('Отправьте оценку');
      }
    } catch (error) {
      console.error('Error fetching next question:', error);
      navigate('/main'); // Перенаправляем на главную страницу в случае ошибки
    }
  }
  
  return (
    <>
      <Header />
      <Link url={window.location.pathname.replace("/room", "/check")}/>
      <div className="room">
        <div className="room_btn">
          <button onClick={handleStartTest} className={"toggle-button"} style={{ backgroundColor: buttonColor }}>
            {buttonColor === "green" ? "Показать ответ" : "Скрыть ответ"}
          </button>
          <div className="evaluation">
            <button onClick={handleEvaluationSubmit}>Отправить оценку</button> {/* Добавляем кнопку для отправки оценки */}
            <input
              type="number"
              className="evaluation-input"
              placeholder="Оценка"
              value={evaluation}
              onChange={handleEvaluationChange} // Добавляем обработчик изменения значения
            />
            {errorMessage && (
              <div style={{ color: 'red', textAlign: "center", fontSize: '11px', padding: '3px' }}>{errorMessage}</div>
            )}
          </div>
          <button onClick={handleNextQuestion}>Следующий вопрос</button> 
        </div>

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
