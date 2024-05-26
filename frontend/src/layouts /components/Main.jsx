import iconsStart from '../../icons/start.png';
import iconsList from '../../icons/list.png';
import iconsExit from '../../icons/exit.png';
import Header from './Header';
import Welcome from './Welcom';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Modal from '../modal/ModalEdit';
import ModalStatistic from '../modal/ModalStatistics';

export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalActive, setModalActive] = useState(false);
  const [savedTests, setSavedTests] = useState([]);
  const [savedTestsStatistic, setSavedTestsStatistic] = useState([]);
  const [activeStatistic, setActiveStatistic] = useState(false);

  const handleLogout = () => {
    Cookies.remove('userData');
    navigate('/login');
  };

  const handleCreateTest = () => {
    navigate('/createTest');
  };

  useEffect(() => {
    const fetchSavedTests = async () => {
      try {
        const token = Cookies.get('access_token');
        const response = await fetch('http://127.0.0.1:8000/test/read', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSavedTests(data);
          setSavedTestsStatistic(data); // Также установите данные для статистики
        } else {
          console.error('Failed to fetch saved tests');
        }
      } catch (error) {
        console.error('Error fetching saved tests:', error);
      }
    };

    fetchSavedTests();
  }, []);

  useEffect(() => {
    if (location.state?.savedTest) {
      setSavedTests((prevTests) => [...prevTests, location.state.savedTest]);
      setSavedTestsStatistic((prevTests) => [...prevTests, location.state.savedTest]);
    }
  }, [location.state]);

  return (
    <>
      <Header />
      <Welcome />
      <div className="main">
        <div className="main_start">
          <button className="btn_start">
            Начать
            <img src={iconsStart} alt="iconsStart" />
          </button>
        </div>
        <div className="btn_2">
          <button onClick={handleCreateTest}>Создать тест</button>
          <button onClick={() => setModalActive(true)}>Редактировать тест</button>
        </div>
        <div className="btn_3">
          <button onClick={() => setActiveStatistic(true)}>
            Статистика
            <img src={iconsList} alt="iconsList" />
          </button>
        </div>
        <div className="btn_3">
          <button onClick={handleLogout}>
            Выйти
            <img src={iconsExit} alt="iconsExit" />
          </button>
        </div>
      </div>
      <ModalStatistic active={activeStatistic} setActive={setActiveStatistic} savedTestsStatistic={savedTestsStatistic} />
      <Modal active={modalActive} setActive={setModalActive} savedTests={savedTests} setSavedTests={setSavedTests} setSavedTestsStatistic={setSavedTestsStatistic} />
    </>
  );
}
