import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const reports = [
  { title: 'Student Performance Report', desc: 'Comprehensive analysis of student grades and GPA trends', date: '2024-01-15', type: 'Academic' },
  { title: 'Attendance Summary', desc: 'Monthly attendance records across all departments', date: '2024-01-14', type: 'Attendance' },
  { title: 'AI Risk Assessment Report', desc: 'Students flagged for dropout risk with intervention recommendations', date: '2024-01-13', type: 'AI Analytics' },
  { title: 'Teaching Quality Report', desc: 'Lecturer performance metrics and student feedback analysis', date: '2024-01-12', type: 'Quality' },
  { title: 'Department Comparison', desc: 'Cross-department performance benchmarking', date: '2024-01-11', type: 'Institutional' },
  { title: 'Enrollment Trends', desc: 'Year-over-year enrollment and retention analysis', date: '2024-01-10', type: 'Institutional' },
];

export default function ReportsPage() {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [reportType, setReportType] = useState('');
  const [reports, setReports] = useState([
    { title: 'Student Performance Report', desc: 'Comprehensive analysis of student grades and GPA trends', date: '2024-01-15', type: 'Academic' },
    { title: 'Attendance Summary', desc: 'Monthly attendance records across all departments', date: '2024-01-14', type: 'Attendance' },
    { title: 'AI Risk Assessment Report', desc: 'Students flagged for dropout risk with intervention recommendations', date: '2024-01-13', type: 'AI Analytics' },
    { title: 'Teaching Quality Report', desc: 'Lecturer performance metrics and student feedback analysis', date: '2024-01-12', type: 'Quality' },
    { title: 'Department Comparison', desc: 'Cross-department performance benchmarking', date: '2024-01-11', type: 'Institutional' },
    { title: 'Enrollment Trends', desc: 'Year-over-year enrollment and retention analysis', date: '2024-01-10', type: 'Institutional' },
  ]);

  const handleGenerateReport = () => {
    if (reportTitle.trim() && reportType.trim()) {
      const newReport = {
        title: reportTitle,
        desc: `Generated ${reportType} report`,
        date: new Date().toISOString().split('T')[0],
        type: reportType,
      };
      setReports([newReport, ...reports]);
      setReportTitle('');
      setReportType('');
      setIsGenerateDialogOpen(false);
    }
  };

  const handleExportPDF = (reportTitle: string) => {
    window.print();
  };

  const handleExportExcel = (report: any) => {
    const csvContent = [
      ['Title', 'Description', 'Date', 'Type'],
      [report.title, report.desc, report.date, report.type]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${report.title.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Reports</h2>
          <p className="text-muted-foreground text-sm">Generate and download academic reports</p>
        </div>
        <Button className="gradient-primary border-0 text-primary-foreground" onClick={() => setIsGenerateDialogOpen(true)}>
          <FileText className="h-4 w-4 mr-1.5" /> Generate New Report
        </Button>
      </div>

      <div className="grid gap-4">
        {reports.map((r, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border bg-card p-5 shadow-card hover:shadow-elevated transition-all">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {r.date}
                  </span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">{r.type}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleExportPDF(r.title)}><Download className="h-4 w-4 mr-1" /> PDF</Button>
              <Button variant="outline" size="sm" onClick={() => handleExportExcel(r)}><Download className="h-4 w-4 mr-1" /> Excel</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Generate Report Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate New Report</DialogTitle>
            <DialogDescription>Create a new report for the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="col-span-3"
                placeholder="Report title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Input
                id="type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="col-span-3"
                placeholder="Academic, Attendance, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
