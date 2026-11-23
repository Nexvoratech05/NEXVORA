const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/projects');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function wrapSvg(title, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" fill="none" className="w-full h-full">
  <rect width="800" height="500" fill="#0C1F38" rx="12"/>
  <defs>
    <pattern id="diagGrid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1B3558" stroke-width="0.5" stroke-opacity="0.6"/>
    </pattern>
    <linearGradient id="blueG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#087BCE"/>
      <stop offset="100%" stop-color="#55B9FF"/>
    </linearGradient>
    <linearGradient id="cyanG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#55B9FF"/>
      <stop offset="100%" stop-color="#1F9D6B"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#diagGrid)" rx="12"/>

  <!-- Diagram Title / Header -->
  <rect x="40" y="30" width="720" height="40" rx="6" fill="#071426" stroke="#1B3558"/>
  <circle cx="65" cy="50" r="5" fill="#55B9FF"/>
  <circle cx="82" cy="50" r="5" fill="#087BCE"/>
  <circle cx="99" cy="50" r="5" fill="#1F9D6B"/>
  <text x="120" y="55" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="12" font-weight="600" letter-spacing="0.05em">${title}</text>

  ${content}
</svg>`;
}

// 1. LMS & Command Center Portal (Azhar)
const lmsSvg = wrapSvg("ENTERPRISE LMS &amp; EMPLOYEE COMMAND CENTER — ARCHITECTURE SPECIFICATION", `
  <!-- Column 1: Ingestion & Devices -->
  <rect x="40" y="110" width="160" height="80" rx="8" fill="#071426" stroke="#1B3558"/>
  <text x="120" y="140" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">Hikvision Devices</text>
  <text x="120" y="160" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">Biometric Punch Sync</text>
  <text x="120" y="175" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">Validated CSV Fallback</text>

  <rect x="40" y="215" width="160" height="80" rx="8" fill="#071426" stroke="#1B3558"/>
  <text x="120" y="245" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">Employee Self-Service</text>
  <text x="120" y="265" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">Leave Requests &amp; Quizzes</text>
  <text x="120" y="280" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">Profile &amp; Shift Views</text>

  <rect x="40" y="320" width="160" height="80" rx="8" fill="#071426" stroke="#1B3558"/>
  <text x="120" y="350" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">Admin Management</text>
  <text x="120" y="370" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">Shift Scheduling &amp; Approvals</text>
  <text x="120" y="385" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">PDF/Excel Audit Exports</text>

  <!-- Connectors to App Layer -->
  <path d="M200 150 L250 250" stroke="#087BCE" stroke-width="1.5"/>
  <path d="M200 255 L250 255" stroke="#087BCE" stroke-width="1.5"/>
  <path d="M200 360 L250 260" stroke="#087BCE" stroke-width="1.5"/>

  <!-- Column 2: Next.js Full-Stack App Layer -->
  <rect x="250" y="110" width="220" height="290" rx="10" fill="#071426" stroke="#087BCE" stroke-width="2"/>
  <rect x="265" y="125" width="190" height="24" rx="4" fill="#1B3558"/>
  <text x="360" y="141" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Next.js App Router &amp; TypeScript</text>

  <rect x="265" y="165" width="190" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="360" y="185" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">4-Tier RBAC Authorization</text>
  <text x="360" y="198" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Super Admin · HR · Manager · Employee</text>

  <rect x="265" y="215" width="190" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="360" y="235" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Attendance &amp; Leave Engine</text>
  <text x="360" y="248" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Idempotent Sync · Shift Balancing</text>

  <rect x="265" y="265" width="190" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="360" y="285" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Learning &amp; Quiz Module</text>
  <text x="360" y="298" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Courseware · Certifications</text>

  <rect x="265" y="315" width="190" height="70" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="360" y="335" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">UI &amp; Components</text>
  <text x="360" y="352" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Tailwind CSS · shadcn/ui · Radix</text>
  <text x="360" y="368" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Real-time In-App Notifications</text>

  <!-- Connectors to Database & Cloud -->
  <path d="M470 255 L520 255" stroke="#55B9FF" stroke-width="2"/>

  <!-- Column 3: PostgreSQL + RLS & Deployment -->
  <rect x="520" y="110" width="240" height="290" rx="10" fill="#071426" stroke="#55B9FF" stroke-width="1.5"/>
  <rect x="535" y="125" width="210" height="24" rx="4" fill="#1B3558"/>
  <text x="640" y="141" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Supabase PostgreSQL + RLS</text>

  <rect x="535" y="165" width="210" height="50" rx="6" fill="#0C1F38" stroke="#087BCE"/>
  <text x="640" y="188" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Row-Level Security (RLS)</text>
  <text x="640" y="202" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Isolates private employee records by scope</text>

  <rect x="535" y="225" width="210" height="50" rx="6" fill="#0C1F38" stroke="#087BCE"/>
  <text x="640" y="248" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Audit Trails &amp; Corrections</text>
  <text x="640" y="262" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Immutable change history for punch edits</text>

  <rect x="535" y="285" width="210" height="50" rx="6" fill="#0C1F38" stroke="#087BCE"/>
  <text x="640" y="308" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Vercel Edge Deployment</text>
  <text x="640" y="322" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Zero-downtime CI/CD from Git</text>

  <rect x="535" y="345" width="210" height="40" rx="6" fill="#1B3558"/>
  <text x="640" y="369" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">Role-Audited Enterprise Security</text>
