import React from 'react';
import './ModalEdit.css';

const Modal = ({ active, setActive }) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}>

        <div className="modal_content_header">
          <label>Редактирование теста</label>
          <button onClick={() => setActive(false)}>X</button>
        </div>
        <div className='modal_conten_inner'>
           
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
