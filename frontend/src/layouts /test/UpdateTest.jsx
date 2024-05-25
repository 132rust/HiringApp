import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import iconsPlus from '../../icons/plus.png';
import iconsCross from '../../icons/cross.png';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const UpdateTest = () => {
  const [tasks, setTasks] = useState([{ id: Date.now(), question: '', answer: '' }]);
  const [testName, setTestName] = useState('');
  const addButtonRef = useRef(null);
  const navigate = useNavigate();
  const { test_id } = useParams();

  useEffect(() => {
    const fetchTestData = async () => {
      try {
       const testId = Cookies.get('test_id')
        const response = await fetch(`http://localhost:8000/test/${testId}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${Cookies.get('access_token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTestName(data.test_name);
          setTasks(data.questions.map((q, index) => ({
            id: Date.now() + index,
            question: q.description,
            answer: q.answer,
          })));
        } else {
          console.error('Не удалось загрузить данные теста');
        }
      } catch (error) {
        console.error('Ошибка при загрузке теста', error);
      }
    };

    fetchTestData();
  }, [test_id]);

  const handleAddTask = () => {
    const newTask = { id: Date.now(), question: '', answer: '' };
    setTasks([...tasks, newTask]);
  };

  const handleInputChange = (id, field, value) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task)));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSave = async () => {
    
  };

  useEffect(() => {
    if (addButtonRef.current) {
      addButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [tasks]);

  return (
    <>
      <Header />
      <div className="header_text">
        <p>Редактирование теста</p>
      </div>
      <div className="container_test">
        <div className="name_test">
          <div className="name_test_label">
            <label>Название теста</label>
            <input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleSave}>Сохранить</button>
            <button onClick={() => navigate('/main')}>Назад</button>
          </div>
        </div>
        <div className="line"></div>
        <div className="container_inner_test">
          {tasks.map((task, index) => (
            <div key={task.id}>
              <div className="test_task" ref={index === tasks.length - 1 ? addButtonRef : null}>
                <div className="task_input">
                  <label>Задание</label>
                  <textarea
                    value={task.question}
                    onChange={(e) => handleInputChange(task.id, 'question', e.target.value)}
                  />
                </div>
                <div className="task_input">
                  <label>Ответ</label>
                  <textarea
                    value={task.answer}
                    onChange={(e) => handleInputChange(task.id, 'answer', e.target.value)}
                  />
                </div>
                <div className="delete">
                  <button onClick={() => handleDeleteTask(task.id)}>
                    <img src={iconsCross} alt="Удалить" />
                  </button>
                </div>
              </div>
              <div className="line"></div>
            </div>
          ))}
          <div ref={addButtonRef} style={{ marginTop: '20px' }}>
            <button onClick={handleAddTask}>
              Добавить тест <img src={iconsPlus} alt="Добавить" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTest;
