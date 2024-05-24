import iconsStart from '../../icons/start.png';
import iconsList from '../../icons/list.png';
import iconsExit from '../../icons/exit.png';
import Header from './Header';
import Welcome from './Welcom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Main() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('userData');
    navigate('/login');
  };

    const handleCreateTest = () =>{
      navigate('/createTest');
    }

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
          <button>Редактировать тест</button>
        </div>
        <div className="btn_3">
          <button>
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
    </>
  );
}
