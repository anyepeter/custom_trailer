import { getBrowserInstance } from '@/lib/puppeteer';
import { LOGO_BASE64 } from './logoBase64';
import { getSiteSettings } from '@/lib/settings';

interface OrderItemPdfData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  itemIndex: number;
  totalItems: number;
  truckName: string;
  truckSize: string;
  truckImage: string;
  truckImages: string[];
  upgrades: { id: string; name: string; price: number }[];
  quantity: number;
  unitPrice: number;
  upgradesTotal: number;
  itemTotal: number;
  paymentMethod: string;
  financing?: {
    preference: string;
    term?: number;
    monthlyEstimate?: number;
  };
}

function formatPaymentMethod(method: string): string {
  const methods: Record<string, string> = {
    'wire-tranfer': 'Wire Transfer',
    'zelle': 'Zelle',
    'crypto': 'Cryptocurrency',
  };
  return methods[method] || method;
}

export function orderItemPdfHTML(data: OrderItemPdfData): string {
  const upgradesRows = data.upgrades.map(u => `
                <tr>
                    <td>Upgrade:</td>
                    <td>${u.name}</td>
                    <td>+$${u.price.toLocaleString()}</td>
                </tr>
  `).join('');

  const imageGalleryRows = data.truckImages.length > 1
    ? data.truckImages.slice(0, 6).map((img, idx) => `
                <tr>
                    <td>Photo ${idx + 1}:</td>
                    <td colspan="2"><img src="${img}" alt="${data.truckName}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 4px;" /></td>
                </tr>
    `).join('')
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Trailer Pros - Quote</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #333;
        }

        .container {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            background: white;
        }

        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #0066b2;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo {
            width: 80px;
            height: 50px;
            background: #0066b2;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .company-name {
            font-size: 24px;
            font-weight: bold;
        }

        .company-name .custom {
            color: #0066b2;
        }

        .company-name .trailer {
            color: #666;
        }

        .company-name .pros {
            color: #0066b2;
        }

        .contact-info {
            text-align: right;
            font-size: 12px;
        }

        .contact-info .phone {
            font-weight: bold;
            font-size: 14px;
            color: #333;
        }

        .contact-info .website {
            color: #0066b2;
        }

        .address {
            text-align: center;
            font-size: 10px;
            margin-bottom: 15px;
            margin-top: 10px;
        }

        /* Customer Info Section */
        .info-section {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }

        .info-box {
            flex: 1;
            border: 2px solid #333;
            padding: 10px;
        }

        .info-box table {
            width: 100%;
            border-collapse: collapse;
        }

        .info-box td {
            padding: 3px 5px;
        }

        .info-box td:first-child {
            font-weight: bold;
            width: 35%;
        }

        /* Specifications Section */
        .specs-section {
            margin-bottom: 15px;
        }

        .standard-specs {
            background: #f5f5f5;
            border: 1px solid #333;
            padding: 8px;
            margin-bottom: 15px;
            font-size: 9px;
        }

        .standard-specs strong {
            text-transform: uppercase;
        }

        /* Options Tables */
        .section-title {
            background: #dc3545;
            color: white;
            padding: 5px 10px;
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 15px;
            margin-bottom: 5px;
        }

        .options-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        .options-table th,
        .options-table td {
            border: 1px solid #ddd;
            padding: 5px 8px;
            text-align: left;
        }

        .options-table th {
            background: #f8f9fa;
            font-weight: bold;
        }

        .options-table th:first-child {
            text-align: left;
            width: 150px;
        }

        .options-table th:nth-child(2) {
            text-align: left;
            width: auto;
            min-width: 400px;
        }

        .options-table th:last-child {
            text-align: center;
            width: 60px;
        }

        .options-table td:first-child {
            width: 150px;
        }

        .options-table td:nth-child(2) {
            width: auto;
            min-width: 400px;
        }

        .options-table tr:nth-child(even) {
            background: #f9f9f9;
        }

        .options-table td:last-child {
            text-align: center;
            width: 60px;
            font-weight: bold;
        }

        /* Payment Section */
        .payment-section {
            margin-top: 20px;
        }

        .total-row {
            background: #f5f5f5;
            font-weight: bold;
            font-size: 14px;
        }

        .total-row td:last-child {
            font-size: 16px;
            color: #dc3545;
        }

        /* Terms and Conditions */
        .terms-section {
            margin-top: 30px;
            border-top: 2px solid #333;
            padding-top: 15px;
        }

        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }

        .signature-box {
            width: 45%;
        }

        .signature-line {
            border-bottom: 1px solid #333;
            margin-top: 30px;
            margin-bottom: 5px;
        }

        .footer {
            text-align: center;
            font-size: 9px;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
        }

        @media print {
            .container {
                padding: 0;
            }

            body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Page 1 -->
        <div class="page">
            <div class="address">
                10101 W 87th St, Suite 200<br>
                Overland Park, KS 66212
            </div>

            <!-- Customer and Quote Info -->
            <div class="info-section">
                <div class="info-box">
                    <table>
                        <tr>
                            <td>Customer Name:</td>
                            <td>${data.customerName}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>${data.customerEmail}</td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td>${data.customerPhone}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>${data.customerAddress}</td>
                        </tr>
                    </table>
                </div>
                <div class="info-box">
                    <table>
                        <tr>
                            <td>Order #</td>
                            <td>${data.orderNumber}</td>
                        </tr>
                        <tr>
                            <td>Sales Rep</td>
                            <td>Andrew Evensen</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>sales@customtrailerspro.com</td>
                        </tr>
                        <tr>
                            <td>Date Provided:</td>
                            <td>${new Date().toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>Quote Expires:</td>
                            <td>${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</td>
                        </tr>
                    </table>
                </div>
            </div>

            ${data.totalItems > 1 ? `
            <!-- Item Badge -->
            <div class="standard-specs">
                <strong>ORDER ITEM ${data.itemIndex + 1} OF ${data.totalItems}</strong> — This document covers the details for the trailer listed below. Each item in your order has its own separate quote document.
            </div>
            ` : ''}

            <!-- Truck Image -->
            <div style="text-align: center; margin-bottom: 15px;">
                <img src="${data.truckImage}" alt="${data.truckName}" style="max-width: 100%; max-height: 300px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);" />
            </div>

            <!-- Trailer Information -->
            <div class="section-title">TRAILER INFORMATION</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Trailer Name:</td>
                    <td>${data.truckName}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Trailer Size:</td>
                    <td>${data.truckSize}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Quantity:</td>
                    <td>${data.quantity} unit(s)</td>
                    <td>${data.quantity}</td>
                </tr>
                <tr>
                    <td>Base Price:</td>
                    <td>${data.truckName} — Base Unit</td>
                    <td>$${data.unitPrice.toLocaleString()}</td>
                </tr>
            </table>

            <!-- Standard Specs -->
            <div class="standard-specs">
                <strong>STANDARD TRAILER SPECS:</strong> 16" O.C. Cross Members, 16" O.C. Roof Bows, 16" O.C. Sidewalls, 5000 lb. A-Frame Jack, 2 5/16" Coupler, 3/4" Plywood Floors, 3/8" Plywood Walls, Rubber Roof, Aluminum Fenders, 7-Way Bargman Plug, 24" ATP Stone Guard, Insulated Walls and Ceiling, 12V Battery
            </div>

            ${data.upgrades.length > 0 ? `
            <!-- Selected Upgrades -->
            <div class="section-title">SELECTED UPGRADES</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>PRICE</th>
                </tr>
                ${upgradesRows}
                <tr>
                    <td><strong>Upgrades Subtotal:</strong></td>
                    <td></td>
                    <td style="color: #0066b2;"><strong>$${data.upgradesTotal.toLocaleString()}</strong></td>
                </tr>
            </table>
            ` : `
            <!-- No Upgrades -->
            <div class="section-title">SELECTED UPGRADES</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>PRICE</th>
                </tr>
                <tr>
                    <td>No Upgrades</td>
                    <td>Base configuration selected</td>
                    <td>—</td>
                </tr>
            </table>
            `}

            <!-- Installation & Delivery -->
            <div class="section-title">INSTALLATION & DELIVERY</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Gas Line</td>
                    <td>Professional Gas-Line Installation From (2) Propane Cages - Custom made steel gas-lines with (2) high pressure regulators, shut-off valves for each piece of equipment, corrosion resistant flex hose connectors, and professional installation with system pressure testing</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Equipment Installation</td>
                    <td>Professional Installation of all equipment</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Pick up/Delivery:</td>
                    <td>Customer Pick-Up in Columbia, TN</td>
                    <td></td>
                </tr>
            </table>

            <div class="section-title">FINANCE AND PAYMENT METHOD</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Apply for financing?</td>
                    <td>${data.financing ? (data.financing.preference === 'yes' ? 'Yes' : data.financing.preference === 'maybe' ? 'Maybe — Exploring Options' : 'No') : 'No'}</td>
                    <td></td>
                </tr>
                ${data.financing && data.financing.term ? `
                <tr>
                    <td>Financing Term:</td>
                    <td>${data.financing.term} months @ 7% APR</td>
                    <td></td>
                </tr>
                ` : ''}
                ${data.financing && data.financing.monthlyEstimate ? `
                <tr>
                    <td>Est. Monthly Payment:</td>
                    <td>$${data.financing.monthlyEstimate.toLocaleString()}/mo</td>
                    <td></td>
                </tr>
                ` : ''}
                <tr>
                    <td>Preferred Payment method:</td>
                    <td>${formatPaymentMethod(data.paymentMethod)}</td>
                    <td></td>
                </tr>
            </table>


            <!-- Payment Information -->
            <div class="section-title">TOTAL COST</div>
            <table class="options-table">
                <tr class="total-row">
                    <td>SUBTOTAL</td>
                    <td style="text-align: right;">TOTAL COST:</td>
                    <td style="color: blue;">$ ${data.itemTotal.toLocaleString()}</td>
                </tr>
            </table>
        </div>

        ${data.truckImages.length > 1 ? `
        <!-- Additional Photos Page -->
        <div class="page">
            <div class="section-title">TRAILER PHOTOS</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th colspan="2">PHOTO</th>
                </tr>
                ${imageGalleryRows}
            </table>
        </div>
        ` : ''}

        <!-- Terms Page -->
        <div class="page">
            <!-- Terms and Conditions -->
            <div class="terms-section">
                <h3 style="margin-bottom: 15px;">TERMS AND CONDITIONS:</h3>
                <p style="text-align: justify; line-height: 1.6;">
                    Custom Trailer Pro offers fully completed, pre-manufactured trucks ready for purchase and prompt delivery. Each vehicle is sold based on its current specifications and condition, which will be clearly communicated prior to purchase.

To reserve a truck, a deposit may be required. For payments made via wire transfer, Zelle, or cryptocurrency, a 50% deposit is typically requested to secure the vehicle. If you choose to finance your purchase through a third-party lender, deposit and payment terms will follow the lender's requirements. Once an agreement is reached, trucks can be prepared for immediate shipping or pickup.

The remaining balance is to be completed prior to pickup or delivery. Final payment is expected within 7 days of confirming the purchase agreement. We will always work with you to ensure the process is smooth and clearly communicated.

While we strive to provide high-quality, ready-to-use trucks, requirements may vary depending on your location. We recommend checking with your local authorities regarding any specific regulations, inspections, or certifications that may apply.

All trucks are sold in their current condition, and we encourage buyers to review all details.

In the event that payment is not completed within the agreed timeframe, the reservation may be canceled and the truck made available to other buyers. Custom Trailer Pro reserves the right to take appropriate steps to recover any outstanding payments if necessary
                </p>
            </div>

            <!-- Signature Section -->
            <div class="signature-section">
                <div class="signature-box">
                    <strong>Customer Acceptance:</strong>
                    <div class="signature-line"></div>
                </div>
                <div class="signature-box">
                    <strong>Date:</strong>
                    <div class="signature-line"></div>
                </div>
            </div>
        </div>

    `;
}

export async function generateOrderItemPdf(data: OrderItemPdfData): Promise<Buffer> {
  const browser = await getBrowserInstance();
  const contact = await getSiteSettings();

  console.log('[Order PDF Generation] Using bundled logo, base64 length:', LOGO_BASE64.length);

  // Header template with company branding - same as configure PDF
  const headerTemplate = `
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; }
          .header-container {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            border-bottom: 2px solid #0066b2;
            font-size: 10px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .logo-section {
            display: flex;
            align-items: center;
          }
          .logo-section img {
            height: 40px;
            width: auto;
            display: block;
          }
          .contact-section {
            text-align: right;
          }
          .phone {
            font-weight: bold;
            font-size: 12px;
            color: #333;
            margin-bottom: 2px;
          }
          .website {
            color: #0066b2;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <div class="header-container">
          <div class="logo-section">
            <img src="${LOGO_BASE64}" alt="Logo" />
          </div>
          <div class="contact-section">
            <div class="phone">P: ${contact.phone}</div>
            <div class="website">www.customtrailerspro.com</div>
          </div>
        </div>
      </body>
    </html>
  `;

  // Footer template with page numbers - same as configure PDF
  const footerTemplate = `
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; }
          .footer-container {
            width: 100%;
            text-align: center;
            font-size: 9px;
            padding: 10px 0;
            border-top: 1px solid #ddd;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="footer-container">
          <span>All prices are valid for 30 days from the date stated above. Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      </body>
    </html>
  `;

  let page;
  try {
    page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });

    console.log('[Order PDF Generation] Setting page content...');
    const htmlContent = orderItemPdfHTML(data);
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    console.log('[Order PDF Generation] Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'letter',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate: footerTemplate,
      margin: {
        top: '80px',
        bottom: '60px',
        left: '12mm',
        right: '12mm',
      },
    });

    console.log('[Order PDF Generation] PDF generated successfully, size:', pdfBuffer.length, 'bytes');

    await page.close();
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error('[Order PDF Generation] Error:', error);
    throw error;
  } finally {
    if (page && !page.isClosed()) {
      await page.close();
    }
    await browser.close();
  }
}
