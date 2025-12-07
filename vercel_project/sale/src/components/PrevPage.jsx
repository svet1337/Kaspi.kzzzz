import "../styles/prevPage.css";
import arrow from './arrow.png'
import searchPng from '../img/search.png';
import udoPhoto from '../img/udos.png';
import studPhoto from '../img/stud.png';
import egov from '../img/egov.jpg'
import kasp from '../img/favicon.ico';
import spravki from '../img/prev/spravki.png'
import house from "../img/prev/house.png"
import car from '../img/prev/car.png'
import declar from '../img/prev/declar.png'
import wedding from "../img/prev/wedding.png"
import ip from '../img/prev/ip.png'
import replace_car from '../img/prev/replace-car.png'
import posobie from "../img/prev/posobie.png"
import baby from "../img/prev/baby.png"
import replace_ip from "../img/prev/replace-ip.png"
import { useState } from "react";

function PrevPage({stud, setStud, checked, setChecked}) {

    const [isEgov, setIsEgov] = useState(false);

    const showUdo = () => {
        
        const main = document.querySelector('.main-switch')
        if (main) main.style.display = 'block';
        
        const prev = document.querySelector('.prevPage')
        if(prev) prev.style.display = 'none';
        
        setChecked(false);
    }



    const loadingEgov = () => {
        
        setIsEgov(true);

        const head = document.querySelector('.header')
        const prev = document.querySelector('.prevPage')
        const lod = document.querySelector('.loadEgov')
        const switche = document.querySelector('.switch-container');
        const doc = document.querySelector('.doc-container');
        const footer1 = document.querySelector('#footer-one');
        const footer2 = document.querySelector('#footer-two');
        const header = document.querySelector('.header');

        

        switche.style.animation = "showUdo 0.2s linear";
        doc.style.animation = 'showUdo 0.2s linear';
        header.style.animation = 'showUdo 0.2s linear';
        if(footer1) footer1.style.animation = 'showUdo 0.2s linear'; 
        if(footer2) footer2.style.animation = 'showUdo 0.2s linear';
        

        setTimeout(() => {
            setIsEgov(false);
            prev.style.display = 'none';
            showUdo()
        }, 2500);

        if(lod) lod.style.display = 'flex'
        if(head) head.style.display = 'none';
        console.log("GDE")


        console.log("SUKA")

        

    }

    const showStud = () => {
        const studen = document.querySelector('.studentID')
        if(studen) studen.style.display = "block";

        const prev = document.querySelector(".prevPage");
        if(prev) prev.style.display = "none";
        const footer1 = document.querySelector('#footer-two');
        footer1.style.display = "flex"

        setChecked(false)
        setStud(false)

    }

    const loadingStudentID = () => {

        setIsEgov(true)
        
        const head = document.querySelector('.header')
        const prev = document.querySelector('.prevPage')
        const footer1 = document.querySelector('#footer-two');
        const lod = document.querySelector('.loadEgov')
        const header = document.querySelector('.header');
        const stu = document.querySelector('.studentID');

        
        header.style.animation = 'showUdo 0.2s linear';
        if(footer1) {
            footer1.style.animation = 'showUdo 0.2s linear'
            footer1.style.display = "flex"
        }; 
        if(stu) stu.style.animation = 'showUdo 0.2s linear'; 

        setTimeout(() => {
            setIsEgov(false);
            prev.style.display = 'none';
            showStud()
        }, 2500);

        if(lod) lod.style.display = 'flex'
        if(head) head.style.display = 'none';



    }

    return (
        <>
            {isEgov ? ( 
            <div className="loadEgov">
                <div className="red-loading-bar"></div>
                <p className="loadEgov-exit">+</p>
                <div className="loadEgov-mid">
                    <div className="egov-cont">
                        <img className="egov-img" src={egov} alt=""/>
                    </div>
                    <p className="loadEgov-plus">+</p>
                    <div className="kaspi-cont">
                        <img className="kaspi-img" src={kasp} alt=""/>
                    </div>
                </div>
            </div>
            ) : (
            <div className='prevPage'>
                <div className="prev-top">
                    <div className="switch-container-2">
                        <div className={`switch off`}>
                        <span className="switch-text switch-text-on">Все услуги</span>
                        <span className="switch-text switch-text-off">Мои заявки</span>
                        <div className="toggle"></div>
                        </div>
                    </div>

                    <div className="prev-search">
                        <img className="prev-search-bar-icon" src={searchPng} alt=""/>
                        <input className="prev-search-bar-input" type="text" placeholder="Поиск по Госуслугам"/>
                    </div>
                </div>

                <div className="online-docs">
                    <div className="online-scans">
                        <div onTouchEnd={loadingEgov} className="online-card">
                            <img className="online-udo" src={udoPhoto} alt=""/>
                            <p className="online-udo-text">Удостоверение личности</p>
                        </div>
                        <div onTouchEnd={loadingStudentID} className="online-card">
                            <img className="online-udo" src={studPhoto} alt=""/>
                            <p className="online-udo-text">Студенческий билет</p>
                        </div>
                    </div>
                    <div className="online-all">
                        <p>Все документы</p>
                        <img className="online-all-img" src={arrow} alt=""/>
                    </div>
                </div>

                <div className='main-list'>
                        <div className='doc-list'>
                            <div className='doc-item'>
                                <img className='photos spr' src={spravki} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Справки</p>
                                    <p className='s s-desc'>Социальные, по недвижимости и медицинские</p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <img className='photos house' src={house} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Прописка и снятие с прописки по <br/>месту жительста</p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <img className='photos pos' src={posobie} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Пособия и выплаты</p>
                                    <p className='s s-desc'>На ребенка, для многодетных, при потере работы</p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <img className='photos car' src={car} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Переоформление автомобиля</p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <img className='photos' src={declar} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Декларация по форме 250</p>
                                    <p className='s s-desc'>Об активах и обязательствах</p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <img className='photos' src={replace_car} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Замена водительских прав</p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <img className='photos' src={wedding} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Заявка на регистрацию брака</p>
                                    <p className="s s-desc"></p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <img className='photos' src={baby} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Оформления свидетельства о<br/> рождении ребенка</p>
                                    <p className="s s-desc"></p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <img className='photos' src={ip} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Регистрация ИП</p>
                                    <p className="s s-desc"></p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <img className='photos' src={replace_ip} alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Изменение реквизитов и <br/>налогового режима ИП</p>
                                    <p className="s s-desc"></p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>
                            <div className='doc-item'>
                                <div className='photos' alt=''/>    
                                <div className='blyat'>
                                    <p className='s s-name'>Социальный Счет</p>
                                    <p className="s s-desc"></p>
                                </div>
                                <img src={arrow} className='arrow-img' alt='' />    
                            </div>

                        </div>
                </div>
            </div>
            )}
        </>
    );

}

export default PrevPage;