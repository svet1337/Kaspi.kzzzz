import "../styles/switch.css";
import "../styles/doc.css";
import "../styles/footer.css";
import qr from "../img/qr.png";
import share from '../img/share.svg'
import copy from '../img/copy.png'

const ComponentOn = ({ formData, handleChange }) => {

  if(document.querySelector('.header').style.display === 'none'){
    document.getElementById('footer-one').style.display = 'none';
    document.getElementById('footer-two').style.display = 'none';
  }

  return (
    <>
      <div className="req-container">
        <div className="fio containers">
          <p className="fio-label label">ФИО</p>
            <input
              className="fio-input input"
              type="text"
              placeholder="Фамилия Имя Отчество"
              name="fio"
              value={formData.fio}
              onChange={handleChange}
            />
            <img className="copy-image" src={copy} alt=""/>
        </div>
        <div className="iin containers">
            <p className="iin-label label">ИИН</p>
            <input
                className="iin-input input"
                type="number"
                placeholder="ИИН"
                name="iin"
                value={formData.iin}
                onChange={handleChange}
              />
            <img className="copy-image" src={copy} alt=""/>
        </div>
        <div className="date containers">
          <p className="date-label label">Дата рождения</p>
            <input
              className="date-input input"
              type="text"
              placeholder="ДД.ММ.ГГГГ"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <img className="copy-image" src={copy} alt=""/>
        </div>
        <div className="doc-num containers">
          <p className="doc-num-label label">Номер Документа</p>
            <input
              className="doc-num-input input"
              type="number"
              placeholder="Номер документа"
              name="docNum"
              value={formData.docNum}
              maxLength={9}
              onChange={handleChange}
            />
            <img className="copy-image" src={copy} alt=""/>
        </div>
        <div className="doc-date containers">
          <p className="doc-date-label label">Дата выдачи</p>
            <input
              className="doc-date-input input"
              type="text"
              placeholder="ДД.ММ.ГГГГ"
              name="docDate"
              value={formData.docDate}
              onChange={handleChange}
            />
            <img className="copy-image" src={copy} alt=""/>
          </div>
        <div className="doc-end containers">
          <p className="doc-end-label label">Срок действия</p>
            <input
              className="doc-end-input input"
              type="text"
              placeholder="ДД.ММ.ГГГГ"
              name="docEnd"
              value={formData.docEnd}
              onChange={handleChange}
            />
            <img className="copy-image" src={copy} alt=""/>
          </div>
      </div>
      <div id='footer-one' className="footer">
        <button className="footer-btn-req pred-doc-req">
          <img className="footer-qr-image" src={qr} alt="" />
          Предъявить документ
        </button>
        <button className="footer-btn otpr-doc-req">
          <img className="footer-share-image" src={share} alt=''/>
          Отправить документ
        </button>
      </div>
    </>
  );
};

export default ComponentOn;