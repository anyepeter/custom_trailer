import { CustomTruckDesignInput } from '@/app/actions/submitCustomTruckDesign';
import { PAYMENT_METHOD_OPTIONS } from '@/types/configurator';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export function customTruckDesignHTML(data: CustomTruckDesignInput) {
      const paymentMethodLabel = PAYMENT_METHOD_OPTIONS.find(
        option => option.value === data.paymentMethods
      )?.label || data.paymentMethods;
  
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
                            <td>${data.firstName}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="bfcdd6dcd7d2d0d1dbcfd0d4deffd8d2ded6d391dcd0d2">${data.email}</a></td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td>${data.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Zip Code:</td>
                            <td>${data.zipcode}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>${data.address}</td>
                        </tr>
                    </table>
                </div>
                <div class="info-box">
                    <table>
                        <tr>
                            <td>Quote #</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Sales Rep</td>
                            <td>Andrew Evensen</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="42232c2630273502213731362d2f3630232b2e273032302d316c212d2f">sales@customtrailerspro.com</a></td>
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

            <!-- Standard Specs -->
            <div class="standard-specs">
                <strong>STANDARD TRAILER SPECS:</strong> 16" O.C. Cross Members, 16" O.C. Roof Bows, 16" O.C. Sidewalls, 5000 lb. A-Frame Jack, 2 5/16" Coupler, 3/4" Plywood Floors, 3/8" Plywood Walls, Rubber Roof, Aluminum Fenders, 7-Way Bargman Plug, 24" ATP Stone Guard, Insulated Walls and Ceiling, 12V Battery
            </div>

            <!-- Exterior Options -->
            <div class="section-title">EXTERIOR OPTIONS</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Trailer Size:</td>
                    <td>${data.trailerSize}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Exterior Color:</td>
                    <td>${data.exteriorColor}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Exterior Trim:</td>
                    <td>Silver ATP</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Tongue Options:</td>
                    <td>72" Triple Tube Tongue</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Tongue Options:</td>
                    <td>5000lb Jack</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Generator:</td>
                    <td>None</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>Generator Storage:</td>
                    <td>44" x 40" x 44" Generator Box with Slide Out Tray</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Propane Cage(s):</td>
                    <td>Propane Cage(s) for 100lb Bottle</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>Main Frame:</td>
                    <td>8" Mainframe</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Exterior Walls</td>
                    <td>.080 Exterior Aluminum Thickness</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Roof Options:</td>
                    <td>Rubber Roof With Backer</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Axles:</td>
                    <td>Tandem 5200lb Drop Spring Axles w/ Electric Brakes</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Wheels:</td>
                    <td>Silver Steel Wheels with Radial Tires</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Spare Tire:</td>
                    <td>Silver Steel Wheel with Radial Tire - Spare Tire</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Spare Tire Compartment:</td>
                    <td>Spare Tire Mount</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Stabilizer Jacks:</td>
                    <td>Stabilizing Scissor Jacks (Pair)</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Exterior Lights:</td>
                    <td>LED Flood Lights (each)</td>
                    <td>4</td>
                </tr>
            </table>

            <!-- Doors & Windows -->
            <div class="section-title">DOORS & WINDOWS</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Concession Window:</td>
                    <td>3x6 (With Glass and Screens)</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Additional Window Options:</td>
                    <td>Windows open up and down</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Exterior Fold-Down Serving Shelf:</td>
                    <td>6' Long, 12" Deep Exterior Fold-Down Serving Shelf</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Door Options:</td>
                    <td>36" Standard Solid Man-Door</td>
                    <td>1</td>
                </tr>
            </table>

            <!-- Interior Options -->
            <div class="section-title">INTERIOR OPTIONS</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Interior Height:</td>
                    <td>7'6" Interior Height</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Interior Walls and Ceilings:</td>
                    <td>Silver Frost Aluminum</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Interior Walls and Ceilings:</td>
                    <td>Insulated Walls and Ceiling</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Interior Flooring:</td>
                    <td>Rubber Coin Floor</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Vent and A/C:</td>
                    <td>18,000 BTU Mini Split Installed (AC + Heat) - Includes Protective Cover</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Vent and A/C:</td>
                    <td>MaxxAir Fan (12V) With Cover</td>
                    <td>1</td>
                </tr>
            </table>
        </div>

        <!-- Page 2 -->
        <div class="page">
            <!-- Countertops & Equipment Stands -->
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Countertops:</td>
                    <td>24" Deep Stainless Steel Table (Feet)</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>Countertops:</td>
                    <td>30" Deep Stainless Steel Table (Feet)</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>Equipment Stands:</td>
                    <td>30" Deep SS Equipment Stand (Feet)</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>Cabinetry Color (if applicable):</td>
                    <td>All Cabinets Match Exterior Color</td>
                    <td></td>
                </tr>
            </table>

            <!-- Electrical Package -->
            <div class="section-title">ELECTRICAL PACKAGE</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Electrical Package:</td>
                    <td>Electrical Package with 100A Electrical Panel and 12V System with 12V Battery and Box</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Lifeline:</td>
                    <td>25' Lifeline</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Additional Electrical Options:</td>
                    <td>50 Amp Motor Base Plug, Flush Mount</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Ceiling Lights:</td>
                    <td>4' LED Ceiling Light(s)</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>Electrical Outlets:</td>
                    <td>20A 110V Receptacle(s)</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>Electrical Outlets:</td>
                    <td>Kitchen GFI Receptacle(s)</td>
                    <td>2</td>
                </tr>
            </table>

            <!-- Water Package -->
            <div class="section-title">WATER PACKAGE</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Water Package:</td>
                    <td>3-Bay Sinks with Drainboards, Hand-Washing Sink (Water Pump, Tanks & Heater Housed in Cabinets)</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Water Tanks:</td>
                    <td>40 Gal Fresh, 50 Gal Waste Tanks</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Water Heater:</td>
                    <td>6 Gallon Electric Water Heater</td>
                    <td>1</td>
                </tr>
            </table>

            <!-- Kitchen Equipment -->
            <div class="section-title">KITCHEN EQUIPMENT</div>
            <table class="options-table">
                <tr>
                    <th>ITEM</th>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                </tr>
                <tr>
                    <td>Range Hood:</td>
                    <td>${data.rangeHood}' Range Hood with Variable Speed Control</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Fire Suppression System</td>
                    <td>Standard Fire Suppression System - Wet Chemical Fire Suppression System Installed. NFPA 96, 17A Compliant with Automatic and Manual Activation Devices</td>
                    <td>${data.fireSuppressionSystem}</td>
                </tr>
                <tr>
                    <td>Flat-top Griddle:</td>
                    <td>${data.flatTopGriddle? `${data.flatTopGriddle}" Griddle - CAG48MG`: `None`}</td>
                    <td>${data.flatTopGriddle? `1`: ``}</td>
                </tr>
                <tr>
                    <td>Deep Fryer:</td>
                    <td>${data.deepFryer? `${data.deepFryer}" Deep Fryer - 90,000 LPG - 541FF40L With Cover`: `None`}</td>
                    <td>${data.deepFryer? `1`: ``}</td>
                </tr>
                <tr>
                    <td>Electric Warmers:</td>
                    <td>${data.steamWell? `${data.steamWell} Electric Warmers - 1000W`: `None`}</td>
                    <td>${data.steamWell? `2`: ``}</td>
                </tr>
                <tr>
                    <td>Reach-in Refrigerators:</td>
                    <td>${data.refrigeration.map(refri => `${refri}`)}</td>
                    <td>${data.refrigeration? '1':''}</td>
                </tr>

                <tr>
                    <td>harbroiler:</td>
                    <td>${data.charbroiler? `${data.charbroiler}`: 'none'}</td>
                    <td>${data.charbroiler? '1':''}</td>
                </tr>
                <tr>
                    <td>Sandwich Prep Tables:</td>
                    <td>48" 12 Cu ft Sandwich Prep Table - SS-PT-48-HC</td>
                    <td>1</td>
                </tr>
            </table>

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
                    <td>${data.needFinancing}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Budget Range</td>
                    <td>${data.budget}}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Preferred Payment method:</td>
                    <td>${paymentMethodLabel}</td>
                    <td></td>
                </tr>
            </table>


            <!-- Payment Information -->
            <div class="section-title">TOTAL COST</div>
            <table class="options-table">
                <tr class="total-row">
                    <td>SUBTOTAL</td>
                    <td style="text-align: right;">TOTAL COST:</td>
                    <td style="color: blue;">$ ${data.totalPrice ? data.totalPrice.toLocaleString() : '0'}</td>
                </tr>
            </table>
        </div>

        <!-- Page 3 -->
        <div class="page">
            <!-- Terms and Conditions -->
            <div class="terms-section">
                <h3 style="margin-bottom: 15px;">TERMS AND CONDITIONS:</h3>
                <p style="text-align: justify; line-height: 1.6;">
                    Custom Trailer Pros will provide up to (5) trailer designs at no cost, after which time a Design Fee will be added per design. These fees will be deducted from the total cost of the trailer once it is ordered. When a trailer is purchased from Custom Trailer Pros and is paid for with cash, wire transfer, ACH, cashier's check, or credit card, a 50% deposit is required before production of the trailer will begin. If financing is secured through a third party, down payment requirements will be set by the creditor. The production process is started as soon as the down payment is received and is therefore non-refundable. All production build times given are estimates. Custom Trailer Pros cannot be held responsible for production delays. Due to constant changes and updates with health and safety codes, Custom Trailer Pros cannot guarantee the trailer(s) will pass all inspections. We always recommend submitting the plans to the appropriate agencies for pre-inspection. The balance due is to be paid in full prior to the installation of gas-lines or appliances. Final payment is due no later than 7 days after the time of completion at the factory. Trailer cannot be picked up or delivered until the balance is paid in full. Failure to comply with any of these terms releases Custom Trailer Pros to take possession of the trailer and/or take legal action to collect payment.
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



    `;
  }


export async function generatePdfFromHtml(htmlContent: string) {
  // For many hosts you might need to pass extra args like --no-sandbox
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ],
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome',
    timeout: 60000,
  });

  // Load logo and convert to base64
  const logoPath = path.join(process.cwd(), 'public', 'logo12.png');
  let logoBase64 = '';
  try {
    const logoBuffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error loading logo:', error);
  }

  // Header template with company branding
  const headerTemplate = `
    <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; border-bottom: 2px solid #0066b2; font-size: 10px; -webkit-print-color-adjust: exact;">
      <div style="display: flex; align-items: center;">
        ${logoBase64 ? `<img src="${logoBase64}" style="height: 40px; width: auto;" />` : '<div style="font-size: 18px; font-weight: bold;"><span style="color: #0066b2;">CUSTOM TRAILER PRO</span></div>'}
      </div>
      <div style="text-align: right;">
        <div style="font-weight: bold; font-size: 12px; color: #333;">P: +1 501 216-2500</div>
        <div style="color: #0066b2; font-size: 11px;">www.customtrailerspro.com</div>
      </div>
    </div>
  `;

  // Footer template with page numbers
  const footerTemplate = `
    <div style="width: 100%; text-align: center; font-size: 9px; padding: 10px 0; border-top: 1px solid #ddd; color: #666;">
      <span>All prices are valid for 30 days from the date stated above. Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>
  `;

  try {
    const page = await browser.newPage();

    // optional: set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'letter',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate: footerTemplate,
      margin: {
        top: '80px',    // Increased for header
        bottom: '60px',  // Increased for footer
        left: '12mm',
        right: '12mm'
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}