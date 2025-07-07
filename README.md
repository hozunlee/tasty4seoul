# Tasty 4 Seoul (맛포서울)

서울 현지인이 직접 발로 뛰며 찾아낸 진짜 맛집들을 소개하는 서울 미식 가이드 블로그입니다. 단순한 맛집 소개를 넘어, 서울의 음식 문화와 삶의 이야기를 영어로 전 세계 독자들과 공유합니다.

![Tasty 4 Seoul Banner](https://github.com/user-attachments/assets/f13a01e4-b175-4fda-84c4-a643f7457e13)

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.8-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.50.2-181818?style=flat&logo=supabase)](https://supabase.com/)

## 🚀 프로젝트 소개

**Tasty 4 Seoul**은 서울, 특히 마포구를 중심으로 한 맛집 추천 서비스입니다. 이 프로젝트는 성능, 사용자 경험, 검색 최적화에 중점을 두고 개발되었으며, 관광객들이 일반적인 관광지가 아닌 진정한 서울의 맛을 발견할 수 있도록 돕습니다.

### 주요 특징
- 🚀 **초고속 성능**: Next.js 15의 App Router와 Turbopack으로 구동되는 초고속 웹사이트
- 📱 **반응형 디자인**: 모든 기기에서 최적화된 사용자 경험 제공
- 🗺️ **인터랙티브 지도**: Google Maps API를 활용한 직관적인 맛집 탐색
- 🔍 **검색 최적화**: SEO 최적화로 검색 노출도 향상

## ✨ 주요 기능

- **맛집 블로그:** 사진, 지도, 상세 설명이 포함된 풍부한 콘텐츠의 블로그 게시물
- **지도 기반 탐색:** Google 지도를 통해 모든 맛집의 위치를 시각적으로 확인
- **검색 기능:** 키워드를 사용하여 특정 맛집을 빠르게 검색
- **무한 스크롤:** 부드러운 사용자 경험을 위한 게시물 무한 스크롤 기능
- **RSS 피드:** RSS 리더를 통해 새로운 게시물 구독 가능
- **반응형 디자인:** 모바일, 태블릿, 데스크톱 등 모든 기기에서 최적화된 화면 제공

## 🛠 기술 스택

### 핵심 기술
- **프론트엔드**: Next.js 15 (App Router & Turbopack)
- **프로그래밍 언어**: TypeScript 5.0
- **스타일링**: Tailwind CSS 4 + shadcn/ui
- **상태 관리**: React Context + Zustand
- **데이터베이스**: Supabase (PostgreSQL)
- **인증**: Supabase Auth
- **배포**: Vercel

### 주요 라이브러리
- **UI/UX**: Radix UI, Lucide React, Framer Motion
- **지도**: Google Maps API
- **마크다운**: `react-markdown` + `remark-gfm`
- **국제화**: next-intl
- **폼 처리**: React Hook Form
- **유틸리티**: date-fns, clsx, tailwind-merge

### 개발 도구
- **번들러**: Turbopack (개발), Webpack (프로덕션)
- **테스트**: Jest, React Testing Library
- **코드 품질**: ESLint, Prettier, TypeScript
- **CI/CD**: GitHub Actions

## 📂 프로젝트 구조

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 채택하여 확장성과 유지보수성을 높였습니다.

```
src/
├── app/                    # Next.js App Router
│   ├── about/              # 소개 페이지
│   ├── api/                # API 라우트
│   ├── blog/               # 블로그 섹션
│   │   ├── [id]/           # 개별 블로그 포스트 (동적 라우트)
│   │   └── page.tsx        # 블로그 목록
│   └── map/                # 인터랙티브 맛집 지도
│
├── entities/               # 도메인 엔티티
│   └── post/               # 게시물 관련 로직
│       ├── api/            # API 호출 함수
│       ├── model/          # 타입 정의
│       └── ui/             # UI 컴포넌트
│
├── features/               # 기능 단위 모듈
│   └── map/                # 지도 관련 기능
│
├── shared/                 # 공통 유틸리티
│   ├── api/                # API 클라이언트
│   ├── lib/                # 유틸리티 함수
│   ├── styles/             # 전역 스타일
│   └── ui/                 # 공통 UI 컴포넌트
│
└── widgets/                # 복합 UI 컴포넌트
    └── blog/               # 블로그 위젯
```

### 아키텍처 원칙
1. **관심사 분리**: 각 모듈은 단일 책임 원칙을 따릅니다.
2. **재사용성**: 공통 컴포넌트는 shared 디렉토리에서 관리됩니다.
3. **확장성**: 새로운 기능을 쉽게 추가할 수 있는 구조를 가집니다.
4. **테스트 용이성**: 각 모듈은 독립적으로 테스트 가능합니다.

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/tasty-4-seoul.git
cd tasty-4-seoul
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수들을 설정하세요.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# 기타
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. 의존성 설치

```bash
# pnpm을 사용하는 경우
pnpm install

# 또는 npm을 사용하는 경우
npm install
```

### 4. 개발 서버 실행

```bash
# 개발 모드 실행 (Turbopack 사용)
pnpm dev

# 또는 빌드 후 실행
pnpm build
pnpm start
```

개발 서버가 시작되면 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 5. 테스트 실행

```bash
# 전체 테스트 실행
pnpm test

# 테스트 감시 모드
pnpm test:watch

# 테스트 커버리지 확인
pnpm test:coverage
```

## 🤝 기여하기

기여는 언제나 환영합니다! 기여하시려면 다음 단계를 따르세요:

1. 이슈를 생성하여 변경 사항을 논의하세요.
2. 포크한 후 기능 브랜치를 만드세요 (`feature/amazing-feature`).
3. 변경 사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`).
5. 풀 리퀘스트를 열어주세요.

### 개발 가이드라인
- 코드 스타일은 Prettier와 ESLint를 따릅니다.
- 새로운 기능을 추가할 때는 반드시 테스트를 작성해주세요.
- 커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.

## 📈 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 분할**: 자동 코드 스플리팅
- **정적 자산 캐싱**: 효율적인 캐싱 전략 적용
- **번들 최적화**: Tree-shaking 및 code-splitting 적용

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
