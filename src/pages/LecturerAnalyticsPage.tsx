import { BarChart3, TrendingUp, TrendingDown, Users, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LecturerAnalyticsPage = () => {
  const performanceMetrics = [
    {
      title: 'Class Performance',
      value: '78%',
      change: '+5%',
      trend: 'up',
      description: 'Average score across all classes',
    },
    {
      title: 'Student Engagement',
      value: '82%',
      change: '+3%',
      trend: 'up',
      description: 'Participation and interaction rate',
    },
    {
      title: 'Assignment Completion',
      value: '91%',
      change: '-2%',
      trend: 'down',
      description: 'On-time submission rate',
    },
    {
      title: 'Attendance Rate',
      value: '87%',
      change: '+4%',
      trend: 'up',
      description: 'Average attendance this month',
    },
  ];

  const courseAnalytics = [
    {
      course: 'CSE101',
      students: 45,
      avgGrade: 76,
      completionRate: 89,
      engagement: 81,
    },
    {
      course: 'CSE111',
      students: 38,
      avgGrade: 82,
      completionRate: 94,
      engagement: 85,
    },
    {
      course: 'CSE201',
      students: 32,
      avgGrade: 79,
      completionRate: 91,
      engagement: 78,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track performance metrics and insights</p>
        </div>
        <Badge variant="outline">Last updated: 2 hours ago</Badge>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {metric.change}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Performance
            </CardTitle>
            <CardDescription>Overview of your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseAnalytics.map((course) => (
                <div key={course.course} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{course.course}</h4>
                      <p className="text-sm text-muted-foreground">{course.students} students</p>
                    </div>
                    <Badge variant="outline">Grade: {course.avgGrade}%</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Completion</p>
                      <p className="font-semibold">{course.completionRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Engagement</p>
                      <p className="font-semibold">{course.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Grade</p>
                      <p className="font-semibold">{course.avgGrade}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${course.completionRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Objectives
            </CardTitle>
            <CardDescription>Student progress on key objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { objective: 'Programming Fundamentals', progress: 85, students: 38 },
                { objective: 'Data Structures', progress: 72, students: 35 },
                { objective: 'Algorithm Design', progress: 68, students: 32 },
                { objective: 'Problem Solving', progress: 79, students: 40 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.objective}</span>
                    <span className="text-sm text-muted-foreground">{item.students} students</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{item.progress}% mastery</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Grade Distribution
          </CardTitle>
          <CardDescription>Student performance across grade ranges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              { grade: 'A', range: '90-100', count: 12, percentage: 27, color: 'bg-green-600' },
              { grade: 'B', range: '80-89', count: 18, percentage: 40, color: 'bg-blue-600' },
              { grade: 'C', range: '70-79', count: 10, percentage: 22, color: 'bg-yellow-600' },
              { grade: 'D', range: '60-69', count: 4, percentage: 9, color: 'bg-orange-600' },
              { grade: 'F', range: '0-59', count: 1, percentage: 2, color: 'bg-red-600' },
            ].map((grade) => (
              <div key={grade.grade} className="text-center">
                <div className={`h-16 ${grade.color} rounded-t-lg flex items-end justify-center pb-2`}>
                  <span className="text-white font-bold">{grade.count}</span>
                </div>
                <div className="border border-t-0 rounded-b-lg p-2">
                  <div className="font-semibold">{grade.grade}</div>
                  <div className="text-xs text-muted-foreground">{grade.range}</div>
                  <div className="text-xs font-medium">{grade.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LecturerAnalyticsPage;
