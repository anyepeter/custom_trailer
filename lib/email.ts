import nodemailer from 'nodemailer';
import { PAYMENT_METHOD_OPTIONS } from '@/types/configurator';
import { customTruckDesignHTML, generatePdfFromHtml } from './pdf/generatePdf';

// Email configuration from environment variables
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = 'Fe@rLes$237';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const SALES_EMAIL = process.env.SALES_EMAIL || 'sales@customtrailerspro.com';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  auth: SMTP_USER && SMTP_PASS ? {
    user: SMTP_USER,
    pass: SMTP_PASS,
  } : undefined,
});

export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    return { success: true };
  } catch (error) {
    console.error('Email configuration error:', error);
    return { success: false, error };
  }
}

interface CustomTruckData {
  // User Information
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipcode: string;
  paymentMethods: string;

  // Truck Configuration
  trailerSize: string;
  porchConfiguration?: string;
  rangeHood: string;
  fireSuppressionSystem: string;
  flatTopGriddle?: string;
  charbroiler?: string;
  deepFryer?: string;
  range?: string;
  steamWell?: string;
  warmingCabinet?: string;
  refrigeration: string[];

  // Customization
  exteriorColor: string;
  interiorFinish: string;

  // Financial
  budget: string;
  needFinancing: string;
  totalPrice?: number;

  // Additional
  additionalInfo?: string;
}

