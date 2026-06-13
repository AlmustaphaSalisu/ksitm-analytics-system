import { Link } from 'react-router-dom';
import { GraduationCap, Brain, BarChart3, Shield, Users, ArrowRight, ChevronRight, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Brain, title: 'AI-Powered Predictions', desc: 'Early dropout detection and performance forecasting using advanced machine learning models.' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Track student performance, attendance, and engagement with interactive dashboards.' },
  { icon: AlertTriangle, title: 'Risk Detection', desc: 'Automatically identify at-risk students and trigger early intervention alerts.' },
  { icon: Users, title: 'Role-Based Access', desc: '5 specialized dashboards for students, lecturers, HODs, admins, and system admins.' },
  { icon: TrendingUp, title: 'Teaching Quality', desc: 'Monitor and improve teaching effectiveness with AI-driven insights and recommendations.' },
  { icon: Shield, title: 'Institutional Reporting', desc: 'Generate comprehensive reports for academic planning and accreditation.' },
];

const stats = [
  { value: '5,420+', label: 'Students Tracked' },
  { value: '186', label: 'Lecturers' },
  { value: '94.5%', label: 'Retention Rate' },
  { value: '12', label: 'Departments' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.ico" alt="KSITM Logo" className="h-9 w-9" />
            <span className="text-lg font-bold">KSITM Analytics</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Impact</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          <Link to="/login">
            <Button className="gradient-primary border-0 text-primary-foreground">
              Sign In <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,140,0,0.15),_transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8C00]/50 bg-[#FF8C00]/10 px-4 py-1.5 mb-6 shadow-[0_0_20px_rgba(255,140,0,0.35)]">
              <Sparkles className="h-3.5 w-3.5 text-[#FFA726]" />
              <span className="text-xs font-medium text-[#FF8C00]" style={{ textShadow: '0 0 15px rgba(255, 140, 0, 0.35)' }}>AI-Powered Academic Analytics</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FF8C00] mb-6 leading-tight" style={{ textShadow: '0 0 15px rgba(255, 140, 0, 0.35)' }}>
              Smart Learning Analytics for{' '}
              <span className="font-black text-[#FF8C00] bg-[#FF8C00]/10 px-3 py-1 rounded-lg border-2 border-[#FF8C00]/50 shadow-[0_0_15px_rgba(255,140,0,0.35)]">KSITM</span>
            </h1>
            <p className="text-lg text-[#FF8C00] mb-8 max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '0 0 15px rgba(255, 140, 0, 0.35)' }}>
              Harness AI to improve teaching quality, boost student performance, and detect dropout risks early. A comprehensive analytics platform for Katsina State Institute of Technology and Management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="gradient-primary border-0 text-primary-foreground text-base px-8">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-[#FF8C00]/50 text-[#FF8C00] hover:bg-[#FF8C00]/10 hover:text-[#FFA726] text-base px-8 font-semibold" style={{ textShadow: '0 0 15px rgba(255, 140, 0, 0.35)' }}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center animate-fade-in">
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gradient-to-b from-background to-purple-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-primary">Powerful Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to transform academic performance tracking and decision-making.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="group rounded-xl border bg-card p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:gradient-primary group-hover:text-primary-foreground transition-all">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-gradient-to-b from-purple-50/30 to-muted/50">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-primary">About KSITM Analytics</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This AI-driven Smart Learning Analytics System is designed specifically for the Katsina State Institute of Technology and Management. It provides actionable insights across all academic levels — from individual student progress to institution-wide performance metrics.
          </p>
          <Link to="/login">
            <Button className="gradient-primary border-0 text-primary-foreground">
              Access the Platform <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/favicon.ico" alt="KSITM Logo" className="h-5 w-5" />
            <span className="text-sm font-semibold">KSITM Analytics</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Katsina State Institute of Technology and Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
