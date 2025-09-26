"use client";

import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const paymentIntent = searchParams.get("payment_intent");

  return (
    <>
      {/* Google Ads Conversion Tracking - Page Load */}
      <Script
        id="google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {
              'send_to': 'AW-16945192161/uOlbCPbIor0aEOG5jJA_',
              'value': ${amount ? parseFloat(amount) : 0},
              'currency': 'USD',
              'transaction_id': '${paymentIntent || ''}'
            });
          `,
        }}
      />
    <div className="min-h-screen bg-gradient-to-b from-cream to-background flex items-center justify-center px-6">
      <div className="bg-white rounded-lg p-12 shadow-2xl max-w-2xl text-center">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-autumn-orange"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-5xl font-serif text-autumn-red mb-4">
          Thank You!
        </h1>

        <p className="text-xl text-gray-700 mb-8">
          Your order has been successfully placed.
        </p>

        <div className="bg-autumn-orange/10 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-serif text-autumn-red mb-4">What's Next?</h2>
          <ul className="space-y-3 text-left text-gray-700">
            <li className="flex items-start">
              <span className="text-autumn-orange mr-2">✓</span>
              <span>You'll receive an email confirmation at the address provided</span>
            </li>
            <li className="flex items-start">
              <span className="text-autumn-orange mr-2">✓</span>
              <span>We'll contact you within 24 hours to schedule delivery</span>
            </li>
            <li className="flex items-start">
              <span className="text-autumn-orange mr-2">✓</span>
              <span>Your pumpkins will be delivered and arranged as requested</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Questions? Contact us at{" "}
            <a
              href="mailto:jamie@pumpkinsbyjamie.com"
              className="text-autumn-orange hover:text-autumn-red transition-colors"
            >
              jamie@pumpkinsbyjamie.com
            </a>
            {" "}or call{" "}
            <a
              href="tel:2063056859"
              className="text-autumn-orange hover:text-autumn-red transition-colors"
            >
              (206) 305-6859
            </a>
          </p>

          <Link
            href="/"
            className="inline-block bg-autumn-orange text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-autumn-red transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-cream to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-autumn-orange mx-auto"></div>
          <p className="mt-4 text-autumn-red">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}