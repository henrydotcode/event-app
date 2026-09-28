"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter(); // Next.js router for programmatic navigation
  const [activeFilter, setActiveFilter] = useState('All');
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  // Expanded Categories Data
  const topCategories = ["All", "Music", "Tech", "Sports", "Arts", "Food & Drink", "Health"];
  const allCategories = [
    "Music", "Tech", "Sports", "Arts", "Food & Drink", "Health", 
    "Comedy", "Theater", "Networking", "Nightlife", "Charity", 
    "Education", "Fashion", "Film", "Gaming", "Wellness", 
    "Family", "Spirituality", "Business", "Hobbies"
  ];

  // Dummy Event Data 
  const events = [
    {
      id: "evt_123", // Using a string ID to match the dynamic route we built
      title: "Midnight Odyssey Music Festival",
      date: "Nov 13, 2026 - 7:00 PM",
      location: "Los Angeles, CA",
      price: "From $89",
      category: "Music",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "evt_456",
      title: "Global Tech Summit 2026",
      date: "Dec 05, 2026 - 9:00 AM",
      location: "San Francisco, CA",
      price: "Free",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "evt_789",
      title: "Street Food Carnival",
      date: "Oct 22, 2026 - 12:00 PM",
      location: "Austin, TX",
      price: "$15.00",
      category: "Food & Drink",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "evt_101",
      title: "Championship Finals",
      date: "Jan 10, 2027 - 6:30 PM",
      location: "Miami, FL",
      price: "$150.00",	
      category: "Sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "evt_102",
      title: "Modern Art Exhibition",
      date: "Oct 15, 2026 - 10:00 AM",
      location: "New York, NY",
      price: "$25.00",
      category: "Arts",
      image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "evt_103",
      title: "Yoga & Wellness Retreat",
      date: "Nov 20, 2026 - 8:00 AM",
      location: "Sedona, AZ",
      price: "$300.00",
      category: "Health",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // The Filter Logic
  const filteredEvents = activeFilter === 'All' 
    ? events 
    : events.filter(event => event.category === activeFilter);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-black text-white tracking-tighter">
          EASIEVENTS<span className="text-indigo-500">.</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="#" className="hover:text-white transition">Explore</Link>
          <Link href="#" className="hover:text-white transition">Host an Event</Link>
          <Link href="#" className="hover:text-white transition">Help</Link>
        </div>
        <div className="flex space-x-4">
          <button className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition hidden sm:block">Login</button>
          <button className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition shadow-lg shadow-indigo-500/30">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Explore Thrilling Events <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              with EasiEvents
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Discover the best concerts, tech summits, and exclusive experiences happening around you. Secure your spot in milliseconds.
          </p>
        </div>
      </div>

      {/* Floating Search Bar */}
      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-20 mb-20">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
          <div className="flex-1 w-full flex items-center px-6 py-3">
            <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search by name or type..." className="w-full bg-transparent border-none outline-none text-white placeholder-slate-400 focus:ring-0" />
          </div>
          <div className="flex-1 w-full flex items-center px-6 py-3">
            <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input type="text" placeholder="Any Date" className="w-full bg-transparent border-none outline-none text-white placeholder-slate-400 focus:ring-0" />
          </div>
          <div className="flex-1 w-full flex items-center px-6 py-3">
            <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input type="text" placeholder="Location" className="w-full bg-transparent border-none outline-none text-white placeholder-slate-400 focus:ring-0" />
          </div>
          <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold transition m-1 md:m-0">
            Search
          </button>
        </div>
      </div>

      {/* Main Content: Filtered Events Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
          <button 
            onClick={() => setShowCategoriesModal(true)}
            className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center transition"
          >
            View All Categories <span className="ml-1">→</span>
          </button>
        </div>
        
        {/* Quick Filters */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {topCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
          <button 
            onClick={() => setShowCategoriesModal(true)}
            className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all flex items-center"
          >
            More <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>

        {/* Dynamic Event Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              
              /* USING onClick ROUTER INSTEAD OF <Link> FOR BETTER CLICK HANDLING */
              <div 
                key={event.id} 
                onClick={() => router.push(`/events/${event.id}`)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 cursor-pointer h-96 border border-slate-800/50 hover:border-indigo-500/50 transition-colors block"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${event.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-slate-700/50">
                  {event.price}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-5">
                  <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">{event.category}</p>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-indigo-300 transition-colors">{event.title}</h3>
                  <div className="flex items-center text-slate-400 text-sm mb-1">
                    <svg className="w-4 h-4 mr-1.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    {event.location}
                  </div>
                  <div className="flex items-center text-slate-400 text-sm">
                    <svg className="w-4 h-4 mr-1.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {event.date}
                  </div>
                </div>
              </div>
              
            ))}
          </div>
        ) : (
          <div className="w-full py-20 text-center bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
            <p className="text-slate-400">We couldn't find any upcoming events for "{activeFilter}". Check back soon!</p>
            <button onClick={() => setActiveFilter('All')} className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition">Clear Filter</button>
          </div>
        )}
      </div>

      {/* Trending Near You */}
      <div className="bg-slate-900/50 border-y border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8">Trending Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => router.push('/events/evt_123')}
              className="relative rounded-2xl overflow-hidden h-80 cursor-pointer group block"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3">
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block animate-pulse">Selling Fast</span>
                <h3 className="text-3xl font-bold text-white mb-3">Electric Daisy Carnival</h3>
                <p className="text-slate-300 text-sm mb-4">The world's largest electronic music festival returns to Las Vegas for three nights of magic.</p>
                <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold hover:bg-slate-200 transition pointer-events-none">Get Tickets</button>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-2xl overflow-hidden cursor-pointer transition">
                  <div className="w-1/3 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')` }}></div>
                  <div className="w-2/3 p-5 flex flex-col justify-center">
                    <p className="text-indigo-400 text-xs font-bold uppercase mb-1">Comedy</p>
                    <h4 className="text-lg font-bold text-white mb-2">Standup Night Live</h4>
                    <p className="text-slate-400 text-sm">Fri, Nov 20 • Downtown Theater</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Host CTA Banner */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 to-purple-900 p-12 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between border border-indigo-500/30 shadow-2xl shadow-indigo-900/20">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
           <div className="relative z-10 md:w-2/3 mb-8 md:mb-0">
             <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Are you an event organizer?</h2>
             <p className="text-indigo-200 text-lg">Create, manage, and sell tickets to your events in minutes. Our SecureLock™ engine guarantees zero overselling.</p>
           </div>
           <div className="relative z-10">
             <button className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
               Create Event
             </button>
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-black text-white tracking-tighter mb-4">
              EASIEVENTS<span className="text-indigo-500">.</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The high-concurrency ticketing platform built for zero oversells and lightning-fast checkouts.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Discover</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-indigo-400 transition">Concerts</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Tech Conferences</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Sports Matches</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Online Events</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-indigo-400 transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Contact Support</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-indigo-400 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2026 EasiEvents Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">Twitter</Link>
            <Link href="#" className="hover:text-white transition">Instagram</Link>
            <Link href="#" className="hover:text-white transition">LinkedIn</Link>
          </div>
        </div>
      </footer>

      {/* FULL SCREEN CATEGORIES MODAL */}
      {showCategoriesModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowCategoriesModal(false)}></div>
          
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white">Browse All Categories</h2>
              <button 
                onClick={() => setShowCategoriesModal(false)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveFilter(cat);
                      setShowCategoriesModal(false);
                    }}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      activeFilter === cat 
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                        : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    <span className="font-semibold block">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}