`);

// 2. Smart Farming IoT & AWS Cloud (Azhar)
const iotSvg = wrapSvg("SMART PRECISION AGRICULTURE — IOT &amp; AWS CLOUD TELEMETRY", `
  <!-- Edge Hardware -->
  <rect x="40" y="120" width="160" height="260" rx="10" fill="#071426" stroke="#1F9D6B" stroke-width="2"/>
  <rect x="55" y="135" width="130" height="24" rx="4" fill="#1B3558"/>
  <text x="120" y="151" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Edge Microcontrollers</text>
  
  <rect x="55" y="175" width="130" height="40" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="120" y="195" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">ESP32 SoC</text>
  <text x="120" y="207" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Wi-Fi + C++ Firmware</text>

  <rect x="55" y="225" width="130" height="40" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="120" y="245" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Soil Moisture Sensor</text>
  <text x="120" y="257" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Capacitive Analog Telemetry</text>

  <rect x="55" y="275" width="130" height="40" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="120" y="295" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">DHT22 &amp; LDR</text>
  <text x="120" y="307" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Ambient Temp, Humidity &amp; Lux</text>

  <rect x="55" y="325" width="130" height="40" rx="4" fill="#0C1F38" stroke="#1F9D6B"/>
  <text x="120" y="345" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Irrigation Relay</text>
  <text x="120" y="357" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Solenoid Actuator Control</text>

  <!-- Flow to AWS Cloud -->
  <path d="M200 250 L250 250" stroke="#55B9FF" stroke-width="2"/>
  <text x="225" y="240" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">MQTT/TLS</text>

  <!-- AWS Cloud Topology -->
  <rect x="250" y="100" width="510" height="300" rx="10" fill="#071426" stroke="#087BCE" stroke-width="2"/>
  <rect x="265" y="115" width="220" height="24" rx="4" fill="#1B3558"/>
  <text x="375" y="131" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">AWS Serverless Cloud Infrastructure</text>

  <!-- AWS IoT Core -->
  <rect x="270" y="160" width="130" height="100" rx="6" fill="#0C1F38" stroke="#087BCE"/>
  <text x="335" y="195" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">AWS IoT Core</text>
  <text x="335" y="215" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">Device Gateway</text>
  <text x="335" y="230" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">X.509 Mutual Auth</text>
  <text x="335" y="245" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Topic Rules Engine</text>

  <path d="M400 210 L440 210" stroke="#087BCE" stroke-width="1.5"/>

  <!-- AWS Lambda -->
  <rect x="440" y="160" width="130" height="100" rx="6" fill="#0C1F38" stroke="#55B9FF"/>
  <text x="505" y="195" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">AWS Lambda</text>
  <text x="505" y="215" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">Python Serverless</text>
  <text x="505" y="230" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Threshold Evaluation</text>
  <text x="505" y="245" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Trigger Solenoid Signal</text>

  <path d="M570 210 L610 210" stroke="#55B9FF" stroke-width="1.5"/>

  <!-- DynamoDB -->
  <rect x="610" y="160" width="130" height="100" rx="6" fill="#0C1F38" stroke="#087BCE"/>
  <text x="675" y="195" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">Amazon DynamoDB</text>
  <text x="675" y="215" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">NoSQL Time-Series</text>
  <text x="675" y="230" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Partitioned Sensor Logs</text>
  <text x="675" y="245" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Sub-10ms Queries</text>

  <!-- Bottom: Analytics & Visualization -->
  <rect x="270" y="290" width="470" height="90" rx="8" fill="#0C1F38" stroke="#1B3558"/>
  <text x="505" y="325" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="12" font-weight="600" text-anchor="middle">Amazon QuickSight &amp; Analytics Dashboard</text>
  <text x="505" y="348" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">Real-time Soil Moisture Curves · Moisture vs. Temperature Trends · Automated Irrigation Events</text>
  <text x="505" y="365" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">Demonstrates end-to-end IoT cloud telemetry architecture engineered with AWS serverless services</text>
