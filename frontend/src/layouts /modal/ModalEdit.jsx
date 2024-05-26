import React from 'react';
import './ModalEdit.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Modal = ({ active, setActive, savedTests, setSavedTests }) => {
    console.log(typeof setSavedTests)
  const navigate = useNavigate();

    const handleEditTest = (test_id) => {
    Cookies.set('test_id', test_id);
    navigate(`/statisticTest`);
  };

  const handDeleteTest = async (test_id) => {
    try {
      const token = Cookies.get('access_token');
      const response = await fetch(`http://127.0.0.1:8000/test/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ test_id })
      });

      if (response.ok) {
        console.log(typeof setSavedTests);
        setSavedTests(savedTests.filter((test) => test.test_id !== test_id));
      } else {
        console.error('Failed to delete test');
      }
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        <div className="modal_content_header">
          <label>Редактирование теста</label>
          <button onClick={() => setActive(false)}>X</button>
        </div>
        <div className="modal_content_inner">
          {savedTests.map((test) => (
            <div key={test.id} className="test-item">
              <button onClick={() => handleEditTest(test.test_id)}>{test.test_name}</button>
              <button onClick={() => handDeleteTest(test.test_id)} className="delete-button">Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
