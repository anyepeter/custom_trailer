# About Us Page - Setup Guide

## Overview
Complete implementation of the About Us page with "Meet the Team" and "Our Process" sub-pages.

## Installation

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000/about` to see the About Us page.

## File Structure

```
app/
├── about/
│   ├── page.tsx              # Meet the Team page
│   └── process/
│       └── page.tsx          # Our Process page
components/
├── TopBar.tsx                # Top contact bar with social icons
├── HeroVideo.tsx             # YouTube video embed component
├── TeamGrid.tsx              # Team members grid layout
├── TeamCard.tsx              # Individual team member card
├── Navbar.tsx                # Main navigation (existing)
└── Footer.tsx                # Footer component (existing)
data/
└── team.ts                   # Team members data
public/
└── team/                     # Team member photos (add here)
    ├── andrew.jpg
    ├── sarah.jpg
    ├── michael.jpg
    ├── emily.jpg
    ├── david.jpg
    ├── jessica.jpg
    ├── robert.jpg
    └── amanda.jpg
```

## Customization

### 1. Replace Team Member Photos

Add square photos (400x400px or larger) to `public/team/` directory:
- `andrew.jpg`
- `sarah.jpg`
- `michael.jpg`
- `emily.jpg`
- `david.jpg`
- `jessica.jpg`
- `robert.jpg`
- `amanda.jpg`

**Note:** If photos are missing, the app will automatically show avatar placeholders with initials.

### 2. Update YouTube Video ID

In `app/about/page.tsx` and `app/about/process/page.tsx`, replace the video ID:

```tsx
<HeroVideo
  videoId="YOUR_YOUTUBE_VIDEO_ID" // Replace this
  title="About Custom Trailer Pro"
/>
```

To get the video ID, copy it from the YouTube URL:
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ`

### 3. Update Team Members

Edit `data/team.ts` to add, remove, or modify team members:

```ts
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Your Name",
    role: "Your Role",
    image: "/team/your-photo.jpg",
    alt: "Your Name - Your Role"
  },
  // Add more team members...
];
```

### 4. Customize Process Steps

Edit the `steps` array in `app/about/process/page.tsx`:

```tsx
const steps = [
  {
    number: 1,
    title: 'Your Step Title',
    description: 'Your step description...',
  },
  // Add more steps...
];
```

## Responsive Breakpoints

The team grid automatically adjusts:
- **Mobile (< 640px):** 1 column
- **Tablet (640px - 991px):** 2 columns
- **Large Tablet (992px - 1199px):** 3 columns
- **Desktop (≥ 1200px):** 4 columns

## Accessibility Features

- ✅ Semantic HTML elements
- ✅ ARIA labels for social icons
- ✅ `aria-current="page"` for active navigation
- ✅ Alt text for all images
- ✅ Lazy loading for YouTube embeds
- ✅ Keyboard navigation support
- ✅ Focus states for interactive elements

## Performance

- Images use Next.js `Image` component with automatic optimization
- Responsive image sizes for different viewports
- Lazy loading for iframe and images
- Fallback avatar generation if images fail to load

## Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Images not loading?
1. Check that images exist in `public/team/` directory
2. Ensure file names match those in `data/team.ts`
3. Verify image formats (jpg, png, webp supported)

### Video not displaying?
1. Confirm YouTube video ID is correct
2. Check that video is not private or restricted
3. Ensure video embeds are allowed

## Routes

- `/about` - Meet the Team page
- `/about/process` - Our Process page

## Notes

- Max content width: 980px (centered)
- Video width: 85% of container on desktop, full width on mobile
- Team card images are square (1:1 aspect ratio)
- Social icons link to company social media profiles (update in `TopBar.tsx`)