`);

// 3. Medallion Lakehouse Architecture (Owais)
const lakehouseSvg = wrapSvg("ENTERPRISE MEDALLION LAKEHOUSE &amp; AI PIPELINE — DATABRICKS", `
  <!-- Sources -->
  <rect x="40" y="110" width="110" height="290" rx="8" fill="#071426" stroke="#1B3558"/>
  <text x="95" y="140" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">DATA SOURCES</text>

  <rect x="50" y="160" width="90" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="95" y="180" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">APIs &amp; Webhooks</text>
  <text x="95" y="193" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">JSON Telemetry</text>

  <rect x="50" y="215" width="90" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="95" y="235" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">RDBMS / JDBC</text>
  <text x="95" y="248" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Postgres / MySQL</text>

  <rect x="50" y="270" width="90" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="95" y="290" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">Storage / S3</text>
  <text x="95" y="303" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Parquet / CSV</text>

  <rect x="50" y="325" width="90" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="95" y="345" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">Auto Loader</text>
  <text x="95" y="358" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Schema Discovery</text>

  <path d="M150 255 L180 255" stroke="#087BCE" stroke-width="2"/>

  <!-- Ingestion -->
  <rect x="180" y="110" width="100" height="290" rx="8" fill="#071426" stroke="#087BCE" stroke-width="1.5"/>
  <text x="230" y="140" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">INGESTION</text>
  <text x="230" y="165" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">PySpark Engine</text>
  <text x="230" y="195" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Streaming Read</text>
  <text x="230" y="220" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Batch Ingestion</text>
  <text x="230" y="245" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Metadata Injection</text>
  <text x="230" y="270" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Checkpointing</text>
  <text x="230" y="300" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Schema Evolution</text>
  <text x="230" y="330" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Fault Tolerant</text>

  <path d="M280 255 L310 255" stroke="#CD7F32" stroke-width="2"/>

  <!-- Bronze Layer -->
  <rect x="310" y="110" width="125" height="290" rx="8" fill="#071426" stroke="#CD7F32" stroke-width="2"/>
  <rect x="320" y="125" width="105" height="22" rx="4" fill="#2E1C0C"/>
  <text x="372" y="140" fill="#E6A15C" font-family="'Inter', sans-serif" font-size="10" font-weight="700" text-anchor="middle">BRONZE LAYER</text>
  <text x="372" y="170" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">Raw Ingestion</text>
  <text x="372" y="195" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Delta Lake Tables</text>
  <text x="372" y="220" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Full History Archive</text>
  <text x="372" y="245" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Append-Only Logs</text>
  <text x="372" y="270" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Source Metadata</text>
  <text x="372" y="300" fill="#E6A15C" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">ACID Transactions</text>

  <path d="M435 255 L465 255" stroke="#C0C0C0" stroke-width="2"/>

  <!-- Silver Layer -->
  <rect x="465" y="110" width="125" height="290" rx="8" fill="#071426" stroke="#C0C0C0" stroke-width="2"/>
  <rect x="475" y="125" width="105" height="22" rx="4" fill="#2A303C"/>
  <text x="527" y="140" fill="#E2E8F0" font-family="'Inter', sans-serif" font-size="10" font-weight="700" text-anchor="middle">SILVER LAYER</text>
  <text x="527" y="170" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">Cleansed &amp; Validated</text>
  <text x="527" y="195" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">De-duplication</text>
  <text x="527" y="220" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Null &amp; Type Casting</text>
  <text x="527" y="245" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Data Quality Rules</text>
  <text x="527" y="270" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Conformed Schemas</text>
  <text x="527" y="300" fill="#E2E8F0" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Upserts &amp; Merges</text>

  <path d="M590 255 L620 255" stroke="#FFD700" stroke-width="2"/>

  <!-- Gold Layer & BI -->
  <rect x="620" y="110" width="140" height="290" rx="8" fill="#071426" stroke="#FFD700" stroke-width="2"/>
  <rect x="630" y="125" width="120" height="22" rx="4" fill="#3D3200"/>
  <text x="690" y="140" fill="#FFE55C" font-family="'Inter', sans-serif" font-size="10" font-weight="700" text-anchor="middle">GOLD &amp; ANALYTICS</text>
  <text x="690" y="170" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">Business Aggregates</text>
  <text x="690" y="195" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Dimensional Models</text>
  <text x="690" y="220" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Star Schema Tables</text>
  <text x="690" y="250" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">Databricks SQL</text>
  <text x="690" y="270" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">Power BI / AI-BI</text>
  <text x="690" y="300" fill="#FFE55C" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Sub-second Queries</text>

  <!-- Unity Catalog Banner across Bottom -->
  <rect x="40" y="420" width="720" height="50" rx="8" fill="#071426" stroke="#087BCE"/>
  <text x="400" y="445" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="700" text-anchor="middle">DATABRICKS UNITY CATALOG GOVERNANCE</text>
  <text x="400" y="460" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Unified Governance · Data Lineage · Row/Column-Level Access Controls · Automated Auditing</text>
