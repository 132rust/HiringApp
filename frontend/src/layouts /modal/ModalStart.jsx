import React, { useState } from 'react';
import './ModalEdit.css';

const ModalStart = ({ active, setActive, savedTests }) => {
  const [recruiterName, setRecruiterName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateContact, setCandidateContact] = useState('');
  const [selectedTest, setSelectedTest] = useState('');

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        <div className="modal_content_header">
          <label>Начало теста</label>
          <button onClick={() => setActive(false)}>X</button>
        </div>
        <div className="modal_content_inner">
          <div className="form-group">
            <label htmlFor="recruiterName">Имя кандидата</label>
            <input 
              type="text" 
              id="recruiterName" 
              value={candidateName} 
              onChange={(e) => setCandidateName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="candidateContact">Контактные данные кандидата</label>
            <input 
              type="text" 
              id="candidateContact" 
              value={candidateContact} 
              onChange={(e) => setCandidateContact(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="testSelect">Выберите тест</label>
            <select 
              id="testSelect" 
              value={selectedTest} 
              onChange={(e) => setSelectedTest(e.target.value)}
            >
              <option value="">Выберите тест</option>
              {savedTests.map((test) => (
                <option key={test.test_id} value={test.test_id}>{test.test_name}</option>
              ))}
            </select>
          </div>
          <button className="start-test-button">Начать тест</button>
        </div>
      </div>
    </div>
  );
};

export default ModalStart;
