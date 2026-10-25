# DuDoong-Front

공연 티켓팅 플랫폼 **DuDoong**의 프론트엔드 모노레포.

## 기술 스택

| 레이어 | Ticket App (사용자) | Admin App (관리자) | Shared |
|--------|--------------------|--------------------|--------|
| 프레임워크 | Next.js 13 (Pages Router) | Vite 4 + React Router v6 | - |
| 상태 관리 | Recoil 0.7 | Recoil 0.7 | - |
| 서버 상태 | TanStack React Query v4 | TanStack React Query v4 | `useInfiniteQueries` 훅 |
| 스타일링 | Emotion (CSS-in-JS) | Emotion + Ant Design 5 | `@dudoong/ui` 테마 |
| HTTP | Axios 1.2 | Axios (자체 `axiosPrivate`; `BASE_URL`은 `@dudoong/utils`) | `axiosPublic` |
| 인증 | Kakao OAuth + JWT | Kakao OAuth + JWT | `AuthApi` |
| 결제 | Toss Payments Widget SDK | - | - |
| 패키지 매니저 | Yarn 3 (Berry) | - | - |
| 언어 | TypeScript 4.9 | TypeScript 4.9 | TypeScript 4.9 |

## 프로젝트 구조

```
DuDoong-Front/
├── apps/
│   ├── ticket/              # Next.js 13 - 사용자 대상 티켓팅 앱
│   │   ├── pages/           # 파일 기반 라우팅
│   │   └── src/
│   │       ├── components/  # 기능별 컴포넌트 (events, book, mypage, pay 등)
│   │       ├── lib/apis/    # API 클라이언트 (axiosPrivate + 401 인터셉터)
│   │       ├── lib/hooks/   # 커스텀 훅
│   │       ├── lib/utils/   # GA, 인증 유틸
│   │       ├── lib/constants/ # React Query 키
│   │       ├── store/       # Recoil atoms (auth, overlay)
│   │       └── assets/      # 정적 에셋
│   │
│   └── admin/               # Vite SPA - 관리자 대시보드
│       └── src/
│           ├── pages/       # 페이지 컴포넌트 (events, hosts, new, common)
│           ├── components/  # 기능별 컴포넌트
│           ├── lib/apis/    # API 클라이언트 (axiosPrivate, 인터셉터 없음)
│           ├── lib/hooks/   # 커스텀 훅 (useApiError, auth)
│           ├── lib/error/   # 도메인별 에러 코드 매핑
│           ├── lib/utils/   # 쿠키, 시간, 이미지 유틸
│           └── store/       # Recoil atoms
│
├── shared/
│   ├── ui/                  # @dudoong/ui - 디자인 시스템 (30+ 컴포넌트)
│   │   ├── src/components/  # Button, Modal, Text, TextField 등
│   │   ├── src/theme/       # palette, typography, media queries
│   │   └── .storybook/      # Storybook 설정
│   │
│   └── utils/               # @dudoong/utils - 공유 로직
│       └── src/
│           ├── apis/        # axiosPublic, AuthApi, EventApi
│           ├── hooks/       # useInfiniteQueries, useInput 등
│           └── utils/       # loginFc, parseDate, calcMoney
│
├── Dockerfile.ticket        # Ticket 앱 Docker 빌드
├── Dockerfile.admin         # Admin 앱 Docker 빌드
├── nginx/                   # SPA 서빙용 Nginx 설정
└── .github/workflows/       # CI/CD 파이프라인
```

## 개발 시작

```bash
# 의존성 설치
yarn install

# Ticket 앱 개발 서버 (localhost:3000)
yarn ticket

# Admin 앱 개발 서버 (localhost:5173)
yarn admin

# Storybook (디자인 시스템)
yarn storybook

# 빌드
yarn ticket:build
yarn admin:build
```

## 주요 컨벤션

### API 패턴
- 모든 API 응답은 `response.data.data`로 래핑됨 (백엔드 공통 응답 구조)
- Public 엔드포인트: `axiosPublic` (shared/utils)
- Private 엔드포인트: 앱별 `axiosPrivate` (인증 헤더 + 쿠키)
- Ticket 앱의 `axiosPrivate`는 401 시 자동 토큰 갱신 인터셉터 포함
- Admin 앱은 컴포넌트 레벨에서 `useRefresh` 훅으로 토큰 갱신 처리

### 인증 플로우
1. 카카오 OAuth → `AuthApi.OAUTH_LINK()` → 카카오 로그인 페이지
2. 콜백 → `OAUTH_TOKEN()` → `OAUTH_VALID()` → 로그인/회원가입
3. JWT (access + refresh) 토큰을 쿠키에 저장
4. Ticket 앱: SSR `getInitialProps`에서 서버사이드 토큰 리프레시
5. Admin 앱: `RequireAuth` / `RefuseAuth` 라우트 가드

### 스타일링
- Emotion `css` prop (jsxImportSource 설정)
- 2-breakpoint 반응형: `media.pc` (768px+), `media.mobile` (<768px)
- 컬러 팔레트: 퍼플 기반 (`main_100`~`main_500`), 민트 포인트
- 폰트: Pretendard (본문), Gmarket Sans (디스플레이)

### 상태 관리
- Recoil: 인증 상태, 글로벌 오버레이 등 클라이언트 상태
- React Query: 서버 상태 (API 데이터 캐싱, 무한 스크롤)

## 빌드 & 배포

- **Ticket**: Docker (Node 18 Alpine) → DockerHub (`david0218/dudoong-ticket`)
- **Admin**: Docker → Vite SPA 빌드 → Nginx 서빙 (base path: `/admin/`)
- **CI/CD**: GitHub Actions, semver 태그 트리거 (`Ticket-v*.*.*`, `Admin-v*.*.*`)
- **환경변수**: GitHub Secrets → `.env` 파일 주입

## 세부 아키텍처

`docs/ARCHITECTURE.md` 참고 — 전체 페이지, 사용자 플로우, API 명세, 컴포넌트 구조 상세 문서.
