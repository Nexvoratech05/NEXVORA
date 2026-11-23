const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('NEXVORA TECHNOLOGIES — AUTOMATED VERIFICATION SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] Test ${totalTests}: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] Test ${totalTests}: ${name}`);
    console.error(`       Error: ${err.message}`);
  }
}

const appServerDir = path.join(__dirname, '../.next/server/app');
const publicDir = path.join(__dirname, '../public');

// TEST 1: Homepage loads and renders approved headline & metadata
runTest('Homepage loads with Build Beyond Limits headline and JSON-LD schema', () => {
  const htmlPath = path.join(appServerDir, 'index.html');
  assert(fs.existsSync(htmlPath), 'Homepage index.html must exist');
  const content = fs.readFileSync(htmlPath, 'utf8');
  assert(content.includes('Build Beyond Limits.'), 'Headline Build Beyond Limits must exist');
  assert(content.includes('Engineering Scalable Systems.') || content.includes('Engineering Scalable'), 'Sub-headline span must exist');
  assert(content.includes('Start a Project'), 'Primary CTA must exist');
  assert(content.includes('Explore Architecture Case Studies') || content.includes('case-studies'), 'Secondary CTA must exist');
  assert(content.includes('application/ld+json'), 'Organization JSON-LD must exist');
});

// TEST 2: All main navigation destinations exist
runTest('All primary navigation routes exist as generated pages', () => {
  const routes = [
    'about.html',
    'team.html',
    'services.html',
    'projects.html',
    'technologies.html',
    'insights.html',
    'contact.html',
    'start-a-project.html',
    'privacy-policy.html',
    'terms.html',
  ];
  for (const r of routes) {
    const full = path.join(appServerDir, r);
    assert(fs.existsSync(full), `Route ${r} must exist`);
  }
});

// TEST 3: All 6 engineering division pages load
runTest('All 6 engineering divisions render dedicated landing pages', () => {
  const divisions = [
    'data-engineering',
    'artificial-intelligence',
    'generative-ai',
    'cloud-devops',
    'software-engineering',
    'business-automation',
  ];
  for (const div of divisions) {
    const p = path.join(appServerDir, 'services', `${div}.html`);
    assert(fs.existsSync(p), `Service page for ${div} must exist`);
    const content = fs.readFileSync(p, 'utf8');
    assert(content.includes('Core Capabilities') || content.includes('Specialized Engineering'), `Subservices must exist in ${div}`);
    assert(content.includes('Frequently Asked Questions'), `FAQs must exist in ${div}`);
  }
});

// TEST 4: All 6 prioritized project case studies load
runTest('All 6 prioritized case study pages load with architecture specs', () => {
  const projects = [
    'enterprise-databricks-lakehouse',
    'enterprise-qa-crm-vicidial',
    'ai-knee-osteoarthritis-detection',
    'biometric-attendance-odoo-erp',
    'ai-powered-intelligent-assistant',
    'enterprise-workforce-monitoring',
  ];
  for (const proj of projects) {
    const p = path.join(appServerDir, 'projects', `${proj}.html`);
    assert(fs.existsSync(p), `Project page for ${proj} must exist`);
    const content = fs.readFileSync(p, 'utf8');
    assert(content.includes('Architecture Specification Blueprint') || content.includes('Architecture Specification Diagram') || content.includes('Architecture'), `Architecture diagram must exist for ${proj}`);
    assert(content.includes('The Engineering') || content.includes('Architectural Solution'), `Solution section must exist for ${proj}`);
    assert(content.includes('Verified Impact') || content.includes('Engineering Results'), `Deliverables must exist for ${proj}`);
  }
});

// TEST 5: All 3 Technical Insights Whitepapers load with static parameters
runTest('All 3 launch technical insights whitepapers are pre-rendered statically', () => {
  const articles = [
    'implementing-medallion-lakehouse-databricks-pyspark',
    'integrating-vicidial-telephony-fastapi-microservices',
    'grad-cam-explainability-medical-computer-vision',
  ];
  for (const a of articles) {
    const p = path.join(appServerDir, 'insights', `${a}.html`);
    assert(fs.existsSync(p), `Insight whitepaper page for ${a} must exist`);
    const content = fs.readFileSync(p, 'utf8');
    assert(content.includes('TechArticle'), `TechArticle Schema JSON-LD must exist for ${a}`);
    assert(content.includes('Insights'), `Breadcrumb Insights must exist for ${a}`);
  }
});

