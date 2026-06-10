import { Calendar, CheckCircle, XCircle, Clock, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const LecturerAttendancePage = () => {
  const todayAttendance = [
    {
      id: 1,
      studentName: 'Kabir Rabi\'atu',
      time: '8:55 AM',
      status: 'present',
      course: 'CSE101',
    },
    {
      id: 2,
      studentName: 'Faruk Aisha Sambo',
      time: '9:02 AM',
      status: 'present',
      course: 'CSE101',
    },
    {
      id: 3,
      studentName: 'Sani Khadija',
      time: '--',
      status: 'absent',
      course: 'CSE101',
    },
    {
      id: 4,
      studentName: 'Mustapha Fatima',
      time: '8:58 AM',
      status: 'present',
      course: 'CSE101',
    },
  ];

  const attendanceStats = [
    { course: 'CSE101', present: 38, absent: 7, total: 45, rate: 84 },
    { course: 'CSE111', present: 35, absent: 3, total: 38, rate: 92 },
    { course: 'CSE201', present: 30, absent: 2, total: 32, rate: 94 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Track and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Present</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">103</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Absent</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Course-wise Attendance */}
      <div className="grid gap-4 md:grid-cols-3">
        {attendanceStats.map((stat) => (
          <Card key={stat.course}>
            <CardHeader>
              <CardTitle className="text-lg">{stat.course}</CardTitle>
              <CardDescription>Today's attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Attendance Rate</span>
                  <span className="font-semibold">{stat.rate}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${stat.rate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>{stat.present} Present</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <XCircle className="h-3 w-3 text-red-600" />
                    <span>{stat.absent} Absent</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: {stat.total} students
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Attendance List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Today's Attendance - CSE101</CardTitle>
              <CardDescription>9:00 AM - Computer System</CardDescription>
            </div>
            <Badge variant="outline">84% Present</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayAttendance.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {record.studentName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{record.studentName}</p>
                    <p className="text-sm text-muted-foreground">{record.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{record.time}</span>
                  <Badge variant={record.status === 'present' ? 'default' : 'destructive'}>
                    {record.status === 'present' ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Present
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Absent
                      </div>
                    )}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LecturerAttendancePage;
