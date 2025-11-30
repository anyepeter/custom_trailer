# Custom Truck Design Email Setup Guide

## Overview
The "Design Your Own Truck" feature is now fully implemented with NodeMailer email notifications. When customers submit a custom truck design, the system will:
1. Validate the form data with Zod
2. Save the request to the database (BuildRequest table)
3. Send a professional HTML email to the customer
4. Send a copy to your sales team

---

## Email Configuration

### 1. Environment Variables Setup

Copy the following variables from `.env.example` to your `.env` file and fill in your SMTP credentials:

```bash
# Email Configuration (NodeMailer SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=FoodTrucksPro <noreply@foodtruckspro.com>
SALES_EMAIL=sales@foodtruckspro.com
```

### 2. Gmail Setup (Recommended)

If using Gmail:
1. Go to your Google Account settings
2. Navigate to **Security** → **2-Step Verification**
3. Scroll down to **App passwords**
4. Create a new app password for "Mail"
5. Use this 16-character password as `SMTP_PASS`

**Configuration:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # 16-character app password
SMTP_FROM=FoodTrucksPro <your-email@gmail.com>
SALES_EMAIL=your-sales-email@gmail.com
```

### 3. Other SMTP Providers

#### SendGrid
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

#### Mailgun
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.com
SMTP_PASS=your_mailgun_password
```

#### AWS SES
```bash
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your_ses_smtp_username
SMTP_PASS=your_ses_smtp_password
```

---

## Testing the System

### 1. Local Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/configure`

3. Fill out the entire configurator form (all 5 steps):
   - **Step 1:** Select trailer size
   - **Step 2:** Choose equipment (range hood, fire suppression, etc.)
   - **Step 3:** Customize colors and finishes
   - **Step 4:** Select budget and financing options
   - **Step 5:** Enter contact information

4. Submit the form

5. You should see:
   - Loading overlay with spinner
   - Success message with confetti animation
   - Confirmation showing the quote summary

6. Check your email inbox (the email you entered in the form)

7. Check your sales email inbox (`SALES_EMAIL`)

### 2. What the Email Contains

The HTML email includes:
- **Header** with FoodTrucksPro branding
- **Customer Information** (name, email, phone, location)
- **Truck Specifications** (trailer size, equipment selections)
- **Customization Details** (colors, finishes)
- **Equipment List** (all selected options)
- **Financial Information** (budget range, financing needs)
- **Total Price** (if calculated)
- **Footer** with contact information

### 3. Database Verification

Check that the submission was saved:
1. Navigate to `http://localhost:3000/admin/build-requests`
2. You should see your submission in the list
3. Status should be "Pending"

---

## Files Modified/Created

### New Files:
- [`/lib/email.ts`](lib/email.ts) - NodeMailer configuration and HTML email template
- [`/app/actions/submitCustomTruckDesign.ts`](app/actions/submitCustomTruckDesign.ts) - Server action for form submission

### Modified Files:
- [`/app/configure/page.tsx`](app/configure/page.tsx) - Updated to use server action
- [`.env.example`](.env.example) - Added SMTP configuration variables
- [`package.json`](package.json) - Added nodemailer dependency

---

## Troubleshooting

### Email Not Sending

**Issue:** Form submits but no email received

**Solutions:**
1. Check `.env` file has all SMTP variables configured
2. Verify SMTP credentials are correct
3. Check spam/junk folder
4. Look at server console for error messages
5. For Gmail, ensure "Less secure app access" is enabled OR use App Password

### Gmail "Less Secure Apps" Error

**Solution:** Use App Passwords instead:
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password
3. Use the App Password as `SMTP_PASS`

### Database Error

**Issue:** "Database error occurred"

**Solutions:**
1. Ensure Prisma Client is generated: `npx prisma generate`
2. Verify database connection: Check `DATABASE_URL` in `.env`
3. Run migrations: `npx prisma migrate dev`

### Build Error

**Issue:** TypeScript errors during build

**Solution:** The Zod error handling has been fixed. If you encounter other errors:
```bash
npm run build
```
Check the error message and ensure all imports are correct.

---

## Email Template Customization

To customize the email template, edit [`/lib/email.ts`](lib/email.ts):

### Change Colors
```typescript
// Line 68-70 - Header gradient
background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);

// Line 116-118 - Price box gradient
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
```

### Change Logo/Branding
```typescript
// Line 63-66 - Header section
<h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0;">
  🚚 FoodTrucksPro
</h1>
```

### Add More Sections
Add new sections between lines 90-150 using the same card styling:
```typescript
<div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
  <h2>Your New Section</h2>
  <p>Your content here</p>
</div>
```

---

## Production Deployment

### 1. Environment Variables on Vercel

Add all SMTP variables to your Vercel project:
1. Go to your project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add each SMTP variable:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`
   - `SALES_EMAIL`

### 2. Deploy

```bash
git add .
git commit -m "Add custom truck design email system with NodeMailer"
git push
```

Vercel will automatically deploy with the new changes.

---

## API Routes (Legacy)

**Note:** The old API routes in `/app/api/configure/` are still present but NOT used by the form. The form now uses server actions directly. You can safely delete these API routes if desired:
- `/app/api/configure/save/route.ts`
- `/app/api/configure/submit/route.ts`

---

## Support

If you encounter any issues:
1. Check the server console for error messages
2. Verify all environment variables are set correctly
3. Test SMTP connection using a simple test script
4. Ensure database migrations are up to date

For production email sending, consider using a dedicated email service like SendGrid, Mailgun, or AWS SES for better deliverability and monitoring.
