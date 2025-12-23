import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { MapPin, Calendar, ShieldCheck, Star, Globe, Sparkles, Clock, Users, CheckCircle2, Quote } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Type for palette keys
type Palette = 'blueCyan' | 'emeraldTeal' | 'purpleFuchsia' | 'orangeAmber' | 'slateGold';

// Class presets for each palette (static strings so Tailwind keeps them in build)
const PALETTE_CLASSES: Record<Palette, {
  badgeIcon: string; // text color for small icons
  gradBtn: string;   // gradient classes for primary button
  gradBtnHover: string; // hover gradient
  gradText: string;  // gradient text classes
  glowShadow: string; // shadow color for primary elements
  cardHoverShadow: string; // card hover glow
  // Approx RGBA colors for parallax blobs
  blob1: string;
  blob2: string;
  blob3: string;
}> = {
  blueCyan: {
    badgeIcon: 'text-cyan-300',
    gradBtn: 'bg-gradient-to-r from-sky-500 to-cyan-400',
    gradBtnHover: 'hover:from-sky-400 hover:to-cyan-300',
    gradText: 'bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent',
    glowShadow: 'shadow-cyan-500/20',
    cardHoverShadow: 'hover:shadow-cyan-500/10',
    blob1: 'rgba(56,189,248,0.50)', // sky-400
    blob2: 'rgba(34,211,238,0.55)', // cyan-400
    blob3: 'rgba(6,182,212,0.60)',  // cyan-500
  },
  emeraldTeal: {
    badgeIcon: 'text-emerald-300',
    gradBtn: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    gradBtnHover: 'hover:from-emerald-400 hover:to-teal-300',
    gradText: 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent',
    glowShadow: 'shadow-emerald-500/20',
    cardHoverShadow: 'hover:shadow-emerald-500/10',
    blob1: 'rgba(16,185,129,0.55)', // emerald-500
    blob2: 'rgba(20,184,166,0.55)', // teal-500
    blob3: 'rgba(5,150,105,0.60)',  // emerald-600
  },
  purpleFuchsia: {
    badgeIcon: 'text-fuchsia-400',
    gradBtn: 'bg-gradient-to-r from-fuchsia-500 to-purple-600',
    gradBtnHover: 'hover:from-fuchsia-400 hover:to-purple-500',
    gradText: 'bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500 bg-clip-text text-transparent',
    glowShadow: 'shadow-fuchsia-500/20',
    cardHoverShadow: 'hover:shadow-fuchsia-500/10',
    blob1: 'rgba(217,70,239,0.55)',
    blob2: 'rgba(147,51,234,0.60)',
    blob3: 'rgba(236,72,153,0.60)',
  },
  orangeAmber: {
    badgeIcon: 'text-amber-300',
    gradBtn: 'bg-gradient-to-r from-orange-500 to-amber-400',
    gradBtnHover: 'hover:from-orange-400 hover:to-amber-300',
    gradText: 'bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent',
    glowShadow: 'shadow-amber-500/20',
    cardHoverShadow: 'hover:shadow-amber-500/10',
    blob1: 'rgba(249,115,22,0.55)', // orange-500
    blob2: 'rgba(245,158,11,0.55)', // amber-500
    blob3: 'rgba(234,88,12,0.60)',  // orange-600
  },
  slateGold: {
    badgeIcon: 'text-yellow-300',
    gradBtn: 'bg-gradient-to-r from-yellow-500 to-amber-400',
    gradBtnHover: 'hover:from-yellow-400 hover:to-amber-300',
    gradText: 'bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-500 bg-clip-text text-transparent',
    glowShadow: 'shadow-yellow-500/20',
    cardHoverShadow: 'hover:shadow-yellow-500/10',
    blob1: 'rgba(250,204,21,0.45)', // yellow-400
    blob2: 'rgba(245,158,11,0.45)', // amber-500
    blob3: 'rgba(161,161,170,0.30)', // zinc-ish for premium slate
  },
};

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [palette, setPalette] = useState<Palette>(() => (localStorage.getItem('tp_palette') as Palette) || 'slateGold');

  // Redirect to app if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (email: string, password: string, token: string, userData: any) => {
    login(email, password, token, userData);
    navigate('/app');
  };

  // Persist palette
  useEffect(() => {
    localStorage.setItem('tp_palette', palette);
  }, [palette]);

  // Parallax state for subtle background movement
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / innerWidth;
    const y = (e.clientY - innerHeight / 2) / innerHeight;
    setParallax({ x, y });
  };

  const styles = useMemo(() => PALETTE_CLASSES[palette], [palette]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0A0C] text-white" onMouseMove={onMouseMove}>
      {/* Background gradient blobs (palette-based) */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-25"
        style={{
          background: `radial-gradient(45rem 45rem at 30% 30%, ${styles.blob1}, transparent 60%)`,
          transform: `translate3d(${parallax.x * 40}px, ${parallax.y * 30}px, 0)`
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-56 -right-56 w-[50rem] h-[50rem] rounded-full blur-3xl opacity-25"
        style={{
          background: `radial-gradient(50rem 50rem at 70% 70%, ${styles.blob2}, transparent 55%)`,
          transform: `translate3d(${parallax.x * -45}px, ${parallax.y * -35}px, 0)`
        }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-10"
        style={{
          background: `radial-gradient(30rem 30rem at 50% 50%, ${styles.blob3}, transparent 60%)`,
          transform: `translate3d(${parallax.x * -20}px, ${parallax.y * 25}px, 0)`
        }}
      />

      {/* Header with Theme Switcher */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✈️</span>
          <h1 className="text-xl font-bold tracking-wide text-white/90">Travel Planner</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/70">Theme:</span>
            <select
              value={palette}
              onChange={(e) => setPalette(e.target.value as Palette)}
              className="bg-white/5 text-white text-xs rounded-lg px-2 py-1 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="slateGold">Slate/Gold</option>
              <option value="blueCyan">Blue/Cyan</option>
              <option value="emeraldTeal">Emerald/Teal</option>
              <option value="purpleFuchsia">Purple/Fuchsia</option>
              <option value="orangeAmber">Orange/Amber</option>
            </select>
          </div>
          <Button onClick={() => setShowAuth(true)} className={`${styles.gradBtn} ${styles.gradBtnHover} text-black/90 sm:text-white font-semibold shadow-lg ${styles.glowShadow}`}>
            Sign In
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAuth(true)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Create Account
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div className="relative">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs mb-4`}>
              <Sparkles className={`w-3.5 h-3.5 ${styles.badgeIcon}`} />
              Your complete travel planning hub
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Plan smarter. Travel better.
              <span className={`${styles.gradText}`}>
                {` `}All in one beautiful dashboard
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mt-5 max-w-2xl">
              Design day-by-day itineraries, explore curated destinations, manage budgets, and check weather—everything crafted to help you create unforgettable journeys.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Button
                className={`w-full sm:w-auto ${styles.gradBtn} ${styles.gradBtnHover} text-black/90 sm:text-white font-semibold px-6 py-6 rounded-xl shadow-xl ${styles.glowShadow}`}
                onClick={() => setShowAuth(true)}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-white/15 text-white hover:bg-white/10"
                onClick={() => setShowAuth(true)}
              >
                Create Free Account
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-white/70">
              <div className="flex items-center gap-2"><Star className={`w-4 h-4 ${styles.badgeIcon}`} /> 4.8/5 rating</div>
              <div className="flex items-center gap-2"><ShieldCheck className={`w-4 h-4 ${styles.badgeIcon}`} /> Privacy-first</div>
              <div className="flex items-center gap-2"><Globe className={`w-4 h-4 ${styles.badgeIcon}`} /> 150+ destinations</div>
            </div>
          </div>

          {/* Visual Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[{
              title: 'Itinerary Designer', desc: 'Craft day-by-day plans with time and details', icon: '📅'
            }, {
              title: 'Destination Explorer', desc: 'Curated insights and top attractions', icon: '🗺️'
            }, {
              title: 'Weather & Currency', desc: 'Live weather, conversions, and budgets', icon: '☀️'
            }, {
              title: 'Wishlist & Sharing', desc: 'Save ideas and collaborate with friends', icon: '💖'
            }].map((c, i) => (
              <div key={i} className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-transform duration-300 hover:-translate-y-1 ${styles.cardHoverShadow}`}>
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${styles.gradBtn.replace('bg-', '')}`}/>
                <div className="relative">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <div className="text-lg font-semibold text-white">{c.title}</div>
                  <div className="text-sm text-white/70">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Travel Planner */}
      <section className="relative z-10 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">What is Travel Planner?</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Travel Planner is your all-in-one workspace to plan trips beautifully and efficiently. From researching destinations and saving ideas to building day-by-day itineraries and managing budgets—we bring every piece of your journey together in one elegant interface.
            </p>
            <p className="text-white/80 leading-relaxed">
              Built with privacy in mind and designed for speed, it helps solo travelers and groups stay organized and inspired. Whether you’re planning a weekend getaway or a month-long adventure, Travel Planner gives you the clarity and tools you need.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ icon: MapPin, label: '150+ guides' }, { icon: Calendar, label: 'Smart itineraries' }, { icon: Clock, label: 'Real-time info' }, { icon: Users, label: 'Collaborative' }].map((f, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <f.icon className={`w-5 h-5 mx-auto mb-2 ${styles.badgeIcon}`} />
                <div className="text-sm text-white/80">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-10">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              step: '1', title: 'Sign in & set goals', desc: 'Tell us your destination and dates to get tailored suggestions.'
            }, {
              step: '2', title: 'Build your itinerary', desc: 'Add activities, manage timing, notes, and budgets in one place.'
            }, {
              step: '3', title: 'Optimize & go', desc: 'Check weather, convert currencies, and keep everything synced.'
            }].map((s, i) => (
              <div key={i} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${styles.gradBtn} text-white font-bold`}>{s.step}</span>
                  <div className="font-semibold">{s.title}</div>
                </div>
                <p className="text-sm text-white/75">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Travelers Love Us */}
      <section className="relative z-10 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[{ icon: Star, title: '4.8/5', desc: 'Average rating from travelers' }, { icon: ShieldCheck, title: 'Privacy-first', desc: 'Your data is secure and in your control' }, { icon: Globe, title: 'Global', desc: 'Curated insights for 150+ destinations' }, { icon: CheckCircle2, title: 'All-in-one', desc: 'Itinerary, wishlist, weather, currency' }].map((w, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <w.icon className={`w-6 h-6 mx-auto mb-2 ${styles.badgeIcon}`} />
              <div className="text-xl font-semibold">{w.title}</div>
              <div className="text-sm text-white/70">{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-10">What travelers say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              name: 'Alex', text: 'Planning our Japan trip was a breeze. The day-by-day view is beautiful and practical.'
            }, {
              name: 'Priya', text: 'Loved the wishlist and sharing features. Our group stayed aligned the whole time.'
            }, {
              name: 'Marco', text: 'Currency tools and weather helped me adjust plans on the fly. Super helpful!'
            }].map((t, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 text-white/70 mb-3"><Quote className={`w-4 h-4 ${styles.badgeIcon}`} /> Testimonial</div>
                <p className="text-white/90">“{t.text}”</p>
                <div className="mt-3 text-sm text-white/70">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-10">FAQ</h3>
          <div className="space-y-4">
            {[{
              q: 'Is Travel Planner free to use?', a: 'Yes. You can sign in and start planning for free. We may offer premium features later.'
            }, {
              q: 'Can I share plans with friends?', a: 'Absolutely. Save items to your wishlist and collaborate with friends and family.'
            }, {
              q: 'Do you support offline access?', a: 'Basic access is online today; offline support is on our roadmap.'
            }].map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="font-semibold">{f.q}</div>
                <div className="text-sm text-white/75 mt-1">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-3">Ready to plan your next adventure?</h3>
          <p className="text-white/80 mb-6">Sign in to start building your itinerary and exploring destinations.</p>
          <div className="flex items-center justify-center gap-4">
            <Button className={`${styles.gradBtn} ${styles.gradBtnHover} text-black/90 sm:text-white`} onClick={() => setShowAuth(true)}>Get Started</Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setShowAuth(true)}>Create Free Account</Button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-8 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Travel Planner. All rights reserved.
      </footer>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={handleLogin} />
    </div>
  );
};

export default Welcome;