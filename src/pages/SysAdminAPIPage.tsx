import { Key, Server, Copy, RefreshCw, Plus, Trash2, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const SysAdminAPIPage = () => {
  const [globalRateLimit, setGlobalRateLimit] = useState('1000');
  const [burstLimit, setBurstLimit] = useState('100');
  const [corsSettings, setCorsSettings] = useState('');
  const [apiVersion, setApiVersion] = useState('v1');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const apiKeys = [
    {
      id: 1,
      name: 'Mobile App API',
      key: 'ak_1234567890abcdef...',
      permissions: ['read', 'write'],
      status: 'active',
      created: '2024-01-10',
      lastUsed: '2 hours ago',
      requests: 15420,
    },
    {
      id: 2,
      name: 'Third Party Integration',
      key: 'ak_fedcba0987654321...',
      permissions: ['read'],
      status: 'active',
      created: '2024-01-08',
      lastUsed: '1 day ago',
      requests: 8934,
    },
    {
      id: 3,
      name: 'Internal Service',
      key: 'ak_abcdef1234567890...',
      permissions: ['read', 'write', 'admin'],
      status: 'active',
      created: '2024-01-05',
      lastUsed: '5 minutes ago',
      requests: 45678,
    },
    {
      id: 4,
      name: 'Test API Key',
      key: 'ak_test1234567890...',
      permissions: ['read'],
      status: 'inactive',
      created: '2024-01-03',
      lastUsed: '1 week ago',
      requests: 123,
    },
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/v1/users',
      description: 'Get all users',
      status: 'active',
      rateLimit: '1000/hour',
    },
    {
      method: 'POST',
      path: '/api/v1/auth/login',
      description: 'User authentication',
      status: 'active',
      rateLimit: '100/hour',
    },
    {
      method: 'PUT',
      path: '/api/v1/courses/{id}',
      description: 'Update course information',
      status: 'active',
      rateLimit: '500/hour',
    },
    {
      method: 'DELETE',
      path: '/api/v1/users/{id}',
      description: 'Delete user account',
      status: 'active',
      rateLimit: '50/hour',
    },
  ];

  const apiStats = [
    {
      title: 'Total Requests',
      value: '1.2M',
      change: '+15%',
      description: 'Last 30 days',
    },
    {
      title: 'Active Keys',
      value: '12',
      change: '+2',
      description: 'Currently active',
    },
    {
      title: 'Avg Response Time',
      value: '145ms',
      change: '-12ms',
      description: 'Last 24 hours',
    },
    {
      title: 'Error Rate',
      value: '0.2%',
      change: '-0.1%',
      description: 'Last 24 hours',
    },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'default';
      case 'POST': return 'secondary';
      case 'PUT': return 'outline';
      case 'DELETE': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const handleUpdateRateLimits = () => {
    setNotification({ type: 'success', message: 'Rate limits updated successfully!' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateSecuritySettings = () => {
    setNotification({ type: 'success', message: 'Security settings updated successfully!' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className={`p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-red-500/10 text-red-600 border-red-500/20'} border`}>
          {notification.message}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Configuration</h1>
          <p className="text-muted-foreground">Manage API keys and endpoint configuration</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate API Key
        </Button>
      </div>

      {/* API Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {apiStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>Manage API access keys and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{apiKey.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Created: {apiKey.created} | Last used: {apiKey.lastUsed}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(apiKey.status)}>
                      {apiKey.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Key:</span>
                    <code className="bg-muted px-2 py-1 rounded text-sm">{apiKey.key}</code>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Permissions:</span>
                      {apiKey.permissions.map((perm) => (
                        <Badge key={perm} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {apiKey.requests.toLocaleString()} requests
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            API Endpoints
          </CardTitle>
          <CardDescription>Configure API endpoints and rate limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant={getMethodColor(endpoint.method)}>
                    {endpoint.method}
                  </Badge>
                  <div>
                    <code className="text-sm font-mono">{endpoint.path}</code>
                    <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{endpoint.rateLimit}</p>
                    <p className="text-xs text-muted-foreground">Rate limit</p>
                  </div>
                  <Badge variant={getStatusColor(endpoint.status)}>
                    {endpoint.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rate Limiting</CardTitle>
            <CardDescription>Configure API rate limits and quotas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Global Rate Limit</h4>
                <div className="flex items-center gap-2">
                  <Input type="number" value={globalRateLimit} onChange={(e) => setGlobalRateLimit(e.target.value)} className="w-24" />
                  <span className="text-sm text-muted-foreground">requests per hour</span>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Burst Limit</h4>
                <div className="flex items-center gap-2">
                  <Input type="number" value={burstLimit} onChange={(e) => setBurstLimit(e.target.value)} className="w-24" />
                  <span className="text-sm text-muted-foreground">requests per minute</span>
                </div>
              </div>
              <Button className="w-full" onClick={handleUpdateRateLimits}>Update Rate Limits</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Security</CardTitle>
            <CardDescription>Configure API security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">CORS Settings</h4>
                <Input placeholder="https://yourdomain.com" className="mb-2" value={corsSettings} onChange={(e) => setCorsSettings(e.target.value)} />
                <p className="text-xs text-muted-foreground">Allowed origins (comma-separated)</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">API Versioning</h4>
                <select className="w-full p-2 border rounded" value={apiVersion} onChange={(e) => setApiVersion(e.target.value)}>
                  <option value="v1">v1 (Current)</option>
                  <option value="v2">v2 (Beta)</option>
                </select>
              </div>
              <Button className="w-full" onClick={handleUpdateSecuritySettings}>Update Security Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SysAdminAPIPage;
