"use client";

import React, { useState } from 'react';

export default function ScannerDashboard() {
  const [scanStatus, setScanStatus] = useState('idle'); // 'idle', 'valid', 'invalid'
  const [lastScanned, setLastScanned] = useState(null);

  // Simulation function to mimic reading a QR code and pinging backend
  const simulateScan = (isValid) => {
    if (isValid) {
      setScanStatus('valid');
      setLastScanned({ name: "Alex Johnson", type: "General Admission", id: "8F7D-92XX" });
    } else {
      setScanStatus('invalid');
      setLastScanned(null);
    }

    // Reset back to idle/camera view after 3 seconds
    setTimeout(() => {
      setScanStatus('idle');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-hidden flex flex-col relative">
      
      {/* Header */}
      <div className="absolute top-0 w-full p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h1 className="text-xl font-bold">Midnight Odyssey</h1>
          <p className="text-slate-400 text-sm">Gate A • Entry Scanner</p>
        </div>
        <div className="bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700 text-sm font-mono">
          Scanned: 1,492 / 5,000
        </div>
      </div>

      {/* 
        CAMERA VIEWPORT 
        In production, a library like html5-qrcode drops the video feed here.
      */}
      <div className="flex-1 flex items-center justify-center relative">
        {scanStatus === 'idle' && (
          <>
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
              <p className="text-slate-500 animate-pulse">Waiting for camera feed...</p>
            </div>
            
            {/* Targeting Reticle */}
            <div className="relative z-10 w-64 h-64">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
              
              {/* Scanning laser animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_#22c55e] animate-[bounce_2s_infinite]"></div>
            </div>
            
            <p className="absolute bottom-32 text-slate-400 text-sm z-10 font-medium tracking-wide">
              Position QR code within frame
            </p>
          </>
        )}

        {/* 🟩 SUCCESS OVERLAY 🟩 */}
        {scanStatus === 'valid' && (
          <div className="absolute inset-0 z-30 bg-green-500 flex flex-col items-center justify-center animate-in fade-in duration-200">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-5xl font-black text-white mb-2">VALID</h2>
            <p className="text-green-100 text-xl font-medium mb-6">Welcome, {lastScanned?.name}</p>
            <div className="bg-black/20 px-6 py-3 rounded-2xl text-center">
              <p className="text-white font-bold">{lastScanned?.type}</p>
              <p className="text-green-100/70 text-sm font-mono">{lastScanned?.id}</p>
            </div>
          </div>
        )}

        {/* 🟥 ERROR OVERLAY 🟥 */}
        {scanStatus === 'invalid' && (
          <div className="absolute inset-0 z-30 bg-red-600 flex flex-col items-center justify-center animate-in fade-in duration-200">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h2 className="text-5xl font-black text-white mb-2 text-center">INVALID / SCANNED</h2>
            <p className="text-red-100 text-lg font-medium text-center max-w-xs">
              This ticket has already been used or does not exist in the database.
            </p>
          </div>
        )}
      </div>

      {/* DEV TOOLS: Test Buttons (Remove in production) */}
      <div className="absolute bottom-0 w-full p-6 bg-slate-950 z-40 border-t border-slate-800">
        <p className="text-xs text-slate-500 mb-3 text-center uppercase tracking-widest font-bold">Dev Simulator</p>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => simulateScan(true)}
            className="py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-green-400 transition border border-slate-700"
          >
            Simulate Valid
          </button>
          <button 
            onClick={() => simulateScan(false)}
            className="py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-red-400 transition border border-slate-700"
          >
            Simulate Invalid
          </button>
        </div>
      </div>
    </div>
  );
}
