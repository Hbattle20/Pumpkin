# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Pumpkins By Jamie - A seasonal porch pumpkin display e-commerce website with Stripe payment integration and luxury autumn aesthetic.

## Tech Stack
- **Framework**: Next.js 15 with App Router and React 19
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS v3 with custom autumn palette
- **Payment**: Stripe (live integration with PaymentIntent API)
- **Build Tool**: Turbopack for dev and production
- **Analytics**: Google Ads conversion tracking, Pinterest Tag

## Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Run production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking (tsc --noEmit)

## Architecture

### App Router Structure
- `/app/page.tsx` - Homepage with hero, gallery, packages, contact
- `/app/book/page.tsx` - Multi-step booking form with package selection
- `/app/book/checkout/page.tsx` - Stripe payment processing
- `/app/book/success/page.tsx` - Order confirmation with conversion tracking
- `/app/api/create-payment-intent/route.ts` - Stripe PaymentIntent endpoint

### Key Components
- `Gallery.tsx` - Interactive image carousel with thumbnail navigation
- `CheckoutForm.tsx` - Stripe Elements integration with Apple/Google Pay support

### Business Logic
- **Packages**: 4 tiers ($1400, $850, $550 DIY, $400 DIY) + custom option
- **Add-ons**: Giant Pumpkin ($185), Hay Bale ($35), Design & Setup ($75)
- **Removal**: Pre/Post Thanksgiving service ($125 each)
- **Payment Flow**: Package selection → Customer info → Stripe checkout → Success tracking

## Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_DOMAIN` - Domain for success redirect

## Design System
- **Colors**: Autumn palette (orange: #d2691e, gold: #daa520, red: #8b4513, cream: #f5e6d3)
- **Typography**: Georgia serif primary, Geist Sans/Mono fallback
- **Background**: #faf8f5 (warm cream), Foreground: #2c1810 (dark brown)

## Development Notes
- All components use server rendering by default, mark with `"use client"` only when needed
- Stripe is configured for live payments - handle with care
- Gallery images are in `/public/` directory
- Import alias configured as `@/*` maps to root directory