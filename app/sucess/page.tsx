import Link from 'next/link';

export default function SuccessPage() { return ( <div className="min-h-screen bg-slate-950 font-sans text-slate-200 py-12 px-6 flex flex-col items-center">

  {/* Success Header */}
  <div className="max-w-2xl w-full text-center mb-12 mt-8">
    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl border border-green-500/30">
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <h1 className="text-4xl font-extrabold text-white mb-4">
      You're going to Midnight Odyssey!
    </h1>

    <p className="text-slate-400 text-lg">
      Your payment was successful. We've sent a PDF copy of your tickets to your email.
    </p>
  </div>

  {/* Digital Ticket */}
  <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl relative">

    {/* Ticket Header Graphic */}
    <div
      className="h-32 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
      }}
    />

    {/* Ticket Cutouts */}
    <div className="absolute left-[-15px] top-[110px] w-8 h-8 bg-slate-950 rounded-full border-r border-slate-700" />

    <div className="absolute right-[-15px] top-[110px] w-8 h-8 bg-slate-950 rounded-full border-l border-slate-700" />

    <div className="absolute left-0 top-[125px] w-full border-t-2 border-dashed border-slate-700" />

    <div className="p-8 pt-10 text-center">
      <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-1">
        General Admission
      </p>

      <h2 className="text-2xl font-bold text-white mb-6">
        Midnight Odyssey
      </h2>

      {/* Event Details */}
      <div className="grid grid-cols-2 gap-4 text-left mb-8 border-b border-slate-800 pb-8">
        <div>
          <p className="text-slate-500 text-xs uppercase mb-1">
            Date
          </p>
          <p className="text-white font-semibold">
            Nov 13, 2026
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-xs uppercase mb-1">
            Time
          </p>
          <p className="text-white font-semibold">
            7:00 PM
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-slate-500 text-xs uppercase mb-1">
            Location
          </p>
          <p className="text-white font-semibold">
            The Horizon Arena, LA
          </p>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white p-4 rounded-2xl inline-block mb-4 shadow-lg">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EASIEVENTS_UUID_8F7D92"
          alt="Ticket QR Code"
          className="w-32 h-32"
          width={128}
          height={128}
        />
      </div>

      <p className="text-slate-500 text-xs font-mono">
        ORDER # 8F7D-92XX-LMNOP
      </p>
    </div>
  </div>

  {/* Actions */}
  <div className="flex flex-wrap justify-center gap-4 mt-8">
    <button
      type="button"
      onClick={() => window.print()}
      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition"
    >
      Download PDF
    </button>

    <Link
      href="/"
      className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold transition"
    >
      Back Home
    </Link>
  </div>

</div>


); }