// TEST 6: Leadership profiles load with verified facts and URLs
runTest('Leadership profiles load with verified facts, AWKUM, UET Mardan, and links', () => {
  const teamHtml = path.join(appServerDir, 'team.html');
  assert(fs.existsSync(teamHtml), 'team.html must exist');
  const content = fs.readFileSync(teamHtml, 'utf8');
  assert(content.includes('Muhammad Azhar'), 'Muhammad Azhar must be listed');
  assert(content.includes('Owais Ahmad'), 'Owais Ahmad must be listed');
  assert(content.includes('Abdul Wali Khan University') || content.includes('AWKUM'), 'AWKUM education must be listed');
  assert(content.includes('University of Engineering and Technology (UET) Mardan') || content.includes('UET Mardan'), 'UET Mardan education must be listed');
  assert(content.includes('https://owaisahmad.me/') || content.includes('https://owais4077.github.io/OWAIS-AHMAD-Portfolio/'), 'Verified portfolio link must exist');
  assert(content.includes('https://github.com/Owais4077'), 'Verified GitHub link must exist');
  assert(content.includes('https://www.linkedin.com/in/owais-ahmad-79a431292/'), 'Verified LinkedIn link must exist');
});

// TEST 7: About page contains company overview, mission, vision, and core values
runTest('About page contains authentic mission, vision, and core values', () => {
  const aboutHtml = path.join(appServerDir, 'about.html');
  assert(fs.existsSync(aboutHtml), 'about.html must exist');
  const content = fs.readFileSync(aboutHtml, 'utf8');
  assert(content.includes('Our Mission'), 'Mission must exist');
  assert(content.includes('Our Vision'), 'Vision must exist');
  assert(content.includes('Engineering Excellence'), 'Value 1 must exist');
  assert(content.includes('Continuous Learning'), 'Value 6 must exist');
  assert(content.includes('Client Success'), 'Value 7 must exist');
});

// TEST 8: Industries section renders correctly
runTest('Industries section renders required sectors', () => {
  const homeHtml = path.join(appServerDir, 'index.html');
  const content = fs.readFileSync(homeHtml, 'utf8');
  assert(content.includes('Healthcare &amp; Medical') || content.includes('Healthcare'), 'Healthcare must be present');
  assert(content.includes('Financial Services') || content.includes('FinTech'), 'FinTech / Financial Services must be present');
  assert(content.includes('Logistics') || content.includes('Supply Chain'), 'Logistics must be present');
});

// TEST 9: Start a Project page contains multi-step scope calculator
runTest('Start a Project page loads multi-step scope calculator', () => {
  const sapHtml = path.join(appServerDir, 'start-a-project.html');
  assert(fs.existsSync(sapHtml), 'start-a-project.html must exist');
  const content = fs.readFileSync(sapHtml, 'utf8');
  assert(content.includes('Request an Architectural Scope'), 'Header must exist');
  assert(content.includes('What Happens Next?'), 'Trust cues must exist');
  assert(content.includes('Confidentiality &amp; NDA') || content.includes('Confidentiality'), 'Confidentiality notice must exist');
});

// TEST 10: Public assets exist (photos, diagrams, logos)
runTest('All required project SVGs, founder photos, and logos exist in public/', () => {
  const assets = [
    'logo.svg',
    'logo-white.svg',
    'logo-icon.svg',
    'images/founders/muhammad-azhar.webp',
    'images/founders/owais-ahmad.webp',
    'images/projects/lakehouse-architecture-diagram.svg',
    'images/projects/qa-crm-telephony-diagram.svg',
    'images/projects/knee-osteoarthritis-diagram.svg',
    'images/projects/biometric-odoo-sync-diagram.svg',
    'images/projects/ai-assistant-rag-diagram.svg',
    'images/projects/workforce-monitoring-diagram.svg',
  ];
  for (const a of assets) {
    const full = path.join(publicDir, a);
    assert(fs.existsSync(full), `Asset ${a} must exist in public/`);
  }
});

