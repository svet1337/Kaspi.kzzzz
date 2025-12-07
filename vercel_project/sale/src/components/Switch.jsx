import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import imageCompression from 'browser-image-compression';
import "../styles/switch.css";
import "../styles/doc.css";
import "../styles/footer.css";
import ComponentOff from "./ComponentOff";
import ComponentOn from "./ComponentOn";

const Switch = ({formData, setFormData}) => {
  const [isOn, setIsOn] = useState(false);
  const [, setTransitionState] = useState(""); 
  const [, setCurrentComponent] = useState("off"); 
  const [imageSrc, setImageSrc] = useState(null);
  const [nationInput, setNationInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");


  console.log(formData.fio);

  useEffect(() => {
    const prev = document.querySelector('.prevPage');
    if(prev) prev.style.diplay = 'none'; 
  }, [])

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        if (parsedData.region){
          setSelectedOption(parsedData.region)
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  const handleToggle = (newState) => {
    const direction = newState ? "right" : "left";
  
    setTransitionState(`slide-out-${direction}`);
    setTimeout(() => {
      setCurrentComponent(newState ? "on" : "off");
      setTransitionState(`slide-in-${direction}`);
    }, 500); 
    setIsOn(newState);
};

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleToggle(true),
    onSwipedRight: () => handleToggle(false),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const toggleSwitch = (e) => {
    if(e.target.classList.contains("toggle")){
      return
    };
    setIsOn((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegSave = (e) => {

    setFormData((prevData) => {
      const updatedData = { ...prevData, region: selectedOption };
      localStorage.setItem("formData", JSON.stringify(updatedData))
      return updatedData
    })

  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      console.log("Исходный размер файла: ", (file.size / 1024 / 1024).toFixed(2), "МБ");
  
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/heic'];
      if (!validTypes.includes(file.type)) {
        console.error("Неподдерживаемый формат файла");
        alert("Неподдерживаемый формат файла. Поддерживаются: JPEG, PNG, WEBP, HEIC.");
        return;
      }
  
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1000, 
          useWebWorker: true, 
        };
  
        const compressedFile = await imageCompression(file, options);
        // console.log(
        //   "Размер файла после сжатия: ",
        //   (compressedFile.size / 1024 / 1024).toFixed(2),
        //   "МБ"
        // );
  
        const imageDataUrl = await imageCompression.getDataUrlFromFile(compressedFile);
        setImageSrc(imageDataUrl);
  
        setFormData((prevData) => ({
          ...prevData,
          image: imageDataUrl,
        }));
        setIsOn(false);
      } catch (error) {
        alert("Произошла ошибка при загрузке изображения. Попробуйте другое изображение.");
      }
    }
  };
  
  
  
  const isFormValid = Object.values(formData).every((value) => typeof value === 'string' && value.trim() !== "");

  const handleNationSave = () => {
    if (nationInput.trim() === "") {
      alert("Введите национальность!");
      return;
    }

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        nation: nationInput,
      };
      console.log("Данные после сохранения:", updatedData);
      return updatedData;
    });
  };

  useEffect(() => {
    if(formData.region !== "") {
      document.querySelector('.header').style.display = 'flex';
      document.querySelector('.switch-container').style.display = 'flex';
    }
  })
  
  return (
    <>
    
    <div className="main-switch" {...swipeHandlers}>
      <div className="switch-container">
        <div className={`switch ${isOn ? "on" : "off"}`} onClick={toggleSwitch}>
          <span className="switch-text switch-text-on">Документ</span>
          <span className="switch-text switch-text-off">Реквизиты</span>
          <div className="toggle"></div>
        </div>
      </div>

      {formData.image === "" ? (
        <div className="image-upload">
          <p>Для начала загрузите своё фото</p>
          <input
            type="file"
            accept="image/*"
            value={formData.image}
            name="person-image"
            onChange={handleImageUpload}
          />
        </div>
      ) : ( 
          formData.nation === "" ? (
          <div className="fill-req">
            Напишите свою национальность<br></br>
            <input 
              type="text" 
              name="nation" 
              value={nationInput} 
              onChange={(e) => setNationInput(e.target.value)} 
            />
            <button onTouchStart={handleNationSave}>Сохранить</button>
          </div> 
        ) : (
          formData.region === "" ? (
              <div className="fill-reg">
                  <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="Астана">Астана</option>
                    <option value="Алматы">Алматы</option>
                    <option value="Шымкент">Шымкент</option>
                    <option value="Акмолинская область">Акмолинская область</option>
                    <option value="Актюбинская область">Актюбинская область</option>
                    <option value="Алматинская область">Алматинская область</option>
                    <option value="Атырауская область">Атырауская область</option>
                    <option value="В-Казахстанская область">В-Казахстанская область</option>
                    <option value="Жамбылская область">Жамбылская область</option>
                    <option value="Жетысуская область">Жетысуская область</option>
                    <option value="З-Казахстанская область">З-Казахстанская область</option>
                    <option value="Карагандинская область">Карагандинская область</option>
                    <option value="Костанайская область">Костанайская область</option>
                    <option value="Кызылординская область">Кызылординская область</option>
                    <option value="Мангистауская область">Мангистауская область</option>
                    <option value="Павлодарская область">Павлодарская область</option>
                    <option value="С-Казахстанская область">С-Казахстанская область</option>
                    <option value="Туркестанская область">Туркестанская область</option>
                    <option value="Улытауская область">Улытауская область</option>
                  </select>
                  <button onTouchStart={handleRegSave}>
                    Сохранить
                  </button>
                  {selectedOption && <p>Selected region: {selectedOption}</p>}
              </div>
          ) : (
            <div>
                {isOn ? (
                    <ComponentOn formData={formData} handleChange={handleChange} />
                ) : (
                  isFormValid ? (
                    <ComponentOff formData={formData} imageSrc={imageSrc} />
                  ) : (
                    <div className="fill-req">
                      Заполните Реквизиты
                    </div>
                  )
                )}
            </div>
          )
        )
      )}
    </div>
    </>
  );
};

export default Switch;
