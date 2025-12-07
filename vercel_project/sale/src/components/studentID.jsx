import ID from "../img/student.png"
import "../styles/studentID.css"
import qr from "../img/qr.png"
import share from "../img/share.svg"
import loadingImg from "../img/loading-png.png"
import fake from "../img/qr-code-fake.png"
import { useState, useEffect, useRef } from "react"

export default function StudentID(formData) {
    const [IsQr, setIsQr] = useState(false);
    const [load, setLoad] = useState(false);
    const [code, setCode] =  useState('');
    const docContainerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [origin, setOrigin] = useState({ x: 50, y: 50 });
    const [initialDistance, setInitialDistance] = useState(null);
    const [, setInitialTouch] = useState(null);

    useEffect(() => {
        const handleWheel = (event) => {
        event.preventDefault();
        const container = docContainerRef.current;
        const rect = container.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        let newScale = scale;
        if (event.deltaY < 0) {
        newScale = Math.min(scale * 1.1, 5);
        } else {
        newScale = Math.max(scale / 1.1, 1);
        }

        const originX = (mouseX / rect.width) * 100;
        const originY = (mouseY / rect.height) * 100;

        setOrigin({ x: originX, y: originY });
        setScale(newScale);
    };

        const container = docContainerRef.current;
        container.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, [scale]);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      setInitialDistance(Math.sqrt(dx * dx + dy * dy));

      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      setInitialTouch({ x: midX, y: midY });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialDistance) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);

      const zoomFactor = newDistance / initialDistance;
      setScale((prevScale) => Math.min(Math.max(prevScale * zoomFactor, 1), 5)); 

      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

      const container = docContainerRef.current;
      const rect = container.getBoundingClientRect();
      const mouseX = midX - rect.left;
      const mouseY = midY - rect.top;

      const originX = (mouseX / rect.width) * 100;
      const originY = (mouseY / rect.height) * 100;

      container.style.transformOrigin = `${originX}% ${originY}%`;
      container.style.transform = `scale(${scale})`;

      setInitialDistance(newDistance);
    }
  };

    const handleTouchEnd = () => {
    setInitialDistance(null);
  };

    const handleQR = async (e) => {
        console.log("loadtrue")
        setLoad(true);
        console.log("loading")
        let newCode = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
        setCode(newCode);
        setInterval(() => {setLoad(false)}, 1000);
        setIsQr(true);
        const lo = document.getElementById('loadingg');
        const q = document.getElementById('qrrr');

        if (lo) lo.style.display = 'block';
        if (q) q.style.display = 'block';
        console.log("loadfalse")
    }        

    const handleClose = async (e) => {
        if (IsQr) {
        const lo = document.getElementById('loadingg');
        const q = document.getElementById('qrrr');


        const target = e.target.className;

        
        if(target === 'qrik-x' || target === "qr-container"){
            if (lo) lo.style.display = 'none';
            if (q) q.style.display = 'none';
        }

        }
    }

    return(
        <>
            {load ? (
                <div id="loadingg" className="loading">
                    <img className={load ? 'loading-img' : ''} src={loadingImg} alt=""/>
                </div>
            ) : (
            IsQr  ? (
                <div id='qrrr' className="qr-container" onTouchStart={handleClose}>
                    <div className="qrik">
                        <label className="qrik-udo">Студенческий билет</label>
                        <label className="qrik-x" onTouchStart={handleClose}>x</label>
                        <label className="qrik-show">Покажите QR-код сотруднику</label>
                        <img className="qrik-fake" src={fake} alt=""/>
                        <label className="qrik-shos">или скажите код</label>
                        <label className="qrik-code">{code}</label>
                    </div>
                </div>
            ) : (
                <div>
                </div>
            )
            )}
            <div className="studentID">
                <div    
                    className="studentID-doc"
                    ref={docContainerRef}
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: `${origin.x}% ${origin.y}%`,
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <img className="studentImg" src={ID}/>
                    <img className="student-data student-image" src={formData.formData.image} alt=""/>
                    <label className="student-data student-name">{formData.formData.fio}</label>
                    <label className="student-data student-name-one">Nazarbayev University</label>
                    <label className="student-data student-name-two">Nazarbayev University</label>
                    <label className="student-data student-academ-one">Бакалавр</label>
                    <label className="student-data student-academ-two">Бакалавр</label>
                    <label className="student-data student-gop-one">B057 Ақпараттық технологиялар</label>
                    <label className="student-data student-gop-two">B057 Информацонные технологии</label>
                    <label className="student-data student-course">2</label>
                    <label className="student-data student-date-app">25.08.2024</label>

                </div>
                <div id='footer-two' className="footer">
                            <button className="footer-btn pred-doc" onTouchStart={handleQR}>
                                <img className="footer-qr-image" src={qr} alt="" />
                                Предъявить документ
                                </button>
                                <button className="footer-btn otpr-doc">
                                <img className="footer-share-image" src={share} alt=''/>
                                Отправить документ</button>
                </div>
            </div>
        </>
    )
}