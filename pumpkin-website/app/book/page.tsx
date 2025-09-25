"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const packages = [
  { id: "pkg1", name: "Package #1", price: 1500 },
  { id: "pkg2", name: "Package #2", price: 850 },
  { id: "pkg3", name: "Package #3 (DIY)", price: 550 },
  { id: "pkg4", name: "Package #4 (DIY)", price: 350 },
  { id: "custom", name: "Custom Package", price: 0 },
];

const addOns = [
  { id: "giant", name: "Extra Giant Pumpkin", price: 75 },
  { id: "haybale", name: "Extra Hay Bale", price: 35 },
  { id: "design3", name: "Design & Setup (for Package #3)", price: 75 },
  { id: "design4", name: "Design & Setup (for Package #4)", price: 75 },
];

const removalOptions = [
  { id: "before", name: "Week before Thanksgiving", price: 50 },
  { id: "after", name: "Week after Thanksgiving", price: 50 },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedRemoval, setSelectedRemoval] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const packageParam = searchParams.get("package");
    if (packageParam && packages.some(p => p.id === packageParam)) {
      setSelectedPackage(packageParam);
    }
  }, [searchParams]);

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const packagePrice = packages.find((p) => p.id === selectedPackage)?.price || 0;
    const addOnsPrice = selectedAddOns.reduce((total, id) => {
      const addon = addOns.find((a) => a.id === id);
      return total + (addon?.price || 0);
    }, 0);
    const removalPrice = selectedRemoval ? 50 : 0;
    return packagePrice + addOnsPrice + removalPrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get package name
    const packageName = packages.find(p => p.id === selectedPackage)?.name || "";

    // Build query params for checkout page
    const params = new URLSearchParams({
      amount: calculateTotal().toString(),
      package: packageName,
      customer: JSON.stringify(customerInfo),
      addons: JSON.stringify(selectedAddOns),
      removal: selectedRemoval,
    });

    // Navigate to checkout page with Stripe
    router.push(`/book/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-background">
      {/* Header */}
      <header className="bg-autumn-red text-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif hover:text-cream transition-colors">
            Pumpkins By Jamie
          </Link>
          <Link href="/" className="hover:text-cream transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-serif text-autumn-red text-center mb-12">
          Book Your Pumpkin Display
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package Selection */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-serif text-autumn-red mb-6">Select Your Package</h2>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <label
                  key={pkg.id}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? "border-autumn-orange bg-autumn-orange/10"
                      : "border-gray-200 hover:border-autumn-gold"
                  }`}
                >
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={selectedPackage === pkg.id}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{pkg.name}</span>
                    <span className="text-autumn-orange font-bold text-xl">
                      {pkg.price > 0 ? `$${pkg.price}` : "Contact for pricing"}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Add-Ons */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-serif text-autumn-red mb-6">Add-Ons</h2>
            <div className="space-y-4">
              {addOns.map((addon) => (
                <label
                  key={addon.id}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedAddOns.includes(addon.id)
                      ? "border-autumn-orange bg-autumn-orange/10"
                      : "border-gray-200 hover:border-autumn-gold"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={addon.id}
                    checked={selectedAddOns.includes(addon.id)}
                    onChange={() => handleAddOnToggle(addon.id)}
                    className="sr-only"
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{addon.name}</span>
                    <span className="text-autumn-orange font-bold">+${addon.price}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Removal Service */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-serif text-autumn-red mb-6">Removal Service</h2>
            <div className="space-y-4">
              {removalOptions.map((option) => (
                <label
                  key={option.id}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedRemoval === option.id
                      ? "border-autumn-orange bg-autumn-orange/10"
                      : "border-gray-200 hover:border-autumn-gold"
                  }`}
                >
                  <input
                    type="radio"
                    name="removal"
                    value={option.id}
                    checked={selectedRemoval === option.id}
                    onChange={(e) => setSelectedRemoval(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{option.name}</span>
                    <span className="text-autumn-orange font-bold">+${option.price}</span>
                  </div>
                </label>
              ))}
              <label className="block p-4 border-2 rounded-lg cursor-pointer transition-all border-gray-200 hover:border-autumn-gold">
                <input
                  type="radio"
                  name="removal"
                  value=""
                  checked={selectedRemoval === ""}
                  onChange={() => setSelectedRemoval("")}
                  className="sr-only"
                />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">No removal service needed</span>
                  <span className="text-gray-500">$0</span>
                </div>
              </label>
            </div>
            <p className="mt-4 text-sm text-gray-600 italic">
              *We can accommodate other removal dates upon request. Please mention in the notes below.
            </p>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-serif text-autumn-red mb-6">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-autumn-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-autumn-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-autumn-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-autumn-orange focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  rows={3}
                  value={customerInfo.notes}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, notes: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-autumn-orange focus:border-transparent"
                  placeholder="Any specific placement preferences, custom removal dates, etc."
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-autumn-red text-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-serif mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {selectedPackage && (
                <div className="flex justify-between">
                  <span>{packages.find((p) => p.id === selectedPackage)?.name}</span>
                  <span>${packages.find((p) => p.id === selectedPackage)?.price}</span>
                </div>
              )}
              {selectedAddOns.map((id) => {
                const addon = addOns.find((a) => a.id === id);
                return (
                  <div key={id} className="flex justify-between text-sm">
                    <span>{addon?.name}</span>
                    <span>+${addon?.price}</span>
                  </div>
                );
              })}
              {selectedRemoval && (
                <div className="flex justify-between text-sm">
                  <span>Removal: {removalOptions.find((r) => r.id === selectedRemoval)?.name}</span>
                  <span>+$50</span>
                </div>
              )}
            </div>
            <div className="border-t border-white/30 pt-4">
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedPackage}
            className="w-full bg-autumn-orange text-white py-4 px-8 rounded-lg text-xl font-semibold hover:bg-autumn-red transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-cream to-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-autumn-orange mx-auto"></div>
        <p className="mt-4 text-autumn-red">Loading...</p>
      </div>
    </div>}>
      <BookingForm />
    </Suspense>
  );
}