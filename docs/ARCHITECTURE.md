# DuDoong-Front 아키텍처 상세 문서

## 목차

1. [페이지 & 라우팅](#1-페이지--라우팅)
2. [사용자 플로우](#2-사용자-플로우)
3. [API 엔드포인트 전체 목록](#3-api-엔드포인트-전체-목록)
4. [인증 아키텍처](#4-인증-아키텍처)
5. [컴포넌트 아키텍처](#5-컴포넌트-아키텍처)
6. [상태 관리](#6-상태-관리)
7. [디자인 시스템](#7-디자인-시스템)
8. [빌드 & 배포](#8-빌드--배포)
9. [알려진 이슈 & 개선점](#9-알려진-이슈--개선점)

---

## 1. 페이지 & 라우팅

### 1.1 Ticket App (Next.js Pages Router)

사용자 대상 공연 탐색, 티켓 구매, 마이페이지 앱.

| 라우트 | 파일 | 설명 | 인증 필요 |
|--------|------|------|-----------|
| `/` | `pages/index.tsx` | 랜딩 페이지 → Landing 컴포넌트로 리다이렉트 | X |
| `/home` | `pages/home/index.tsx` | 공연 목록/탐색 (이벤트 검색, 무한 스크롤) | X |
| `/events/[eventId]` | `pages/events/[eventId]/index.ts` | 공연 상세 (PC/Mobile 분기, 카카오맵, 티켓 선택) | X |
| `/events/[eventId]/book/option` | `pages/events/[eventId]/book/option.ts` | 티켓 옵션 선택 (주관식/객관식/YN 응답) | O |
| `/events/[eventId]/book/order` | `pages/events/[eventId]/book/order.ts` | 주문서 작성 (쿠폰, 결제수단, 계좌정보) | O |
| `/history` | `pages/history/index.ts` | 주문 내역 목록 (무한 스크롤) | O |
| `/history/[orderId]` | `pages/history/[orderId].ts` | 주문 상세 (결제정보, 환불, 발급 티켓) | O |
| `/history/mycoupon` | `pages/history/mycoupon.ts` | 내 쿠폰 목록 | O |
| `/mypage` | `pages/mypage/index.ts` | 사용자 프로필 | O |
| `/ticket/[id]` | `pages/ticket/[id].ts` | 티켓 표시 (QR 코드 포함) | O |
| `/ticket/qr` | `pages/ticket/qr.ts` | QR 코드 전체 화면 뷰 | O |
| `/pay/confirm` | `pages/pay/confirm.tsx` | 결제 확인 (Toss Payments 연동) | O |
| `/pay/success` | `pages/pay/success.tsx` | 결제 성공 | O |
| `/pay/fail` | `pages/pay/fail.tsx` | 결제 실패 | O |
| `/login/[[...param]]` | `pages/login/[[...param]].ts` | 로그인 (catch-all, 리다이렉트 URL 지원) | X |
| `/kakao/callback` | `pages/kakao/callback.ts` | 카카오 OAuth 콜백 처리 | X |
| `/404` | `pages/404.tsx` | 404 페이지 | X |

### 1.2 Admin App (React Router v6)

관리자용 SPA. Base path: `/admin/`. 모든 주요 페이지는 인증 필수 (`RequireAuth`).

| 라우트 | 컴포넌트 | 설명 |
|--------|----------|------|
| `/` | `Home` | 홈 — 소속 호스트 목록, 최근 이벤트 |
| `/login` | `Login` | 로그인 (인증된 유저 접근 시 `RefuseAuth`로 리다이렉트) |
| `/kakao/callback` | `Callback` | 카카오 OAuth 콜백 |
| `/404` | `NotFound` | 404 페이지 |

**호스트(조직) 관리** — `/hosts/:hostId/*` (AdminMenuLayout 적용)

| 서브라우트 | 컴포넌트 | 설명 |
|-----------|----------|------|
| `/dashboard` | `Dashboard` | 호스트 대시보드 |
| `/info` | `Info` | 호스트 기본 정보 수정 (이름, 설명, 프로필 이미지) |
| `/member` | `Member` | 멤버 관리 (초대, 승인, 거절) |
| `/events` | `Events` | 호스트가 만든 이벤트 목록 |
| `/slack` | `Slack` | Slack 웹훅 연동 설정 |
| `/alliance` | `Alliance` | 제휴(파트너) 관리 |

**이벤트 관리** — `/events/:eventId/*` (AdminMenuLayout 적용)

| 서브라우트 | 컴포넌트 | 설명 |
|-----------|----------|------|
| `/dashboard` | `Dashboard` | 이벤트 대시보드 (체크리스트, 통계, 티켓 판매율) |
| `/info` | `Info` | 이벤트 기본 정보 수정 (이름, 시간, 장소, 카카오맵) |
| `/detail` | `Detail` | 이벤트 상세 소개 수정 (이미지, 마크다운 에디터) |
| `/tickets/*` | `TicketsRouter` | 티켓 아이템 관리 (목록, 생성 — 무료/유료/두둥 티켓) |
| `/options/*` | `OptionsRouter` | 티켓 옵션 관리 (생성, 적용/해제 — 드래그앤드롭) |
| `/guests` | `Guests` | 방문자 관리 (주문 테이블, 승인/거절/취소, 검색) |
| `/qr` | `Qr` | QR 스캐너 (입장 확인, 모바일/PC/풀스크린 모드) |

**생성 마법사** — `/new/*` (AdminNoMenuLayout 적용)

| 서브라우트 | 컴포넌트 | 설명 |
|-----------|----------|------|
| `/events/:step` | `Events` | 이벤트 생성 (step 1: 호스트 선택, step 2: 시간 설정) |
| `/hosts` | `Hosts` | 호스트 생성 (이름, 설명, 연락처, 프로필) |

---

## 2. 사용자 플로우

### 2.1 티켓 구매 플로우 (Ticket App)

```
[랜딩(/)] → [공연 탐색(/home)] → [공연 상세(/events/:id)]
                                        │
                                   티켓 선택 (SelectTicket)
                                        │
                              ┌─────────┴─────────┐
                              │                     │
                     옵션 있는 티켓            옵션 없는 티켓
                              │                     │
                   [옵션 선택(/book/option)]         │
                      주관식/YN/객관식 응답          │
                              │                     │
                              └─────────┬─────────┘
                                        │
                              [주문서(/book/order)]
                                 쿠폰 선택 (선택)
                                 결제수단 선택
                              ┌─────────┴─────────┐
                              │                     │
                         무료 티켓              유료 티켓
                              │                     │
                   OrderApi.POST_ORDER_FREE    Toss Payments 위젯
                              │                     │
                              │              [결제 확인(/pay/confirm)]
                              │                     │
                              │              OrderApi.CONFIRM_ORDER
                              │                     │
                              └─────────┬─────────┘
                                        │
                               [결제 성공(/pay/success)]
                                        │
                              [주문 내역(/history)]
                                        │
                              [티켓 보기(/ticket/:id)]
                                   QR 코드 표시
```

### 2.2 로그인/회원가입 플로우

```
[로그인 버튼 클릭]
      │
AuthApi.OAUTH_LINK() → 카카오 OAuth URL 획득
      │
[카카오 로그인 페이지] (외부)
      │
[콜백(/kakao/callback)] ← code 파라미터 수신
      │
AuthApi.OAUTH_TOKEN(code) → idToken 획득
      │
AuthApi.OAUTH_VALID(idToken)
      │
┌─────┴──────┐
│             │
기존 회원     신규 회원
│             │
OAUTH_LOGIN   OAUTH_INFO → 프로필 정보 획득
│             │
│             OAUTH_REGISTER → 회원가입 + 로그인
│             │
└─────┬──────┘
      │
JWT 토큰 수신 (accessToken + refreshToken)
      │
쿠키 저장 → Recoil authState 업데이트
      │
callbackUrl로 리다이렉트
```

### 2.3 이벤트 관리 플로우 (Admin App)

```
[홈(/)] — 호스트 목록 표시
    │
    ├── [호스트 생성(/new/hosts)] — 이름, 설명 입력 → HostApi.ADD_HOSTS
    │
    └── [호스트 선택] → [호스트 대시보드(/hosts/:id/dashboard)]
            │
            ├── 호스트 정보 수정 (/info) → HostApi.PATCH_HOST_PROFILE
            ├── 멤버 관리 (/member) → 초대/승인/거절
            ├── Slack 연동 (/slack) → HostApi.PATCH_HOST_SLACK
            │
            └── [이벤트 생성(/new/events/1)]
                    Step 1: 호스트 선택
                    Step 2: 이벤트명 + 시간 설정
                    → EventApi.POST_EVENT
                         │
                    [이벤트 대시보드(/events/:id/dashboard)]
                    체크리스트 + 통계
                         │
                    ┌────┼────┬────┬────┬────┐
                    │    │    │    │    │    │
                  info detail tickets options guests qr
                    │    │    │    │    │    │
                  기본  상세  티켓   옵션  방문자 QR
                  정보  소개  생성   관리  관리  스캔
                  수정  수정  관리         입장확인
```

### 2.4 주문 관리 플로우 (Admin)

```
[방문자 관리(/events/:id/guests)]
      │
   주문 테이블 (GuestTable + Ant Design Table)
   필터: orderStage (승인대기/확정/취소됨)
   검색: 이름/전화번호
      │
   ┌──┴──┬──────┬──────┐
   │     │      │      │
 승인  거절   취소   상세보기
   │     │      │      │
 POST_  POST_  POST_  GET_ORDER_
 APPROVE REFUSE CANCEL DETAIL
```

---

## 3. API 엔드포인트 전체 목록

### 3.1 Shared (`@dudoong/utils`) — 인증 불필요

| API | 메서드 | 엔드포인트 | 설명 | 사용처 |
|-----|--------|-----------|------|--------|
| `AuthApi.REFRESH` | POST | `/auth/token/refresh?token={refreshToken}` | 토큰 갱신 | 양쪽 앱 |
| `AuthApi.OAUTH_LINK` | GET | `/auth/oauth/kakao/link` | 카카오 OAuth URL 획득 | 양쪽 앱 |
| `AuthApi.OAUTH_TOKEN` | GET | `/auth/oauth/kakao?code={code}` | 인가코드 → idToken 교환 | 양쪽 앱 |
| `AuthApi.OAUTH_VALID` | GET | `/auth/oauth/kakao/register/valid?id_token={idToken}` | 기존 회원 여부 확인 | 양쪽 앱 |
| `AuthApi.OAUTH_INFO` | POST | `/auth/oauth/kakao/info?access_token={accessToken}` | 카카오 프로필 정보 조회 | 양쪽 앱 |
| `AuthApi.OAUTH_REGISTER` | POST | `/auth/oauth/kakao/register?id_token={idToken}` | 신규 회원가입 (body: `OauthInfoResponse` 프로필 데이터) | 양쪽 앱 |
| `AuthApi.OAUTH_LOGIN` | POST | `/auth/oauth/kakao/login?id_token={idToken}` | 기존 회원 로그인 | 양쪽 앱 |
| `EventApi.GET_EVENT_DETAIL` | GET | `/events/{eventId}` | 이벤트 상세 조회 (공개) | Ticket |

### 3.2 Ticket App — 사용자 대상 API

**이벤트 (Event)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `EventApi.GET_EVENTS_SEARCH` | GET | `/events/search?keyword={}&page={}&size={}` | 이벤트 검색 (무한 스크롤) |

**주문 (Order)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `OrderApi.CREATE_ORDER` | POST | `/orders/` | 주문 생성 (카트 → 주문 전환) |
| `OrderApi.POST_ORDER_FREE` | POST | `/orders/{order_uuid}/free` | 무료 티켓 주문 확정 |
| `OrderApi.CONFIRM_ORDER` | POST | `/orders/{order_uuid}/confirm` | 유료 결제 확인 (Toss Payments 연동) |
| `OrderApi.GET_ORDERS` | GET | `/orders/?showing={}&page={}&size={}&sort={}` | 주문 목록 조회 (무한 스크롤) |
| `OrderApi.GET_RECENT_ORDER` | GET | `/orders/recent` | 최근 주문 조회 |
| `OrderApi.GET_ORDERS_DETAIL` | GET | `/orders/{order_uuid}/` | 주문 상세 조회 |
| `OrderApi.GET_ORDERS_TICKETS` | GET | `/orders/{order_uuid}/tickets` | 주문별 발급 티켓 조회 |
| `OrderApi.POST_REFUND` | POST | `/orders/{order_uuid}/refund` | 환불 요청 |

**장바구니 (Cart)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `CartApi.ADD_CARTLINE` | POST | `/carts` | 장바구니에 티켓 추가 |
| `CartApi.RECENT_CARTLINE` | GET | `/carts/recent` | 최근 장바구니 조회 |

**댓글 (Comment)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `CommentApi.GET_COMMENTS` | GET | `/events/{eventId}/comments?page={}&size={}&sort={}` | 이벤트 댓글 목록 (무한 스크롤) |
| `CommentApi.POST_COMMENTS` | POST | `/events/{eventId}/comments` | 댓글 작성 |

**티켓 (Ticket)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `TicketApi.GET_TICKETITEMS` | GET | `/events/{eventId}/ticketItems` | 이벤트 티켓 아이템 목록 (공개) |
| `TicketApi.GET_TICKETITEM_OPTIONS` | GET | `/events/{eventId}/ticketItems/{ticketItemId}/options` | 티켓 옵션 조회 |
| `TicketApi.GET_ISSUEDTICKETS` | GET | `/issuedTickets/{uuid}` | 발급 티켓 상세 조회 |

**사용자 (User)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `UserApi.GET_MY_INFO` | GET | `/users/me` | 내 정보 조회 |
| `UserApi.REFRESH` | POST | `/auth/token/refresh?token={refreshToken}` | 토큰 갱신 (`axiosPrivate` 사용, SSR `getInitialProps`에서 호출) |

**인증 (Ticket 전용 — `apps/ticket/src/lib/apis/axios.ts`)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `AuthAPi.OAUTH_LOGOUT` | POST | `/auth/logout` | 로그아웃 |
| `AuthAPi.OAUTH_DELETE` | DELETE | `/auth/me` | 회원 탈퇴 |

### 3.3 Admin App — 관리자 API

**이벤트 (Event)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `EventApi.GET_EVENTS` | GET | `/events?page={}&size={}&sort={}` | 이벤트 목록 (무한 스크롤) |
| `EventApi.GET_EVENT_DETAIL` | GET | `/events/{eventId}` | 이벤트 상세 조회 |
| `EventApi.POST_EVENT` | POST | `/events` | 이벤트 생성 |
| `EventApi.GET_EVENT_CHECKLIST` | GET | `/events/{eventId}/checklist` | 이벤트 준비 체크리스트 |
| `EventApi.GET_EVENT_STATISTICS` | GET | `/events/{eventId}/statistics` | 대시보드 통계 (판매량, 매출) |
| `EventApi.PATCH_EVENT_DELETE` | PATCH | `/events/{eventId}/delete` | 이벤트 삭제 (soft delete) |
| `EventApi.PATCH_EVENT_OPEN` | PATCH | `/events/{eventId}/open` | 이벤트 오픈 (판매 시작) |
| `EventApi.PATCH_EVENT_STATUS` | PATCH | `/events/{eventId}/status` | 이벤트 상태 변경 |
| `EventApi.POST_EVENT_IMAGE` | POST | `/events/{eventId}/images?imageFileExtension={}` | 이벤트 이미지 업로드 URL 발급 |
| `EventApi.PATCH_EVENT_DETAIL` | PATCH | `/events/{eventId}/details` | 이벤트 상세 소개 수정 |
| `EventApi.PATCH_EVENT_BASIC` | PATCH | `/events/{eventId}/basic` | 이벤트 기본 정보 수정 |
| `EventApi.PATCH_EVENT_ISSUEDTICKET` | PATCH | `/events/{eventId}/issuedTickets/{uuid}` | 발급 티켓 상태 변경 (QR 입장 확인) |

**호스트 (Host)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `HostApi.GET_HOSTS` | GET | `/hosts?page={}&size={}&sort={}` | 호스트 목록 |
| `HostApi.GET_HOST_DETAIL` | GET | `/hosts/{hostId}` | 호스트 상세 |
| `HostApi.ADD_HOSTS` | POST | `/hosts` | 호스트 생성 |
| `HostApi.PATCH_HOST_PROFILE` | PATCH | `/hosts/{hostId}/profile` | 호스트 프로필 수정 |
| `HostApi.POST_HOST_IMAGE` | POST | `/hosts/{hostId}/images?imageFileExtension={}` | 호스트 이미지 업로드 URL 발급 |
| `HostApi.PATCH_HOST_SLACK` | PATCH | `/hosts/{hostId}/slack` | Slack 웹훅 설정 |
| `HostApi.GET_HOST_EVENTS` | GET | `/hosts/{hostId}/events` | 호스트의 이벤트 목록 (참고: 페이지네이션 파라미터 선언되어 있으나 실제 요청에 미포함) |
| `HostApi.GET_HOST_INVITE_USER` | GET | `/hosts/{hostId}/invite/users?email={}` | 초대할 유저 검색 |
| `HostApi.POST_HOST_INVITE` | POST | `/hosts/{hostId}/invite` | 멤버 초대 |
| `HostApi.POST_HOST_JOIN` | POST | `/hosts/{hostId}/join` | 초대 수락 |
| `HostApi.POST_HOST_REJECT` | POST | `/hosts/{hostId}/reject` | 초대 거절 |

**주문 (Order)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `OrderApi.GET_ORDERS` | GET | `/events/{eventId}/orders?orderStage={}&searchType={}&searchString={}&page={}&size={}` | 주문 목록 (필터+검색) |
| `OrderApi.POST_ORDER_APPROVE` | POST | `/events/{eventId}/orders/{order_uuid}/approve` | 주문 승인 |
| `OrderApi.POST_ORDER_REFUSE` | POST | `/events/{eventId}/orders/{order_uuid}/refuse` | 주문 거절 |
| `OrderApi.POST_ORDER_CANCEL` | POST | `/events/{eventId}/orders/{order_uuid}/cancel` | 주문 취소 |
| `OrderApi.GET_ORDER_DETAIL` | GET | `/events/{eventId}/orders/{order_uuid}` | 주문 상세 조회 |

**티켓 아이템 (Ticket)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `TicketApi.GET_TICKET_DETAIL` | GET | `/events/{eventId}/ticketItems/admin` | 티켓 아이템 목록 (관리자용) |
| `TicketApi.POST_TICKET` | POST | `/events/{eventId}/ticketItems` | 티켓 아이템 생성 |
| `TicketApi.PATCH_TICKET_DELETE` | PATCH | `/events/{eventId}/ticketItems/{ticketItemId}` | 티켓 아이템 soft delete (응답: 업데이트된 전체 티켓 목록) |
| `TicketApi.GET_ISSUEDTICKETS` | GET | `/events/{eventId}/issuedTickets?page={}&searchString={}&searchType={}&size={}` | 발급 티켓 목록 (검색 포함) |

**티켓 옵션 (Option)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `OptionApi.GET_ALL_OPTION` | GET | `/events/{eventId}/ticketOptions` | 이벤트 전체 옵션 목록 |
| `OptionApi.POST_OPTION` | POST | `/events/{eventId}/ticketOptions` | 옵션 그룹 생성 |
| `OptionApi.PATCH_OPTION_DELETE` | PATCH | `/events/{eventId}/ticketOptions/{optionGroupId}` | 옵션 그룹 삭제 |
| `OptionApi.GET_TICKET_OPTION` | GET | `/events/{eventId}/ticketItems/{ticketItemId}/options` | 티켓별 적용된 옵션 조회 |
| `OptionApi.PATCH_APPLY_OPTION` | PATCH | `/events/{eventId}/ticketItems/{ticketItemId}/option` | 옵션 적용 |
| `OptionApi.PATCH_CANCEL_OPTION` | PATCH | `/events/{eventId}/ticketItems/{ticketItemId}/option/cancel` | 옵션 해제 |
| `OptionApi.GET_EVENTS_APPLIEDOPTIONGROUPS` | GET | `/events/{eventId}/ticketItems/appliedOptionGroups` | 적용된 옵션 그룹 조회 |

**사용자 (User)**

| API | 메서드 | 엔드포인트 | 설명 |
|-----|--------|-----------|------|
| `UserApi.OAUTH_LOGOUT` | POST | `/auth/logout` | 로그아웃 |
| `UserApi.GET_MY_INFO` | GET | `/users/me` | 내 정보 조회 |

---

## 4. 인증 아키텍처

### 4.1 Axios 인스턴스 구조

```
shared/utils/apis/axios.ts
  └── axiosPublic (인증 불필요, 공개 API)
        BASE_URL: localhost → staging.dudoong.com, 프로덕션 → origin/api/v1

apps/ticket/lib/apis/axios.ts
  └── axiosPrivate (인증 필요)
        withCredentials: true
        401 인터셉터: 자동 토큰 갱신 → 요청 재시도
        추가 API: OAUTH_LOGOUT, OAUTH_DELETE

apps/admin/lib/apis/axios.ts
  └── axiosPrivate (인증 필요)
        withCredentials: true
        인터셉터 없음 (컴포넌트 레벨에서 useRefresh로 처리)
```

### 4.2 토큰 관리

| 항목 | Ticket App | Admin App |
|------|-----------|-----------|
| 토큰 저장 | `cookies-next` 라이브러리 | `react-cookie` / `universal-cookie` |
| Access Token | Recoil `authState` + 쿠키 | Recoil `authState` + 쿠키 |
| Refresh Token | 쿠키 (`refreshToken`, `maxAge` 설정) | 쿠키 |
| SSR 갱신 | `_app.getInitialProps`에서 서버사이드 리프레시 | N/A (SPA) |
| 클라이언트 갱신 | Axios 401 인터셉터에서 자동 | `useRefresh` 훅 (수동) |

### 4.3 라우트 가드

**Admin App:**
- `RequireAuth` (`components/shared/auth/RequireAuth.tsx`): `accessToken` 쿠키 확인 → 유저 정보 fetch → Recoil 상태 초기화 → 미인증 시 `/login`
- `RefuseAuth` (`components/shared/auth/RefuseAuth.tsx`): 이미 인증된 유저가 로그인 페이지 접근 시 홈으로 리다이렉트

**Ticket App:**
- 라우트 가드 없음 — SSR `getInitialProps`에서 전역적으로 인증 상태 초기화
- 인증 필요 페이지에서 개별적으로 authState 확인

---

## 5. 컴포넌트 아키텍처

### 5.1 디렉토리 패턴

기능 기반(feature-based) 조직. 도메인별 컴포넌트 + 공유 컴포넌트.

```
components/
├── {도메인}/              # events, book, mypage, pay, home 등
│   ├── index.tsx          # 페이지 최상위 컴포넌트
│   ├── blocks/            # 페이지 섹션별 컴포넌트
│   └── utils/             # 도메인별 훅, 헬퍼
└── shared/                # 공통
    ├── auth/              # 인증 관련 (Login, Callback, RequireAuth)
    ├── layout/            # 레이아웃 (Header, Menu, Breadcrumb)
    ├── overlay/           # 글로벌 오버레이 (Modal, Popup, BottomSheet)
    │   └── content/       # 오버레이 콘텐츠 (Approve, DeleteEvent 등)
    └── component/         # 재사용 UI (SearchInput, HostItem 등)
```

### 5.2 글로벌 오버레이 시스템

Recoil 기반 오버레이 패턴 (양쪽 앱 동일):

```typescript
// store/globalOverlay.ts
overlayState = atom({
  isOpen: boolean,
  content: ReactNode | null
})

// 사용법
setOverlay({ isOpen: true, content: <DeleteEvent /> })

// GlobalOverlay 컴포넌트가 _app.tsx (ticket) / App.tsx (admin)에서 렌더링
```

**Admin 오버레이 콘텐츠:**
- `Approve` — 주문 승인 확인
- `CancelOption` — 옵션 해제 확인
- `CancelOrder` — 주문 취소 확인
- `DeleteEvent` — 이벤트 삭제 확인
- `Invitation` — 멤버 초대
- `PaidTicket` — 유료 티켓 정보
- `Pay` — 결제 정보
- `PostEvent` — 이벤트 공개 확인
- `Register` — 회원가입 안내
- `SaveOption` — 옵션 저장 확인
- `SaveTicket` — 티켓 저장 확인
- `Saved` — 저장 완료
- `TableDetailView` — 테이블 상세 보기

### 5.3 주요 컴포넌트 상세

**Ticket App:**

| 컴포넌트 | 위치 | 역할 |
|----------|------|------|
| `Landing` | `components/home/Landing/` | 랜딩 페이지 (Intro, Feature, Special, Title, Outro 섹션) |
| `Home` | `components/home/Home.tsx` | 이벤트 검색 + 무한 스크롤 목록 |
| `EventDetail` | `components/events/index.tsx` | PC/Mobile 분기, 카카오맵, 댓글, 티켓 선택 |
| `Option` | `components/book/Option.tsx` | 티켓 옵션 폼 (react-hook-form) |
| `Order` | `components/book/Order.tsx` | 주문서 (쿠폰, 결제수단, 가격 계산) |
| `useTossPayments` | `components/book/blocks/order/` | Toss Payments 위젯 연동 훅 |
| `History` | `components/mypage/History.tsx` | 주문 내역 목록 |
| `OrderDetail` | `components/mypage/OrderDetail.tsx` | 주문 상세 + 환불 |
| `TicketList` | `components/mypage/Ticket/` | 발급 티켓 목록 + QR 코드 |
| `TalkList` | `components/events/blocks/Talk/` | 이벤트 댓글 (무한 스크롤) |

**Admin App:**

| 컴포넌트 | 위치 | 역할 |
|----------|------|------|
| `CheckList` | `components/events/dashboard/` | 이벤트 준비 체크리스트 UI |
| `TicketRatio` | `components/events/dashboard/` | 티켓 판매율 시각화 |
| `GuestTable` | `components/events/guests/` | Ant Design Table 기반 방문자 관리 |
| `QrScanner` | `components/events/qr/` | `react-qr-reader` 기반 QR 스캐너 |
| `OptionList/OptionDropArea` | `components/events/options/apply/` | `react-beautiful-dnd` 드래그앤드롭 옵션 적용 |
| `TicketForm` | `components/events/tickets/newtickets/form/` | 티켓 생성 폼 (무료/유료/두둥 분기) |
| `AdminMenuLayout` | `components/shared/layout/` | 사이드 메뉴 + 브레드크럼 레이아웃 |
| `CreateHost` | `components/new/hosts/` | 호스트 생성 폼 |
| `FirstStep/SecondStep` | `components/new/events/` | 이벤트 생성 2단계 마법사 |

---

## 6. 상태 관리

### 6.1 Recoil Atoms

**Ticket App (2개):**

| Atom | 파일 | 타입 | 용도 |
|------|------|------|------|
| `authState` | `store/auth.ts` | `{ isAuthenticated, callbackUrl, accessToken, userProfile }` | 인증 상태 |
| `overlayState` | `store/globalOverlay.ts` | `{ isOpen, content }` | 글로벌 오버레이 |

**Admin App (4개):**

| Atom | 파일 | 타입 | 용도 |
|------|------|------|------|
| `authState` | `store/auth.ts` | `{ isAuthenticated, callbackUrl, accessToken, userProfile }` | 인증 상태 |
| `overlayState` | `store/globalOverlay.ts` | `{ isOpen, content }` | 글로벌 오버레이 |
| `bottomButtonState` | `store/bottomButton.ts` | boolean | 하단 버튼 표시 여부 |
| `soldOptionState` | `store/soldOption.ts` | `OptionGroupResponse \| null` | 선택된 옵션 (티켓 관리) |

### 6.2 React Query 패턴

- **QueryClient 생성**: Ticket은 `useState(() => new QueryClient())` (Next.js SSR 안전), Admin은 `main.tsx`에서 단일 인스턴스
- **에러 핸들링**: Admin은 `queryClient.setDefaultOptions`으로 글로벌 에러 핸들러 (`useApiError`)
- **무한 스크롤**: `useInfiniteQueries` 공유 훅 (`@dudoong/utils`) — `react-intersection-observer` + `useInfiniteQuery` 조합
- **SSR Hydration**: Ticket 앱은 `<Hydrate state={pageProps.dehydratedState}>` 사용

### 6.3 에러 코드 체계 (Admin)

`apps/admin/src/lib/error/` — 백엔드 에러 코드를 사용자 메시지로 매핑:

```
도메인별 에러 세트:
├── eventError.ts    — Event_400_1, Event_403_1 등
├── hostError.ts     — Host_400_1, Host_403_1 등
├── orderError.ts    — Order_400_1 등
├── ticketError.ts   — Ticket_400_1 등
├── optionError.ts   — Option_400_1 등
└── ...

에러 코드 형식: {Domain}_{HttpStatus}_{Index}
```

---

## 7. 디자인 시스템

### 7.1 `@dudoong/ui` 컴포넌트 목록

| 카테고리 | 컴포넌트 | 설명 |
|----------|----------|------|
| **레이아웃** | `Accordion`, `Divider`, `Spacing`, `Footer`, `Header`, `NavBar`, `MenuBar`, `MenuItem` | 구조/네비게이션 |
| **버튼** | `Button`, `ButtonSet`, `SelectButton`, `TagButton`, `ToggleButton`, `Counter` | 인터랙션 |
| **텍스트** | `Text`, `Tag`, `ListHeader` | 텍스트 표시 |
| **입력** | `Input`, `TextArea`, `DatePicker`, `TimePicker` | 폼 입력 |
| **오버레이** | `Modal`, `Popup`, `PopupDropdown`, `Dropdown`, `ProfileDropdown` | 팝업/드롭다운 |
| **프로필** | `Profile`, `ProfileImage` | 사용자/호스트 프로필 |
| **업로드** | `DropZone` | 파일 드래그앤드롭 업로드 |
| **로딩** | `Spinner`, `SyncLoader` | 로딩 인디케이터 |
| **아이콘** | `iconExporter` | SVG 아이콘 관리 |

### 7.2 컬러 팔레트

```
Purple (메인):
  main_100: #F5F0FF  (가장 밝은)
  main_200: #E4D7FF
  main_300: #BEA2FA
  main_400: #9568F6
  main_500: #6B36DC  (가장 진한)

Mint (포인트):
  point_mint: #13E8C2
  sub_mint:   #11CFAE

Red (경고/에러):
  red_100: #FFE5E8
  red_200: #FF5461
  red_300: #F93949

Gray (중립):
  gray_100: #F8F8FA
  gray_200: #E3E4E8
  gray_300: #C7C7CB
  gray_400: #7A7A80
  gray_500: #39393A

기타:
  white:  #FFFFFF
  black:  #121212
  gradient.linear_white: 상→하 흰색 그라데이션
```

### 7.3 타이포그래피

두 가지 폰트 패밀리:
- **Pretendard** — 본문 텍스트 (weight: 400~700)
- **Gmarket Sans** — 디스플레이/강조 텍스트

네이밍 규칙: `{Font}_Header_{size}_{weight}` 또는 `P_Text_{size}_{weight}`

### 7.4 반응형 브레이크포인트

```css
media.pc:     @media (min-width: 768px)
media.mobile: @media (max-width: 767px)
```

- 메인 콘텐츠 최대 너비: `--main-width: 600px`
- PC/Mobile 분기 컴포넌트: `EventDetail`은 `PcPage` / `MobilePage` 별도 구현

---

## 8. 빌드 & 배포

### 8.1 Docker 빌드

**Ticket App (`Dockerfile.ticket`):**
- Base: Node 18 Alpine
- 빌드: Yarn 3 + `next build`
- 서빙: `yarn ticket:start` (Node.js 서버, port 3000)

**Admin App (`Dockerfile.admin`):**
- Base: Node 18 Alpine
- 빌드: `tsc && vite build` → 정적 파일
- 서빙: Nginx (SPA fallback: `try_files $uri /index.html`)
- Base path: `/admin/`

### 8.2 CI/CD (GitHub Actions)

| 워크플로우 | 트리거 | 설명 |
|-----------|--------|------|
| `ticket-deploy.yml` | 태그 `Ticket-v*.*.*` | Ticket 프로덕션 배포 (DockerHub push) |
| `ticket-staging.yml` | - | Ticket 스테이징 배포 |
| `admin-deploy.yml` | 태그 `Admin-v*.*.*` | Admin 프로덕션 배포 |
| `admin-staging.yml` | - | Admin 스테이징 배포 |
| `storybook-deploy.yml` | - | Storybook GitHub Pages 배포 |

### 8.3 환경 설정

- Next.js 이미지 최적화 도메인: `asset.dudoong.com`
- URL Rewrite: `/meta/term`, `/meta/privacy`
- Google Analytics: `GA_TRACKING_ID` (Script 태그로 삽입)
- Google Adsense: `ca-pub-6683895022461371`
- 공유 모듈 Transpile: `@dudoong/ui`, `@dudoong/utils`
- Webpack SVGR 로더: SVG → React 컴포넌트

---

## 9. 알려진 이슈 & 개선점

| 항목 | 위치 | 설명 | 심각도 |
|------|------|------|--------|
| `console.log` 잔류 | `shared/utils/src/hooks/useInfiniteQueries.tsx:41` | `console.log(isLoading)` 프로덕션 노출 | 낮음 |
| `console.log` 잔류 | `apps/admin/src/pages/events/index.tsx:23` | `console.log(status)` | 낮음 |
| lint-staged `.ts` 누락 | `package.json:21` | `.ts` 파일이 pre-commit 린트 대상에서 빠짐 | 낮음 |
| Admin axios 인터셉터 미구현 | `apps/admin/src/lib/apis/axios.ts` | 401 자동 토큰 갱신 없음 (Ticket과 비대칭) | 중간 |
| `useInfiniteQueries` JSX 반환 | `shared/utils/src/hooks/useInfiniteQueries.tsx` | 데이터 훅이 JSX를 직접 반환 — 재사용성 저하 | 낮음 |
| `@font-face` 주석 처리 | `shared/ui/src/theme/global.ts:7-118` | 폰트 선언 전체 주석 — 외부 CDN 의존 | 정보 |
| `AuthStateType` 중복 | `ticket/store/auth.ts`, `admin/store/auth.ts` | 동일 타입 양쪽에 별도 정의 | 낮음 |
| SSR Static Optimization 비활성 | `ticket/pages/_app.tsx` | `getInitialProps` 사용으로 모든 페이지 SSR 강제 | 정보 |
| 프론트엔드 테스트 없음 | 전체 | Jest/Vitest 미설정, 유닛/통합 테스트 0개 | 중간 |
