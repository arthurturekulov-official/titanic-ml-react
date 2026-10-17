import { useState } from 'react';
import { score } from './titanicModel';

function App() {
  const [formData, setFormData] = useState({
    pclass: '3',
    sex: '0',
    age: '25',
    fare: '15',
    sibsp: '0',
    parch: '0'
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();

    const inputData = [
      parseFloat(formData.pclass),
      parseFloat(formData.sex),
      parseFloat(formData.age),
      parseFloat(formData.fare),
      parseFloat(formData.sibsp),
      parseFloat(formData.parch)
    ];

    // 1. Получаем число от модели (логит)
    const logit = score(inputData);

    // 2. Переводим его в вероятность (от 0 до 1) с помощью сигмоиды
    const probability = 1 / (1 + Math.exp(-logit));

    // 3. Переводим в проценты
    const chance = (probability * 100).toFixed(1);

    setResult(chance);
  };



  return (
    <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>🚢 Прогноз выживания на Титанике</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label>
          Класс каюты:
          <select name="pclass" value={formData.pclass} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
            <option value="1">1 класс (Люкс)</option>
            <option value="2">2 класс (Средний)</option>
            <option value="3">3 класс (Эконом)</option>
          </select>
        </label>

        <label>
          Пол:
          <select name="sex" value={formData.sex} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
            <option value="0">Мужской</option>
            <option value="1">Женский</option>
          </select>
        </label>

        <label>
          Возраст:
          <input type="number" name="age" value={formData.age} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </label>

        <label>
          Цена билета ($):
          <input type="number" name="fare" value={formData.fare} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </label>

        <label>
          Братья / Сестры / Супруг(а) на борту:
          <input type="number" name="sibsp" value={formData.sibsp} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </label>

        <label>
          Родители / Дети на борту:
          <input type="number" name="parch" value={formData.parch} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </label>

        <button type="submit" style={{ padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Рассчитать вероятность
        </button>
      </form>

      {result !== null && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '6px', textAlign: 'center' }}>
          <h3>Шанс выжить:</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: result > 50 ? '#2e7d32' : '#c62828' }}>
            {result}%
          </p>
        </div>
      )}
    </div>
  );
}

export default App;