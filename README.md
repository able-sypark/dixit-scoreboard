# Dixit Scoreboard

Dixit 보드게임 점수판 웹 애플리케이션

https://able-sypark.github.io/dixit-scoreboard

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Hosted_on_GitHub_Pages-181717?style=flat&logo=github&logoColor=white)

- [주요 명령어](#주요-명령어)
- [프로젝트 초기화](#프로젝트-초기화)
- [개발 서버 실행](#개발-서버-실행)
- [배포 설정, 빌드, 테스트](#배포-설정-빌드-테스트)
- [배포 실행](#배포-실행)

## 주요 명령어

```bash
npm run dev # 개발 서버 실행
npm run build # 빌드
serve -s dist # 빌드된 파일 로컬 테스트
npm run deploy # github pages 배포
```

## 프로젝트 초기화

Vite로 React 프로젝트 생성

```bash
npm create vite@latest dixit-scoreboard --template react
cd dixit-scoreboard
```

의존성 설치

```bash
npm install
```

## 개발 서버 실행

```bash
npm run dev
```

## 배포 설정, 빌드, 테스트

### `vite.config.js` 설정

`vite.config.js` 파일에서 `base` 값을 GitHub 저장소 이름으로 설정

```js
export default {
  base: "/dixit-scoreboard/", // GitHub Pages 서브디렉토리 경로
  // (참고) 빌드 테스트(serve -s dist) 시엔 주석 처리하여 로컬에서 경로 문제를 방지
};
```

### `package.json` 수정

`homepage`, `predeploy`, `deploy` 스크립트 추가

```json
"homepage": "https://able-sypark.github.io/dixit-scoreboard",  // GitHub Pages URL
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 프로젝트 빌드

```bash
npm run build
```

### 빌드 테스트

로컬 서버에서 빌드된 파일 서빙

```bash
serve -s dist
```

### GitHub Pages 배포

`gh-pages` 설치

```bash
npm install gh-pages --save-dev
```

(참고) GitHub Pages로 직접 배포

```bash
gh-pages -d dist
```

## 배포 실행

```bash
npm run deploy
```

배포 완료 후 `https://able-sypark.github.io/dixit-scoreboard`에서 확인

---
