import iconsStart from '../../icons/start.png'
import iconsList from '../../icons/list.png'
import Header from './Header'
import Welcome from './Welcom'

export default function Main() {
    return(
        <>
        <Header/>
        <Welcome/>
        <div className="main">
            <div className='main_start'>
                <button className="btn_start">Начать<img src={iconsStart} alt="iconsStart" /></button>
            </div>
            <div className="btn_2">
                <button>Создать тест</button>
                <button>Редактировать тест</button>
            </div>
            <div className="btn_3">
                <button>Статистика<img src={iconsList} alt="iconsList" /></button>
            </div>
        </div>
       
        </>
    
    )

};