import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.BRIDGE_PORT || '3050', 10);
const TOKENS_DIR = path.resolve(__dirname, '../tokens/tokens');

if (!fs.existsSync(TOKENS_DIR)) {
  fs.mkdirSync(TOKENS_DIR, { recursive: true });
}

// 1. HTTP 서버 생성
const server = http.createServer((req, res) => {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  // 1-1. 상태 확인 (Health Check)
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        status: 'ok',
        node: 'llmops-instance',
        connectedClients: wss.clients.size,
        uptime: process.uptime(),
      })
    );
  }

  // 1-2. 에이전트 ➔ 피그마 렌더링 주입 (POST /render)
  if (req.method === 'POST' && req.url === '/render') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const clientCount = wss.clients.size;

        if (clientCount === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(
            JSON.stringify({
              success: false,
              error: '피그마 플러그인이 연결되어 있지 않습니다. Figma에서 Sonagi 플러그인을 열어주세요.',
              connectedClients: 0,
            })
          );
        }

        const broadcastMsg = JSON.stringify({
          source: 'kimaki-agent',
          timestamp: Date.now(),
          ...payload,
        });

        let successCount = 0;
        for (const client of wss.clients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(broadcastMsg);
            successCount++;
          }
        }

        console.log(
          `[${new Date().toLocaleTimeString()}] 🚀 [Agent ➔ Figma] 렌더 페이로드 전송 완료 (${successCount}개 플러그인 클라이언트)`
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            success: true,
            message: `성공적으로 ${successCount}개의 피그마 플러그인에 전송되었습니다.`,
            clientsNotified: successCount,
          })
        );
      } catch (err) {
        console.error('❌ Render POST error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 1-3. 기존 토큰 싱크 호환 (POST /sync)
  if (req.method === 'POST' && req.url === '/sync') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const filePath = path.join(TOKENS_DIR, 'breakpoints.json');
        fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));

        console.log(`[${new Date().toLocaleTimeString()}] ✅ 토큰 수신 및 저장 완료: ${filePath}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            success: true,
            message: 'Tokens synced to llmops-instance successfully!',
          })
        );
      } catch (err) {
        console.error('❌ Sync error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

// 2. WebSocket 서버 생성
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  const remoteIp = req.socket.remoteAddress;
  console.log(
    `[${new Date().toLocaleTimeString()}] 🔌 [Figma Plugin 연결됨] Remote IP: ${remoteIp} (총 연결: ${wss.clients.size})`
  );

  // 접속 환영 메시지
  ws.send(
    JSON.stringify({
      type: 'BRIDGE_STATUS',
      status: 'connected',
      message: '⚡ Connected to Sonagi Agent Bridge (llmops-instance:3050)',
      connectedAt: Date.now(),
    })
  );

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log(`[${new Date().toLocaleTimeString()}] 📩 [Figma Plugin 수신]:`, data.type || data);

      // 클라이언트로부터 실행 결과 보고 수신 시 로깅
      if (data.type === 'EXECUTION_REPORT') {
        console.log(`✅ [Figma 실행 결과 보고]:`, data.payload);
      }
    } catch (e) {
      console.log(`[${new Date().toLocaleTimeString()}] 📩 Raw text from plugin:`, message.toString());
    }
  });

  ws.on('close', () => {
    console.log(
      `[${new Date().toLocaleTimeString()}] ❌ [Figma Plugin 연결 종료] 남은 연결: ${wss.clients.size}`
    );
  });
});

// 3. 서버 시작
server.listen(PORT, '0.0.0.0', () => {
  console.log('═════════════════════════════════════════════════════════════');
  console.log(`⚡ Sonagi Agent ↔ Figma Bridge Server running on 0.0.0.0:${PORT}`);
  console.log(`📡 Tailscale Address : ws://100.91.9.83:${PORT}`);
  console.log(`🩺 Health Check      : http://100.91.9.83:${PORT}/health`);
  console.log(`🎨 Agent Render API  : http://localhost:${PORT}/render`);
  console.log('═════════════════════════════════════════════════════════════');
});
