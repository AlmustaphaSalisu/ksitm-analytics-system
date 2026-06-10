import { useState } from 'react';
import { sysadminData } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/stat-card';
import { roleLabels, UserRole } from '@/lib/mock-data';
import { Activity, Users, Server, AlertTriangle, Database, HardDrive, Cpu, Trash2, Edit, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useUsers } from '@/hooks/useUsers';
import type { SystemUser } from '@/types';

const d = sysadminData;

const logLevelStyles = {
  info: 'text-info bg-info/10',
  warning: 'text-warning bg-warning/10',
  error: 'text-destructive bg-destructive/10',
};

export default function SysAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'logs'>('overview');
  const { users, addUser, updateUser, deleteUser } = useUsers();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student' as UserRole,
    status: 'active' as SystemUser['status'],
  });

  const handleAddUser = () => {
    addUser({
      ...newUser,
      lastLogin: 'Never',
      permissions: [newUser.role],
    });
    setNewUser({ name: '', email: '', role: 'student', status: 'active' });
    setIsAddDialogOpen(false);
  };

  const handleEditUser = (user: SystemUser) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;
    updateUser(selectedUser.id, {
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      status: selectedUser.status,
    });
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">System Administration ⚙️</h2>
          <p className="text-muted-foreground text-sm">Monitor and manage system health</p>
        </div>
        <div className="flex gap-1 rounded-lg border bg-muted p-1">
          {(['overview', 'users', 'logs'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors capitalize',
                activeTab === tab ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard title="System Health" value={`${d.systemHealth}%`} icon={Activity} variant="success" />
            <StatCard title="Active Users" value={d.activeUsers.toLocaleString()} icon={Users} variant="primary" />
            <StatCard title="API Requests" value={d.apiRequests.toLocaleString()} subtitle="Today" icon={Server} variant="info" />
            <StatCard title="Error Rate" value={`${d.errorRate}%`} icon={AlertTriangle} variant="warning" />
            <StatCard title="Uptime" value={d.uptime} icon={Cpu} variant="success" />
            <StatCard title="Storage" value={`${d.storageUsed}%`} icon={HardDrive} variant="info" />
          </div>

          <div className="rounded-lg border bg-card p-5 shadow-card">
            <h3 className="font-semibold mb-4">Server Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={d.serverMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
                <Legend />
                <Line type="monotone" dataKey="cpu" name="CPU %" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="memory" name="Memory %" stroke="hsl(var(--accent))" strokeWidth={2} />
                <Line type="monotone" dataKey="requests" name="Requests" stroke="hsl(var(--warning))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">User Management</h3>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={() => setIsAddDialogOpen(true)}><Plus className="h-4 w-4 mr-1" /> Add User</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Last Login</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 font-medium">{u.name}</td>
                    <td className="py-3 text-muted-foreground">{u.email}</td>
                    <td className="py-3"><span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{roleLabels[u.role]}</span></td>
                    <td className="py-3">
                      <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', u.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground')}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{u.lastLogin}</td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <button className="rounded p-1.5 hover:bg-muted" onClick={() => handleEditUser(u)}><Edit className="h-3.5 w-3.5" /></button>
                        <button className="rounded p-1.5 hover:bg-destructive/10 text-destructive" onClick={() => handleDeleteUser(u.id)}><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-4">System Logs</h3>
          <div className="space-y-2">
            {d.logs.map((log, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/50">
                <span className={cn('rounded-md px-2 py-0.5 text-xs font-semibold uppercase', logLevelStyles[log.level as keyof typeof logLevelStyles])}>
                  {log.level}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{log.message}</p>
                  <p className="text-xs text-muted-foreground">{log.source} • {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Enter the user details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Input
                id="role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                className="col-span-3"
                placeholder="student, lecturer, hod, admin, sysadmin"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Input
                id="status"
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value as SystemUser['status'] })}
                className="col-span-3"
                placeholder="active, inactive"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update the user details below.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">Role</Label>
                <Input
                  id="edit-role"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value as UserRole })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Input
                  id="edit-status"
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value as SystemUser['status'] })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
