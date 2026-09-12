"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EventPage({ params }) {
  const router = useRouter();

  // In a real app, you would use the ID from the URL (params.id)
  // to fetch the specific event data from your backend.
  // const eventId = params?.id;

  // Simulated Event Data
  const event = {
    id: "evt_123",
    title: "Midnight Odyssey Music Festival 2026",
    date: "Friday, November 13, 2026",
    time: "7:00 PM – 2:00 AM",
    location: "The Horizon Arena, Los Angeles, CA",
    category: "Music Festival",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description: "Experience the ultimate electronic music journey. Midnight Odyssey returns for its 5th anniversary featuring world-class visual production, earth-shaking sound systems, and an unmissable lineup of global headliners. Prepare for 7 hours of non-stop music across three immersive stages.",
    pricePerTicket: 89.00,
    maxPerOrder: 4,
    organizer: "Odyssey Presents",
    lineup: [
      { name: "DJ Kaskade", role: "Main Stage", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
      { name: "Neon Vibes", role: "Trance Arena", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
      { name: "Sarah Chills", role: "Deep House Tent", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
      { name: "The Bass Drop", role: "Main Stage", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
    ],
    faqs: [
      { q: "Is there an age restriction?", a: "Yes, this event is strictly 18+. Valid ID will be required at the gates." },
      { q: "Are tickets refundable?", a: "Tickets are non-refundable but can be transferred to another person through the EasiEvents app up to 24 hours before the event." },
      { q: "Will there be food and drinks?", a: "Yes! We have over 20 local food trucks and fully licensed bars across the venue." }
    ]
  };

  // State Management for Checkout
  const [ticketsLeft, setTicketsLeft] = useState(14);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Simulated real-time inventory check
  useEffect(() => {
    const interval = setInterval(() => {
      setTicketsLeft((prev) => (prev > 1 ? prev - Math.floor(Math.random() * 2) : 0));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleQuantityChange = (amount) => {
    const newQty = quantity + amount;
    if (newQty >= 1 && newQty <= event.maxPerOrder && newQty <= ticketsLeft) {
      setQuantity(newQty);
    }
  };

  const handlePurchaseAttempt = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      // Simulate backend POST request to Redis lock endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
     
      // Navigate to the checkout page securely using Next.js router
      // In production, you'd pass a session ID or lock token as a query parameter
      router.push(`/checkout?eventId=${event.id}&qty=${quantity}`);

    } catch (error) {
      setErrorMessage("Someone beat you to the last tickets! Try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500 selection:text-white">
     
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div
          onClick={() => router.push('/')}
          className="text-2xl font-black text-white tracking-tighter cursor-pointer hover:opacity-80 transition"
        >
          EASIEVENTS<span className="text-indigo-500">.</span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/')}
            className="px-5 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-full transition"
          >
            Back to Search
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${event.coverImage})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
       
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 max-w-7xl mx-auto flex flex-col justify-end h-full">
          <div className="max-w-3xl">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block shadow-lg shadow-indigo-500/30">
              {event.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              {event.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium">
              {event.date} • {event.location}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
       
        {/* Left Column: Event Details */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">About This Event</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              {event.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">The Lineup</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {event.lineup.map((artist, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 border-2 border-slate-800 group-hover:border-indigo-500 transition-colors duration-300">
                    <img src={artist.img} alt={artist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="text-white font-bold">{artist.name}</h4>
                  <p className="text-indigo-400 text-xs">{artist.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Location & Venue</h2>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 h-48 bg-slate-800 rounded-xl bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540497551069-42b781ce2658?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }}></div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-white mb-2">{event.location.split(',')[0]}</h3>
                <p className="text-slate-400 mb-4">{event.location}</p>
                <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Get Directions
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Ticket Purchase Widget */}
        <div className="lg:col-span-1 relative">
          <div className="sticky top-28 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
           
            <div className="mb-6">
              <p className="text-slate-400 font-medium mb-1">General Admission</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-white">${event.pricePerTicket.toFixed(2)}</span>
                <span className="text-slate-500 pb-1">/ ticket</span>
              </div>
            </div>

            {/* Dynamic Inventory Badge */}
            <div className="mb-8">
              {ticketsLeft > 0 ? (
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse w-full justify-center">
                  🔥 Hurry! Only {ticketsLeft} tickets left
                </div>
              ) : (
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/20 w-full justify-center">
                  🚫 Sold Out
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-800">
              <span className="text-slate-300 font-medium">Quantity</span>
              <div className="flex items-center space-x-4 bg-slate-950 rounded-xl p-1 border border-slate-800">
                <button
                  type="button"
                  disabled={quantity <= 1 || ticketsLeft === 0 || isSubmitting}
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition font-bold text-lg"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-white text-lg">{ticketsLeft === 0 ? 0 : quantity}</span>
                <button
                  type="button"
                  disabled={quantity >= event.maxPerOrder || quantity >= ticketsLeft || isSubmitting}
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({quantity}x)</span>
                <span>${(event.pricePerTicket * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Service Fee</span>
                <span>${(ticketsLeft === 0 ? 0 : 4.50 * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-slate-800">
                <span>Total</span>
                <span>${(ticketsLeft === 0 ? 0 : (event.pricePerTicket * quantity) + (4.50 * quantity)).toFixed(2)}</span>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-950/50 border border-red-500/30 text-red-400 text-sm rounded-lg text-center font-medium">
                {errorMessage}
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handlePurchaseAttempt}
              disabled={ticketsLeft === 0 || isSubmitting}
              className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all shadow-xl text-lg ${
                isSubmitting
                  ? 'bg-indigo-800 text-indigo-300 cursor-not-allowed opacity-80'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Locking Tickets...</span>
                </div>
              ) : ticketsLeft === 0 ? (
                'Sold Out'
              ) : (
                'Buy Now'
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              By clicking Buy Now, you accept our Terms & Conditions. Max {event.maxPerOrder} tickets per order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
