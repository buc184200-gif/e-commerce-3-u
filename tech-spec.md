# ARCHIVE DISTRICT — Technical Specification

## Dependencies

### Core

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15.0 | Framework (App Router) |
| react | ^19.0 | UI library |
| react-dom | ^19.0 | React DOM renderer |
| typescript | ^5.7 | Type safety |

### Styling

| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/postcss | ^4.0 | PostCSS integration for Next.js |
| clsx | ^2.1 | Conditional class joining |
| tailwind-merge | ^3.0 | Tailwind class conflict resolution |

### Animation

| Package | Version | Purpose |
|---------|---------|---------|
| gsap | ^3.12 | Core animation engine, ScrollTrigger, timelines |
| lenis | ^1.2 | Smooth scroll with inertia |
| react-fast-marquee | ^1.6 | Continuous scrolling marquees |

### UI / Forms

| Package | Version | Purpose |
|---------|---------|---------|
| shadcn/ui | latest | Component primitives (base layer only) |
| zod | ^3.24 | Schema validation |
| react-hook-form | ^7.54 | Form state management |
| @hookform/resolvers | ^3.9 | Zod resolver for react-hook-form |

### Database

| Package | Version | Purpose |
|---------|---------|---------|
| @supabase/supabase-js | ^2.47 | Supabase client (auth + data) |

### Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| react-use | ^17.6 | Utility hooks (useLocalStorage, useMedia, useIntersection) |
| lucide-react | ^0.460 | Icon library |

---

## Component Inventory

### shadcn/ui Components

These are installed as primitive base components and restyled extensively to match the design system:

- **accordion** — Product detail info tabs, FAQ page accordion, filter sidebar groups
- **dialog** — Size guide overlay, image lightbox, address form modal, admin modals
- **input** — All text inputs across forms
- **textarea** — Order notes, contact message, blog content
- **select** — Sort dropdown, state select, admin filters
- **checkbox** — Filters, terms agreement, WhatsApp opt-in
- **radio-group** — Address type, payment method
- **badge** — Product badges (NEW, SALE, SOLD OUT), status badges
- **separator** — Section dividers, form section dividers
- **scroll-area** — Cart drawer, filter sidebar, admin tables
- **dropdown-menu** — Admin profile dropdown, header user menu
- **table** — Admin data tables (orders, products, customers, reviews, coupons)
- **tabs** — Size guide category tabs, admin page sections
- **toast** — Toast notifications system
- **sonner** — Toast/notification display (alternative to toast, use one)
- **label** — Form labels
- **avatar** — Customer avatars, admin profile
- **switch** — Enable/disable toggles (admin)
- **sheet** — Mobile filter bottom sheet, mobile navigation menu, cart drawer

### Custom Components

**Layout (shared across pages):**

