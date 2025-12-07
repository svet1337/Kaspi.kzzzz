import arrow from './arrow.png'
import '../App.css'

function Header({stud, setStud, checked, setChecked}){



    const showUdo = () => {
            document.querySelector('.main-switch').style.display = 'none';
            document.querySelector('.prevPage').style.display = 'flex';
            document.querySelector('.studentID').style.display = "none";
            setChecked(true);
    }


    return(
            <div className='header'>
                <img src={arrow} onClick={showUdo} alt=''/>
                {checked ? <p>Госуслуги</p> : stud ? <p>Удостоверение личности</p> : <p>Студенческий билет</p>}
            </div>
    )
}

export default Header;