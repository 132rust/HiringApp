import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Statistics.css';

const Statistics = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/main');
  };

  return (
    <div className="header_text">
      <p>Статистика</p>
      <button onClick={handleBack} className="back-button">Назад</button>
    </div>
  );
};

export default Statistics;
