# 맛포서울 (tasty for Seoul)

서울 현지인이 직접 발로 뛰며 찾아낸 진짜 맛집들을 소개하는 서울 미식 가이드 블로그입니다. 단순한 맛집 소개를 넘어, 서울의 음식 문화와 삶의 이야기를 영어로 전 세계 독자들과 공유합니다.

![image](https://github.com/user-attachments/assets/f13a01e4-b175-4fda-84c4-a643f7457e13)

## 🚀 프로젝트 소개

**맛포서울**은 서울, 특히 마포구를 중심으로 한 맛집 추천 서비스입니다. 현지인(바로 저!)이 직접 경험하고 엄선한 맛집 정보를 제공하며, 계절의 변화에 따라 달라지는 서울의 다채로운 미식 경험을 안내합니다. 이 프로젝트는 Next.js 15, Tailwind CSS 4, Supabase 등 최신 웹 기술을 활용하여 구축되었습니다.

## ✨ 주요 기능

- **맛집 블로그:** 사진, 지도, 상세 설명이 포함된 풍부한 콘텐츠의 블로그 게시물
- **지도 기반 탐색:** Google 지도를 통해 모든 맛집의 위치를 시각적으로 확인
- **검색 기능:** 키워드를 사용하여 특정 맛집을 빠르게 검색
- **무한 스크롤:** 부드러운 사용자 경험을 위한 게시물 무한 스크롤 기능
- **RSS 피드:** RSS 리더를 통해 새로운 게시물 구독 가능
- **반응형 디자인:** 모바일, 태블릿, 데스크톱 등 모든 기기에서 최적화된 화면 제공

## 🛠 기술 스택

- **프레임워크**: Next.js 15 (App Router & Turbopack)
- **데이터베이스**: Supabase
- **스타일링**: Tailwind CSS 4, shadcn/ui
- **지도**: Google Maps API
- **애니메이션**: Framer Motion
- **언어**: TypeScript
- **UI 컴포넌트**: Radix UI, Lucide React
- **마크다운 렌더링**: `react-markdown` with `remark-gfm`

## 📂 프로젝트 구조

이 프로젝트는 **Feature-Sliced Design (FSD)** 와 유사한 아키텍처를 채택하여 코드의 재사용성과 유지보수성을 높였습니다.

```
src/
├── app/          # Next.js App Router: 페이지, 레이아웃, API 라우트
├── entities/     # 핵심 비즈니스 엔티티 (예: Post)
├── features/     # 특정 기능을 구현하는 모듈 (예: 지도, 검색)
├── shared/       # 여러 계층에서 공유되는 공통 컴포넌트, 유틸리티, API 클라이언트
└── widgets/      # 여러 엔티티와 기능을 조합하여 만드는 독립적인 UI 블록 (예: 블로그 게시물 목록)
```

## 🚀 시작하기

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 Supabase 및 Google Maps API 키를 추가합니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

### 2. 종속성 설치

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 에 접속하여 애플리케이션을 확인하세요.

## 🤝 기여하기

버그 리포트나 기능 제안은 언제나 환영합니다! 이슈 트래커를 통해 의견을 남겨주시거나, 풀 리퀘스트를 보내주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.