function generateSalesNotificationEmailHTML(data: CustomTruckData): string {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    zipcode,
    paymentMethods,
    trailerSize,
    porchConfiguration,
    rangeHood,
    fireSuppressionSystem,
    flatTopGriddle,
    charbroiler,
    deepFryer,
    range,
    steamWell,
    warmingCabinet,
    refrigeration,
    exteriorColor,
    interiorFinish,
    budget,
    needFinancing,
    totalPrice,
    additionalInfo,
  } = data;

  // Get payment method label
  const paymentMethodLabel = PAYMENT_METHOD_OPTIONS.find(
    option => option.value === paymentMethods
  )?.label || paymentMethods;

  // Format price
  const formattedPrice = totalPrice 
    ? `$${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
    : 'Not specified';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Custom Truck Order</title>
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
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
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
    .alert-banner {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-left: 5px solid #f59e0b;
      padding: 18px 20px;
      margin-bottom: 30px;
      border-radius: 6px;
    }
    .alert-banner h2 {
      margin: 0 0 8px;
      font-size: 18px;
      color: #92400e;
      font-weight: 700;
    }
    .alert-banner p {
      margin: 0;
      color: #78350f;
      font-size: 14px;
    }
    .highlight-card {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border: 2px solid #3b82f6;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 30px;
    }
    .highlight-card h3 {
      margin: 0 0 18px;
      font-size: 16px;
      color: #1e40af;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .key-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .info-item {
      background-color: #ffffff;
      padding: 15px;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .info-item label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .info-item .value {
      font-size: 16px;
      font-weight: 700;
      color: #1f2937;
    }
    .info-item.total .value {
      color: #059669;
      font-size: 22px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section h3 {
      margin: 0 0 15px;
      font-size: 16px;
      color: #1f2937;
      font-weight: 700;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 8px;
    }
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .detail-item {
      background-color: #f9fafb;
      padding: 12px 15px;
      border-radius: 4px;
      border-left: 3px solid #3b82f6;
    }
    .detail-item label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .detail-item .value {
      font-size: 14px;
      color: #1f2937;
      font-weight: 500;
    }
    .full-width {
      grid-column: 1 / -1;
    }
    .equipment-list {
      background-color: #f9fafb;
      padding: 15px;
      border-radius: 6px;
      margin-top: 10px;
    }
    .equipment-list ul {
      margin: 0;
      padding-left: 20px;
      color: #374151;
    }
    .equipment-list li {
      margin-bottom: 6px;
      line-height: 1.5;
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
    .footer a {
      color: #60a5fa;
      text-decoration: none;
    }
    .action-required {
      background-color: #fee2e2;
      border: 2px solid #ef4444;
      padding: 18px;
      border-radius: 6px;
      margin-top: 25px;
    }
    .action-required h3 {
      margin: 0 0 10px;
      font-size: 16px;
      color: #991b1b;
      font-weight: 700;
    }
    .action-required p {
      margin: 0;
      color: #7f1d1d;
      font-size: 14px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🎉 New Custom Truck Order Received!</h1>
      <p>A new customer has submitted a design request</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Alert Banner -->
      <div class="alert-banner">
        <h2>⚡ Action Required</h2>
        <p>Please review the attached quote PDF and contact the customer within 24 hours.</p>
      </div>

      <!-- Key Information Card -->
      <div class="highlight-card">
        <h3>📊 Order Summary</h3>
        <div class="key-info">
          <div class="info-item">
            <label>Customer Name</label>
            <div class="value">${firstName} ${lastName}</div>
          </div>
          <div class="info-item">
            <label>Payment Method</label>
            <div class="value">${paymentMethodLabel}</div>
          </div>
          <div class="info-item total">
            <label>Total Amount</label>
            <div class="value">${formattedPrice}</div>
          </div>
          <div class="info-item">
            <label>Financing Needed</label>
            <div class="value">${needFinancing}</div>
          </div>
        </div>
      </div>

      <!-- Customer Details -->
      <div class="section">
        <h3>👤 Customer Information</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <label>Email</label>
            <div class="value">${email}</div>
          </div>
          <div class="detail-item">
            <label>Phone</label>
            <div class="value">${phoneNumber}</div>
          </div>
          <div class="detail-item">
            <label>Address</label>
            <div class="value">${address}</div>
          </div>
          <div class="detail-item">
            <label>Zipcode</label>
            <div class="value">${zipcode}</div>
          </div>
          <div class="detail-item">
            <label>Budget Range</label>
            <div class="value">${budget}</div>
          </div>
        </div>
      </div>

      <!-- Truck Configuration -->
      <div class="section">
        <h3>🚚 Truck Configuration</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <label>Trailer Size</label>
            <div class="value">${trailerSize}</div>
          </div>
          ${porchConfiguration ? `
          <div class="detail-item">
            <label>Porch Configuration</label>
            <div class="value">${porchConfiguration}</div>
          </div>
          ` : ''}
          <div class="detail-item">
            <label>Exterior Color</label>
            <div class="value">${exteriorColor}</div>
          </div>
          <div class="detail-item">
            <label>Interior Finish</label>
            <div class="value">${interiorFinish}</div>
          </div>
          <div class="detail-item">
            <label>Range Hood</label>
            <div class="value">${rangeHood}</div>
          </div>
          <div class="detail-item">
            <label>Fire Suppression</label>
            <div class="value">${fireSuppressionSystem}</div>
          </div>
        </div>
      </div>

      ${additionalInfo ? `
      <!-- Additional Information -->
      <div class="section">
        <h3>📝 Additional Information</h3>
        <div class="detail-item full-width">
          <div class="value">${additionalInfo}</div>
        </div>
      </div>
      ` : ''}

      <!-- Action Required -->
      <div class="action-required">
        <h3>📋 Next Steps</h3>
        <p><strong>1.</strong> Review the attached PDF quote for complete details<br>
        <strong>2.</strong> Contact ${firstName} at ${email} or ${phoneNumber} within 24 hours<br>
        <strong>3.</strong> Update the CRM with this new lead</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Custom Trailers Pro - Sales Team</strong></p>
      <p>
        📧 <a href="mailto:sales@customtrailerspro.com">sales@customtrailerspro.com</a> | 
        📞 <a href="tel:+15012162500">+1 501 216 2500</a>
      </p>
      <p style="margin-top: 15px; font-size: 12px; color: #6b7280;">
        This is an automated notification. Please do not reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}


// Generate professional HTML email template
function generateCustomTruckEmailHTML(data: CustomTruckData): string {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    zipcode,
    paymentMethods,
    trailerSize,
    porchConfiguration,
    rangeHood,
    fireSuppressionSystem,
    flatTopGriddle,
    charbroiler,
    deepFryer,
    range,
    steamWell,
    warmingCabinet,
    refrigeration,
    exteriorColor,
    interiorFinish,
    budget,
    needFinancing,
    totalPrice,
    additionalInfo,
  } = data;

  // Get payment method label
  const paymentMethodLabel = PAYMENT_METHOD_OPTIONS.find(
    option => option.value === paymentMethods
  )?.label || paymentMethods;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Custom Food Truck Design</title>
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
      padding: 40px 20px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: #1f2937;
      font-weight: 600;
    }
    .section {
      margin-bottom: 30px;
      line-height: 1.6;
    }
    .section p {
      margin: 0 0 15px;
      color: #4b5563;
    }
    .next-steps {
      background-color: #f9fafb;
      border-left: 4px solid #2563eb;
      padding: 25px;
      margin: 30px 0;
      border-radius: 4px;
    }
    .next-steps h2 {
      margin: 0 0 20px;
      font-size: 20px;
      color: #1f2937;
      font-weight: 600;
    }
    .step {
      display: flex;
      align-items: flex-start;
      margin-bottom: 18px;
    }
    .step:last-child {
      margin-bottom: 0;
    }
    .step-number {
      width: 28px;
      height: 28px;
      font-weight: 700;
      font-size: 14px;
      flex-shrink: 0;
      margin-right: 15px;
    }
    .step-content {
      flex: 1;
      padding-top: 3px;
    }
    .step-content p {
      margin: 0;
      color: #374151;
      font-size: 15px;
      line-height: 1.5;
    }
    .cta-button {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 15px;
      margin: 10px 0;
      transition: background-color 0.3s ease;
    }
    .cta-button:hover {
      background-color: #1e40af;
    }
    .contact-info {
      background-color: #fefce8;
      border: 1px solid #fde047;
      padding: 20px;
      border-radius: 6px;
      margin-top: 30px;
    }
    .contact-info h3 {
      margin: 0 0 12px;
      font-size: 16px;
      color: #854d0e;
      font-weight: 600;
    }
    .contact-info p {
      margin: 0;
      color: #713f12;
      font-size: 14px;
      line-height: 1.6;
    }
    .footer {
      background-color: #f9fafb;
      padding: 25px 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 0;
      color: #6b7280;
      font-size: 13px;
      line-height: 1.5;
    }
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 30px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🚚 Your Custom Trailer Quote</h1>
      <p>Your design is ready for review</p>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="greeting">
        Hello ${firstName},
      </div>

      <div class="section">
        <p>Thank you for your interest in building a custom food truck with us! We're excited to work with you.</p>
        <p>We've prepared a detailed quote based on your specifications. Please review the attached PDF carefully. It includes all the features, pricing, and terms for your custom build.</p>
      </div>

      <!-- Next Steps Section -->
      <div class="next-steps">
        <h2>📋 Next Steps</h2>
        
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <p><strong>Download the PDF</strong> attached to this email and review all details carefully.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <p><strong>Sign the document</strong> if you're ready to move forward with your custom truck build.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <p><strong>Return the signed quote</strong> by replying to this email, or contact us if you have questions or need clarification.</p>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="contact-info">
        <h3>💬 Have Questions?</h3>
        <p>We're here to help! If you need any clarification about your quote or want to discuss modifications, don't hesitate to reach out. Simply reply to this email and we'll get back to you promptly.</p>
      </div>

      <div class="divider"></div>

      <div class="section">
        <p style="margin-bottom: 5px;">We look forward to bringing your vision to life!</p>
        <p style="margin: 0; font-weight: 600; color: #1f2937;">The Custom Trailers Team</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Custom Trailers Pro</strong></p>
      <p style="margin-top: 15px;">
        📧 <a href="mailto:sales@customtrailerspro.com" style="color: #2563eb; text-decoration: none;">sales@customtrailerspro.com</a><br>
        📞 <a href="tel:+15012162500" style="color: #2563eb; text-decoration: none;">+1 501 216 2500</a><br>
        🌐 <a href="https://customtrailerspro.com/" style="color: #2563eb; text-decoration: none;">customtrailerspro.com</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

// Send custom truck design email
export async function sendCustomTruckDesignEmail(data: CustomTruckData) {
  try {
    console.log('[Email Service] Starting custom truck design email process...');
    console.log('[Email Service] Customer:', data.firstName, data.lastName, '- Email:', data.email);

    // Step 1: Generate HTML email content
    console.log('[Email Service] Step 1: Generating HTML email content...');
    const htmlContent = generateCustomTruckEmailHTML(data);
    const htmlSalesContent = generateSalesNotificationEmailHTML(data);
    console.log('[Email Service] HTML content generated successfully');

    // Step 2: Generate PDF with the actual user data
    console.log('[Email Service] Step 2: Generating PDF from HTML content...');
    console.log('[Email Service] Environment:', process.env.NODE_ENV);

    let pdfBuffer: Buffer;
    try {
      const pdfData = await generatePdfFromHtml(customTruckDesignHTML(data));
      pdfBuffer = Buffer.from(pdfData);
      console.log('[Email Service] PDF generated successfully. Size:', pdfBuffer.length, 'bytes');
      console.log('[Email Service] PDF buffer type:', typeof pdfBuffer, 'Is Buffer:', Buffer.isBuffer(pdfBuffer));
    } catch (pdfError) {
      console.error('[Email Service] PDF generation failed:', pdfError);
      console.error('[Email Service] PDF Error stack:', pdfError instanceof Error ? pdfError.stack : 'No stack trace');
      throw new Error(`PDF generation failed: ${pdfError instanceof Error ? pdfError.message : 'Unknown error'}`);
    }

    // Step 3: Send email to customer
    console.log('[Email Service] Step 3: Sending email to customer...');
    console.log('[Email Service] SMTP Config:', {
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      from: SMTP_FROM,
      hasPassword: !!SMTP_PASS
    });

    let customerEmail;
    try {
      customerEmail = await transporter.sendMail({
        from: `"Custom Trailers Pro" <${SMTP_FROM}>`,
        to: data.email,
        subject: '🚚 Your Custom Trailer Design - CustomTrailersPro',
        html: htmlContent,
        attachments: [
          {
            filename: 'custom-trailer-design.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf',
            encoding: 'base64',
          },
        ],
      });
      console.log('[Email Service] Customer email sent successfully. Message ID:', customerEmail.messageId);
    } catch (customerEmailError) {
      console.error('[Email Service] Customer email failed:', customerEmailError);
      throw new Error(`Customer email failed: ${customerEmailError instanceof Error ? customerEmailError.message : 'Unknown error'}`);
    }

    // Step 4: Send email to sales team
    console.log('[Email Service] Step 4: Sending notification to sales team...');
    try {
      await transporter.sendMail({
        from: `"Custom Trailers Pro System" <${SMTP_FROM}>`,
        to: SALES_EMAIL,
        subject: `🎉 New Order: ${data.firstName} ${data.lastName} - ${data.paymentMethods}`,
        html: htmlSalesContent,
        attachments: [
          {
            filename: 'customer-quote.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf',
            encoding: 'base64',
          },
        ],
      });
      console.log('[Email Service] Sales notification sent successfully');
    } catch (salesEmailError) {
      console.error('[Email Service] Sales email failed:', salesEmailError);
      // Don't throw here - customer email already sent
      console.warn('[Email Service] Customer email was sent, but sales notification failed');
    }

    console.log('[Email Service] Process completed successfully');
    return {
      success: true,
      messageId: customerEmail.messageId,
      message: 'Emails sent successfully',
    };
  } catch (error) {
    console.error('[Email Service] FATAL ERROR:', error);
    console.error('[Email Service] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      type: typeof error,
      customerEmail: data.email
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}