`);

// 4. Biometric Attendance Sync & Odoo ERP (Owais)
const biometricSvg = wrapSvg("BIOMETRIC ATTENDANCE HARDWARE TO ODOO ERP INTEGRATION", `
  <!-- Column 1: Hardware Device -->
  <rect x="40" y="120" width="180" height="260" rx="10" fill="#071426" stroke="#087BCE" stroke-width="2"/>
  <rect x="55" y="135" width="150" height="24" rx="4" fill="#1B3558"/>
  <text x="130" y="151" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Anviz Biometric Device</text>

  <rect x="55" y="175" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="130" y="198" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Physical Punch Terminal</text>
  <text x="130" y="213" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Fingerprint &amp; RFID Scans</text>

  <rect x="55" y="235" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="130" y="258" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Internal Log Buffer</text>
  <text x="130" y="273" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Device Memory Preservation</text>

  <rect x="55" y="295" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="130" y="318" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">TCP/IP Network Protocol</text>
  <text x="130" y="333" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Direct LAN Socket / REST</text>

  <path d="M220 250 L270 250" stroke="#55B9FF" stroke-width="2"/>

  <!-- Column 2: Python FastAPI & ETL Pipeline -->
  <rect x="270" y="110" width="260" height="280" rx="10" fill="#071426" stroke="#55B9FF" stroke-width="2"/>
  <rect x="285" y="125" width="230" height="24" rx="4" fill="#1B3558"/>
  <text x="400" y="141" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">FastAPI Middleware &amp; ETL Engine</text>

  <rect x="285" y="165" width="230" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="400" y="185" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Automated Punch Extraction</text>
  <text x="400" y="198" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Scheduled daemon polling Anviz records</text>

  <rect x="285" y="215" width="230" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="400" y="235" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Validation &amp; De-duplication</text>
  <text x="400" y="248" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Eliminates double punches &amp; false triggers</text>

  <rect x="285" y="265" width="230" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="400" y="285" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Employee Mapping &amp; Shifts</text>
  <text x="400" y="298" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Device ID to Enterprise Corporate ID</text>

  <rect x="285" y="315" width="230" height="60" rx="4" fill="#0C1F38" stroke="#087BCE"/>
  <text x="400" y="338" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">PostgreSQL Audit Store</text>
  <text x="400" y="355" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Complete historical raw punch logs + status states</text>

  <path d="M530 250 L580 250" stroke="#1F9D6B" stroke-width="2"/>

  <!-- Column 3: Odoo ERP Target -->
  <rect x="580" y="120" width="180" height="260" rx="10" fill="#071426" stroke="#1F9D6B" stroke-width="2"/>
  <rect x="595" y="135" width="150" height="24" rx="4" fill="#1B3558"/>
  <text x="670" y="151" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Odoo ERP System</text>

  <rect x="595" y="175" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="670" y="198" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Odoo REST / XML-RPC</text>
  <text x="670" y="213" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Bi-directional Secure API</text>

  <rect x="595" y="235" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="670" y="258" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">HR &amp; Attendance Module</text>
  <text x="670" y="273" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Daily Check-in / Check-out</text>

  <rect x="595" y="295" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="670" y="318" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Payroll &amp; Overtime</text>
  <text x="670" y="333" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Automated Hours Computation</text>
