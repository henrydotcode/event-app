"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ScanStatus = "idle" | "valid" | "invalid";

type ScannedTicket = { name: string; type: string; id: string; };

export default function ScannerDashboard() { const [scanStatus, setScanStatus] = useState<ScanStatus>("idle"); const [lastScanned, setLastScanned] = useState<ScannedTicket | null>(null);

const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>( null );

const clearResetTimer = useCallback(() => { if (resetTimerRef.current !== null) { clearTimeout(resetTimerRef.current); resetTimerRef.current = null; } }, []);

useEffect(() => { return () => { clearResetTimer(); }; }, [clearResetTimer]);

const simulateScan = useCallback( (isValid: boolean) => { clearResetTimer();

  if (isValid) {
    setLastScanned({
      name: "Alex Johnson",
      type: "General Admission",
      id: "8F7D-92XX",
    });
    setScanStatus("valid");
  } else {
    setLastScanned(null);
    setScanStatus("invalid");
  }

  resetTimerRef.current = setTimeout(() => {
    setScanStatus("idle");
    setLastScanned(null);
    resetTimerRef.current = null;
  }, 3000);
},
[clearResetTimer]


);

return ( <div className="relative flex min-h-screen flex-col overflow-hidden bg-black font-sans text-white"> <header className="absolute left-0 top-0 z-20 flex w-full items-center justify-between gap-3 bg-gradient-to-b from-black/90 to-transparent p-4 sm:p-6"> <div> <h1 className="text-lg font-bold sm:text-xl"> Midnight Odyssey </h1> <p className="text-sm text-slate-400"> Gate A • Entry Scanner </p> </div>

    <div className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-mono sm:px-4 sm:text-sm">
      Scanned: 1,492 / 5,000
    </div>
  </header>

  <main
    className="relative flex flex-1 items-center justify-center pb-44 pt-28"
    aria-live="polite"
    aria-atomic="true"
  >
    {scanStatus === "idle" && (
      <>
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <p className="animate-pulse px-4 text-center text-slate-500">
            Camera not connected — simulator mode
          </p>
        </div>

        <div
          className="relative z-10 h-64 w-64 max-w-[75vw]"
          role="img"
          aria-label="QR code scanning target"
        >
          <div className="absolute left-0 top-0 h-8 w-8 rounded-tl-lg border-l-4 border-t-4 border-white" />
          <div className="absolute right-0 top-0 h-8 w-8 rounded-tr-lg border-r-4 border-t-4 border-white" />
          <div className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-4 border-l-4 border-white" />
          <div className="absolute bottom-0 right-0 h-8 w-8 rounded-br-lg border-b-4 border-r-4 border-white" />

          <div className="absolute left-0 top-0 h-1 w-full animate-pulse bg-green-500 shadow-[0_0_15px_#22c55e]" />
        </div>

        <p className="absolute bottom-28 z-10 px-4 text-center text-sm font-medium tracking-wide text-slate-400">
          Use the simulator controls below to test tickets
        </p>
      </>
    )}

    {scanStatus === "valid" && (
      <section
        className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-green-600 px-4 text-center"
        aria-label="Valid ticket"
        role="status"
      >
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-2xl sm:mb-8 sm:h-32 sm:w-32">
          <svg
            className="h-14 w-14 text-green-600 sm:h-16 sm:w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="mb-2 text-4xl font-black sm:text-5xl">
          VALID
        </h2>

        <p className="mb-6 text-lg font-medium text-green-100 sm:text-xl">
          Welcome, {lastScanned?.name}
        </p>

        <div className="rounded-2xl bg-black/20 px-6 py-3 text-center">
          <p className="font-bold text-white">
            {lastScanned?.type}
          </p>
          <p className="font-mono text-sm text-green-100/80">
            {lastScanned?.id}
          </p>
        </div>

        <p className="mt-6 text-sm text-green-100">
          Returning to scanner in 3 seconds...
        </p>
      </section>
    )}

    {scanStatus === "invalid" && (
      <section
        className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-red-600 px-4 text-center"
        aria-label="Invalid ticket"
        role="alert"
      >
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-2xl sm:mb-8 sm:h-32 sm:w-32">
          <svg
            className="h-14 w-14 text-red-600 sm:h-16 sm:w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h2 className="mb-3 text-3xl font-black sm:text-5xl">
          INVALID / SCANNED
        </h2>

        <p className="max-w-sm text-base font-medium text-red-100 sm:text-lg">
          This ticket has already been used or could not be
          found in the database.
        </p>

        <p className="mt-6 text-sm text-red-100">
          Returning to scanner in 3 seconds...
        </p>
      </section>
    )}
  </main>

  <footer className="absolute bottom-0 left-0 z-40 w-full border-t border-slate-800 bg-slate-950 p-4 sm:p-6">
    <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
      Developer Simulator
    </p>

    <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:gap-4">
      <button
        type="button"
        onClick={() => simulateScan(true)}
        className="rounded-xl border border-slate-700 bg-slate-800 py-3 font-bold text-green-400 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 sm:py-4"
      >
        Simulate Valid
      </button>

      <button
        type="button"
        onClick={() => simulateScan(false)}
        className="rounded-xl border border-slate-700 bg-slate-800 py-3 font-bold text-red-400 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 sm:py-4"
      >
        Simulate Invalid
      </button>
    </div>
  </footer>
</div>


); }