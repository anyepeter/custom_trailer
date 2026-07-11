import nodemailer from 'nodemailer';
import { generateOrderItemPdf } from './pdf/generateOrderItemPdf';
import { getSiteSettings } from '@/lib/settings';
import { DEFAULT_CONTACT, type SiteContact } from '@/lib/site-contact';

// Email configuration
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = 'Fe@rLes$237';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const SALES_EMAIL = process.env.SALES_EMAIL || 'sales@customtrailerspro.com';
// Where NEW ORDER notifications go. Defaults to SALES_EMAIL, but should be set
// to an inbox DIFFERENT from SMTP_USER — self-addressed mail (from === to) is
// frequently dropped or spam-filtered by mail hosts, which is why the sales
// team never receives these while customers do.
const ORDER_NOTIFICATION_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL || SALES_EMAIL;

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER && SMTP_PASS ? {
    user: SMTP_USER,
    pass: SMTP_PASS,
  } : undefined,
});

interface Upgrade {
  id: string;
  name: string;
  price: number;
}

interface OrderEmailItem {
  truckName: string;
  truckSize: string;
  truckImage: string;
  truckImages: string[];
  upgrades: Upgrade[];
  quantity: number;
  unitPrice: number;
  upgradesTotal: number;
  itemTotal: number;
}

interface FinancingData {
  preference: string;
  term?: number;
  monthlyEstimate?: number;
}

interface OrderConfirmationData {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderEmailItem[];
  subtotal: number;
  total: number;
  paymentMethod: string;
  financing?: FinancingData;
}

interface OrderNotificationData {
  orderNumber: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderEmailItem[];
  subtotal: number;
  total: number;
  paymentMethod: string;
  financing?: FinancingData;
}

// Format payment method for display
function formatPaymentMethod(method: string): string {
  const methods: Record<string, string> = {
    'wire-tranfer': 'Wire Transfer',
    'zelle': 'Zelle',
    'crypto': 'Cryptocurrency',
  };
  return methods[method] || method;
}

// Render a single order item block (reused in both email templates)
function renderItemHTML(item: OrderEmailItem, index: number, totalItems: number): string {
  const imageGallery = item.truckImages.map(img =>
    `<div style="display: inline-block; margin-right: 10px;">
      <img src="${img}" alt="${item.truckName}" style="width: 250px; height: 180px; object-fit: cover; border-radius: 8px; display: block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
    </div>`
  ).join('');

  const itemLabel = totalItems > 1 ? `Item ${index + 1} of ${totalItems}` : '';

  return `
    <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
        ${itemLabel ? `<p style="margin: 0 0 12px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">${itemLabel}</p>` : ''}

        <!-- Main Image -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${item.truckImage}" alt="${item.truckName}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
        </div>

        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Truck Name:</td>
                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #e0e0e0;">${item.truckName}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Size:</td>
                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #e0e0e0;">${item.truckSize}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Unit Price:</td>
                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #e0e0e0;">$${item.unitPrice.toLocaleString()}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Quantity:</td>
                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #e0e0e0;">${item.quantity}</td>
            </tr>
        </table>

        ${item.upgrades && item.upgrades.length > 0 ? `
        <!-- Upgrades Section -->
        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0; color: #0066b2; font-size: 16px; font-weight: 600;">Selected Upgrades:</p>
            <table style="width: 100%; border-collapse: collapse;">
                ${item.upgrades.map(upgrade => `
                <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px; border-bottom: 1px solid #f0f0f0;">${upgrade.name}</td>
                    <td style="padding: 8px 0; color: #0066b2; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #f0f0f0;">+$${upgrade.price.toLocaleString()}</td>
                </tr>
                `).join('')}
            </table>
        </div>
        ` : ''}

        <!-- Item Total -->
        <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #0066b2;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; color: #333; font-size: 16px; font-weight: bold;">Item Total:</td>
                    <td style="padding: 8px 0; color: #0066b2; font-size: 18px; font-weight: bold; text-align: right;">$${item.itemTotal.toLocaleString()}</td>
                </tr>
            </table>
        </div>

        ${item.truckImages.length > 1 ? `
        <!-- Image Gallery -->
        <div style="margin-top: 20px;">
            <p style="margin: 0 0 10px 0; color: #666; font-size: 14px; font-weight: 600;">Gallery:</p>
            <div style="overflow-x: auto; overflow-y: hidden; white-space: nowrap; -webkit-overflow-scrolling: touch; padding: 10px 0; background: linear-gradient(to right, #f8f9fa 0%, #ffffff 10%, #ffffff 90%, #f8f9fa 100%);">
                ${imageGallery}
            </div>
            <p style="margin: 10px 0 0 0; color: #999; font-size: 11px; text-align: center; font-style: italic;">&larr; Scroll to view all images &rarr;</p>
        </div>
        ` : ''}
    </div>
  `;
}

