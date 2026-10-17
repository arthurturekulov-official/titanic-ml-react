import './Loader.css'

export function Loader({ text = "ИИ анализирует шансы..." }) {
  return (
    <div className="loader-container">
      <div className="loader-content">
        {/* Анимированный корабль и волны */}
        <div className="ship-wrapper">
          <div className="ship">🚢</div>
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
        </div>

        {/* Радарное свечение ИИ */}
        <div className="ai-pulse"></div>

        {/* Текст загрузки */}
        <p className="loader-text">{text}</p>
      </div>
    </div>
  );
}