`);

// 5. Enterprise QA CRM & VICIdial Telephony (Owais)
const qaCrmSvg = wrapSvg("ENTERPRISE QA CRM &amp; VICIDIAL TELEPHONY PIPELINE", `
  <!-- Call Sources -->
  <rect x="40" y="120" width="180" height="260" rx="10" fill="#071426" stroke="#087BCE" stroke-width="2"/>
  <rect x="55" y="135" width="150" height="24" rx="4" fill="#1B3558"/>
  <text x="130" y="151" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">VICIdial PBX Servers</text>

  <rect x="55" y="175" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="130" y="198" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Asterisk Telephony</text>
  <text x="130" y="213" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Inbound / Outbound Calls</text>

  <rect x="55" y="235" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="130" y="258" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Call Audio Recordings</text>
  <text x="130" y="273" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">WAV/MP3 Audio Storage</text>

  <rect x="55" y="295" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="130" y="318" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Agent Dispositions</text>
  <text x="130" y="333" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Sale, Callback, DNC, Voicemail</text>

  <path d="M220 250 L270 250" stroke="#55B9FF" stroke-width="2"/>

  <!-- Middleware -->
  <rect x="270" y="110" width="260" height="280" rx="10" fill="#071426" stroke="#55B9FF" stroke-width="2"/>
  <rect x="285" y="125" width="230" height="24" rx="4" fill="#1B3558"/>
  <text x="400" y="141" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Python FastAPI Integration Backend</text>

  <rect x="285" y="165" width="230" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="400" y="185" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">API Extraction &amp; Polling</text>
  <text x="400" y="198" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Syncs completed call logs every 60s</text>

  <rect x="285" y="215" width="230" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="400" y="235" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Metadata Normalization</text>
  <text x="400" y="248" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Agent ID, Campaign, Duration, Audio URL</text>

  <rect x="285" y="265" width="230" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="400" y="285" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">PostgreSQL Database</text>
  <text x="400" y="298" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Indexed relational store with audit history</text>

  <rect x="285" y="315" width="230" height="60" rx="4" fill="#0C1F38" stroke="#087BCE"/>
  <text x="400" y="338" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Dockerized Infrastructure</text>
  <text x="400" y="355" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Isolated containerized services with auto-restart</text>

  <path d="M530 250 L580 250" stroke="#1F9D6B" stroke-width="2"/>

  <!-- QA Scorecards & CRM Dashboard -->
  <rect x="580" y="120" width="180" height="260" rx="10" fill="#071426" stroke="#1F9D6B" stroke-width="2"/>
  <rect x="595" y="135" width="150" height="24" rx="4" fill="#1B3558"/>
  <text x="670" y="151" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">QA CRM &amp; Analytics</text>

  <rect x="595" y="175" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="670" y="198" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Evaluation Scorecards</text>
  <text x="670" y="213" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Opening, Compliance, Scripting</text>

  <rect x="595" y="235" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="670" y="258" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Audio Waveform Player</text>
  <text x="670" y="273" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Integrated in-browser listening</text>

  <rect x="595" y="295" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="670" y="318" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Agent Performance KPIs</text>
  <text x="670" y="333" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Average Scores, Fatal Flaws, Trends</text>