// Render financing section for emails
function renderFinancingHTML(financing: FinancingData, style: 'customer' | 'sales'): string {
  const accentColor = style === 'customer' ? '#0066b2' : '#28a745';
  const preferenceLabel = financing.preference === 'yes' ? 'Yes, interested in financing' : 'Maybe, exploring options';

  return `
    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 25px; margin-bottom: 20px; border: 1px solid #bbf7d0;">
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <span style="font-size: 22px; margin-right: 10px;">&#x1F4B0;</span>
        <h3 style="margin: 0; color: #166534; font-size: 18px; font-weight: 700;">Financing Information</h3>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #d1fae5;">Interest in Financing:</td>
          <td style="padding: 10px 0; color: #166534; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #d1fae5;">${preferenceLabel}</td>
        </tr>
        ${financing.term ? `
        <tr>
          <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #d1fae5;">Selected Term:</td>
          <td style="padding: 10px 0; color: #166534; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #d1fae5;">${financing.term} months @ 7% APR</td>
        </tr>
        ` : ''}
        ${financing.monthlyEstimate ? `
        <tr>
          <td style="padding: 10px 0; color: #666; font-size: 14px;">Estimated Monthly Payment:</td>
          <td style="padding: 10px 0; color: #166534; font-size: 20px; font-weight: 700; text-align: right;">$${financing.monthlyEstimate.toLocaleString()}/mo</td>
        </tr>
        ` : ''}
      </table>
      ${style === 'customer' ? `
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #d1fae5;">
        <p style="margin: 0 0 10px 0; color: #166534; font-size: 14px; font-weight: 600;">Our Lending Partners:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background: #ffffff; border-radius: 8px; text-align: center; width: 50%;">
              <a href="https://www.equinoxnox.com/efapplication" style="color: #0066b2; text-decoration: none; font-size: 14px; font-weight: 600;">Equinox Funding</a>
              <p style="margin: 4px 0 0 0; color: #999; font-size: 11px;">Apply Now &rarr;</p>
            </td>
            <td style="width: 10px;"></td>
            <td style="padding: 8px; background: #ffffff; border-radius: 8px; text-align: center; width: 50%;">
              <a href="https://www.clickleese.com/apply" style="color: #0066b2; text-decoration: none; font-size: 14px; font-weight: 600;">ClickLease</a>
              <p style="margin: 4px 0 0 0; color: #999; font-size: 11px;">Apply Now &rarr;</p>
            </td>
          </tr>
        </table>
      </div>
      ` : `
      <div style="margin-top: 15px; padding: 12px; background: #fff3cd; border-radius: 8px; border: 1px solid #ffc107;">
        <p style="margin: 0; color: #856404; font-size: 13px; font-weight: 600;">&#x26A1; Customer needs financing assistance. Follow up with lending partner options.</p>
      </div>
      `}
    </div>
  `;
}

