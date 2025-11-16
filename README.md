# FoodTrucksPro Website

Production-grade homepage for a custom food truck & trailer business built with Next.js 14, TypeScript, TailwindCSS, shadcn/ui, and Framer Motion.

## 🚀 Features

### Core Sections
- **Hero Section** - Video/image background with primary CTAs and trust metrics
- **Instant Estimator Widget** - Client-side cost calculator for quick quotes
- **Feature Highlights** - Value proposition cards (Fast Build, Quality, Custom Layouts)
- **Product Carousel** - Featured inventory with specs and pricing
- **Gallery** - Real builds showcase with lightbox and filters
- **Testimonials** - Customer reviews with star ratings and trust badges
- **Process Timeline** - 4-step visual guide (Design → Quote → Build → Deliver)
- **Financing Callout** - Payment calculator and financing options
- **Lead Magnet** - Downloadable buyer's guide with email capture
- **Footer** - Comprehensive links, newsletter signup, contact info

### Conversion Features
- Sticky "Get Quote" button that appears on scroll
- Floating WhatsApp/Phone contact buttons
- Multiple CTAs throughout the page with analytics hooks
- Email capture forms for lead generation
- Calendar integration placeholder for consultations
- A/B testing data attributes on all major CTAs

### UX & Design
- Apple-grade minimalist design with ample whitespace
- Smooth Framer Motion animations
- Mobile-first responsive layout
- Transparent navbar that becomes solid on scroll
- Accessible with semantic HTML and ARIA attributes
- Optimized for performance with lazy loading

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: lucide-react

## 🛠️ Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration.

3. **Run development server**:
```bash
npm run dev
```

4. **Build for production**:
```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage assembling all sections
│   └── globals.css         # Global styles & CSS variables
├── components/
│   ├── ui/                 # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── sheet.tsx
│   │   └── badge.tsx
│   ├── Navbar.tsx          # Top navigation with mobile menu
│   ├── Hero.tsx            # Hero section with video
│   ├── EstimatorWidget.tsx # Price calculator
│   ├── FeatureHighlights.tsx
│   ├── ProductCarousel.tsx
│   ├── Gallery.tsx         # Image gallery with lightbox
│   ├── Testimonials.tsx
│   ├── ProcessSteps.tsx
│   ├── FinancingCallout.tsx
│   ├── LeadMagnet.tsx      # Email capture forms
│   ├── StickyCTA.tsx       # Floating buttons
│   └── Footer.tsx
├── utils/
│   └── estimator.ts        # Cost calculation logic
├── lib/
│   └── utils.ts            # Utility functions (cn)
└── public/                 # Static assets (images, videos)
```

## 🎨 Customization

### Adding Your Content

1. **Replace placeholder images/videos**:
   - Add your hero video to `/public/hero-video.mp4`
   - Add product images to `/public/` directory
   - Update image paths in components

2. **Update contact information**:
   - Edit phone/email in `Navbar.tsx`
   - Update WhatsApp link in `StickyCTA.tsx`
   - Modify footer contact details in `Footer.tsx`

3. **Customize pricing**:
   - Edit `utils/estimator.ts` to match your pricing structure
   - Adjust base prices and equipment costs

4. **Modify copy**:
   - All component text is inline - search and replace as needed
   - Update trust metrics and customer count

### Styling Changes

The design uses TailwindCSS with CSS variables defined in `app/globals.css`. To customize:

- **Colors**: Update the `--primary`, `--secondary` variables
- **Border radius**: Adjust `--radius` for sharper/rounder corners
- **Fonts**: Replace Inter font in `app/layout.tsx`

## 🔗 Integrations Needed

### Required for Production

1. **Email Marketing** (Lead Magnet component):
   ```typescript
   // Example: Mailchimp integration
   await fetch('/api/subscribe', {
     method: 'POST',
     body: JSON.stringify({ email })
   });
   ```

2. **Calendar Booking** (Consultation):
   - Add Calendly or Cal.com embed
   - Update link in `LeadMagnet.tsx`

3. **Analytics**:
   - Add Google Analytics or Plausible
   - CTAs already have `data-analytics` attributes for tracking

4. **CRM/Lead Capture**:
   - Integrate HubSpot, Salesforce, or custom backend
   - Hook up form submissions in components

### Optional Enhancements

5. **3D Design Builder**:
   - Add Three.js or Spline 3D viewer
   - Link from Hero "Try 3D Design Builder"

6. **Payment Gateway**:
   - Stripe/PayPal for deposits
   - Add to ProductCarousel "View Details"

7. **Live Chat**:
   - Integrate Intercom, Drift, or Tawk.to
   - Replace placeholder in `StickyCTA.tsx`

8. **Image CDN**:
   - Upload images to Cloudinary or Vercel
   - Update `next.config.js` domains

## 📊 Analytics & A/B Testing

All major CTAs include data attributes for tracking:

```html
<Button data-analytics="cta-hero-primary" data-cta="start-custom-build">
```

Track these events in your analytics:
- `cta-hero-primary` / `cta-hero-secondary`
- `cta-calculate-estimate`
- `cta-download-guide`
- `cta-book-consultation`
- `cta-sticky-quote`
- Gallery filters and image clicks
- Carousel navigation

### Suggested A/B Tests

1. **Hero CTA Wording**:
   - "Start Your Custom Build" vs "Get Started Today"
   - "Shop Ready-Built Trucks" vs "View Inventory"

2. **Hero Media**:
   - Video background vs static image
   - Different hero videos

3. **Estimator Placement**:
   - Above fold vs current position
   - Sticky sidebar vs inline

4. **Trust Signals**:
   - "500+ trucks built" vs "Trusted by 500+ entrepreneurs"
   - Display warranty prominently vs de-emphasize

5. **Financing Visibility**:
   - Show monthly payment on hero vs only in dedicated section

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Focus indicators on all interactive elements
- Screen reader friendly

## 🚢 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted with PM2/Docker

## 📄 License

Proprietary - All rights reserved

## 🤝 Support

For questions or issues:
- Email: dev@foodtruckspro.com
- Docs: https://nextjs.org/docs

---

Built with ❤️ using Next.js 14, TypeScript, and TailwindCSS
