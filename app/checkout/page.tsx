"use client";
 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
 
export default function CheckoutPage() {
  const router = useRouter();
 
  // 10-minute countdown state (600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);
  const [isExpired, setIsExpired] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
 
  // Timer Countdown Effect
  useEffect(() => {
	if (timeLeft <= 0) {
  	setIsExpired(true);
  	return;
	}
	const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
	return () => clearInterval(timerId);
  }, [timeLeft]);
 
  // Format time as MM:SS
  const formatTime = (seconds) => {
	const m = Math.floor(seconds / 60).toString().padStart(2, '0');
	const s = (seconds % 60).toString().padStart(2, '0');
	return `${m}:${s}`;
  };
 
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
 
	// Simulate backend payment processing and ticket DB writing
	setTimeout(() => {
      router.push('/success');
	}, 2000);
  };
 
  return (
	<div className="min-h-screen bg-slate-950 font-sans text-slate-200">
  	{/* Navbar Minimal */}
  	<nav className="w-full border-b border-slate-800 bg-slate-950 p-6 flex justify-center">
    	<Link href="/" className="text-2xl font-black text-white tracking-tighter">
          EASIEVENTS<span className="text-indigo-500">.</span>
    	</Link>
  	</nav>
 
  	{/* Persistent Timer Banner */}
  	<div className={`w-full py-3 text-center font-bold text-sm tracking-wide ${isExpired ? 'bg-red-600 text-white' : 'bg-amber-500 text-amber-950'}`}>
    	{isExpired
      	? "Time expired! Your reservation has been released."
      	: `Tickets reserved. Please complete checkout in ${formatTime(timeLeft)}`
    	}
  	</div>
 
  	<div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 relative">
    	
        {/* Left Column: Form */}
    	<div className={`space-y-8 ${isExpired ? 'opacity-50 pointer-events-none' : ''}`}>
      	<h1 className="text-3xl font-extrabold text-white">Checkout</h1>
      	
      	<form onSubmit={handlePayment} className="space-y-6">
        	{/* Contact Info */}
        	<div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          	<h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
          	<div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">First Name</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Last Name</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Email Address</label>
                <input required type="email" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition" />
            	<p className="text-xs text-slate-500 mt-2">Your PDF tickets will be sent here.</p>
        	  </div>
            </div>
 
        	{/* Payment Info */}
        	<div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          	<h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
          	<div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Card Number</label>
                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono placeholder-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition" />
              </div>
          	<div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Expiry</label>
                  <input required type="text" placeholder="MM/YY" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono placeholder-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">CVC</label>
                  <input required type="text" placeholder="123" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono placeholder-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition" />
                </div>
              </div>
            </div>
 
        	<button
              type="submit"
              disabled={isExpired || isProcessing}
              className="w-full py-4 rounded-xl font-bold text-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-slate-800 disabled:text-slate-500 transition-all flex justify-center items-center"
        	>
              {isProcessing ? "Processing Payment..." : "Pay $187.00"}
            </button>
          </form>
    	</div>
 
    	{/* Right Column: Order Summary */}
    	<div className="lg:pl-8">
      	<div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 sticky top-12">
        	<h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
        	
        	<div className="flex gap-4 mb-6 border-b border-slate-800 pb-6">
          	<div className="w-20 h-20 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')" }}></div>
              <div>
        	    <h3 className="text-white font-bold mb-1">Midnight Odyssey Music Festival</h3>
            	<p className="text-sm text-slate-400">Nov 13, 2026</p>
            	<p className="text-sm text-slate-400">Los Angeles, CA</p>
              </div>
            </div>
 
        	<div className="space-y-4 text-sm text-slate-300 border-b border-slate-800 pb-6 mb-6">
          	<div className="flex justify-between">
                <span>General Admission (x2)</span>
                <span>$178.00</span>
              </div>
          	<div className="flex justify-between">
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
 
  	{/* Timeout Modal */}
  	{isExpired && (
    	<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      	<div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl">
        	<div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          	⏱️
            </div>
        	<h3 className="text-2xl font-bold text-white mb-4">Time Expired</h3>
        	<p className="text-slate-400 mb-8">
          	Your 10-minute reservation limit has been reached. These tickets have been released back to the public.
        	</p>
        	<button
              onClick={() => router.push('/')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition"
        	>
          	Find More Tickets
            </button>
      	</div>
    	</div>
  	)}
	</div>
  );
}
