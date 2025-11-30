import nodemailer from 'nodemailer';
import { PAYMENT_METHOD_OPTIONS } from '@/types/configurator';

// Email configuration from environment variables
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = 'Fe@rLes$237';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const SALES_EMAIL = process.env.SALES_EMAIL || 'sales@foodtruckspro.com';

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

// Generate professional HTML email template
function generateCustomTruckEmailHTML(data: CustomTruckData): string {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
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
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #2563eb;
    }
    .detail-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .detail-label {
      font-weight: 600;
      color: #4b5563;
      width: 40%;
      flex-shrink: 0;
    }
    .detail-value {
      color: #1f2937;
      flex: 1;
    }
    .price-box {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      padding: 25px;
      border-radius: 8px;
      text-align: center;
      margin: 30px 0;
    }
    .price-label {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 5px;
    }
    .price-value {
      font-size: 36px;
      font-weight: 700;
    }
    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .feature-item {
      padding: 8px 0 8px 25px;
      position: relative;
    }
    .feature-item:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: 700;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
      margin: 5px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 20px;
      }
      .detail-row {
        flex-direction: column;
      }
      .detail-label {
        width: 100%;
        margin-bottom: 5px;
      }
      .price-value {
        font-size: 28px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🚚 Custom Food Truck Design</h1>
      <p>Thank you for your submission!</p>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="greeting">
        Hello ${firstName} ${lastName},
      </div>
      <p>Thank you for your interest in building a custom food truck! We've received your design specifications and our team will review them shortly.</p>

      ${totalPrice ? `
      <div class="price-box">
        <div class="price-label">Estimated Total Price</div>
        <div class="price-value">$${totalPrice.toLocaleString()}</div>
      </div>
      ` : ''}

      <!-- Contact Information -->
      <div class="section">
        <div class="section-title">📋 Contact Information</div>
        <div class="detail-row">
          <div class="detail-label">Name:</div>
          <div class="detail-value">${firstName} ${lastName}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Email:</div>
          <div class="detail-value">${email}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Phone:</div>
          <div class="detail-value">${phoneNumber}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Zip Code:</div>
          <div class="detail-value">${zipcode}</div>
        </div>
      </div>

      <!-- Truck Specifications -->
      <div class="section">
        <div class="section-title">🔧 Truck Specifications</div>
        <div class="detail-row">
          <div class="detail-label">Trailer Size:</div>
          <div class="detail-value">${trailerSize}</div>
        </div>
        ${porchConfiguration ? `
        <div class="detail-row">
          <div class="detail-label">Porch Configuration:</div>
          <div class="detail-value">${porchConfiguration}</div>
        </div>
        ` : ''}
        <div class="detail-row">
          <div class="detail-label">Range Hood:</div>
          <div class="detail-value">${rangeHood}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Fire Suppression:</div>
          <div class="detail-value">${fireSuppressionSystem}</div>
        </div>
      </div>

      <!-- Equipment -->
      <div class="section">
        <div class="section-title">🍳 Equipment & Appliances</div>
        <ul class="feature-list">
          ${flatTopGriddle ? `<li class="feature-item">Flat Top Griddle: ${flatTopGriddle}</li>` : ''}
          ${charbroiler ? `<li class="feature-item">Charbroiler: ${charbroiler}</li>` : ''}
          ${deepFryer ? `<li class="feature-item">Deep Fryer: ${deepFryer}</li>` : ''}
          ${range ? `<li class="feature-item">Range: ${range}</li>` : ''}
          ${steamWell ? `<li class="feature-item">Steam Well: ${steamWell}</li>` : ''}
          ${warmingCabinet ? `<li class="feature-item">Warming Cabinet: ${warmingCabinet}</li>` : ''}
          ${refrigeration && refrigeration.length > 0 ? `<li class="feature-item">Refrigeration: ${refrigeration.join(', ')}</li>` : ''}
        </ul>
      </div>

      <!-- Customization -->
      <div class="section">
        <div class="section-title">🎨 Customization</div>
        <div class="detail-row">
          <div class="detail-label">Exterior Color:</div>
          <div class="detail-value">${exteriorColor}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Interior Finish:</div>
          <div class="detail-value">${interiorFinish}</div>
        </div>
      </div>

      <!-- Financial Information -->
      <div class="section">
        <div class="section-title">💰 Financial Details</div>
        <div class="detail-row">
          <div class="detail-label">Budget Range:</div>
          <div class="detail-value">${budget}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Financing Needed:</div>
          <div class="detail-value">${needFinancing}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Payment Method:</div>
          <div class="detail-value">${paymentMethodLabel}</div>
        </div>
      </div>

      ${additionalInfo ? `
      <!-- Additional Information -->
      <div class="section">
        <div class="section-title">📝 Additional Notes</div>
        <p style="color: #4b5563; line-height: 1.6;">${additionalInfo}</p>
      </div>
      ` : ''}

      <!-- Next Steps -->
      <div class="section">
        <div class="section-title">📅 Next Steps</div>
        <p style="color: #4b5563; line-height: 1.6;">
          Our design team will review your specifications and reach out within 1-2 business days to discuss:
        </p>
        <ul class="feature-list">
          <li class="feature-item">Detailed pricing and timeline</li>
          <li class="feature-item">Available customization options</li>
          <li class="feature-item">Financing options (if applicable)</li>
          <li class="feature-item">Next steps in the design process</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text"><strong>FoodTrucksPro</strong></p>
      <p class="footer-text">Building dreams, one truck at a time</p>
      <p class="footer-text">Phone: +1 (800) 555-1234 | Email: sales@foodtruckspro.com</p>
      <p class="footer-text" style="margin-top: 20px; font-size: 12px;">
        © ${new Date().getFullYear()} FoodTrucksPro. All rights reserved.
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
    const htmlContent = generateCustomTruckEmailHTML(data);

    // Email to customer
    const customerEmail = await transporter.sendMail({
      from: `"FoodTrucksPro" <${SMTP_FROM}>`,
      to: data.email,
      subject: '🚚 Your Custom Food Truck Design - FoodTrucksPro',
      html: htmlContent,
    });

    const salesEmail = await transporter.sendMail({
      from: `"FoodTrucksPro System" <${SMTP_FROM}>`,
      to: SALES_EMAIL,
      subject: `New Custom Truck Design Request - ${data.firstName} ${data.lastName}`,
      html: htmlContent,
    });

    return {
      success: true,
      messageId: customerEmail.messageId,
      message: 'Emails sent successfully',
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}
