![Frame 4](https://user-images.githubusercontent.com/55226431/221772740-e9946fda-a24c-4b90-8871-4d1d8a340725.png)


<br/><br/>

# 두둥<img src="https://user-images.githubusercontent.com/55226431/221770112-27710500-f49a-4c7b-8765-8b3698566e55.png" align=left width=100>

> 모두를 위한 새로운 공연 라이프, 두둥! • <b>프론트엔드</b> 레포지토리

<br/><br/>


> **두둥은 홍익대학교 컴퓨터 공학과 소속 밴드부 <a href="https://github.com/Gosrock">고스락</a> 에서 만든 서비스에요!**


<br/>


## 1. 서비스 소개

<img width="90%" align=center alt="readme" src="https://user-images.githubusercontent.com/55226431/221773192-5e178d8e-93a4-4a50-821f-3dbd9c9ac759.png">

<br/><br/>

## 2. 사용 스택

<div align="left">
<div>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/Next-000000?style=flat-square&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white">
<img src="https://img.shields.io/badge/Yarn Workspace-2C8EBB?style=flat-square&logo=storybook&logoColor=white">
</div>
<div>
<img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/Recoil-121212?style=flat-square&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Styled-DB7093?style=flat-square&logo=styled-components&logoColor=white">
</div>
<div>
<img src="https://img.shields.io/badge/ESlint-4B32C3?style=flat-square&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white">
<img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=Nginx&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
</div>
</div>

<br/><br/>

## 3. Dudoong.com
- [Storybook](https://gosrock.github.io/DuDoong-Front)
- <b>[랜딩페이지](https://dudoong.com)</b>
- [호스트 어드민 페이지](https://dudoong.com/admin)
- [서비스 소개 노션](https://dudoong.notion.site/c4999331a2aa47299e1c6821a7dee9af)

<div>
<img src="https://user-images.githubusercontent.com/55226431/221772278-78452025-d9df-4676-90e7-ca6d4033ed7e.gif"  width="100%" >
</div>

<br/><br/>

## 4. 프로젝트 구조
yarn workspaces를 이용한 모노레포 구조입니다.

```bash
├── .github #액션 워크플로우 세팅
├── apps
│   ├── admin #어드민 서비스 (Vite)
│   └── ticket #프론트 서비스 (Next)
│
├── shared
│   ├── ui #공용 theme, ui 컴포넌트
│   └── utils #공용 유틸 함수
└── #...configs
```

<br/>

### 시작하기


1. 의존성을 설치합니다.
```
yarn install
```
<br/>

2. `apps` 디렉토리 내부에 있는 서비스별로 env 환경변수를 설정해야 합니다.
외부 api 관련 키들을 환경변수로 관리하고 있습니다.

<br/>

3. 다음과 같이 각 서비스들을 개발환경에서 실행할 수 있습니다.

```
yarn ticket
yarn admin
```

<br/><br/>

## 5. 개발 과정
지속적으로 작성중에 있습니다.

- [모두를 위한 공연 라이프 - 기획과 디자인](https://9yujin.tistory.com/106)
- [프론트엔드 모노레포 구축 삽질기 (1) - 도입 이유, yarn workspaces, berry](https://9yujin.tistory.com/100)
- [프론트엔드 모노레포 구축 삽질기 (2) - 프로젝트 세팅 with Next.js, Vite, storybook, emotion](https://9yujin.tistory.com/101)
- [프론트엔드 모노레포 구축 삽질기 (3) - CICD 배포, Docker, Github Actions](https://9yujin.tistory.com/102?category=1013884)
- [서버 사이드 렌더링(SSR)과 cookie 로그인 정보 다루기](https://www.9yujin.site/devlog/frontend/ssr-230122)
- [선언적인 코드 작성하기](https://9yujin.tistory.com/109)
-[웹 성능 최적화](https://9yujin.tistory.com/116)

<br/><br/>

## 6. 참여자
<table>
    <tr align="center">
        <td><B>Lead•FE•UI/UX<B></td>
        <td><B>Front-end<B></td>
        <td><B>Front-end<B></td>
        <td><B>Front-end<B></td>
        <td><B>Front-end<B></td>
    </tr>
    <tr align="center">
        <td><B>한규진<B></td>
        <td><B>정상훈<B></td>
        <td><B>강나연<B></td>
        <td><B>이한비<B></td>
        <td><B>김유진<B></td>
    </tr>
    <tr align="center">
        <td>
            <img src="https://github.com/9yujin.png?size=100">
            <br>
            <a href="https://github.com/9yujin"><I>9yujin</I></a>
        </td>
        <td>
            <img src="https://github.com/wjdtkdgns.png?size=100" width="100">
            <br>
            <a href="https://github.com/wjdtkdgns"><I>wjdtkdgns</I></a>
        </td>
        <td>
            <img src="https://github.com/kongnayeon.png?size=100" width="100">
            <br>
            <a href="https://github.com/kongnayeon"><I>kongnayeon</I></a>
        </td>
        <td>
            <img src="https://github.com/AlmondBreez3.png?size=100" width="100">
            <br>
            <a href="https://github.com/AlmondBreez3"><I>AlmondBreez3</I></a>
        </td>
        <td>
            <img src="https://github.com/eugene028.png?size=100" width="100">
            <br>
            <a href="https://github.com/eugene028"><I>eugene028</I></a>
        </td>
    </tr>
</table>
