"use client";

import React, { useState } from "react";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  category: string;
  image: string;
};

const topCategories = [
  "All",
  "Music",
  "Tech",
  "Sports",
  "Arts",
  "Food & Drink",
  "Health",
];

const allCategories = [
  "Music",
  "Tech",
  "Sports",
  "Arts",
  "Food & Drink",
  "Health",
  "Comedy",
  "Theater",
  "Networking",
  "Nightlife",
  "Charity",
  "Education",
  "Fashion",
  "Film",
  "Gaming",
  "Wellness",
  "Family",
  "Spirituality",
  "Business",
  "Hobbies",
];

const events: Event[] = [
  {
    id: "evt_123",
    title: "Midnight Odyssey Music Festival",
    date: "Nov 13, 2026 - 7:00 PM",
    location: "Los Angeles, CA",
    price: "From $89",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "evt_456",
    title: "Global Tech Summit 2026",
    date: "Dec 05, 2026 - 9:00 AM",
    location: "San Francisco, CA",
    price: "Free",
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "evt_789",
    title: "Street Food Carnival",
    date: "Oct 22, 2026 - 12:00 PM",
    location: "Austin, TX",
    price: "$15.00",
    category: "Food & Drink",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "evt_101",
    title: "Championship Finals",
    date: "Jan 10, 2027 - 6:30 PM",
    location: "Miami, FL",
    price: "$150.00",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "evt_102",
    title: "Modern Art Exhibition",
    date: "Oct 15, 2026 - 10:00 AM",
    location: "New York, NY",
    price: "$25.00",
    category: "Arts",
    image:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "evt_103",
    title: "Yoga & Wellness Retreat",
    date: "Nov 20, 2026 - 8:00 AM",
    location: "Sedona, AZ",
    price: "$300.00",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredEvents = events.filter((event) => {
    const query = searchQuery.trim().toLowerCase();
    const locationQuery = searchLocation.trim().toLowerCase();

    const matchesCategory =
      activeFilter === "All" || event.category === activeFilter;

    const searchableText =
      `${event.title} ${event.category} ${event.location}`.toLowerCase();

    const matchesSearch =
      !query || searchableText.includes(query);

    const matchesLocation =
      !locationQuery ||
      event.location.toLowerCase().includes(locationQuery);

    const matchesDate = (() => {
      if (!searchDate) return true;

      const eventDate = new Date(
        `${event.date.split(" - ")[0]} ${event.date.split(" - ")[1]}`
      );
      const selectedDate = new Date(`${searchDate}T12:00:00`);

      return (
        !Number.isNaN(eventDate.getTime()) &&
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    })();

    return (
      matchesCategory &&
      matchesSearch &&
      matchesLocation &&
      matchesDate
    );
  });

  function clearFilters() {
    setActiveFilter("All");
    setSearchQuery("");
    setSearchDate("");
    setSearchLocation("");
  }

  return (
    <main className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className="absolute top-0 z-50 flex w-full items-center justify-between px-8 py-6">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white">
          EASIEVENTS<span className="text-indigo-500">.</span>
        </Link>

        <div className="hidden space-x-8 text-sm font-medium text-slate-300 md:flex">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <a href="#upcoming-events" className="transition hover:text-white">
            Explore
          </a>
          <a href="#host-event" className="transition hover:text-white">
            Host an Event
          </a>
          <a href="#footer" className="transition hover:text-white">
            Help
          </a>
        </div>

        <div className="flex space-x-4">
          <Link
            href="/login"
            className="hidden px-5 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:block"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-48">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-[-10%] h-[50%] w-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
            Explore Thrilling Events
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              with EasiEvents
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-400">
            Discover the best concerts, tech summits, and exclusive
            experiences happening around you. Secure your spot in milliseconds.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="relative z-20 mx-auto mb-20 -mt-16 max-w-5xl px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("upcoming-events")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="flex flex-col items-center divide-y divide-slate-700/50 rounded-3xl border border-slate-700/50 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-xl md:flex-row md:divide-x md:divide-y-0 md:rounded-full"
        >
          <div className="flex w-full flex-1 items-center px-6 py-3">
            <svg className="mr-3 h-5 w-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or type..."
              aria-label="Search by name or type"
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-400 focus:ring-0"
            />
          </div>

          <div className="flex w-full flex-1 items-center px-6 py-3">
            <svg className="mr-3 h-5 w-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
            </svg>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              aria-label="Filter by date"
              className="w-full min-w-0 bg-transparent text-slate-300 outline-none focus:ring-0"
            />
          </div>

          <div className="flex w-full flex-1 items-center px-6 py-3">
            <svg className="mr-3 h-5 w-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Location"
              aria-label="Location"
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-400 focus:ring-0"
            />
          </div>

          <button
            type="submit"
            className="m-1 w-full rounded-full bg-indigo-600 px-8 py-4 font-bold text-white transition hover:bg-indigo-500 md:m-0 md:w-auto"
          >
            Search
          </button>
        </form>
      </div>

      {/* Upcoming Events */}
      <section id="upcoming-events" className="mx-auto max-w-7xl scroll-mt-8 px-6 pb-20">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
          <button
            type="button"
            onClick={() => setShowCategoriesModal(true)}
            className="shrink-0 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
          >
            View All Categories →
          </button>
        </div>

        {/* Quick Filters */}
        <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-4">
          {topCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              aria-pressed={activeFilter === category}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeFilter === category
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setShowCategoriesModal(true)}
            className="flex shrink-0 items-center whitespace-nowrap rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            More ↓
          </button>
        </div>

        <p className="mb-5 text-sm text-slate-400" aria-live="polite">
          {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
        </p>

        {/* Event Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group relative block h-96 overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900 transition-colors hover:border-indigo-500/50"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url("${event.image}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full border border-slate-700/50 bg-slate-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {event.price}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-5">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-indigo-400">
                    {event.category}
                  </p>
                  <h3 className="mb-2 text-lg font-bold leading-tight text-white transition-colors group-hover:text-indigo-300">
                    {event.title}
                  </h3>
                  <p className="mb-1 flex items-center text-sm text-slate-300">
                    <span className="mr-2">📍</span>
                    {event.location}
                  </p>
                  <p className="flex items-center text-sm text-slate-300">
                    <span className="mr-2">📅</span>
                    {event.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-20 text-center">
            <span className="mb-4 block text-4xl">🔍</span>
            <h3 className="mb-2 text-xl font-bold text-white">No events found</h3>
            <p className="text-slate-400">
              Try another search, location, date, or category.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-slate-800 px-6 py-2 text-white transition hover:bg-slate-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Trending Near You */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-white">Trending Near You</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Link
              href="/events/evt_123"
              className="group relative block h-80 overflow-hidden rounded-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-8 md:w-2/3">
                <span className="mb-3 inline-block animate-pulse rounded-full border border-red-500/30 bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
                  Selling Fast
                </span>
                <h3 className="mb-3 text-3xl font-bold text-white">
                  Electric Daisy Carnival
                </h3>
                <p className="mb-4 text-sm text-slate-300">
                  The world's largest electronic music festival returns to Las Vegas for three nights of magic.
                </p>
                <span className="inline-block rounded-full bg-white px-6 py-2 font-bold text-slate-900 transition hover:bg-slate-200">
                  Get Tickets
                </span>
              </div>
            </Link>

            <div className="flex flex-col gap-6">
              {[1, 2].map((item) => (
                <Link
                  key={item}
                  href="/events/evt_123"
                  className="flex overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 transition hover:bg-slate-800"
                >
                  <div
                    className="w-1/3 shrink-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=400&q=80')",
                    }}
                  />
                  <div className="flex w-2/3 flex-col justify-center p-5">
                    <p className="mb-1 text-xs font-bold uppercase text-indigo-400">Comedy</p>
                    <h4 className="mb-2 text-lg font-bold text-white">Standup Night Live</h4>
                    <p className="text-sm text-slate-400">Fri, Nov 20 • Downtown Theater</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section id="host-event" className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-900 to-purple-900 p-12 text-center shadow-2xl shadow-indigo-900/20 md:flex-row md:p-16 md:text-left">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/4 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10 mb-8 md:mb-0 md:w-2/3">
            <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
              Are you an event organizer?
            </h2>
            <p className="text-lg text-indigo-200">
              Create, manage, and sell tickets to your events in minutes. Our SecureLock™ engine is designed to help prevent overselling.
            </p>
          </div>
          <Link
            href="/events/create"
            className="relative z-10 rounded-full bg-white px-8 py-4 text-lg font-bold text-indigo-900 shadow-xl transition-transform hover:scale-105"
          >
            Create Event
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t border-slate-900 bg-slate-950 pb-8 pt-16">
        <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-block text-2xl font-black tracking-tighter text-white">
              EASIEVENTS<span className="text-indigo-500">.</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              The high-concurrency ticketing platform built for reliable ticket sales and fast checkouts.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Discover</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {["Concerts", "Tech Conferences", "Sports Matches", "Online Events"].map((item) => (
                <li key={item}>
                  <a href="#upcoming-events" className="transition hover:text-indigo-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {["About Us", "Careers", "Contact Support", "Blog"].map((item) => (
                <li key={item}>
                  <Link href="/" className="transition hover:text-indigo-400">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {["Terms of Service", "Privacy Policy", "Refund Policy"].map((item) => (
                <li key={item}>
                  <Link href="/" className="transition hover:text-indigo-400">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between border-t border-slate-800/50 px-6 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© 2026 EasiEvents Inc. All rights reserved.</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <a href="https://twitter.com" className="transition hover:text-white">Twitter</a>
            <a href="https://instagram.com" className="transition hover:text-white">Instagram</a>
            <a href="https://linkedin.com" className="transition hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Full Screen Categories Modal */}
      {showCategoriesModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="categories-modal-title"
        >
          <button
            type="button"
            aria-label="Close categories modal"
            className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setShowCategoriesModal(false)}
          />

          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 p-6">
              <h2 id="categories-modal-title" className="text-2xl font-bold text-white">
                Browse All Categories
              </h2>
              <button
                type="button"
                onClick={() => setShowCategoriesModal(false)}
                aria-label="Close modal"
                className="rounded-full bg-slate-800 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("All");
                    setShowCategoriesModal(false);
                  }}
                  className={`rounded-2xl border p-4 text-center transition-all ${
                    activeFilter === "All"
                      ? "border-indigo-500 bg-indigo-600/20 text-indigo-300"
                      : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="block font-semibold">All Categories</span>
                </button>

                {allCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveFilter(category);
                      setShowCategoriesModal(false);
                    }}
                    className={`rounded-2xl border p-4 text-center transition-all ${
                      activeFilter === category
                        ? "border-indigo-500 bg-indigo-600/20 text-indigo-300"
                        : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span className="block font-semibold">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}