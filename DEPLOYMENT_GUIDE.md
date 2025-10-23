# 🚀 소나기 디자인 시스템 - GitHub & Vercel 배포 가이드

## ✅ 현재 상태

- ✅ Button 컴포넌트 완성 (5 variants, 3 sizes, loading/disabled states)
- ✅ Git 초기화 완료 (2 commits)
- ✅ Vercel 설정 완료

---

## 📦 Step 1: 프로젝트 다운로드 및 설치

### 1-1. 압축 해제
```bash
tar -xzf sonagi-design-system.tar.gz
cd sonagi-design-system
```

### 1-2. 의존성 설치
```bash
# pnpm 설치 (없다면)
npm install -g pnpm

# 의존성 설치
pnpm install
```

### 1-3. 로컬 테스트
```bash
# 토큰 빌드
pnpm build:tokens

# Storybook 실행
pnpm storybook
```

브라우저에서 http://localhost:6006 접속하여 Button 컴포넌트 확인!

---

## 🐙 Step 2: GitHub에 푸시

### 2-1. GitHub에 새 저장소 생성

1. https://github.com/new 접속
2. Repository name: `sonagi-design-system` (원하는 이름)
3. Public 또는 Private 선택
4. ✨ **"Add a README file" 체크 해제** (이미 있음)
5. **Create repository** 클릭

### 2-2. Remote 추가 및 푸시

```bash
cd sonagi-design-system

# GitHub 저장소 URL로 변경하세요
git remote add origin https://github.com/YOUR_USERNAME/sonagi-design-system.git

# 푸시
git push -u origin main
```

**참고**: GitHub에서 Personal Access Token이 필요할 수 있습니다.
- Settings → Developer settings → Personal access tokens → Generate new token

---

## ☁️ Step 3: Vercel 배포

### 3-1. Vercel 계정 생성/로그인

1. https://vercel.com 접속
2. "Sign Up" 또는 "Login"
3. **GitHub 계정으로 로그인 권장**

### 3-2. 프로젝트 Import

1. Dashboard에서 **"Add New..." → "Project"** 클릭
2. **"Import Git Repository"** 선택
3. GitHub 저장소 목록에서 `sonagi-design-system` 찾기
4. **"Import"** 클릭

### 3-3. 프로젝트 설정

**Build & Development Settings:**

```
Framework Preset: Other
Build Command: pnpm build:tokens && pnpm build-storybook
Output Directory: apps/storybook/storybook-static
Install Command: pnpm install
```

**Root Directory:** (비워두기 - 루트 사용)

### 3-4. 환경 변수 (필요 시)

현재는 환경 변수가 필요 없음. 나중에 필요하면:
- Settings → Environment Variables

### 3-5. 배포

1. **"Deploy"** 버튼 클릭
2. 빌드 진행 (3-5분 소요)
3. 완료되면 자동으로 URL 생성
   - 예: `https://sonagi-design-system.vercel.app`

---

## 🌐 Step 4: GoDaddy 도메인 연결

### 4-1. Vercel에서 도메인 추가

1. Vercel 프로젝트 → **Settings** → **Domains**
2. **"Add"** 클릭
3. 도메인 입력: `design.sonagi.space`
4. **"Add"** 클릭

Vercel이 DNS 설정 방법을 안내해줄 거야:
- **CNAME** 레코드 추가 필요

### 4-2. GoDaddy DNS 설정

1. GoDaddy 로그인: https://dcc.godaddy.com/domains
2. `sonagi.space` 도메인 선택
3. **"DNS" → "DNS Management"** 클릭
4. **새 레코드 추가:**

#### Option A: CNAME 레코드 (권장)
```
Type: CNAME
Name: design
Value: cname.vercel-dns.com
TTL: 600 (기본값)
```

#### Option B: A 레코드 (대안)
```
Type: A
Name: design
Value: 76.76.21.21
TTL: 600
```

**참고**: Vercel이 제공하는 정확한 값을 사용하세요!

5. **"Save"** 클릭

### 4-3. 전파 대기

- DNS 전파: 몇 분 ~ 48시간 (보통 10-30분)
- 확인 방법:
  ```bash
  # Mac/Linux
  dig design.sonagi.space
  
  # Windows
  nslookup design.sonagi.space
  ```

### 4-4. Vercel에서 확인

1. Vercel → Domains 탭
2. `design.sonagi.space` 상태 확인
3. ✅ "Valid Configuration" 표시되면 완료!

---

## 🎉 완료!

이제 다음 URL에서 Storybook을 확인할 수 있어요:

- **Vercel 기본 URL**: https://sonagi-design-system.vercel.app
- **커스텀 도메인**: https://design.sonagi.space

---

## 🔄 향후 업데이트 방법

### 코드 변경 후 배포

```bash
# 코드 수정 후
git add .
git commit -m "✨ Add new component"
git push

# Vercel이 자동으로 배포!
```

Vercel은 `main` 브랜치에 푸시할 때마다 **자동으로 재배포**합니다.

### Preview 배포

```bash
# feature 브랜치 생성
git checkout -b feature/new-component

# 작업 후 푸시
git push -u origin feature/new-component
```

Vercel이 자동으로 **Preview URL** 생성:
- 예: `https://sonagi-design-system-abc123.vercel.app`

---

## 📋 체크리스트

### GitHub 배포
- [ ] GitHub 저장소 생성
- [ ] Remote 추가
- [ ] 코드 푸시 완료
- [ ] GitHub에서 코드 확인

### Vercel 배포
- [ ] Vercel 계정 생성/로그인
- [ ] 프로젝트 Import
- [ ] 빌드 설정 확인
- [ ] 배포 성공
- [ ] Vercel URL에서 Storybook 확인

### 도메인 연결
- [ ] Vercel에 커스텀 도메인 추가
- [ ] GoDaddy DNS 설정
- [ ] DNS 전파 완료
- [ ] design.sonagi.space 접속 확인

---

## ⚠️ 트러블슈팅

### 빌드 실패

**문제**: Vercel 빌드가 실패함

**해결**:
1. Vercel 로그 확인
2. 로컬에서 빌드 테스트:
   ```bash
   pnpm build:tokens
   pnpm build-storybook
   ```
3. `vercel.json` 설정 확인

### 도메인이 연결 안됨

**문제**: DNS 설정 후에도 도메인이 작동 안함

**해결**:
1. DNS 전파 대기 (최대 48시간)
2. DNS 확인:
   ```bash
   dig design.sonagi.space
   ```
3. GoDaddy에서 레코드 재확인
4. Vercel 도메인 설정 재확인

### pnpm 설치 오류

**문제**: pnpm install 실패

**해결**:
```bash
# 캐시 정리
pnpm store prune

# 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 🔗 유용한 링크

- **Vercel 문서**: https://vercel.com/docs
- **Storybook 문서**: https://storybook.js.org/docs
- **GoDaddy DNS 가이드**: https://www.godaddy.com/help/manage-dns
- **GitHub 문서**: https://docs.github.com

---

## 💡 팁

1. **자동 배포**: PR(Pull Request) 생성 시 자동 Preview 배포
2. **환경 변수**: Production과 Preview 환경 분리 가능
3. **빌드 시간 단축**: Vercel의 캐싱 활용
4. **분석**: Vercel Analytics로 방문자 추적 (선택)

---

문의사항이 있으면 언제든지 물어보세요! 🌧️✨
