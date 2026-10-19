# Earth Safe

React를 간단하게 연습하려고 만든 정적 웹 게임입니다.

기술을 발전시키면 환경 오염도 함께 올라갑니다. 기술 발전만 계속 누르면 인공태양을 완성하는 순간 오염이 100%를 넘어 지구가 버티지 못합니다. 생활 방식을 바꿔 오염을 낮추면서 기술을 올려야 지구가 안전한 상태에서 인공태양을 완성할 수 있습니다.

사이트: https://kmk541124-creator.github.io/earthsafe/

## 게임 방법

- 기술 발전: 기술 +10%, 환경 오염 +11%
- 생활 방식 바꾸기: 환경 오염 -15%
- 오염이 100%가 되기 전에 기술을 100%로 만들면 성공입니다.

위쪽의 교육 카드 메뉴에서는 인공태양, 온실가스, 탄소 중립 같은 내용을 카드로 볼 수 있습니다.

## 실행 방법

```
npm install
npm start
```

브라우저에서 http://localhost:3000 으로 접속합니다.

혹은 https://kmk541124-creator.github.io/earthsafe/ 로 접속하면 바로 볼 수 있습니다.

## 빌드

```
npm run build
```

`build` 폴더에 정적 파일이 만들어집니다. main 브랜치에 push하면 GitHub Actions가 빌드해서 GitHub Pages에 올립니다.

## 사용한 기술

- React 19
- TypeScript
- Create React App
- GitHub Actions, GitHub Pages
