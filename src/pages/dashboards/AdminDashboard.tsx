import { adminData } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/stat-card';
import { Users, Building, TrendingUp, TrendingDown, GraduationCap, Brain, FileText, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';

const d = adminData;

const handleExportPDF = () => {
  window.print();
};

const handleExportExcel = () => {
  const csvContent = [
    ['Department', 'Students', 'GPA', 'Pass Rate', 'Dropout'],
    ...d.departmentPerformance.map(dept => [
      dept.dept,
      dept.students,
      dept.gpa,
      dept.passRate,
      dept.dropout
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'ksitm_department_performance.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Institution Overview 🏢</h2>
          <p className="text-muted-foreground text-sm">KSITM academic analytics dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-1.5" /> Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <FileText className="h-4 w-4 mr-1.5" /> Export Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Students" value={d.totalStudents.toLocaleString()} icon={Users} variant="primary" />
        <StatCard title="Lecturers" value={d.totalLecturers} icon={Users} variant="info" />
        <StatCard title="Departments" value={d.departments} icon={Building} variant="success" />
        <StatCard title="Retention" value={`${d.retentionRate}%`} icon={TrendingUp} variant="success" trend={{ value: '+1.2%', positive: true }} />
        <StatCard title="Overall GPA" value={d.overallGpa} icon={GraduationCap} variant="primary" />
        <StatCard title="Dropout Rate" value={`${d.dropoutRate}%`} icon={TrendingDown} variant="warning" trend={{ value: '-0.4%', positive: true }} />
      </div>

      {/* AI Predictions */}
      <div className="rounded-lg border bg-card p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Predictions & Forecasts</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {d.aiPredictions.map(p => (
            <div key={p.metric} className="rounded-lg border p-4 bg-primary/5">
              <p className="text-xs text-muted-foreground mb-1">{p.metric}</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{p.value}</span>
                <span className={`text-xs font-medium ${p.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {p.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enrollment trend */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-4">Enrollment Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={d.enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Area type="monotone" dataKey="students" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dept performance */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-4">Department Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={d.departmentPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 10 }} width={100} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Bar dataKey="passRate" name="Pass Rate %" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dept table */}
      <div className="rounded-lg border bg-card p-5 shadow-card">
        <h3 className="font-semibold mb-4">Department Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">Students</th>
                <th className="pb-3 font-medium">GPA</th>
                <th className="pb-3 font-medium">Pass Rate</th>
                <th className="pb-3 font-medium">Dropout</th>
              </tr>
            </thead>
            <tbody>
              {d.departmentPerformance.map(dept => (
                <tr key={dept.dept} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 font-medium">{dept.dept}</td>
                  <td className="py-3">{dept.students}</td>
                  <td className="py-3">{dept.gpa}</td>
                  <td className="py-3">{dept.passRate}%</td>
                  <td className="py-3">
                    <span className={`text-xs font-semibold ${dept.dropout > 4 ? 'text-destructive' : dept.dropout > 3 ? 'text-warning' : 'text-success'}`}>
                      {dept.dropout}%
                    </span>
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
