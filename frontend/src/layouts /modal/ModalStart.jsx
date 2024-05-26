import React, { useState } from 'react';
import './ModalEdit.css';

const ModalStart = ({ active, setActive, savedTests, onStartTest }) => {
  const [recruiterName, setRecruiterName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateContact, setCandidateContact] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!candidateName) {
      newErrors.candidateName = 'Имя кандидата обязательно';
    }

    if (!candidateContact) {
      newErrors.candidateContact = 'Контактные данные кандидата обязательны';
    }

    if (!selectedTest) {
      newErrors.selectedTest = 'Выбор теста обязателен';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleStartTest = async () => {
    if (validateFields()) {
      const testData = {
        recruiterName,
        candidateName,
        candidateContact,
        testId: selectedTest
      };

      try {
        const result = await onStartTest(testData);
        if (result.success) {
          setActive(false);
        } else {
          // обработка ошибок
        }
      } catch (error) {
        console.error('Error starting test:', error);
      }
    }
  };

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        <div className="modal_content_header">
          <label>Начало теста</label>
          <button onClick={() => setActive(false)}>X</button>
        </div>
        <div className="modal_content_inner">
          <div className="form-group">
            <label htmlFor="candidateName">Имя кандидата</label>
            <input
              type="text"
              id="candidateName"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
            {errors.candidateName && <span className="error-message">{errors.candidateName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="candidateContact">Контактные данные кандидата</label>
            <input
              type="text"
              id="candidateContact"
              value={candidateContact}
              onChange={(e) => setCandidateContact(e.target.value)}
            />
            {errors.candidateContact && <span className="error-message">{errors.candidateContact}</span>}
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
            {errors.selectedTest && <span className="error-message">{errors.selectedTest}</span>}
          </div>
          <button className="start-test-button" onClick={handleStartTest}>Начать тест</button>
        </div>
      </div>
    </div>
  );
};

export default ModalStart;
