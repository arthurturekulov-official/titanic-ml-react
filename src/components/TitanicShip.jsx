
import './TitanicShip.css';

export function TitanicShip({ pclass, onSelectClass }) {
  return (
    <div className="ship-container">
      <div className="ship-deck-label">
        Палуба: <span className="highlight-text">{pclass === '1' ? 'Верхняя (Люкс)' : pclass === '2' ? 'Средняя (Стандарт)' : 'Нижняя (Эконом/Трюм)'}</span>
      </div>

      <svg className="titanic-svg" viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg">
        {/* Трубы корабля */}
        <g className="chimneys">
          <rect x="140" y="25" width="14" height="35" rx="2" fill="#d97706" />
          <rect x="140" y="25" width="14" height="8" fill="#1e293b" />

          <rect x="200" y="25" width="14" height="35" rx="2" fill="#d97706" />
          <rect x="200" y="25" width="14" height="8" fill="#1e293b" />

          <rect x="260" y="25" width="14" height="35" rx="2" fill="#d97706" />
          <rect x="260" y="25" width="14" height="8" fill="#1e293b" />

          <rect x="320" y="25" width="14" height="35" rx="2" fill="#d97706" />
          <rect x="320" y="25" width="14" height="8" fill="#1e293b" />
        </g>

        {/* Корпус корабля */}
        <path d="M 40 120 L 440 120 C 470 120, 485 100, 490 85 L 30 85 C 30 100, 32 120, 40 120 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <path d="M 40 120 C 50 145, 420 145, 460 120 Z" fill="#991b1b" /> {/* Красное днище */}

        {/* ПАЛУБА 1 КЛАССА (ВЕРХНЯЯ) */}
        <g 
          className={`deck-zone deck-1 ${pclass === '1' ? 'active' : ''}`}
          onClick={() => onSelectClass('1')}
        >
          <rect x="110" y="60" width="260" height="25" rx="4" />
          <text x="240" y="77" textAnchor="middle" className="deck-text">1 КЛАСС (ПРОМЕНАД & ЛЮКС)</text>
        </g>

        {/* ПАЛУБА 2 КЛАССА (СРЕДНЯЯ) */}
        <g 
          className={`deck-zone deck-2 ${pclass === '2' ? 'active' : ''}`}
          onClick={() => onSelectClass('2')}
        >
          <rect x="70" y="85" width="370" height="20" />
          <text x="255" y="99" textAnchor="middle" className="deck-text">2 КЛАСС (КАЮТЫ СРЕДНИЕ)</text>
        </g>

        {/* ПАЛУБА 3 КЛАССА (НИЖНЯЯ / ТРЮМ) */}
        <g 
          className={`deck-zone deck-3 ${pclass === '3' ? 'active' : ''}`}
          onClick={() => onSelectClass('3')}
        >
          <rect x="50" y="105" width="400" height="18" />
          <text x="250" y="118" textAnchor="middle" className="deck-text">3 КЛАСС (ЭКОНОМ & ТРЮМ)</text>
        </g>

        {/* Иллюминаторы */}
        <circle cx="80" cy="114" r="2" fill="#fef08a" opacity="0.6" />
        <circle cx="120" cy="114" r="2" fill="#fef08a" opacity="0.6" />
        <circle cx="160" cy="114" r="2" fill="#fef08a" opacity="0.6" />
        <circle cx="200" cy="114" r="2" fill="#fef08a" opacity="0.6" />
        <circle cx="240" cy="114" r="2" fill="#fef08a" opacity="0.6" />
        <circle cx="280" cy="114" r="2" fill="#fef08a" opacity="0.6" />
        <circle cx="320" cy="114" r="2" fill="#fef08a" opacity="0.6" />
        <circle cx="360" cy="114" r="2" fill="#fef08a" opacity="0.6" />

        {/* Ватерлиния / Волны */}
        <path d="M 10 126 Q 30 122, 50 126 T 90 126 T 130 126 T 170 126 T 210 126 T 250 126 T 290 126 T 330 126 T 370 126 T 410 126 T 450 126 T 490 126" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.5" />
      </svg>

      <div className="ship-hint">Нажмите на нужную палубу корабля для выбора класса</div>
    </div>
  );
}