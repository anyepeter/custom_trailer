import nodemailer from 'nodemailer';

// Email configuration
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

interface OrderConfirmationData {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  truckName: string;
  truckSize: string;
  truckImage: string;
  truckImages: string[];
  upgrades: Upgrade[];
  price: number;
  total: number;
  paymentMethod: string;
}

interface OrderNotificationData {
  orderNumber: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  truckName: string;
  truckSize: string;
  truckImage: string;
  truckImages: string[];
  upgrades: Upgrade[];
  price: number;
  total: number;
  paymentMethod: string;
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

// Customer Order Confirmation Email Template
function getCustomerEmailHTML(data: OrderConfirmationData): string {
  const imageGallery = data.truckImages.map(img =>
    `<div style="display: inline-block; margin-right: 10px;">
      <img src="${img}" alt="${data.truckName}" style="width: 250px; height: 180px; object-fit: cover; border-radius: 8px; display: block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
    </div>`
  ).join('');

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
        </div>

        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi <strong>${data.customerName}</strong>,
            </p>
            <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                We've received your order and we're excited to get started! Our team will review your order and contact you within 24 hours to discuss the next steps.
            </p>

            <!-- Truck Details -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #0066b2; font-size: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
                    Truck Details
                </h2>

                <!-- Main Image -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="${data.truckImage}" alt="${data.truckName}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
                </div>

                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Truck Name:</td>
                        <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #e0e0e0;">${data.truckName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Size:</td>
                        <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #e0e0e0;">${data.truckSize}</td>
                    </tr>
                </table>

                ${data.upgrades && data.upgrades.length > 0 ? `
                <!-- Upgrades Section -->
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
                    <p style="margin: 0 0 10px 0; color: #0066b2; font-size: 16px; font-weight: 600;">Selected Upgrades:</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        ${data.upgrades.map(upgrade => `
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-size: 14px; border-bottom: 1px solid #f0f0f0;">${upgrade.name}</td>
                            <td style="padding: 8px 0; color: #0066b2; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #f0f0f0;">+$${upgrade.price.toLocaleString()}</td>
                        </tr>
                        `).join('')}
                    </table>
                </div>
                ` : ''}

                ${data.truckImages.length > 0 ? `
                <!-- Image Gallery Carousel -->
                <div style="margin-top: 20px;">
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 14px; font-weight: 600;">Gallery:</p>
                    <div style="overflow-x: auto; overflow-y: hidden; white-space: nowrap; -webkit-overflow-scrolling: touch; padding: 10px 0; background: linear-gradient(to right, #f8f9fa 0%, #ffffff 10%, #ffffff 90%, #f8f9fa 100%);">
                        ${imageGallery}
                    </div>
                    <p style="margin: 10px 0 0 0; color: #999; font-size: 11px; text-align: center; font-style: italic;">← Scroll to view all images →</p>
                </div>
                ` : ''}
            </div>

            <!-- Pricing -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #0066b2; font-size: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
                    Order Summary
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
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

            <!-- Next Steps -->
            <div style="background-color: #e3f2fd; border-left: 4px solid #0066b2; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #0066b2; font-size: 16px;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 14px; line-height: 1.8;">
                    <li>Our sales team will contact you within 24 hours</li>
                    <li>We'll send payment instructions for ${formatPaymentMethod(data.paymentMethod)}</li>
                    <li>Once payment is confirmed, we'll begin building your trailer</li>
                    <li>You'll receive regular updates on the build progress</li>
                </ul>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: 600;">Questions about your order?</p>
            <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">
                Contact us at <a href="mailto:${SALES_EMAIL}" style="color: #0066b2; text-decoration: none;">${SALES_EMAIL}</a>
                or call <a href="tel:+15012162500" style="color: #0066b2; text-decoration: none;">+1-501-216-2500</a>
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
  const imageGallery = data.truckImages.map(img =>
    `<div style="display: inline-block; margin-right: 8px;">
      <img src="${img}" alt="${data.truckName}" style="width: 200px; height: 150px; object-fit: cover; border-radius: 6px; display: block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
    </div>`
  ).join('');

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
            <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold;">🚨 New Order Received</h1>
            <p style="margin: 10px 0 0 0; color: #ffe0e0; font-size: 14px;">Order #${data.orderNumber}</p>
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

            <!-- Truck Details -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #0066b2;">
                <h2 style="margin: 0 0 15px 0; color: #0066b2; font-size: 18px;">Truck Details</h2>

                <!-- Main Image -->
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="${data.truckImage}" alt="${data.truckName}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px; font-weight: 600; width: 120px;">Truck Name:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: bold;">${data.truckName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px; font-weight: 600;">Size:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px;">${data.truckSize}</td>
                    </tr>
                </table>

                ${data.upgrades && data.upgrades.length > 0 ? `
                <!-- Upgrades Section -->
                <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #e0e0e0;">
                    <p style="margin: 0 0 10px 0; color: #0066b2; font-size: 14px; font-weight: 600;">Selected Upgrades:</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        ${data.upgrades.map(upgrade => `
                        <tr>
                            <td style="padding: 6px 0; color: #666; font-size: 13px; border-bottom: 1px solid #f0f0f0;">${upgrade.name}</td>
                            <td style="padding: 6px 0; color: #0066b2; font-size: 13px; font-weight: 600; text-align: right; border-bottom: 1px solid #f0f0f0;">+$${upgrade.price.toLocaleString()}</td>
                        </tr>
                        `).join('')}
                    </table>
                </div>
                ` : ''}

                ${data.truckImages.length > 0 ? `
                <!-- Image Gallery Carousel -->
                <div style="margin-top: 15px;">
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 13px; font-weight: 600;">Gallery:</p>
                    <div style="overflow-x: auto; overflow-y: hidden; white-space: nowrap; -webkit-overflow-scrolling: touch; padding: 8px 0; background: #f8f9fa; border-radius: 4px;">
                        ${imageGallery}
                    </div>
                    <p style="margin: 8px 0 0 0; color: #999; font-size: 10px; text-align: center; font-style: italic;">← Scroll to view all images →</p>
                </div>
                ` : ''}
            </div>

            <!-- Order Summary -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; border-left: 4px solid #28a745;">
                <h2 style="margin: 0 0 15px 0; color: #28a745; font-size: 18px;">Order Summary</h2>
                <table style="width: 100%; border-collapse: collapse;">
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

            <!-- Action Required -->
            <div style="background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #856404; font-size: 16px;">⚡ Action Required</h3>
                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                    Please contact <strong>${data.customerInfo.name}</strong> within 24 hours to confirm the order and provide payment instructions for ${formatPaymentMethod(data.paymentMethod)}.
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

// Send order confirmation email to customer
export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  try {
    const html = getCustomerEmailHTML(data);

    await transporter.sendMail({
      from: SMTP_FROM,
      to: data.customerEmail,
      subject: `Order Confirmation - #${data.orderNumber}`,
      html,
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
export async function sendOrderNotificationToSales(data: OrderNotificationData) {
  try {
    const html = getSalesEmailHTML(data);

    await transporter.sendMail({
      from: SMTP_FROM,
      to: SALES_EMAIL,
      subject: `🚨 New Order #${data.orderNumber} - ${data.truckName}`,
      html,
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
