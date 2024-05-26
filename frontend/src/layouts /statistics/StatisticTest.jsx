import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Statistics from '../components/Statistic';
import '../statistics/StatisticTets.css';
import Cookies from 'js-cookie';

const StatisticTets = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('access_token');
        const test_id = Cookies.get('test_id');
        const response = await fetch(`http://127.0.0.1:8000/score/${test_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setRows(data);
        } else {
          console.error('Failed to fetch statistics');
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const token = Cookies.get('access_token');
       
        await fetch(`http://127.0.0.1:8000/score/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ "score_id": id }) // Отправляем значение оценки
      });
    setRows(rows.filter(row => row.score_id !== id));
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
                <tr key={row.score_id}>
                  <td>{row.score}</td>
                  <td>{row.candidate_name}</td>
                  <td>{row.media_contact}</td>
                  <td>{new Date(row.date).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleDelete(row.score_id)} className="delete-button">
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
