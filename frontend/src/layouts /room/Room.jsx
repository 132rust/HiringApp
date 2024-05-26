import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import '../../App.css';
import Welcome from "../components/Welcom";

export default function Room() {
  const location = useLocation();
  const { recruiterName, candidateName, candidateContact, testName, testId } = location.state || {};

  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <>
      <Header />
      <Welcome />
      <div className="room">
        <div className="container">
          <div className="container_inner">
            <p>{candidateName}</p>
            <p>{testName}</p>
            <p>Ссылка на тест {testId}</p>
          </div>
        </div>

        <div className="room_btn">
          <button className={`toggle-button ${showAnswer ? 'active' : ''}`} onClick={handleToggleAnswer}>
            <span className="toggle-text">{showAnswer ? 'Скрыть ответ' : 'Показать ответ'}</span>
            <span className={`toggle-switch ${showAnswer ? 'on' : 'off'}`}></span>
          </button>
          <div className="evaluation">
            <button>Оценка</button>
            <input type="number" className="evaluation-input" placeholder="Оценка" />
          </div>
          <button>Следующий вопрос</button>
        </div>

        <div className="info">
          <h1>Задание</h1>
          <div className="task">
            <textarea readOnly />
          </div>
          <h1>Ответ</h1>
          <div className="answer">
            {showAnswer && <textarea readOnly />}
          </div>
        </div>
      </div>
    </>
  );
}
