'use server';

import nodemailer from 'nodemailer';

// Email configuration
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = 'Fe@rLes$237';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const SALES_EMAIL = process.env.SALES_EMAIL || 'sales@customtrailerspro.com';

// Create transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER && SMTP_PASS ? {
    user: SMTP_USER,
    pass: SMTP_PASS,
  } : undefined,
});

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: 'call' | 'text' | 'email';
}

// User acknowledgment email template
function generateUserEmailHTML(data: ContactFormData): string {
  const { fullName, email, phone, message, preferredContact } = data;

  const contactMethodLabel = {
    call: '📞 Phone Call',
    text: '💬 Text Message',
    email: '✉️ Email',
  }[preferredContact];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      padding: 40px 30px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0 0 10px;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 20px;
      margin-bottom: 20px;
      color: #1f2937;
      font-weight: 600;
    }
    .message-box {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-left: 4px solid #2563eb;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
    }
    .message-box h2 {
      margin: 0 0 15px;
      font-size: 18px;
      color: #1e40af;
      font-weight: 700;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 12px;
      margin-top: 15px;
    }
    .summary-label {
      font-weight: 600;
      color: #1e40af;
      font-size: 14px;
    }
    .summary-value {
      color: #1f2937;
      font-size: 14px;
    }
    .section {
      margin-bottom: 25px;
      line-height: 1.6;
    }
    .section p {
      margin: 0 0 15px;
      color: #4b5563;
      font-size: 15px;
    }
    .next-steps {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 25px;
      margin: 30px 0;
      border-radius: 8px;
    }
    .next-steps h2 {
      margin: 0 0 15px;
      font-size: 18px;
      color: #92400e;
      font-weight: 700;
    }
    .next-steps ul {
      margin: 0;
      padding-left: 20px;
      color: #78350f;
    }
    .next-steps li {
      margin-bottom: 10px;
      line-height: 1.5;
    }
    .contact-card {
      background-color: #f9fafb;
      border: 2px solid #e5e7eb;
      padding: 25px;
      border-radius: 8px;
      margin: 30px 0;
      text-align: center;
    }
    .contact-card h3 {
      margin: 0 0 15px;
      font-size: 18px;
      color: #1f2937;
      font-weight: 700;
    }
    .contact-methods {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 15px;
      flex-wrap: wrap;
    }
    .contact-method {
      display: inline-block;
      background-color: #ffffff;
      padding: 12px 20px;
      border-radius: 6px;
      text-decoration: none;
      color: #2563eb;
      font-weight: 600;
      border: 2px solid #e5e7eb;
      transition: all 0.2s;
    }
    .contact-method:hover {
      border-color: #2563eb;
      background-color: #eff6ff;
    }
    .footer {
      background-color: #1f2937;
      padding: 30px;
      text-align: center;
      color: #9ca3af;
    }
    .footer p {
      margin: 0 0 10px;
      font-size: 13px;
      line-height: 1.6;
    }
    .footer a {
      color: #60a5fa;
      text-decoration: none;
    }
    .checkmark {
      width: 60px;
      height: 60px;
      background-color: #10b981;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="checkmark">✓</div>
      <h1>Message Received!</h1>
      <p>We'll be in touch soon</p>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="greeting">
        Hi ${fullName},
      </div>

      <div class="section">
        <p>Thank you for reaching out to Custom Trailer Pro! We've successfully received your message and our team will get back to you within 24 hours.</p>
      </div>

      <!-- Message Summary -->
      <div class="message-box">
        <h2>📋 Your Submission Summary</h2>
        <div class="summary-grid">
          <div class="summary-label">Name:</div>
          <div class="summary-value">${fullName}</div>

          <div class="summary-label">Email:</div>
          <div class="summary-value">${email}</div>

          <div class="summary-label">Phone:</div>
          <div class="summary-value">${phone}</div>

          <div class="summary-label">Preferred Contact:</div>
          <div class="summary-value">${contactMethodLabel}</div>

          <div class="summary-label">Your Message:</div>
          <div class="summary-value">${message}</div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="next-steps">
        <h2>⏱️ What Happens Next?</h2>
        <ul>
          <li><strong>Within 24 hours:</strong> A member of our team will review your message</li>
          <li><strong>We'll reach out:</strong> Via your preferred method (${contactMethodLabel})</li>
          <li><strong>Get started:</strong> We'll discuss your custom trailer needs and provide expert guidance</li>
        </ul>
      </div>

      <!-- Contact Information -->
      <div class="contact-card">
        <h3>Need Immediate Assistance?</h3>
        <p style="color: #6b7280; margin: 0 0 15px;">Feel free to reach out directly:</p>
        <div class="contact-methods">
          <a href="tel:+15012162500" class="contact-method">📞 Call Us</a>
          <a href="mailto:sales@customtrailerspro.com" class="contact-method">✉️ Email Us</a>
        </div>
      </div>

      <div class="section">
        <p style="margin-bottom: 5px; color: #1f2937; font-size: 16px;">We're excited to help you build your dream custom trailer!</p>
        <p style="margin: 0; font-weight: 600; color: #1f2937;">— The Custom Trailer Pro Team</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Custom Trailer Pro</strong></p>
      <p>
        📧 <a href="mailto:sales@customtrailerspro.com">sales@customtrailerspro.com</a> |
        📞 <a href="tel:+15012162500">+1 501 216-2500</a>
      </p>
      <p style="margin-top: 15px; font-size: 12px;">
        10101 W 87th St, Suite 200<br>
        Overland Park, KS 66212
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

// Sales team notification email template
function generateSalesEmailHTML(data: ContactFormData): string {
  const { fullName, email, phone, message, preferredContact } = data;

  const contactMethodLabel = {
    call: '📞 Phone Call',
    text: '💬 Text Message',
    email: '✉️ Email',
  }[preferredContact];

  const currentDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      color: #333;
    }
    .container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 35px 30px;
      color: #ffffff;
    }
    .header h1 {
      margin: 0 0 8px;
      font-size: 26px;
      font-weight: 700;
    }
    .header p {
      margin: 0;
      font-size: 15px;
      opacity: 0.95;
    }
    .content {
      padding: 35px 30px;
    }
    .urgent-banner {
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      border-left: 5px solid #ef4444;
      padding: 18px 20px;
      margin-bottom: 30px;
      border-radius: 6px;
    }
    .urgent-banner h2 {
      margin: 0 0 8px;
      font-size: 18px;
      color: #991b1b;
      font-weight: 700;
    }
    .urgent-banner p {
      margin: 0;
      color: #7f1d1d;
      font-size: 14px;
    }
    .info-card {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border: 2px solid #3b82f6;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 30px;
    }
    .info-card h3 {
      margin: 0 0 20px;
      font-size: 16px;
      color: #1e40af;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 15px;
    }
    .info-label {
      font-weight: 700;
      color: #1e40af;
      font-size: 13px;
    }
    .info-value {
      color: #1f2937;
      font-size: 14px;
      font-weight: 500;
    }
    .message-section {
      background-color: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin: 25px 0;
    }
    .message-section h3 {
      margin: 0 0 15px;
      font-size: 16px;
      color: #1f2937;
      font-weight: 700;
    }
    .message-content {
      background-color: #ffffff;
      padding: 15px;
      border-radius: 6px;
      border-left: 3px solid #3b82f6;
      color: #374151;
      line-height: 1.6;
      font-size: 14px;
    }
    .action-buttons {
      display: flex;
      gap: 15px;
      margin: 25px 0;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
    }
    .btn-primary {
      background-color: #2563eb;
      color: #ffffff;
    }
    .btn-secondary {
      background-color: #10b981;
      color: #ffffff;
    }
    .timestamp {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px 20px;
      border-radius: 6px;
      margin-bottom: 25px;
    }
    .timestamp p {
      margin: 0;
      color: #78350f;
      font-size: 13px;
      font-weight: 600;
    }
    .footer {
      background-color: #1f2937;
      padding: 25px 30px;
      text-align: center;
      color: #9ca3af;
    }
    .footer p {
      margin: 0 0 10px;
      font-size: 13px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🎯 New Contact Form Submission!</h1>
      <p>A potential customer has reached out</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Urgent Banner -->
      <div class="urgent-banner">
        <h2>⚡ Action Required</h2>
        <p>Please respond to this inquiry within 24 hours via the customer's preferred contact method.</p>
      </div>

      <!-- Timestamp -->
      <div class="timestamp">
        <p>📅 Received: ${currentDate}</p>
      </div>

      <!-- Customer Information -->
      <div class="info-card">
        <h3>👤 Contact Information</h3>
        <div class="info-grid">
          <div class="info-label">Name:</div>
          <div class="info-value">${fullName}</div>

          <div class="info-label">Email:</div>
          <div class="info-value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>

          <div class="info-label">Phone:</div>
          <div class="info-value"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></div>

          <div class="info-label">Preferred Contact:</div>
          <div class="info-value"><strong>${contactMethodLabel}</strong></div>
        </div>
      </div>

      <!-- Customer Message -->
      <div class="message-section">
        <h3>💬 Customer Message</h3>
        <div class="message-content">
          ${message}
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="action-buttons">
        <a href="mailto:${email}" class="btn btn-primary">📧 Send Email</a>
        <a href="tel:${phone}" class="btn btn-secondary">📞 Call Now</a>
      </div>

      <!-- Next Steps -->
      <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 6px; margin-top: 25px;">
        <h3 style="margin: 0 0 12px; font-size: 16px; color: #065f46; font-weight: 700;">📋 Recommended Next Steps</h3>
        <ol style="margin: 0; padding-left: 20px; color: #047857; line-height: 1.8;">
          <li>Review the customer's message and preferred contact method</li>
          <li>Respond within 24 hours via their preferred method: ${contactMethodLabel}</li>
          <li>Add this lead to the CRM system</li>
          <li>Schedule a follow-up if they don't respond within 48 hours</li>
        </ol>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Custom Trailer Pro - Sales Team</strong></p>
      <p>This is an automated notification from your website contact form.</p>
      <p style="margin-top: 15px; font-size: 12px; color: #6b7280;">
        Do not reply to this email. Contact the customer directly using the information provided above.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Generate email templates
    const userEmailHTML = generateUserEmailHTML(data);
    const salesEmailHTML = generateSalesEmailHTML(data);

    // Send email to user
    await transporter.sendMail({
      from: `"Custom Trailer Pro" <${SMTP_FROM}>`,
      to: data.email,
      subject: '✓ We Received Your Message - Custom Trailer Pro',
      html: userEmailHTML,
    });

    // Send notification to sales team
    await transporter.sendMail({
      from: `"Custom Trailer Pro System" <${SMTP_FROM}>`,
      to: SALES_EMAIL,
      subject: `🎯 New Contact: ${data.fullName} - ${data.preferredContact === 'call' ? 'Call' : data.preferredContact === 'text' ? 'Text' : 'Email'} Preferred`,
      html: salesEmailHTML,
    });

    return {
      success: true,
      message: 'Your message has been sent successfully! Check your email for confirmation.',
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
    };
  }
}
