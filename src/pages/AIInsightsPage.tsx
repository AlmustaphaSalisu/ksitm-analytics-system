import { useAuth } from '@/contexts/AuthContext';
import { adminData, hodData, lecturerData, studentPerformance } from '@/lib/mock-data';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Users, Target } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const studentInsights = [
  { category: 'Performance', icon: TrendingUp, color: 'primary', items: ['Your GPA has improved by 0.13 this semester', 'You are in the top 30% of your department', 'Data Structure and Algorithm is your strongest course'] },
  { category: 'Risk Analysis', icon: AlertTriangle, color: 'warning', items: ['Low risk of academic probation', 'CSE131 attendance is a concern area', 'No dropout risk indicators detected'] },
  { category: 'Recommendations', icon: Lightbulb, color: 'info', items: ['Allocate more time to CSE121', 'Join study groups for CSE221', 'Consider undergraduate research opportunities'] },
];

const radarData = [
  { subject: 'Assignments', score: 85 },
  { subject: 'Quizzes', score: 72 },
  { subject: 'Midterm', score: 78 },
  { subject: 'Attendance', score: 87 },
  { subject: 'Participation', score: 65 },
  { subject: 'Projects', score: 90 },
];

export default function AIInsightsPage() {
  const { role } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
          <Brain className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI Insights</h2>
          <p className="text-muted-foreground text-sm">Powered by machine learning analytics</p>
        </div>
      </div>

      {role === 'student' && (
        <>
          <div className="grid lg:grid-cols-3 gap-6">
            {studentInsights.map(s => (
              <div key={s.category} className="rounded-lg border bg-card p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <s.icon className={`h-5 w-5 text-${s.color}`} />
                  <h3 className="font-semibold">{s.category}</h3>
                </div>
                <ul className="space-y-2">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-card p-5 shadow-card">
            <h3 className="font-semibold mb-4">Performance Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {(role === 'lecturer' || role === 'hod' || role === 'admin') && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminData.aiPredictions.map(p => (
              <div key={p.metric} className="rounded-lg border bg-card p-5 shadow-card">
                <p className="text-xs text-muted-foreground mb-1">{p.metric}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{p.value}</span>
                  <span className={`text-sm font-medium ${p.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {p.trend === 'up' ? '↑' : '↓'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-card p-5 shadow-card">
            <h3 className="font-semibold mb-4">Department Risk Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={adminData.departmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dept" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
                <Bar dataKey="dropout" name="Dropout %" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="passRate" name="Pass Rate %" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {role === 'sysadmin' && (
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-2">AI System Configuration</h3>
          <p className="text-sm text-muted-foreground">AI model management and configuration options will be available here.</p>
        </div>
      )}
    </div>
  );
}