| Component | Source | Notes |
|-----------|--------|-------|
| Header | Custom | Transparent-to-solid on scroll, hide/show on scroll direction, logo swap dark/light, mobile hamburger |
| Footer | Custom | Dark theme (#0B0B0B), 4-column grid |
| MobileBottomNav | Custom | Fixed bottom bar, 5 nav items with active states |
| Container | Custom | Max-width wrapper with responsive padding |
| Breadcrumb | Custom | Dynamic path-based, links to each level |

**Product system:**

| Component | Source | Notes |
|-----------|--------|-------|
| ProductCard | Custom | Core e-commerce card — image, wishlist toggle, badges, price, size chips. Used in 10+ sections across the site. |
| ProductGrid | Custom | Responsive grid (4/3/2 col) with skeleton loading, infinite scroll trigger, empty state |
| ProductCarousel | Custom | Horizontal scroll-snap carousel with prev/next arrows, used for New Arrivals, Best Sellers, Related, Recently Viewed |
| ProductGallery | Custom | Main image + thumbnail strip + lightbox + swipe support |
| SizeSelector | Custom | Size button grid with OOS states, links to SizeGuide overlay |
| QuantityStepper | Custom | [−] [num] [+] control with min/max bounds |
| QuickAddOverlay | Custom | Hover-revealed size selector on product cards |
| WishlistButton | Custom | Heart icon with filled/unfilled states, toggle functionality |

**Cart system:**

| Component | Source | Notes |
|-----------|--------|-------|
| CartDrawer | Custom | Slide-in from right, item list with quantity/remove, sticky summary, empty state |
| CartItem | Custom | Single cart item row — image, details, quantity stepper, price, remove |
| OrderSummary | Custom | Sticky sidebar — subtotal, shipping, discount, total, coupon input, checkout CTA |

**Trust/SEO:**

| Component | Source | Notes |
|-----------|--------|-------|
| TrustBar | Custom | Horizontal 4-item trust signals bar, used on Home and Shipping page |
| TrustBadges | Custom | 4-badge row (icon + text), used on product page, cart, checkout |
| SeoHead | Custom | Next.js Head wrapper with meta tags, OG tags, structured data, canonical URLs |

**Forms:**

| Component | Source | Notes |
|-----------|--------|-------|
| AddressForm | Custom | Reused in checkout + account addresses — full name, address lines, city, state select, PIN, type radio |
| ContactForm | Custom | Name, email, phone, subject select, message textarea |
| CouponInput | Custom | Text input + apply button with validation state |

**Review system:**

| Component | Source | Notes |
|-----------|--------|-------|
| ReviewCard | Custom | Compact (carousel) and expanded (product page) variants via prop |
| ReviewSummary | Custom | Large rating number + star breakdown bars |

**Admin:**

| Component | Source | Notes |
|-----------|--------|-------|
| AdminLayout | Custom | Sidebar + header + content area layout, route guard |
| AdminSidebar | Custom | Collapsible nav with active state indicator |
| AdminHeader | Custom | Top bar with search, notifications, profile dropdown |
| KpiCard | Custom | Stat card with icon, label, value, change indicator |
| DataTable | Custom | Reusable sortable/paginated table for all admin list views |
| StatusBadge | Custom | Color-coded pill for order/product/review statuses |
| DateRangePicker | Custom | Preset + custom range for analytics filtering |
| ImageUploader | Custom | Drag-drop zone with preview, reorder, delete for product images |
| RichTextEditor | Custom | WYSIWYG editor for blog posts (lightweight, not a heavy library) |

**Animation:**

| Component | Source | Notes |
|-----------|--------|-------|
| ScrollReveal | Custom | Wrapper that triggers GSAP entrance animation when element enters viewport via ScrollTrigger |
| PageTransition | Custom | Wraps route changes with GSAP fade/slide choreography |
| CountUp | Custom | Animated number counting from 0 to target value, triggered by intersection |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Smooth scroll | Lenis | Global instance initialized in layout, synced with GSAP ticker | Low |
| Page load sequence | GSAP | Timeline: overlay fade → content stagger entrance → nav entrance. Minimum 800ms display. | Medium |
| Page transitions | GSAP | Exit: fade out 300ms. Enter: fade in + slide up, staggered 80ms per section. | Low |
| Hero entrance | GSAP | Timeline: bg scale 1.1→1 (1500ms) → badge → headline → subheadline → CTAs, each with translateY + opacity, incremental delays | Medium |
| Hero badge pulse | GSAP | Continuous yoyo scale tween (1→1.03→1, 4s, infinite, ease-in-out) | Low |
| Hero parallax | GSAP ScrollTrigger | ScrollTrigger with scrub: bg translateY at 0.3x rate, content at 0.1x rate, content opacity to 0 at 50vh | Medium |
| Nav entrance | GSAP | Timeline: logo slide down + fade, nav links staggered slide down, right icons staggered. All with incremental delays. | Low |
| Nav background transition | CSS + JS | Class toggle on scroll threshold (100px). CSS transition for background/border color. | Low |
| Nav hide/show | GSAP | Scroll direction detection (80px delta). Down: translateY to -100% (400ms). Up: translateY to 0 (400ms). | Low |
| Mobile menu | GSAP | Timeline: hamburger → X morph (3 line transforms, 300ms) + overlay slide from right (400ms, custom easing) + links staggered translateY (60ms stagger, 500ms) | Medium |
| Search overlay | GSAP | Fade in 300ms + search input translateY -20px→0 (400ms, 100ms delay) | Low |
| Scroll reveal (global) | GSAP ScrollTrigger | Reusable ScrollReveal component. Trigger: element enters viewport. Animation: translateY 30px→0 + opacity 0→1. Configurable stagger, duration, easing per instance. | Medium |
| Product card hover | CSS | translateY 0→-4px + box-shadow transition (300ms, cubic-bezier). Image scale 1→1.05 within overflow:hidden container. Pure CSS transitions. | Low |
| Quick add overlay | GSAP | translateY 100%→0 on hover (300ms). Slides back down after add confirmation. | Low |
| Product card grid stagger | GSAP ScrollTrigger | ScrollTrigger batch on product grids. Staggered 80ms per card, translateY 30px→0 + opacity. | Low |
| Product carousel entrance | GSAP ScrollTrigger | Cards slide in from right (translateX 50px→0), staggered 60ms, triggered on section enter. | Low |
| Trust bar stagger | GSAP ScrollTrigger | Each item: translateY 10px→0 + opacity, staggered 100ms. | Low |
| Category card hover | CSS | Image scale 1→1.05 (500ms), overlay opacity change. Pure CSS. | Low |
| Category card entrance | GSAP ScrollTrigger | translateY 40px→0 + opacity, staggered 150ms. | Low |
| Why Buy From Us stats | GSAP ScrollTrigger | Cards stagger in (translateY 30px→0, 100ms stagger) + CountUp number animation (1.5s) triggered on viewport enter. | Medium |
| Review carousel entrance | GSAP ScrollTrigger | Cards slide from right, staggered 60ms. | Low |
| Instagram grid | GSAP ScrollTrigger | Scale 0.95→1 + opacity, staggered 80ms. Hover: image scale + overlay fade-in. | Low |
| Newsletter entrance | GSAP ScrollTrigger | Content translateY 20px→0 + opacity (500ms). | Low |
| Size guide overlay | GSAP | Backdrop fade in + modal translateY 50px→0 (400ms). | Low |
| Cart drawer | GSAP | Slide from right translateX 100%→0 (400ms). Backdrop fade. Items stagger translateX 20px→0 (50ms). | Medium |
| Cart item removal | GSAP | translateX 0→-100% + opacity 1→0 (300ms), then height collapse. | Low |
| Cart quantity change | CSS | Price background flash #E7D9B6 → transparent (500ms). | Low |
| Lightbox | GSAP | Overlay fade 300ms. Image scale 0.9→1. | Low |
| Gallery crossfade | CSS | Opacity transition 200ms on image swap. | Low |
| Add to cart success | CSS + JS | Button background flash to #16A34A, text changes to "ADDED ✓", reverts after 1.5s. | Low |
| Accordion expand | CSS | height 0→auto using grid-template-rows or max-height transition (300ms). Chevron rotate 180deg (200ms). | Low |
| Checkout step transition | GSAP | Exit: opacity 1→0 + translateX 0→-20px. Enter: opacity 0→1 + translateX 20px→0. Duration 300ms. | Low |
| Form validation shake | GSAP | translateX -5px→5px→0 (300ms) on error fields. | Low |
| Order confirmation success | GSAP | Success icon scale 0→1 with bounce easing (500ms). Content stagger in (translateY 20px→0, 100ms stagger). | Low |
| Tracking timeline | GSAP ScrollTrigger | Steps stagger in (translateX -20px→0, 100ms stagger). | Low |
| Tracking results | GSAP | Height 0→auto (400ms) reveal. | Low |
| Wishlist card remove | GSAP | Scale 1→0.9 + opacity 1→0, then grid reflow. | Low |
| FAQ accordion | CSS | Same as product accordion — height transition + chevron rotation. | Low |
| FAQ search highlight | JS | Real-time filter with text highlighting of matched terms. | Low |
| Blog card hover | CSS | Image scale 1→1.03, title color → #E7D9B6. | Low |
| Size guide tab switch | CSS | Content crossfade (opacity 200ms). | Low |
| Size chart row stagger | GSAP ScrollTrigger | translateY 5px→0, staggered 20ms per row. | Low |
| Admin sidebar (mobile) | GSAP | translateX -100%→0 (300ms). | Low |
| Admin modal | GSAP | Backdrop fade + content scale 0.95→1 (200ms). | Low |
| Admin toast | GSAP | Slide in from top-right (translateX 100%→0, 300ms). | Low |
| Number count-up | Custom hook | requestAnimationFrame-based, eased deceleration, triggered by IntersectionObserver. | Low |
| Trust bar badge pulse | GSAP | scale 1→1.03→1 (4s, infinite, ease-in-out) on the hero badge specifically. | Low |
| Instagram hover overlay | CSS | Overlay opacity 0→1, Instagram icon scale 0→1. Pure CSS. | Low |
| Footer entrance | GSAP ScrollTrigger | Columns stagger in (translateY 20px→0, 100ms stagger, 600ms). | Low |

---

## State & Logic Plan

### Cart State (Global — React Context)

The cart is accessed from nearly every page (header badge, cart drawer, cart page, add-to-cart on product cards, product detail). A global context at the layout level avoids prop drilling.

- **Shape**: Array of `{ productId, variantId, size, quantity, price, image, name, brand }`
- **Persistence**: `localStorage` (hydrated on mount, synced on every change)
- **Actions**: addItem, removeItem, updateQuantity, clearCart, applyCoupon, removeCoupon
- **Derived**: totalCount, subtotal, discount, total, isEmpty
- **Coupon validation**: Client-side format check, server validation on checkout submit

### Wishlist State (Global — React Context)

Similarly pervasive — header heart icon count, product card hearts, product detail wishlist button, wishlist page.

- **Shape**: Array of `{ productId, savedAt }`
- **Persistence**: `localStorage` (guest mode) + Supabase (authenticated users)
- **Actions**: addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted(productId)
- **Sync strategy**: On auth state change, merge local wishlist with server wishlist (deduplicate, keep newest)

### Auth State (Global — React Context)

Drives conditional UI throughout: header (login vs. account dropdown), checkout (guest vs. saved addresses), wishlist sync, order history.

- **Shape**: `{ user, session, isLoading, isAdmin }`
- **Source**: Supabase Auth listener
- **Actions**: signIn, signUp, signOut, resetPassword
- **Protected routes**: Middleware redirect for /account/*, /admin/*, /checkout/account-required

### Recently Viewed (Global — React Context or hook)

Product detail pages add their ID to a limited-size array (max 20, LRU eviction).

- **Persistence**: `localStorage`
- **Usage**: "Recently Viewed" section on product page, personalized recommendations

### Form Handling Strategy

All major forms use **react-hook-form + Zod** for validation:

- **Checkout shipping form**: Zod schema validates email format, 10-digit Indian phone, 6-digit PIN, required fields
- **Contact form**: Name, email, subject, message validation
- **Login/Register**: Email, password strength, password match
- **Coupon input**: Format validation (alphanumeric, case-insensitive)
- **Address form**: Full validation matching checkout schema (reused component)

**PIN code auto-fill**: On checkout, the PIN code input attempts to auto-fill city/state from a client-side lookup table of Indian PIN codes (static JSON, ~150KB). Falls back to manual select.

### Admin Route Guard

- **Middleware**: Check session + isAdmin flag on /admin/* routes
- **Redirect**: Unauthenticated → /login, non-admin → /
- **API routes**: All admin API endpoints validate admin role server-side

### Product Data Architecture

Products are read-heavy with occasional updates (admin). The schema supports:

- **Base product**: Name, brand, category, description, images, price, salePrice, condition, badges, slug
- **Variants per product**: Size + stock quantity matrix (each variant has its own SKU and stock count)
- **Filters**: Computed from product attributes (brand list, size range, price range) — fetched once and cached client-side
- **Sort options**: Featured (manual rank), Newest (createdAt), Price (asc/desc), Best Selling (order count)

### Image Strategy

- **Product images**: Served via Supabase Storage or Cloudinary for optimization
- **Client-side**: `next/image` with `placeholder="blur"` and blurDataURL for above-fold, lazy loading below
- **Gallery**: Main image loads immediately, thumbnails lazy-loaded, lightbox loads high-res on demand

### Order Tracking Flow

1. Customer submits Order ID + phone number
2. Client validates format (Order ID: AD-\d+, Phone: 10 digits)
3. API query matches order by ID + phone (security: must match both)
4. Returns order status timeline with timestamps
5. Admin status updates trigger WhatsApp/email notifications via Supabase Edge Functions

---

## Other Key Decisions

### App Router with Dynamic Routes

Next.js 15 App Router handles:
- `/shop/[category]/[slug]` — Product detail pages with generateStaticParams for popular products, ISR for rest
- `/blog/[slug]` — Blog posts with ISR
- `/admin/*` — Admin dashboard (route group with different layout)
- `not-found.tsx` — Custom 404 with link back to shop

### Supabase Architecture

- **Auth**: Email/password + magic link. JWT sessions managed by Supabase client.
- **Database**: PostgreSQL via Supabase. Row Level Security (RLS) policies on all tables.
- **Storage**: Product images bucket with public read, admin-only write.
- **Edge Functions**: Order status notifications (WhatsApp/email), inventory webhooks.
- **Real-time**: Optional — live order status updates via Supabase Realtime for the tracking page.

### shadcn/ui Strategy

Install shadcn components as the **primitive base layer** only. Every installed component is immediately restyled via:
- Tailwind class overrides in component source files
- CSS variables for theme tokens in globals.css
- No default shadcn styling left visible — all must match the ARCHIVE DISTRICT design system

The toast/notification system uses **sonner** (installed via shadcn) for its positioning and queue management, triggered from the global cart/auth contexts.

### Mobile-First Responsive

All layouts are designed mobile-first:
- Product grid: 2 cols (base) → 3 cols (lg) → 4 cols (xl)
- Navigation: Hamburger below md, full nav at lg+
- Bottom CTA: Fixed bar on mobile product pages (< 768px)
- Touch targets: Minimum 44px tap areas throughout

### Performance Budget

- Target: Lighthouse 95+ Performance
- Image optimization: WebP format, responsive srcset, blur placeholders
- Animation: Only GPU-accelerated properties (transform, opacity)
- Code splitting: Admin routes lazy-loaded, heavy animation chunks code-split
- Font loading: Preload critical fonts, font-display: swap for rest
