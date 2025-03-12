# 진달램⭐

<img width="724" alt="image" src="public/movies/프로젝트-소개-영상.gif">

<br />
<br />

<br />

## 🎬 시연 영상

- [Youtube](https://youtu.be/Jl60d_1_jno?si=4a61lTGiwlmOc2Ui)

<br />

## ✨ 프로젝트 소개

진달램은 바쁜 일상 속에서 휴식을 원하는 유저들을 위해 오프라인 모임을 탐색하고 참여하며, 직접 모임을 개설하고 리뷰를 남길 수 있는 웹/앱 기반 반응형 플랫폼입니다.

🔹 주요 기능
<br />
✅ 모임 탐색 및 참여: 다양한 카테고리의 모임을 확인하고 자유롭게 참여 가능
<br />
✅ 모임 개설: 회원이라면 누구나 쉽게 오프라인 모임을 생성 및 관리
<br />
✅ 리뷰 작성: 모임 참여 후 경험을 공유하고 피드백 제공
<br />
✅ 반응형 UI: 웹 및 모바일 환경에서 최적화된 사용자 경험 제공
<br />
✅ 로그인/비로그인 지원: 토큰 기반 인증 시스템을 활용하여 로그인 없이도 일부 기능 이용 가능

<br>

## 🛠️ 기술 스택

⚛️ 프론트엔드

<div> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white"> <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=React%20Query&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white"> </div>

<br />
🚀 배포 및 CI/CD
<div> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"> <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=GitHub%20Actions&logoColor=white"> </div>
<br />

🤝 협업 도구

<div> <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white"> <img src="https://img.shields.io/badge/Zep-5C16C5?style=for-the-badge&logoColor=white"> </div>

<br>

## 👥 팀원 구성

## 구성원 역할

| 담당자 | 업무                                                                                                                               | 비고                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 심우석 | 팀장 </br> 모임 상세 페이지 담당 </br> 페이지네이션 </br> 찜하기 기능 </br> 공통 컴포넌트 제작                                     | 지라 툴 관리 </br> PWA 환경설정 </br>프로젝트 중간 발표                              |
| 박준성 | 모임 찾기 페이지 담당(홈 페이지) </br> 모임 만들기 기능 담당 </br> 프로젝트 초기 설정 및 폴더 구조 설정 </br> CI/CD 배포 담당 개발 | 리드미 작성 </br>무한스크롤 구현 </br> 패럴렐 라우트 모달 기능 구현                  |
| 박채은 | 리뷰 페이지 담당 </br> 페이지 별 네비게이션 담당 </br> 데이터 필터링 컴포넌트 담당 </br> 서기 담당                                 | 무한스크롤 구현 </br>페이지별 필터링 관리 </br> PPT 발표자료 준비 </br> 시연영상     |
| 황선영 | 로그인 페이지 담당 </br> 회원가입 페이지 담당 </br> GNB 담당 </br> 참여인원 프로필 모음 컴포넌트 개발                              | Zustand persist를 사용하여 유저 관리 </br> 로그인, 회원가입 유효성 검사 </br>        |
| 안예지 | 마이페이지 담당 </br> 찜한 모임 페이지 담당 </br> 프로필 수정 기능 담당 </br> 리뷰 작성 기능 담당 </br> 스크럼 마스터 담당 개발    | api 공통화 </br> 유저 로직 공통화 </br> 모달 컴포넌트 공통화 </br> PPT 발표자료 준비 |

<br />

<br>

## 📖 페이지별 기능

<br>

### [메인 페이지 기능]

- 비회원 유저가 사이트를 이용할 수 있고, 모임 상세페이지를 확인할 수 있습니다.
- 비회원/회원으로 찜하기 기능을 사용할 수 있습니다.
- 모임 만들기 기능을 하려면 비로그인 시 모달창이 생성되어 로그인 페이지로 이동합니다.
- 로그인 상태라면 모임 만들기 기능을 할 수 있습니다.
- 필터링 기능을 사용할 수 있습니다.
- 데이터베이스에 저장된 데이터를 가져올 때 초기 데이터 5개는 SSR 방식으로 데이터 패칭 후 그 이후 데이터는 CSR 방식으로 무한스크롤 기능이 동작됩니다.

| 메인 페이지                                                   |
| ------------------------------------------------------------- |
| <img src="public/movies/메인페이지-기능.gif" width = "700" /> |

<br />

---

<br />
<br />

### [상세 페이지 기능]

- 비회원/회원으로 찜하기 기능을 사용할 수 있습니다.
- 모임을 만든 주최자라면 모임을 취소 혹은 공유를 할 수 있습니다.
- 주최자가 아닌 일반 회원이라면 모임을 확인 후 참여할 수 있습니다.

| 상세 페이지                                                   |
| ------------------------------------------------------------- |
| <img src="public/movies/상세페이지-기능.gif" width = "700" /> |

<br />

---

<br />

### [로그인, 회원가입 페이지 기능]

- 비회원이라면 회원가입 페이지에서 유효성 검사를 마친 후 회원가입을 할 수 있습니다.
- 회원가입을 마친 후 로그인 페이지에서 유효성 검사를 마친 후 로그인을 할 수 있습니다.

| 로그인 페이지                                                             |
| ------------------------------------------------------------------------- |
| <img src="public/movies/로그인-회원가입-페이지-기능.gif" width = "700" /> |

<br />