// Customer Order Confirmation Email Template
function getCustomerEmailHTML(data: OrderConfirmationData, contact: SiteContact = DEFAULT_CONTACT): string {
  const itemsHTML = data.items
    .map((item, index) => renderItemHTML(item, index, data.items.length))
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0066b2 0%, #004a87 100%); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Order Confirmed!</h1>
            <p style="margin: 10px 0 0 0; color: #e0f0ff; font-size: 16px;">Thank you for your order</p>
        </div>

        <!-- Order Number -->
        <div style="background-color: #f8f9fa; padding: 20px 30px; border-bottom: 3px solid #0066b2;">
            <p style="margin: 0; color: #666; font-size: 14px;">Order Number</p>
            <p style="margin: 5px 0 0 0; color: #333; font-size: 24px; font-weight: bold;">#${data.orderNumber}</p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">${data.items.length} item${data.items.length > 1 ? 's' : ''}</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi <strong>${data.customerName}</strong>,
            </p>
            <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                We've received your order and we're excited to get started! Our team will review your order and contact you within 24 hours to discuss the next steps.
            </p>

            <!-- Order Items -->
            <h2 style="margin: 0 0 20px 0; color: #0066b2; font-size: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
                Order Details
            </h2>

            ${itemsHTML}

            <!-- Order Summary -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #0066b2; font-size: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
                    Order Summary
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Subtotal (${data.items.length} item${data.items.length > 1 ? 's' : ''}):</td>
                        <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #e0e0e0;">$${data.subtotal.toLocaleString()}</td>
                    </tr>
                    <tr style="border-bottom: 2px solid #0066b2;">
                        <td style="padding: 15px 0; color: #333; font-size: 18px; font-weight: bold;">Total Price:</td>
                        <td style="padding: 15px 0; color: #0066b2; font-size: 24px; font-weight: bold; text-align: right;">$${data.total.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 15px 0 0 0; color: #666; font-size: 14px;">Payment Method:</td>
                        <td style="padding: 15px 0 0 0; color: #333; font-size: 14px; font-weight: 600; text-align: right;">${formatPaymentMethod(data.paymentMethod)}</td>
                    </tr>
                </table>
            </div>

            ${data.financing ? renderFinancingHTML(data.financing, 'customer') : ''}

            <!-- Next Steps -->
            <div style="background-color: #e3f2fd; border-left: 4px solid #0066b2; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #0066b2; font-size: 16px;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 14px; line-height: 1.8;">
                    <li>Our sales team will contact you within 24 hours</li>
                    ${data.financing ? '<li>A financing specialist will reach out to discuss your options</li>' : ''}
                    <li>We'll send payment instructions for ${formatPaymentMethod(data.paymentMethod)}</li>
                    <li>Once payment is confirmed, we'll begin building your trailer${data.items.length > 1 ? 's' : ''}</li>
                    <li>You'll receive regular updates on the build progress</li>
                </ul>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: 600;">Questions about your order?</p>
            <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">
                Contact us at <a href="${contact.emailHref}" style="color: #0066b2; text-decoration: none;">${contact.email}</a>
                or call <a href="${contact.phoneHref}" style="color: #0066b2; text-decoration: none;">${contact.phone}</a>
            </p>
            <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 20px;">
                <p style="margin: 0 0 5px 0; color: #999; font-size: 12px;">Custom Trailer Pros</p>
                <p style="margin: 0; color: #999; font-size: 12px;">10101 W 87th St, Suite 200, Overland Park, KS 66212</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}

// Sales Team Notification Email Template
function getSalesEmailHTML(data: OrderNotificationData): string {
  const itemsSummary = data.items
    .map((item, index) => renderItemHTML(item, index, data.items.length))
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold;">&#x1F6A8; New Order Received</h1>
            <p style="margin: 10px 0 0 0; color: #ffe0e0; font-size: 14px;">Order #${data.orderNumber} &mdash; ${data.items.length} item${data.items.length > 1 ? 's' : ''}</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px;">
            <!-- Customer Information -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #dc3545;">
                <h2 style="margin: 0 0 15px 0; color: #dc3545; font-size: 18px;">Customer Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px; font-weight: 600; width: 120px;">Name:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px;">${data.customerInfo.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px; font-weight: 600;">Email:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px;"><a href="mailto:${data.customerInfo.email}" style="color: #0066b2; text-decoration: none;">${data.customerInfo.email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px; font-weight: 600;">Phone:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px;"><a href="tel:${data.customerInfo.phone}" style="color: #0066b2; text-decoration: none;">${data.customerInfo.phone}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px; font-weight: 600;">Address:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px;">${data.customerInfo.address}</td>
                    </tr>
                </table>
            </div>

            <!-- Order Items -->
            <div style="border-left: 4px solid #0066b2; padding-left: 0; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #0066b2; font-size: 18px; padding-left: 15px;">Order Items (${data.items.length})</h2>
                ${itemsSummary}
            </div>

            <!-- Order Summary -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; border-left: 4px solid #28a745;">
                <h2 style="margin: 0 0 15px 0; color: #28a745; font-size: 18px;">Order Summary</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Items:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right; border-bottom: 1px solid #e0e0e0;">${data.items.length} trailer${data.items.length > 1 ? 's' : ''}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Subtotal:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right; border-bottom: 1px solid #e0e0e0;">$${data.subtotal.toLocaleString()}</td>
                    </tr>
                    <tr style="border-bottom: 2px solid #28a745;">
                        <td style="padding: 12px 0; color: #333; font-size: 16px; font-weight: bold;">Total Price:</td>
                        <td style="padding: 12px 0; color: #28a745; font-size: 22px; font-weight: bold; text-align: right;">$${data.total.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0 0 0; color: #666; font-size: 14px;">Payment Method:</td>
                        <td style="padding: 12px 0 0 0; color: #333; font-size: 14px; text-align: right; font-weight: 600;">${formatPaymentMethod(data.paymentMethod)}</td>
                    </tr>
                </table>
            </div>

            ${data.financing ? renderFinancingHTML(data.financing, 'sales') : ''}

            <!-- Action Required -->
            <div style="background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #856404; font-size: 16px;">&#x26A1; Action Required</h3>
                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                    Please contact <strong>${data.customerInfo.name}</strong> within 24 hours to confirm the order and provide payment instructions for ${formatPaymentMethod(data.paymentMethod)}.
                    ${data.financing ? ' <strong>This customer has expressed interest in financing — connect them with a lending partner.</strong>' : ''}
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #343a40; padding: 20px; text-align: center;">
            <p style="margin: 0; color: #ffffff; font-size: 12px;">Order received on ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>
  `;
}

// Generate PDF attachments for all order items
export interface OrderPdfAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
  encoding: string;
}

export async function generateOrderPdfAttachments(data: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderEmailItem[];
  paymentMethod: string;
  financing?: FinancingData;
}): Promise<OrderPdfAttachment[]> {
  const attachments: OrderPdfAttachment[] = [];

  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i];
    try {
      console.log(`[Order PDF] Generating PDF for item ${i + 1}/${data.items.length}: ${item.truckName}`);
      const pdfBuffer = await generateOrderItemPdf({
        orderNumber: data.orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        customerAddress: data.customerAddress,
        itemIndex: i,
        totalItems: data.items.length,
        truckName: item.truckName,
        truckSize: item.truckSize,
        truckImage: item.truckImage,
        truckImages: item.truckImages,
        upgrades: item.upgrades,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        upgradesTotal: item.upgradesTotal,
        itemTotal: item.itemTotal,
        paymentMethod: data.paymentMethod,
        financing: data.financing,
      });

      // Sanitize truck name for filename
      const safeName = item.truckName.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '-');
      const filename = data.items.length > 1
        ? `Order-${data.orderNumber}-Item${i + 1}-${safeName}.pdf`
        : `Order-${data.orderNumber}-${safeName}.pdf`;

      attachments.push({
        filename,
        content: pdfBuffer,
        contentType: 'application/pdf',
        encoding: 'base64',
      });

      console.log(`[Order PDF] PDF generated for ${item.truckName}: ${pdfBuffer.length} bytes`);
    } catch (pdfError) {
      console.error(`[Order PDF] Failed to generate PDF for item ${i + 1} (${item.truckName}):`, pdfError);
      // Continue with other items - don't fail the entire email
    }
  }

  return attachments;
}

// Send order confirmation email to customer
export async function sendOrderConfirmationEmail(
  data: OrderConfirmationData,
  precomputedAttachments?: OrderPdfAttachment[]
) {
  try {
    const contact = await getSiteSettings();
    const html = getCustomerEmailHTML(data, contact);

    // Reuse PDFs if the caller already generated them, otherwise build here.
    const attachments =
      precomputedAttachments ??
      (await generateOrderPdfAttachments({
        orderNumber: data.orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        customerAddress: data.customerAddress,
        items: data.items,
        paymentMethod: data.paymentMethod,
        financing: data.financing,
      }));
    console.log(`[Order Email] ${attachments.length} PDF attachment(s) ready for customer`);

    await transporter.sendMail({
      from: SMTP_FROM,
      to: data.customerEmail,
      subject: `Order Confirmation - #${data.orderNumber} (${data.items.length} item${data.items.length > 1 ? 's' : ''})`,
      html,
      attachments,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending customer order confirmation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}

// Send order notification to sales team
export async function sendOrderNotificationToSales(
  data: OrderNotificationData,
  precomputedAttachments?: OrderPdfAttachment[]
) {
  try {
    const html = getSalesEmailHTML(data);

    const itemNames = data.items.map(i => i.truckName).join(', ');

    // Reuse PDFs if the caller already generated them, otherwise build here.
    const attachments =
      precomputedAttachments ??
      (await generateOrderPdfAttachments({
        orderNumber: data.orderNumber,
        customerName: data.customerInfo.name,
        customerEmail: data.customerInfo.email,
        customerPhone: data.customerInfo.phone,
        customerAddress: data.customerInfo.address,
        items: data.items,
        paymentMethod: data.paymentMethod,
        financing: data.financing,
      }));
    console.log(`[Order Email] ${attachments.length} PDF attachment(s) ready for sales`);

    console.log(`[Order Email] Sending sales notification to: ${ORDER_NOTIFICATION_EMAIL}`);
    await transporter.sendMail({
      from: SMTP_FROM,
      to: ORDER_NOTIFICATION_EMAIL,
      replyTo: data.customerInfo.email,
      subject: `\u{1F6A8} New Order #${data.orderNumber} - ${itemNames} ($${data.total.toLocaleString()})`,
      html,
      attachments,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending sales team notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}
