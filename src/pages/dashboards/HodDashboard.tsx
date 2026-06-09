import { hodData } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/stat-card';
import { Users, BookOpen, TrendingDown, AlertTriangle, UserCheck, GraduationCap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const d = hodData;

export default function HodDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Department Overview 📊</h2>
        <p className="text-muted-foreground text-sm">COM Department Performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Students" value={d.totalStudents} icon={Users} variant="primary" />
        <StatCard title="Lecturers" value={d.totalLecturers} icon={UserCheck} variant="info" />
        <StatCard title="Dept. GPA" value={d.departmentGpa} icon={GraduationCap} variant="success" />
        <StatCard title="Dropout Rate" value={`${d.dropoutRate}%`} icon={TrendingDown} variant="warning" trend={{ value: '-0.6%', positive: true }} />
        <StatCard title="At-Risk" value={d.atRiskCount} icon={AlertTriangle} variant="destructive" />
        <StatCard title="Courses" value={d.courses} icon={BookOpen} variant="info" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Course comparison */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-4">Course Comparison</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={d.courseComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="course" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Legend />
              <Bar dataKey="passRate" name="Pass Rate %" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgScore" name="Avg Score" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Dropout trend */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-4">Dropout Rate Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={d.dropoutTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Line type="monotone" dataKey="rate" name="Dropout %" stroke="hsl(var(--destructive))" strokeWidth={2.5} dot={{ fill: 'hsl(var(--destructive))', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lecturer performance */}
      <div className="rounded-lg border bg-card p-5 shadow-card">
        <h3 className="font-semibold mb-4">Lecturer Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">Lecturer</th>
                <th className="pb-3 font-medium">Courses</th>
                <th className="pb-3 font-medium">Avg Score</th>
                <th className="pb-3 font-medium">Pass Rate</th>
                <th className="pb-3 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {d.lecturerPerformance.map(l => (
                <tr key={l.name} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 font-medium">{l.name}</td>
                  <td className="py-3">{l.courses}</td>
                  <td className="py-3">{l.avgScore}%</td>
                  <td className="py-3">{l.passRate}%</td>
                  <td className="py-3">
                    <span className="rounded-md bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning">⭐ {l.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
