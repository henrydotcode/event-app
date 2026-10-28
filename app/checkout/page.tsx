
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();

  // 10-minute countdown (600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);
  const [isExpired, setIsExpired] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  };

  // Handle payment submission
  const handlePayment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isExpired || isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      // Demo only: replace with your payment API integration.
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Demo redirect. A real checkout should redirect only
      // after the server confirms successful payment.
      router.push("/success");
    } catch (error) {
      console.error("Payment processing failed:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      {/* Navbar */}
      <nav className="flex w-full justify-center border-b border-slate-800 bg-slate-950 p-6">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-white"
        >
          EASIEVENTS<span className="text-indigo-500">.</span>
        </Link>
      </nav>

      {/* Countdown banner */}
      <div
        role="status"
        aria-live="polite"
        className={`w-full py-3 text-center text-sm font-bold tracking-wide ${
          isExpired
            ? "bg-red-600 text-white"
            : "bg-amber-500 text-amber-950"
        }`}
      >
        {isExpired
          ? "Time expired! Your reservation has been released."
          : `Tickets reserved. Please complete checkout in ${formatTime(timeLeft)}`}
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-2">
        {/* Left column: Checkout form */}
        <div
          className={`space-y-8 ${
            isExpired ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <h1 className="text-3xl font-extrabold text-white">
            Checkout
          </h1>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* Contact information */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">
                Contact Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-xs font-semibold uppercase text-slate-400"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-xs font-semibold uppercase text-slate-400"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase text-slate-400"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Your PDF tickets will be sent here.
                </p>
              </div>
            </div>

            {/* Payment information */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">
                Payment Method
              </h2>

              <p className="text-sm text-slate-400">
                Payment form placeholder. Use a PCI-compliant
                payment provider for real card payments.
              </p>
            </div>

            <button
              type="submit"
              disabled={isExpired || isProcessing}
              className="flex w-full items-center justify-center rounded-xl bg-indigo-600 py-4 text-lg font-bold text-white transition-all hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500"
            >
              {isProcessing
                ? "Processing Payment..."
                : isExpired
                  ? "Reservation Expired"
                  : "Pay $187.00"}
            </button>
          </form>
        </div>

        {/* Right column: Order summary */}
        <div className="lg:pl-8">
          <div className="sticky top-12 rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 text-xl font-bold text-white">
              Order Summary
            </h2>

            <div className="mb-6 flex gap-4 border-b border-slate-800 pb-6">
              <div
                role="img"
                aria-label="Music festival"
                className="h-20 w-20 shrink-0 rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80')",
                }}
              />

              <div>
                <h3 className="mb-1 font-bold text-white">
                  Midnight Odyssey Music Festival
                </h3>
                <p className="text-sm text-slate-400">
                  Nov 13, 2026
                </p>
                <p className="text-sm text-slate-400">
                  Los Angeles, CA
                </p>
              </div>
            </div>

            <div className="mb-6 space-y-4 border-b border-slate-800 pb-6 text-sm text-slate-300">
              <div className="flex justify-between gap-4">
                <span>General Admission (x2)</span>
                <span>$178.00</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Service Fee</span>
                <span>$9.00</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-extrabold text-white">
              <span>Total</span>
              <span>$187.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeout modal */}
      {isExpired && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="timeout-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
        >
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-3xl text-red-500">
              ⏱️
            </div>

            <h2
              id="timeout-title"
              className="mb-4 text-2xl font-bold text-white"
            >
              Time Expired
            </h2>

            <p className="mb-8 text-slate-400">
              Your 10-minute reservation limit has been reached.
              These tickets may no longer be available.
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full rounded-xl bg-slate-800 py-3 font-bold text-white transition hover:bg-slate-700"
            >
              Find More Tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
