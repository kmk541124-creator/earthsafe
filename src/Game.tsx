import { useState } from 'react';
import './Game.css';

function Game() {
  const [tech, setTech] = useState(0);
  const [pollution, setPollution] = useState(0);
  const [result, setResult] = useState('');

  const develop = () => {
    const t = tech + 10;
    const p = pollution + 11;
    setTech(t);
    setPollution(Math.min(p, 100));

    if (p >= 100 && t >= 100) setResult('인공태양은 완성했지만 지구가 버티지 못했다.');
    else if (p >= 100) setResult('오염이 한계를 넘었다. 지구가 버티지 못했다.');
    else if (t >= 100) setResult('지구를 지키면서 인공태양을 완성했다.');
  };

  const changeLife = () => {
    setPollution(Math.max(pollution - 15, 0));
    setTech(tech - 10)
  };

  const reset = () => {
    setTech(0);
    setPollution(0);
    setResult('');
  };

  const color = pollution < 50 ? 'green' : pollution < 80 ? 'orange' : 'red';
  const over = result !== '';

  return (
    <div className="game">
      <h2>지구를 지키며 인공태양 만들기</h2>

      <div className="gauge">
        <div className="label">
          <span>환경 오염</span>
          <span>{pollution}%</span>
        </div>
        <div className="bar">
          <div className={`fill ${color}`} style={{ width: `${pollution}%` }} />
        </div>
      </div>

      <div className="gauge">
        <div className="label">
          <span>기술</span>
          <span>{tech}%</span>
        </div>
        <div className="bar">
          <div className="fill blue" style={{ width: `${tech}%` }} />
        </div>
      </div>

      {!over && pollution >= 80 && <p className="warning">오염이 위험 수준이다.</p>}

      <div className="buttons">
        <button onClick={develop} disabled={over}>기술 발전</button>
        <button onClick={changeLife} disabled={over}>생활 방식 바꾸기</button>
      </div>

      {over && (
        <div className="result">
          <p>{result}</p>
          <button onClick={reset}>다시 하기</button>
        </div>
      )}
    </div>
  );
}

export default Game;
