import './App.css';
import Header from './components/Header.jsx';
import React, { useState } from 'react';
import Switch from './components/Switch.jsx';
import PrevPage from './components/PrevPage.jsx';
import StudentID from './components/studentID.jsx';

function App() {

  const [checked, setChecked] = useState(false);
  const [stud, setStud] = useState(true);
  const [load, setLoad] = useState(false);
  const [isQr, setIsQr] = useState(false);

  const [formData, setFormData] = useState({
    fio: "",
    iin: "",
    date: "",
    docNum: "",
    docDate: "",
    docEnd: "",
    image: "",
    nation: "",
    region: "",
  });
  console.log("App", formData.fio)
  return (
    <>
        <Header stud={stud} setStud={setStud} checked={checked} setChecked={setChecked}/>
        <div>
              <Switch
                formData={formData}
                setFormData={setFormData}
                onChange={setChecked}
                checked={checked}
                onColor="#00ff00"
                offColor="#cccccc"
                checkedIcon={false}
                uncheckedIcon={false}
                loading={setLoad}
                qring={setIsQr}
              />
        </div>
        <StudentID formData={formData}/>
        <PrevPage stud={stud} setStud={setStud} checked={checked} setChecked={setChecked}/>
    </>
  );
}

export default App;
