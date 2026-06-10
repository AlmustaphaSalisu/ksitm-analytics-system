import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, roleLabels } from '@/lib/mock-data';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const roles: { value: UserRole; label: string; desc: string }[] = [
  { value: 'student', label: '🎓 Student', desc: 'Track your performance' },
  { value: 'lecturer', label: '👨‍🏫 Lecturer', desc: 'Manage your classes' },
  { value: 'hod', label: '🧑‍💼 HOD', desc: 'Oversee department' },
  { value: 'admin', label: '🏢 Admin', desc: 'Institution analytics' },
  { value: 'sysadmin', label: '⚙️ System Admin', desc: 'System management' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(275_70%_50%_/_0.2),_transparent_60%)]" />
        <div className="relative text-center max-w-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary mx-auto mb-6">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">KSITM Analytics</h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            AI-Powered Smart Learning Analytics System for improving teaching quality, student performance, and early dropout detection.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">KSITM Analytics</span>
          </div>

          <h1 className="text-2xl font-bold mb-1 text-primary">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-8">Sign in to access your dashboard</p>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3 text-primary">Select your role</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {roles.map(r => (
                <button
                  key={r.value}
                  onClick={() => setSelectedRole(r.value)}
                  className={`rounded-lg border p-3 text-left transition-all ${
                    selectedRole === r.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border hover:border-accent/50 hover:bg-accent/5'
                  }`}
                >
                  <p className="text-sm font-medium">{r.label}</p>
                  <p className="text-[10px] text-muted-foreground">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Enter your email" defaultValue="demo@ksitm.edu.ng" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10 pr-10" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" defaultValue="password123" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground">
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

                  </div>
      </div>
    </div>
  );
}
