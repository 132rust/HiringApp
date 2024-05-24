import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import iconsPlus from '../../icons/plus.png';
import iconsCross from '../../icons/cross.png';
import { useNavigate } from 'react-router-dom';

const CreateTest = () => {
  const [tasks, setTasks] = useState([{ id: Date.now(), question: '', answer: '' }]);
  const [testName, setTestName] = useState('');
  const addButtonRef = useRef(null);
  const navigate = useNavigate();

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
    const data = {
      test_name: testName,
      questions: tasks.map((task) => ({ question: task.question, answer: task.answer })),
    };

    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('/main');
      } else {
        console.error('Failed to save the test');
      }
    } catch (error) {
      console.error('Error:', error);
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
        <p>Создание теста</p>
      </div>
      <div className="container_test">
        <div className="name_test">
          <div className="name_test_label">
            <label>Название теста</label>
            <input value={testName} onChange={(e) => setTestName(e.target.value)} />
          </div>
          <div>
            <button onClick={handleSave}>Сохранить</button>
            <button onClick={() => navigate('/main')}>Назад</button>
          </div>
        </div>
        <div className="line"></div>
        <div className="container_inner_test">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="test_task"
              ref={index === tasks.length - 1 ? addButtonRef : null}>
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
                  <img src={iconsCross} alt="iconsCross" />
                </button>
              </div>
            </div>
          ))}
          <div ref={addButtonRef} style={{ marginTop: '20px' }}>
            <button onClick={handleAddTask}>
              Добавить тест <img src={iconsPlus} alt="iconsPlus" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTest;
