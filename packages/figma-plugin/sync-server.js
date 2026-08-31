const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const TOKENS_DIR = path.join(__dirname, '../tokens/tokens');

// 토큰 디렉토리가 없으면 생성
if (!fs.existsSync(TOKENS_DIR)) {
  fs.mkdirSync(TOKENS_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  // CORS 처리 (피그마 플러그인에서 접근 허용)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/sync') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        
        // breakpoints.json 파일로 곧바로 덮어쓰기
        const filePath = path.join(TOKENS_DIR, 'breakpoints.json');
        fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
        
        console.log(`[${new Date().toLocaleTimeString()}] ✅ 토큰 수신 및 저장 완료: ${filePath}`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: "Tokens synced to gp66-1 successfully!" }));
      } catch (err) {
        console.error("❌ 저장 오류:", err);
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Sonagi Token Sync Server is running on http://0.0.0.0:${PORT}`);
  console.log(`기다리는 중... 피그마 플러그인에서 데이터를 쏴주세요!`);
});
