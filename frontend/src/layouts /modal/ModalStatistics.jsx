import React from 'react';
import './ModalEdit.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ModalStatistic = ({ active, setActive, savedTestsStatistic }) => {
  const navigate = useNavigate();

  const handleEditTest = (test_id) => {
    Cookies.set('test_id', test_id);
    navigate(`/statisticTest`);
  };

  if (!Array.isArray(savedTestsStatistic)) {
    console.error('savedTestsStatistic is not an array:', savedTestsStatistic);
    return null; // Или отрендерить сообщение об ошибке или пустой элемент
  }

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        <div className="modal_content_header">
          <label>Статистика теста</label>
          <button onClick={() => setActive(false)}>X</button>
        </div>
        <div className="modal_content_inner">
          {savedTestsStatistic.map((test) => (
            <div key={test.test_id} className="statistic-test-item">
              <button onClick={() => handleEditTest(test.test_id)}>{test.test_name}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalStatistic;
