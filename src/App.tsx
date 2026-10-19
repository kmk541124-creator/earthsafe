import { useState } from 'react';
import './App.css';

// ===== 게임 밸런스 상수 (숫자만 바꿔서 난이도 조절 가능) =====
const TECH_GAIN = 10;        // 기술 발전 버튼 1번에 오르는 기술 수치
const TECH_POLLUTION = 11;   // 기술 발전 버튼 1번에 오르는 오염 수치
const LIFE_CLEAN = 15;       // 생활 방식 바꾸기 1번에 내려가는 오염 수치
const MAX = 100;             // 기술·오염 모두 100이 끝

// 기술 수치(10 단위)에 따라 보여줄 시대 이름 — 마지막이 인공태양
const TECH_STAGES = [
  '원시 시대',
  '석탄 발전',
  '증기 기관',
  '전기 보급',
  '석유 산업',
  '자동차 대중화',
  '반도체',
  '인공지능',
  '핵융합 연구',
  '핵융합 실험로',
  '인공태양 완성',
];

// 게임 상태: 진행 중 / 승리 / 패배
type Status = 'playing' | 'win' | 'lose';

function App() {
  const [tech, setTech] = useState(0);                 // 현재 기술 수치 (0~100)
  const [pollution, setPollution] = useState(0);       // 현재 환경 오염 수치 (0~100)
  const [status, setStatus] = useState<Status>('playing'); // 게임 진행 상태
  const [log, setLog] = useState<string[]>(['지구의 미래가 당신의 선택에 달려 있습니다.']); // 행동 기록

  // 기록을 맨 위에 추가하는 함수
  const addLog = (message: string) => {
    setLog((prev) => [message, ...prev].slice(0, 8));
  };

  // 기술 발전 버튼
  const developTech = () => {
    const nextTech = Math.min(tech + TECH_GAIN, MAX);
    const nextPollution = pollution + TECH_POLLUTION;

    setTech(nextTech);
    setPollution(Math.min(nextPollution, MAX));

    // 오염이 먼저 100을 넘으면, 같은 순간 인공태양이 완성돼도 패배
    if (nextPollution >= MAX) {
      setStatus('lose');
      addLog(
        nextTech >= MAX
          ? '인공태양을 발명했지만… 지구는 이미 버틸 수 없었습니다.'
          : '오염이 한계를 넘었습니다. 지구가 멸망했습니다.'
      );
      return;
    }

    if (nextTech >= MAX) {
      setStatus('win');
      addLog('인공태양 완성! 깨끗한 지구에서 무한한 에너지를 얻었습니다.');
      return;
    }

    addLog(`기술 발전 → ${TECH_STAGES[nextTech / 10]} (오염 +${TECH_POLLUTION})`);
  };

  // 생활 방식 바꾸기 버튼
  const changeLifestyle = () => {
    const nextPollution = Math.max(pollution - LIFE_CLEAN, 0);
    setPollution(nextPollution);
    addLog(`생활 방식 개선 (오염 -${pollution - nextPollution})`);
  };

  // 처음부터 다시
  const reset = () => {
    setTech(0);
    setPollution(0);
    setStatus('playing');
    setLog(['지구의 미래가 당신의 선택에 달려 있습니다.']);
  };

  // 오염 정도에 따라 프로그레스 색상 단계 결정
  const level = pollution < 40 ? 'safe' : pollution < 70 ? 'warn' : 'danger';
  const isOver = status !== 'playing';

  return (
    <div className={`app ${level} ${status}`}>
      <h1>Earth Safe</h1>

      {/* 환경 오염 수치 프로그레스 */}
      <section className="meter">
        <div className="meter-head">
          <span>환경 오염 수치</span>
          <strong>{pollution}%</strong>
        </div>
        <div className="bar">
          <div className="fill pollution" style={{ width: `${pollution}%` }} />
        </div>
      </section>

      {/* 기술 수치 프로그레스 */}
      <section className="meter">
        <div className="meter-head">
          <span>기술 수준 · {TECH_STAGES[Math.floor(tech / 10)]}</span>
          <strong>{tech}%</strong>
        </div>
        <div className="bar">
          <div className="fill tech" style={{ width: `${tech}%` }} />
        </div>
      </section>

      {/* 지구 */}
      <div className="earth" aria-hidden="true">
        {status === 'lose' ? '💥' : status === 'win' ? '☀️' : '🌍'}
      </div>

      {/* 버튼 */}
      <div className="buttons">
        <button className="btn tech-btn" onClick={developTech} disabled={isOver}>
          기술 발전
          <small>기술 +{TECH_GAIN} · 오염 +{TECH_POLLUTION}</small>
        </button>
        <button className="btn life-btn" onClick={changeLifestyle} disabled={isOver}>
          생활 방식 바꾸기
          <small>오염 -{LIFE_CLEAN}</small>
        </button>
      </div>

      {/* 결과 */}
      {isOver && (
        <div className="result">
          <h2>{status === 'win' ? '지구를 지켰습니다!' : '지구가 멸망했습니다'}</h2>
          <p>
            {status === 'win'
              ? '기술 발전과 생활 방식의 균형으로 인공태양을 완성했습니다.'
              : '기술 발전만으로는 지구를 살릴 수 없습니다.'}
          </p>
          <button className="btn" onClick={reset}>다시 하기</button>
        </div>
      )}

      {/* 기록 */}
      <ul className="log">
        {log.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
