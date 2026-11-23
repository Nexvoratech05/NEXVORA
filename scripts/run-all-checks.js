const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

function waitForServer(port, retries = 20) {
  return new Promise((resolve, reject) => {
    function tryConnect() {
      const req = http.get(`http://127.0.0.1:${port}/`, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve();
        } else {
          retry();
        }
      });
      req.on('error', retry);
      req.end();
    }

    function retry() {
      retries--;
      if (retries <= 0) {
        return reject(new Error('Timed out waiting for Next.js server to start'));
      }
      setTimeout(tryConnect, 1000);
    }

    tryConnect();
  });
}

async function main() {
  console.log('>>> Starting Next.js Production Server on Port 3001 for Live Security Testing...\n');
  const server = spawn('npx', ['next', 'start', '-p', '3001'], {
    shell: true,
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });

  try {
    await waitForServer(3001);
    console.log('>>> Server is live on http://127.0.0.1:3001. Running Live Security Tests...\n');

    // Run security test script
    await new Promise((resolve, reject) => {
      const testProc = spawn('node', ['scripts/test-live-security.js'], {
        shell: true,
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      });
      testProc.on('exit', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`test-live-security.js failed with code ${code}`));
      });
    });

    console.log('\n>>> Live Security Tests Completed. Running Static Verification Suite...\n');
    await new Promise((resolve, reject) => {
      const verifyProc = spawn('node', ['scripts/verify-all.js'], {
        shell: true,
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      });
      verifyProc.on('exit', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`verify-all.js failed with code ${code}`));
      });
    });

    console.log('\n>>> All live security and static verification tests PASSED!\n');
  } finally {
    console.log('>>> Shutting down test server...');
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', server.pid.toString(), '/f', '/t'], { shell: true });
    } else {
      server.kill('SIGTERM');
    }
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err.message);
  process.exit(1);
});
