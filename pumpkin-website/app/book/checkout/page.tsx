"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/app/components/CheckoutForm";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get order details from URL params
  const amount = parseFloat(searchParams.get("amount") || "0");
  const packageName = searchParams.get("package") || "";
  const customerInfo = JSON.parse(searchParams.get("customer") || "{}");
  const addOns = JSON.parse(searchParams.get("addons") || "[]");
  const removal = searchParams.get("removal") || "";

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        customerInfo,
        packageName,
        addOns,
        removal,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Failed to initialize payment. Please try again.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Failed to connect to payment system. Please try again.");
        setLoading(false);
      });
  }, [amount, customerInfo, packageName, addOns, removal]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#d2691e',
      colorBackground: '#ffffff',
      colorText: '#2c1810',
      colorDanger: '#8b4513',
      fontFamily: 'Georgia, serif',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-autumn-orange mx-auto"></div>
          <p className="mt-4 text-autumn-red">Loading payment form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-background flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md">
          <h2 className="text-2xl font-serif text-autumn-red mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/book"
            className="block text-center bg-autumn-orange text-white px-6 py-3 rounded hover:bg-autumn-red transition-colors"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-background">
      {/* Header */}
      <header className="bg-autumn-red text-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif hover:text-cream transition-colors">
            Pumpkins By Jamie
          </Link>
          <Link href="/book" className="hover:text-cream transition-colors">
            ← Back to Booking
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-serif text-autumn-red text-center mb-12">
          Complete Your Purchase
        </h1>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-xl font-serif text-autumn-red mb-4">Order Summary</h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Package:</span>
              <span className="font-semibold">{packageName}</span>
            </div>
            {addOns.length > 0 && (
              <div className="flex justify-between">
                <span>Add-ons:</span>
                <span className="font-semibold">{addOns.length} selected</span>
              </div>
            )}
            {removal && (
              <div className="flex justify-between">
                <span>Removal Service:</span>
                <span className="font-semibold">Yes</span>
              </div>
            )}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-autumn-orange">${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stripe Payment Form */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm amount={amount} />
            </Elements>
          )}
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Your payment information is secure and encrypted. We never store your card details.
        </p>
      </div>
    </div>
  );
}