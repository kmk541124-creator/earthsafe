import { useState } from 'react';
import Game from './Game';
import Cards from './Cards';
import './App.css';

function App() {
  const [page, setPage] = useState<'game' | 'cards'>('game');

  return (
    <div>
      <header className="header">
        <h1>Earth Safe</h1>
        <nav>
          <button className={page === 'game' ? 'active' : ''} onClick={() => setPage('game')}>
            게임
          </button>
          <button className={page === 'cards' ? 'active' : ''} onClick={() => setPage('cards')}>
            교육 카드
          </button>
        </nav>
      </header>

      {page === 'game' ? <Game /> : <Cards />}
    </div>
  );
}

export default App;
