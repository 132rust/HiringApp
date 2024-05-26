import React, { useState } from 'react';
import Header from '../components/Header';
import Statistics from '../components/Statistic';
import '../statistics/StatisticTets.css';

const StatisticTets = () => {
  const [rows, setRows] = useState([
    { id: 1, оценка: '1', имя: 'Иван Иванов', контакт: 'ivan@example.com', дата: '2023-05-01' },
    { id: 2, оценка: '2', имя: 'Петр Петров', контакт: 'petr@example.com', дата: '2023-05-02' },
    { id: 3, оценка: '2', имя: 'Сергей Сергеев', контакт: 'sergey@example.com', дата: '2023-05-03' },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  return (
    <>
      <Header />
      <Statistics />
      <div className="mtb-3">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Оценка</th>
                <th>Имя кандидата</th>
                <th>Контактная информация</th>
                <th>Дата проведения</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td>{row.оценка}</td>
                  <td>{row.имя}</td>
                  <td>{row.контакт}</td>
                  <td>{row.дата}</td>
                  <td>
                    <button onClick={() => handleDelete(row.id)} className="delete-button">
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StatisticTets;
