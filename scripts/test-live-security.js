const http = require('http');
const assert = require('assert');

// Helper to make HTTP requests
function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, data: json, raw: data });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runLiveSecurityTests() {
  console.log('====================================================');
  console.log('NEXVORA — LIVE RUNTIME SECURITY & ENDPOINT TESTS');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`[PASS] Security Test ${total}: ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] Security Test ${total}: ${name}`);
      console.error(`       Error: ${err.message}`);
    }
  }

  const port = 3001;
  const host = '127.0.0.1';

  // 1. Unauthorized GET /api/inquiries
  await test('GET /api/inquiries without auth header returns 401 Unauthorized', async () => {
    const res = await request({
      hostname: host,
      port: port,
      path: '/api/inquiries',
      method: 'GET',
    });
    assert.strictEqual(res.status, 401, `Expected 401, got ${res.status}`);
    assert(res.data && res.data.error, 'Should contain error object');
  });

  // 2. Unauthorized GET /api/inquiries with wrong token
  await test('GET /api/inquiries with forged Bearer token returns 401 Unauthorized', async () => {
    const res = await request({
      hostname: host,
      port: port,
      path: '/api/inquiries',
      method: 'GET',
      headers: {
        Authorization: 'Bearer wrong-secret-token-12345',
      },
    });
    assert.strictEqual(res.status, 401, `Expected 401, got ${res.status}`);
  });

  // 3. Contact Form Submission Validation: Missing / Malformed fields
  await test('POST /api/contact with malformed payload returns 400 Bad Request', async () => {
    const res = await request(
      {
        hostname: host,
        port: port,
        path: '/api/contact',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        fullName: 'A', // min 2 chars
        email: 'invalid-email',
        message: 'short',
        consent: false,
      }
    );
    assert.strictEqual(res.status, 400, `Expected 400, got ${res.status}`);
    assert(res.data && res.data.error, 'Must contain validation error');
  });

  // 4. Contact Form Bot Honeypot Rejection
  await test('POST /api/contact with honeypot triggered silently drops bot submission without persistence', async () => {
    const res = await request(
      {
        hostname: host,
        port: port,
        path: '/api/contact',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        fullName: 'Spam Bot',
        email: 'spambot@example.com',
        subject: 'General inquiry',
        message: 'This is an automated spam payload intended to flood databases.',
        consent: true,
        honeypot: 'spam-bot-value', // Honeypot filled!
      }
    );
    // Returns 200 to deceive bots, but drops before saveLead/email
    assert.strictEqual(res.status, 200, `Expected 200 silent drop, got ${res.status}`);
    assert(res.data && res.data.success === true, 'Response must deceive bot');
  });

  // 5. Valid Contact Form Submission & Storage Handling
  await test('POST /api/contact with valid payload succeeds (200 OK) and handles missing Resend gracefully', async () => {
    const res = await request(
      {
        hostname: host,
        port: port,
        path: '/api/contact',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        fullName: 'Security Auditor',
        email: 'auditor@nexvora-security.internal',
        subject: 'General inquiry',
        message: 'Verifying runtime server-side validation and storage persistence.',
        consent: true,
        honeypot: '',
      }
    );
    assert.strictEqual(res.status, 200, `Expected 200, got ${res.status}`);
    assert(res.data && res.data.success === true, 'Response must indicate success');
  });

  // 6. Multi-Step Quote Form Submission & Validation
  await test('POST /api/quote with complete valid multi-step payload succeeds (200 OK)', async () => {
    const res = await request(
      {
        hostname: host,
        port: port,
        path: '/api/quote',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        fullName: 'Enterprise Client',
        email: 'client@enterprise-lakehouse.com',
        phone: '+1 415 555 2671',
        company: 'Enterprise Corp',
        country: 'United States',
        contactMethod: 'Email',
        mainGoal: 'Modernize legacy analytical data warehouse to Databricks Lakehouse',
        services: ['Data Engineering & Lakehouses'],
        budgetRange: '$15,000 – $30,000',
        timeline: '2–3 months',
        projectDescription: 'Migrating legacy SQL warehouse to Databricks Medallion Lakehouse architecture with Delta Lake and Unity Catalog.',
        consent: true,
        honeypot: '',
      }
    );
    assert.strictEqual(res.status, 200, `Expected 200, got ${res.status}`);
    assert(res.data && res.data.success === true, 'Response must indicate quote success');
  });

  // 7. Rate Limiter Functional Behavior
  await test('Rapid repetitive POST requests are processed safely without crashes', async () => {
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(
        request(
          {
            hostname: host,
            port: port,
            path: '/api/contact',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          },
          {
            fullName: `Rapid Tester ${i}`,
            email: `rapid${i}@nexvora-security.internal`,
            subject: 'General inquiry',
            message: 'Testing rapid burst submissions against in-memory sliding window.',
            consent: true,
            honeypot: '',
          }
        )
      );
    }
    const results = await Promise.all(promises);
    assert(results.every(r => r.status === 200 || r.status === 429), 'All requests must be 200 or 429 (rate limited)');
  });

  // 8. Static robots.txt check
  await test('robots.txt returns valid plain text with sitemap reference', async () => {
    const res = await request({
      hostname: host,
      port: port,
      path: '/robots.txt',
      method: 'GET',
    });
    assert.strictEqual(res.status, 200);
    assert(res.raw.includes('User-Agent') || res.raw.includes('User-agent'), 'Must contain User-Agent');
    assert(res.raw.includes('sitemap.xml'), 'Must reference sitemap.xml');
  });

  // 9. Static sitemap.xml check
  await test('sitemap.xml returns valid XML sitemap with all core routes', async () => {
    const res = await request({
      hostname: host,
      port: port,
      path: '/sitemap.xml',
      method: 'GET',
    });
    assert.strictEqual(res.status, 200);
    assert(res.raw.includes('urlset') || res.raw.includes('<url>'), 'Must be valid XML sitemap');
    assert(res.raw.includes('/technologies'), 'Sitemap must include /technologies');
    assert(res.raw.includes('/insights'), 'Sitemap must include /insights');
  });

  console.log(`\n----------------------------------------------------`);
  console.log(`LIVE SECURITY SUMMARY: ${passed} / ${total} TESTS PASSED`);
  console.log(`----------------------------------------------------\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runLiveSecurityTests().catch((err) => {
  console.error('Fatal error in security suite:', err);
  process.exit(1);
});
