// ============================================================
// Reef Pass Marine — site interactions
// ============================================================

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ------------------------------------------------------------
// Light / dark theme toggle
// ------------------------------------------------------------
const THEME_KEY = 'reefpass-theme';
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
}

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

applyTheme(getInitialTheme());

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});

// ------------------------------------------------------------
// Booking form
// ------------------------------------------------------------
// CONFIG: update this to your real WhatsApp number (international
// format, no + or spaces) and business email.
const WHATSAPP_NUMBER = '6790000000';
const BOOKING_EMAIL = 'bookings@reefpassmarine.fj';

const form = document.getElementById('bookingForm');
const statusEl = document.getElementById('form-status');
const emailFallbackBtn = document.getElementById('emailFallback');

function collectBooking() {
  const tripType = document.getElementById('tripType').value;
  const pax = document.getElementById('pax').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const addons = Array.from(form.querySelectorAll('.checkbox-group input:checked')).map(i => i.value);
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const notes = document.getElementById('notes').value;

  return { tripType, pax, date, time, addons, name, phone, email, notes };
}

function validate(b) {
  if (!b.tripType || !b.pax || !b.date || !b.time || !b.name || !b.phone) {
    return false;
  }
  return true;
}

function buildMessage(b) {
  const lines = [
    `Booking request — Reef Pass Marine`,
    `Trip: ${b.tripType}`,
    `Date: ${b.date}`,
    `Time: ${b.time}`,
    `Guests: ${b.pax}`,
  ];
  if (b.addons.length) lines.push(`Refreshments: ${b.addons.join(', ')}`);
  lines.push(`Name: ${b.name}`);
  lines.push(`Phone: ${b.phone}`);
  if (b.email) lines.push(`Email: ${b.email}`);
  if (b.notes) lines.push(`Notes: ${b.notes}`);
  return lines.join('\n');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const booking = collectBooking();

  if (!validate(booking)) {
    statusEl.textContent = 'Please fill in trip type, guests, date, time, name, and phone before sending.';
    return;
  }

  const message = buildMessage(booking);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  statusEl.textContent = 'Opening WhatsApp with your booking details...';
  window.open(url, '_blank');
});

emailFallbackBtn.addEventListener('click', () => {
  const booking = collectBooking();

  if (!validate(booking)) {
    statusEl.textContent = 'Please fill in trip type, guests, date, time, name, and phone before sending.';
    return;
  }

  const message = buildMessage(booking);
  const subject = encodeURIComponent('Booking request — Reef Pass Marine');
  const body = encodeURIComponent(message);
  statusEl.textContent = 'Opening your email client with the booking details...';
  window.location.href = `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`;
});

// ------------------------------------------------------------
// Subtle contour parallax in hero (skipped if reduced motion)
// ------------------------------------------------------------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const contourBg = document.querySelector('.contour-bg');

if (contourBg && !prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.08;
    contourBg.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}
