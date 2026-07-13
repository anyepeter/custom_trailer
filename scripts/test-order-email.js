/**
 * Standalone email deliverability test.
 *
 * Usage:
 *   node scripts/test-order-email.js you@example.com
 *   node scripts/test-order-email.js you@example.com "the-password"
 *
 * It reads SMTP settings from .env (same values the app uses), checks that it
 * can log in to the mail server, then sends a plain test email to the address
 * you pass on the command line. Check that inbox (and its Spam folder).
 *
 * Pass the password as a 2nd argument to try one WITHOUT editing .env first.
 */
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// --- minimal .env loader (no dependency on dotenv) ---
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const out = {};
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return out;
}

const env = loadEnv();
const HOST = process.env.SMTP_HOST || env.SMTP_HOST || 'smtp.hostinger.com';
const PORT = parseInt(process.env.SMTP_PORT || env.SMTP_PORT || '465');
const USER = process.env.SMTP_USER || env.SMTP_USER;
const FROM = process.env.SMTP_FROM || env.SMTP_FROM || USER;

const to = process.argv[2];
// Optional 2nd arg lets you try a password without editing .env.
const PASS = process.argv[3] || process.env.SMTP_PASS || env.SMTP_PASS;
if (!to) {
  console.error('Usage: node scripts/test-order-email.js you@example.com ["password"]');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  secure: PORT === 465,
  auth: USER && PASS ? { user: USER, pass: PASS } : undefined,
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

(async () => {
  console.log(`SMTP -> ${HOST}:${PORT} as ${USER}`);
  try {
    await transporter.verify();
    console.log('LOGIN: OK\n');
  } catch (e) {
    console.error('LOGIN: FAILED ->', e.message);
    console.error('\nThe app cannot log in to the mail server, so NO emails can be sent.');
    console.error('Fix the SMTP_USER / SMTP_PASS (verify the mailbox password in Hostinger),');
    console.error('then run this again.');
    process.exit(1);
  }

  try {
    const info = await transporter.sendMail({
      from: FROM,
      to,
      subject: `Order email test - ${new Date().toLocaleString()}`,
      text: `If you received this, order emails to ${to} will be delivered.`,
    });
    console.log(`SENT to ${to}`);
    console.log('  accepted:', JSON.stringify(info.accepted));
    console.log('  rejected:', JSON.stringify(info.rejected));
    console.log('  response:', info.response);
    console.log('\nNow check that inbox (and its Spam/Junk folder).');
  } catch (e) {
    console.error('SEND FAILED ->', e.message);
    process.exit(1);
  } finally {
    transporter.close();
  }
})();
