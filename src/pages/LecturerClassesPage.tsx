import { BookOpen, Users, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LecturerClassesPage = () => {
  const classes = [
    {
      id: 1,
      name: 'Computer System',
      code: 'CSE101',
      students: 45,
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      progress: 75,
      nextClass: 'Today, 9:00 AM',
    },
    {
      id: 2,
      name: 'Data Structure and Algorithm',
      code: 'CSE102',
      students: 38,
      schedule: 'Tue, Thu - 2:00 PM',
      progress: 60,
      nextClass: 'Tomorrow, 2:00 PM',
    },
    {
      id: 3,
      name: 'Programming Concept',
      code: 'CSE201',
      students: 32,
      schedule: 'Mon, Wed - 11:00 AM',
      progress: 45,
      nextClass: 'Monday, 11:00 AM',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Classes</h1>
          <p className="text-muted-foreground">Manage your courses and track student progress</p>
        </div>
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{classItem.code}</Badge>
                <Badge variant={classItem.progress >= 70 ? 'default' : 'destructive'}>
                  {classItem.progress}% Complete
                </Badge>
              </div>
              <CardTitle className="text-lg">{classItem.name}</CardTitle>
              <CardDescription>{classItem.schedule}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{classItem.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{classItem.nextClass}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{classItem.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${classItem.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LecturerClassesPage;
