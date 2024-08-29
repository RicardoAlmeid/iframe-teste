import React, { useState } from 'react';
import './App.css';

const emojis = ["😴", "🥱", "😒", "😓", "😎", "😥", "😟", "😩", "😨", "🥵"];

function App() {
  const [sliders, setSliders] = useState([{ id: 0, name: 'Ricardo', value: 0 }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAddSlider = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    if (newName) {
      setSliders([...sliders, { id: sliders.length, name: newName, value: 0 }]);
      setNewName('');
      setModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setNewName('');
    setModalVisible(false);
  };

  const handleSliderChange = (id, value) => {
    setSliders(sliders.map(slider => slider.id === id ? { ...slider, value } : slider));
  };

  const handleDeleteSlider = (id) => {
    setSliders(sliders.filter(slider => slider.id !== id));
  };

  return (
    <div className="App">
      <div className="title">Escala de esforço</div>
      <div id="sliders">
        {sliders.map(slider => (
          <div className="slider-container" key={slider.id}>
            <div className="delete-button" onClick={() => handleDeleteSlider(slider.id)}>X</div>
            <div className="name">{slider.name}</div>
            <div className="slider-wrapper">
              <input
                type="range"
                min="0"
                max="9"
                value={slider.value}
                className="slider"
                onChange={(e) => handleSliderChange(slider.id, e.target.value)}
              />
              <div className="value">{emojis[slider.value]}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-button" onClick={handleAddSlider}>+</div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalCancel}>&times;</span>
            <p>Digite o nome do colaborador:</p>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              maxLength="10"
            />
            <button className="modal-button" onClick={handleModalOk}>OK</button>
            <button className="modal-button" onClick={handleModalCancel}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;