import { useState, useEffect } from 'react';
import { score } from './titanicModel';
import { Loader } from './components/Loader';
import { TitanicShip } from './components/TitanicShip';

import maleIcon from './assets/male.png';
import femaleIcon from './assets/femenine.png';

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    pclass: '3',
    sex: '0',
    age: '25',
    fare: '15',
    sibsp: '0',
    parch: '0'
  });

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSexChange = (selectedSex) => {
    setFormData({ ...formData, sex: selectedSex });
  };

  const handleClassSelect = (selectedClass) => {
    setFormData({ ...formData, pclass: selectedClass });
  };

  const loadPreset = (type) => {
    if (type === 'jack') {
      setFormData({ pclass: '3', sex: '0', age: '20', fare: '7.25', sibsp: '0', parch: '0' });
    } else if (type === 'rose') {
      setFormData({ pclass: '1', sex: '1', age: '17', fare: '100', sibsp: '1', parch: '1' });
    } else if (type === 'child') {
      setFormData({ pclass: '2', sex: '1', age: '6', fare: '26', sibsp: '1', parch: '1' });
    }
    setResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(null);
    setIsLoading(true);

    setTimeout(() => {
      const inputData = [
        parseFloat(formData.pclass),
        parseFloat(formData.sex),
        parseFloat(formData.age),
        parseFloat(formData.fare),
        parseFloat(formData.sibsp),
        parseFloat(formData.parch)
      ];

      const logit = score(inputData);
      const probability = 1 / (1 + Math.exp(-logit));
      const chance = (probability * 100).toFixed(1);

      setResult(chance);
      setIsLoading(false);
    }, 600);
  };

  if (isInitialLoading) {
    return (
      <div className="app-container" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <Loader text="Загрузка системы и инициализация ИИ-модели..." />
      </div>
    );
  }

  return (
    <div className="app-container fade-in-content">
      <h2 className="title">🧊 Твой шанс на Титанике</h2>

      <TitanicShip pclass={formData.pclass} onSelectClass={handleClassSelect} />

      <div className="presets-container">
        <span className="presets-label">Быстрые пресеты:</span>
        <div className="presets-grid">
          <button type="button" className="preset-btn" onClick={() => loadPreset('jack')}>
            👤 Джек (3 класс)
          </button>
          <button type="button" className="preset-btn" onClick={() => loadPreset('rose')}>
            🌹 Роуз (1 класс)
          </button>
          <button type="button" className="preset-btn" onClick={() => loadPreset('child')}>
            👶 Ребенок
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>Класс каюты</label>
          <select name="pclass" value={formData.pclass} onChange={handleChange}>
            <option value="1">1 класс (Люкс на верхних палубах)</option>
            <option value="2">2 класс (Средние палубы)</option>
            <option value="3">3 класс (Эконом и трюм)</option>
          </select>
        </div>

        <div className="input-group">
          <label>Пол</label>
          <div className="gender-btn-group">
            <button 
              type="button"
              className={`gender-btn ${formData.sex === '0' ? 'active' : ''}`}
              onClick={() => handleSexChange('0')}
            >
              <img src={maleIcon} alt="Male" className="gender-icon" />
              Мужской
            </button>
            <button 
              type="button"
              className={`gender-btn ${formData.sex === '1' ? 'active' : ''}`}
              onClick={() => handleSexChange('1')}
            >
              <img src={femaleIcon} alt="Female" className="gender-icon" />
              Женский
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Возраст (лет)</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Цена билета ($)</label>
          <input type="number" name="fare" value={formData.fare} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Братья / Сестры / Супруг(а) на борту</label>
          <input type="number" name="sibsp" value={formData.sibsp} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Родители / Дети на борту</label>
          <input type="number" name="parch" value={formData.parch} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Вычисление...' : 'Рассчитать вероятность'}
        </button>
      </form>

      {isLoading && <Loader text="Модель ИИ рассчитывает шансы..." />}

      {!isLoading && result !== null && (
        <div className="result-card">
          <div className="result-title">Шанс выжить:</div>
          <div className={`result-value ${result > 50 ? 'high-chance' : 'low-chance'}`}>
            {result}%
          </div>
        </div>
      )}
    </div>
  );
}

export default App;