`);

// 6. Workforce Monitoring & Idle Alert System (Azhar)
const workforceSvg = wrapSvg("ENTERPRISE WORKFORCE MONITORING &amp; IDLE ALERT ENGINE", `
  <!-- Desktop Client -->
  <rect x="40" y="120" width="180" height="260" rx="10" fill="#071426" stroke="#087BCE" stroke-width="2"/>
  <rect x="55" y="135" width="150" height="24" rx="4" fill="#1B3558"/>
  <text x="130" y="151" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Windows Workstation Agent</text>

  <rect x="55" y="175" width="150" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="130" y="195" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Python Desktop Service</text>
  <text x="130" y="208" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Silent background process</text>

  <rect x="55" y="225" width="150" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="130" y="245" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Periodic Screen Capture</text>
  <text x="130" y="258" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Encrypted automated snapshots</text>

  <rect x="55" y="275" width="150" height="42" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="130" y="295" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Check-In / Break Tray</text>
  <text x="130" y="308" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Accurate productive time</text>

  <rect x="55" y="325" width="150" height="42" rx="4" fill="#0C1F38" stroke="#087BCE"/>
  <text x="130" y="345" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Input Hook Telemetry</text>
  <text x="130" y="358" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Mouse / Keyboard idle timers</text>

  <path d="M220 250 L270 250" stroke="#55B9FF" stroke-width="2"/>

  <!-- Middle Detection Core -->
  <rect x="270" y="110" width="260" height="280" rx="10" fill="#071426" stroke="#55B9FF" stroke-width="2"/>
  <rect x="285" y="125" width="230" height="24" rx="4" fill="#1B3558"/>
  <text x="400" y="141" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Idle Logic &amp; Central REST Backend</text>

  <rect x="285" y="165" width="230" height="48" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="400" y="185" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">2-Minute Inactivity Trigger</text>
  <text x="400" y="202" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Detects PC on with zero physical user input</text>

  <rect x="285" y="223" width="230" height="48" rx="4" fill="#0C1F38" stroke="#087BCE"/>
  <text x="400" y="243" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Real-Time Alert Dispatch</text>
  <text x="400" y="260" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Instant WebSocket &amp; email alert to Super Admin</text>

  <rect x="285" y="281" width="230" height="48" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="400" y="301" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Worked-Hours Calculation</text>
  <text x="400" y="318" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Deducts verified breaks and idle blocks automatically</text>

  <rect x="285" y="339" width="230" height="40" rx="4" fill="#1B3558"/>
  <text x="400" y="363" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="9" font-weight="600" text-anchor="middle">Encrypted Storage &amp; Image Hash Verification</text>

  <path d="M530 250 L580 250" stroke="#1F9D6B" stroke-width="2"/>

  <!-- Admin Dashboard -->
  <rect x="580" y="120" width="180" height="260" rx="10" fill="#071426" stroke="#1F9D6B" stroke-width="2"/>
  <rect x="595" y="135" width="150" height="24" rx="4" fill="#1B3558"/>
  <text x="670" y="151" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Super Admin Dashboard</text>

  <rect x="595" y="175" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="670" y="198" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Live Status Grid</text>
  <text x="670" y="213" fill="#55B9FF" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Active · Idle · On Break · Offline</text>

  <rect x="595" y="235" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="670" y="258" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Screen Reviewer</text>
  <text x="670" y="273" fill="#1F9D6B" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Timeline scrubber with timestamps</text>

  <rect x="595" y="295" width="150" height="50" rx="4" fill="#0C1F38" stroke="#1B3558"/>
  <text x="670" y="318" fill="#FFFFFF" font-family="'Inter', sans-serif" font-size="10" font-weight="600" text-anchor="middle">Payroll Reports</text>
  <text x="670" y="333" fill="#93C5FD" font-family="'Inter', sans-serif" font-size="8" text-anchor="middle">Exportable verified working hours</text>
`);

// Write out all files
fs.writeFileSync(path.join(dir, 'lms-portal-diagram.svg'), lmsSvg, 'utf8');
fs.writeFileSync(path.join(dir, 'smart-farming-iot-diagram.svg'), iotSvg, 'utf8');
fs.writeFileSync(path.join(dir, 'lakehouse-architecture-diagram.svg'), lakehouseSvg, 'utf8');
fs.writeFileSync(path.join(dir, 'biometric-odoo-sync-diagram.svg'), biometricSvg, 'utf8');
fs.writeFileSync(path.join(dir, 'qa-crm-telephony-diagram.svg'), qaCrmSvg, 'utf8');
fs.writeFileSync(path.join(dir, 'workforce-monitoring-diagram.svg'), workforceSvg, 'utf8');

console.log('Successfully generated 6 high-resolution SVG project architecture diagrams!');
