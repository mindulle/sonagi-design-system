# Sonagi Design System v3.0 - Foundation & OpenPencil Handover

## 1. 진행 상황 (Progress)

- **Foundation 정의 완료**: ADR 0001~0004를 통해 Color, Typography, Shadow/Elevation 토큰의 스펙을 확정했습니다.
- **MCP 빌드 스크립트 작성**: `build-foundation-mcp.mjs` 스크립트를 작성하여 OpenPencil MCP API(`create_shape`, `set_text`, `set_font`, `set_fill` 등)를 통해 Foundation 페이지를 자동 생성하도록 구현했습니다.
- **Pretendard 폰트 확보**: npm 공식 배포판에서 정상적인 TrueType(`.ttf`) 파일을 추출하여 준비했습니다.

## 2. 발생한 문제 (The Blocker)

- OpenPencil 웹(Browser) 환경의 CanvasKit(Skia WASM) 렌더러에서 폰트 지연 로딩(Lazy Loading) 타이밍 문제가 발생했습니다.
- 폰트 파일 자체는 정상적으로 다운로드 되었으나, 텍스트 노드가 그려질 때 `renderNow()` 리페인트가 호출되지 않아 텍스트가 투명한 박스로 렌더링되는 현상을 확인했습니다.

## 3. 아키텍처 결정 사항 (Architectural Decision)

- **Web 인프라 폐기 및 Desktop 이관**: 웹 브라우저 환경에서의 커스텀 폰트 로딩, Cloudflare 캐싱, CORS 등의 인프라 오버헤드를 줄이기 위해 OpenPencil Web 인프라를 내리기로 결정했습니다.
- **Tauri Desktop 활용**: 데스크톱 환경(Tauri v2)에서는 OS에 설치된 시스템 폰트(`queryLocalFonts`)를 직접 읽어올 수 있으므로, 로컬 환경(Mac/Windows)에 Pretendard를 설치하고 데스크톱 앱을 실행하여 MCP로 연결하는 방식이 훨씬 안정적이고 빠릅니다.

## 4. 수행된 후속 조치

- 서버 자원 확보를 위해 PM2에서 구동 중이던 `openpencil-web` 프로세스를 완전히 삭제하고 저장(`pm2 delete openpencil-web && pm2 save`)했습니다.
- Foundation 자동 생성 스크립트는 `/tmp/opencode/foundation-build/build-foundation-mcp.mjs`에 잘 보존되어 있으며, 추후 로컬 데스크톱 MCP와 연결하여 즉시 재사용할 수 있도록 파라미터(`set_fill`의 hex 처리 등) 패치를 완료해 두었습니다.

---

**Next Step for User**:

1. 로컬(Mac/Win) 환경에 Pretendard 폰트를 설치합니다.
2. 로컬에서 OpenPencil 데스크톱 앱을 실행합니다.
3. 로컬 데스크톱 앱의 MCP 서버 주소로 `build-foundation-mcp.mjs` 스크립트의 URL 및 Token을 수정하여 실행합니다.
