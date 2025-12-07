import "../styles/switch.css";
import "../styles/doc.css";
import "../styles/footer.css";
import "../styles/qr.css";
import sample from '../img/image.jpg'
import loadingImg from '../img/loading-png.png'
import qr from "../img/qr.png"
import fake from '../img/qr-code-fake.png'
import share from '../img/share.svg'
import { useState, useEffect, useRef } from "react";

function toLatin(text) {
  const cyrillicToLatin = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
    'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH',
    'З': 'Z', 'И': 'I', 'Й': 'I', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
    'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
    'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH', 'Ы': 'Y', 'Э': 'E', 'Ю': 'Yu', 'Я': 'YA'
  };

  return text.split('').map(char => cyrillicToLatin[char] || char).join('');
}

const ComponentOff = ({ formData, imageSrc }) => {

  const fioValue = formData.fio;
  const fio = fioValue.split(" ");
  const docContainerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);
  const [, setInitialTouch] = useState(null);
  const [IsQr, setIsQr] = useState(false);
  const [load, setLoad] = useState(false);
  const [code, setCode] =  useState('');

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
      container.style.transformOrigin = `${originX}% ${originY}%`;
      container.style.transform = `scale(${newScale})`;

      setScale(newScale);
    };

    const container = docContainerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
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

  const handleTouchEnd = () => {
    setInitialDistance(null);
  };

  return (
    <>
    {load ? (
          <div id="loadingg" className="loading">
            <img className={load ? 'loading-img' : ''} src={loadingImg} alt=""/>
          </div>
        ) : (
          IsQr  ? (
            <div id='qrrr' className="qr-container" onTouchStart={handleClose}>
              <div className="qrik">
                <label className="qrik-udo">Удостоверение личности</label>
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
        <div className="doc-container">
          <div 
            className="doc-label doc-image" 
            ref={docContainerRef}
            style={{transform: `scale(${scale})`}}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            >
            <img className="doc-img doc-img-front" src={sample} alt="" />
            <img className="text-position doc-icon" src={formData.image} alt=""/>
            <p className="text-position doc-sur">{fio[0] ? fio[0].toUpperCase() : ""}</p>
            <p className="text-position doc-name">{fio[1] ? fio[1].toUpperCase() : ""}</p>
            <p className="text-position patronymic">{fio[2] ? fio[2].toUpperCase() : ""}</p>
            <p className="text-position doc-burn-date">{formData.date || ""}</p>
            <p className="text-position doc-iin">{formData.iin || ""}</p>

            <p className="text-position doc-number">{formData.docNum || ""}</p>
            <p className="text-position doc-city">{formData.region ? formData.region.toUpperCase() : ""}</p>
            <p className="text-position doc-nation">{formData.nation ? formData.nation.toUpperCase() : ""}</p>
            <p className="text-position doc-gets">МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РК</p>
            <p className="text-position doc-term">{formData.docDate || ""} - {formData.docEnd || ""}</p>
            <p className="text-position doc-simb-up">{"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"}</p>
            <p className="text-position doc-name-sur">{toLatin(fio[0] ? fio[0].toUpperCase() :  "") 
                                                      + "<<" + toLatin(fio[1] ? fio[1].toUpperCase() : "") 
                                                      + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" || ""}</p>
            <p className="text-position doc-simb-down">{"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"}</p>
          </div>
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
    </>
  );
};
console.log('da');

export default ComponentOff;