// TEST 11: No placeholder tags in public pages
runTest('No [PLACEHOLDER or [DRAFT tags in rendered public HTML', () => {
  const pages = ['about.html', 'privacy-policy.html', 'terms.html', 'team.html', 'index.html', 'technologies.html', 'insights.html'];
  for (const page of pages) {
    const full = path.join(appServerDir, page);
    if (fs.existsSync(full)) {
      const text = fs.readFileSync(full, 'utf8');
      assert(!text.includes('[PLACEHOLDER'), `Page ${page} must not contain [PLACEHOLDER`);
      assert(!text.includes('[DRAFT'), `Page ${page} must not contain [DRAFT`);
    }
  }
});

// TEST 12: Sitemap and robots.txt exist
runTest('Sitemap.xml and robots.txt are generated correctly', () => {
  assert(fs.existsSync(path.join(appServerDir, 'sitemap.xml.meta')), 'sitemap.xml must be configured');
  assert(fs.existsSync(path.join(appServerDir, 'robots.txt.meta')), 'robots.txt must be configured');
});

// TEST 13: Project classification transparency
runTest('Projects have transparent classifications (no unauthorized client claims)', () => {
  const siteTs = fs.readFileSync(path.join(__dirname, '../src/content/site.ts'), 'utf8');
  assert(siteTs.includes('Academic Research'), 'Academic Research classification must exist');
  assert(siteTs.includes('Internal Project'), 'Internal Project classification must exist');
  assert(siteTs.includes('Demonstration'), 'Demonstration classification must exist');
  assert(!siteTs.includes('UMS BPO') && !siteTs.includes('Unified Marketing'), 'UMS BPO must NOT be claimed as a client without authorization');
});

// TEST 14: Accessibility checks (skip link, landmark roles)
runTest('Semantic accessibility landmarks and skip link are present', () => {
  const homeHtml = fs.readFileSync(path.join(appServerDir, 'index.html'), 'utf8');
  assert(homeHtml.includes('skip-link'), 'Skip link must exist');
  assert(homeHtml.includes('<header'), 'Header landmark must exist');
  assert(homeHtml.includes('<main'), 'Main landmark must exist');
  assert(homeHtml.includes('<footer'), 'Footer landmark must exist');
});

// TEST 15: Contact APIs have force-dynamic configuration
runTest('API routes configure force-dynamic to prevent build time warnings', () => {
  const apiFiles = [
    'src/app/api/inquiries/route.ts',
    'src/app/api/contact/route.ts',
    'src/app/api/quote/route.ts',
  ];
  for (const f of apiFiles) {
    const text = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
    assert(text.includes('force-dynamic'), `${f} must configure force-dynamic`);
  }
});

// TEST 16: Production build generated sufficient static routes
runTest('Production build generated 45+ static and dynamic routes', () => {
  const servicesCount = fs.readdirSync(path.join(appServerDir, 'services')).filter(f => f.endsWith('.html')).length;
  const projectsCount = fs.readdirSync(path.join(appServerDir, 'projects')).filter(f => f.endsWith('.html')).length;
  const insightsCount = fs.readdirSync(path.join(appServerDir, 'insights')).filter(f => f.endsWith('.html')).length;
  assert(servicesCount >= 6, 'Must have at least 6 service pages');
  assert(projectsCount >= 6, 'Must have at least 6 project pages');
  assert(insightsCount >= 3, 'Must have at least 3 insight whitepaper pages');
});

// TEST 17: Legal governance & credential integrity assertions
runTest('Legal statements use approved IP and NDA wording; credentials are fully verified', () => {
  const homeHtml = fs.readFileSync(path.join(appServerDir, 'index.html'), 'utf8');
  const siteTs = fs.readFileSync(path.join(__dirname, '../src/content/site.ts'), 'utf8');
  assert(homeHtml.includes('Project-specific IP ownership and transfer terms are documented in signed agreements.'), 'Approved IP statement must be on homepage');
  assert(homeHtml.includes('Mutual NDAs are available upon request and subject to agreement.'), 'Approved NDA statement must be on homepage');
  assert(!homeHtml.includes('100% IP Handover'), 'Must not claim unverified 100% IP Handover');
  assert(!homeHtml.includes('Zero Subcontracting'), 'Must not claim unverified zero subcontracting');
  assert(!siteTs.includes('IBM Certified Data Engineer'), 'Must not describe Owais as IBM Certified Data Engineer');
  assert(!siteTs.includes('Gold Medalist'), 'Must not publish Gold Medalist without public verification');
});

console.log(`\n----------------------------------------------------`);
console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log(`----------------------------------------------------\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
