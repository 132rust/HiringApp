import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import iconsPlus from '../../icons/plus.png';
import iconsCross from '../../icons/cross.png';
import { useNavigate } from 'react-router-dom';


const CreateTest = () => {
  const [tasks, setTasks] = useState([{ id: Date.now(), question: '', answer: '' }]);
  const [testName, setTestName] = useState('');
  const [error, setError] = useState('');
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
    setError('');

    if (!testName.trim()) {
      setError('Название теста не должно быть пустым');
      return;
    }

    for (const task of tasks) {
      if (!task.question.trim() || !task.answer.trim()) {
        setError('Все поля задания и ответа должны быть заполнены');
        return;
      }
    }

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
        setError('Не удалось сохранить тест');
      }
    } catch (error) {
      setError('Ошибка при сохранении теста');
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
        {error && <div className="error_message">{error}</div>}
        <div className="line"></div>
        <div className="container_inner_test">
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <div
                className="test_task"
                ref={index === tasks.length - 1 ? addButtonRef : null}
                key={task.id}>
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
              <div className="line"></div>
            </React.Fragment>
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



// import React, { useState, useRef, useEffect } from 'react';
// import Header from '../components/Header';
// import iconsPlus from '../../icons/plus.png';
// import iconsCross from '../../icons/cross.png';
// import { useNavigate } from 'react-router-dom';

// const CreateTest = () => {
//   const [tasks, setTasks] = useState([{ id: Date.now(), question: '', answer: '' }]);
//   const [testName, setTestName] = useState('');
//   const addButtonRef = useRef(null);
//   const navigate = useNavigate();

//   const handleAddTask = () => {
//     const newTask = { id: Date.now(), question: '', answer: '' };
//     setTasks([...tasks, newTask]);
//   };

//   const handleInputChange = (id, field, value) => {
//     setTasks(tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task)));
//   };

//   const handleDeleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   const handleSave = async () => {
//     const data = {
//       test_name: testName,
//       questions: tasks.map((task) => ({ question: task.question, answer: task.answer })),
//     };

//     try {
//       const response = await fetch('/api/tests', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         navigate('/main');
//       } else {
//         console.error('Failed to save the test');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     if (addButtonRef.current) {
//       addButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     }
//   }, [tasks]);

//   const [lableName, setLableName] = useState('');
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');

//   const [lableNameDirty, setLableNameDirty] = useState(false);
//   const [questionDirty, setQuestionDirty] = useState(false);
//   const [answerDirty, setAnswerDirty] = useState(false);

//   const [lableNameError, setLableNameError] = useState('Название теста должно быть заполнено');
//   const [questionError, setQuestionError] = useState('Поле не может быть пустым');
//   const [answerError, setAnswerError] = useState('Поле не может быть пустым');

//   const [formValid, setFormValid] = useState(false);

//   useEffect(() => {
//     if (lableNameError || questionError || answerError) {
//       setFormValid(false);
//     } else {
//       setFormValid(true);
//     }
//   }, [lableNameError, questionError, answerError]);

//   const lableNameHandler = (e) => {
//     setLableName(e.target.value);
//     const re =
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!re.test(String(e.target.value).toLowerCase())) {
//       setLableNameError('Некорректный email');
//     } else {
//       setLableNameError('');
//     }
//   };

//   const questionHandler = (e) => {
//     setQuestion(e.target.value);
//     if (!e.target.value.trim()) {
//       setQuestionError('Текстовое поле должно быть заполнено');
//     } else {
//       setQuestionError('');
//     }
//   };

//   const answerHandler = (e) => {
//     setAnswer(e.target.value);
//     if (!e.target.value.trim()) {
//       setAnswerError('Текстовое поле должно быть заполнено');
//     } else {
//       setAnswerError('');
//     }
//   };

//   const blurHandler = (e) => {
//     switch (e.target.name) {
//       case 'lableName':
//         setLableNameDirty(true);
//         break;
//       case 'question':
//         setQuestionDirty(true);
//         break;
//       case 'answer':
//         setAnswerDirty(true);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="header_text">
//         <p>Создание теста</p>
//       </div>
//       <div className="container_test">
//         <div className="name_test">
//           <div className="name_test_label">
//             <label>Название теста</label>
//             <input
//               name="lableName"
//               value={testName}
//               onChange={(e) => {
//                 setTestName(e.target.value);
//                 lableNameHandler(e);
//               }}
//               onBlur={blurHandler}
//             />
//             {lableNameDirty && lableNameError && (
//               <div style={{ color: 'red', textAlign: 'center', fontSize: '11px', padding: '3px' }}>
//                 {lableNameError}
//               </div>
//             )}
//           </div>
//           <div>
//             <button onClick={handleSave} disabled={!formValid}>
//               Сохранить
//             </button>
//             <button onClick={() => navigate('/main')}>Назад</button>
//           </div>
//         </div>
//         <div className="line"></div>
//         <div className="container_inner_test">
//           {tasks.map((task, index) => (
//             <div key={task.id}>
//               <div className="test_task" ref={index === tasks.length - 1 ? addButtonRef : null}>
//                 <div className="task_input">
//                   <label>Задание</label>
//                   <textarea
//                     value={task.question}
//                     onChange={(e) => handleInputChange(task.id, 'question', e.target.value)}
//                     onChange={questionHandler}
//                     onBlur={blurHandler}
//                   />
//                   {questionDirty && questionError && (
//                     <div style={{ color: 'red', textAlign: 'center', fontSize: '11px', padding: '3px' }}>
//                       {questionError}
//                     </div>
//                   )}
//                 </div>
//                 <div className="task_input">
//                   <label>Ответ</label>
//                   <textarea
//                     value={task.answer}
//                     onChange={(e) => handleInputChange(task.id, 'answer', e.target.value)}
//                     onChange={answerHandler}
//                     onBlur={blurHandler}
//                   />
//                   {answerDirty && answerError && (
//                     <div style={{ color: 'red', textAlign: 'center', fontSize: '11px', padding: '3px' }}>
//                       {answerError}
//                     </div>
//                   )}
//                 </div>
//                 <div className="delete">
//                   <button onClick={() => handleDeleteTask(task.id)}>
//                     <img src={iconsCross} alt="iconsCross" />
//                   </button>
//                 </div>
             

//               </div>
//               <div className="line"></div>
//             </div>
//           ))}
//           <div ref={addButtonRef} style={{ marginTop: '20px' }}>
//             <button onClick={handleAddTask}>
//               Добавить тест <img src={iconsPlus} alt="iconsPlus" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateTest;
