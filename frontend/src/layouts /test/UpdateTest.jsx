import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import iconsPlus from '../../icons/plus.png';
import iconsCross from '../../icons/cross.png';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const UpdateTest = () => {
  const [tasks, setTasks] = useState([{ id: Date.now(), question: '', answer: '' }]);
  const [testName, setTestName] = useState('');
  const [testNameError, setTestNameError] = useState('');
  const [tasksError, setTasksError] = useState('');
  const addButtonRef = useRef(null);
  const navigate = useNavigate();
  const { test_id } = useParams();

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const testId = Cookies.get('test_id');
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
    let hasErrors = false;
    if (!testName.trim()) {
      setTestNameError('Название теста не может быть пустым');
      hasErrors = true;
    } else {
      setTestNameError('');
    }

    if (tasks.some(task => !task.question.trim() || !task.answer.trim())) {
      setTasksError('Все вопросы и ответы должны быть заполнены');
      hasErrors = true;
    } else {
      setTasksError('');
    }

    if (hasErrors) {
      return;
    }

    const token = Cookies.get('access_token');

    const data = {
      test_id: Cookies.get('test_id'),
      test_name: testName,
      questions: tasks.map((task) => ({ description: task.question, answer: task.answer })),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/test/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedTest = await response.json();
        navigate('/main', { state: { savedTest } });
      } else {
        console.error('Не удалось сохранить тест');
      }
    } catch (error) {
      console.error('Ошибка при сохранении теста', error);
    }
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
            {testNameError && <div style={{ color: 'red', textAlign: 'center', fontSize: '11px', padding: '3px' }}>{testNameError}</div>}
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
              {tasksError && <div style={{ color: 'red', textAlign: 'center', fontSize: '11px', padding: '3px' }}>{tasksError}</div>}
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
