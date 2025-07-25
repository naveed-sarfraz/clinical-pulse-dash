import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, AlertCircle, CheckCircle, XCircle, AlertTriangle, Clock, Activity, TrendingUp } from "lucide-react";

const StatusMonitor = () => {
  const statusAlerts = [
    { 
      id: 1, 
      trial: 'NCT05234567', 
      title: 'Phase II Glioblastoma Gene Therapy',
      status: 'Terminated', 
      change: 'Recruiting → Terminated', 
      reason: 'Safety concerns identified in interim analysis', 
      time: '2 hours ago', 
      severity: 'high',
      sponsor: 'Memorial Sloan Kettering',
      impact: 'High - 67 patients enrolled'
    },
    { 
      id: 2, 
      trial: 'NCT05234568', 
      title: 'CAR-T Cell Therapy for Brain Tumors',
      status: 'Completed', 
      change: 'Active → Completed', 
      reason: 'Target enrollment reached successfully', 
      time: '5 hours ago', 
      severity: 'low',
      sponsor: 'Duke University',
      impact: 'Low - Normal completion'
    },
    { 
      id: 3, 
      trial: 'NCT05234569', 
      title: 'Immunotherapy + Radiation for GBM',
      status: 'Suspended', 
      change: 'Recruiting → Suspended', 
      reason: 'Regulatory hold pending data review', 
      time: '1 day ago', 
      severity: 'medium',
      sponsor: 'Bristol-Myers Squibb',
      impact: 'Medium - 145 patients affected'
    },
    { 
      id: 4, 
      trial: 'NCT05234570', 
      title: 'Novel Targeted Therapy Study',
      status: 'Withdrawn', 
      change: 'Not yet recruiting → Withdrawn', 
      reason: 'Funding discontinued', 
      time: '2 days ago', 
      severity: 'medium',
      sponsor: 'Biotech Innovations Inc',
      impact: 'Medium - Pre-recruitment withdrawal'
    },
  ];

  const realtimeMetrics = [
    { metric: 'Status Changes Today', value: '23', change: '+15%', icon: Activity },
    { metric: 'Recruiting Trials', value: '6,892', change: '+2.3%', icon: TrendingUp },
    { metric: 'High Priority Alerts', value: '7', change: '-12%', icon: AlertCircle },
    { metric: 'Completion Rate', value: '73.2%', change: '+1.1%', icon: CheckCircle },
  ];

  const monitoringCategories = [
    {
      name: 'Safety Holds',
      count: 12,
      trend: '+3 this week',
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      name: 'Enrollment Complete',
      count: 45,
      trend: '+8 today',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      name: 'Regulatory Updates',
      count: 28,
      trend: '+5 this week',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      name: 'Sponsor Changes',
      count: 8,
      trend: '+2 this month',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'outline';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Trial Status Monitor
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time tracking of trial status changes and critical alerts
        </p>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {realtimeMetrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change} from yesterday</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {/* Status Alerts */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Recent Status Changes
              </CardTitle>
              <CardDescription>
                Critical trial status updates and alerts requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {getSeverityIcon(alert.severity)}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{alert.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {alert.trial}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{alert.sponsor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {alert.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Status Change:</span>
                        <span className="ml-2 font-medium">{alert.change}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reason:</span>
                        <span className="ml-2">{alert.reason}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impact:</span>
                        <span className="ml-2">{alert.impact}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost">
                        Mark as Read
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {/* Monitoring Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monitoringCategories.map((category, index) => (
              <Card key={index} className={`border-0 shadow-card ${category.borderColor}`}>
                <CardContent className={`p-6 ${category.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.trend}</p>
                    </div>
                    <div className={`text-3xl font-bold ${category.color}`}>
                      {category.count}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Activity Stream */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Activity Stream</CardTitle>
              <CardDescription>Live feed of all trial status activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '10:23 AM', action: 'NCT05234571 status changed to Recruiting', type: 'info' },
                  { time: '10:15 AM', action: 'Safety alert resolved for NCT05234572', type: 'success' },
                  { time: '09:45 AM', action: 'New enrollment milestone reached for NCT05234573', type: 'info' },
                  { time: '09:12 AM', action: 'Regulatory hold placed on NCT05234574', type: 'warning' },
                  { time: '08:56 AM', action: 'Trial NCT05234575 completed successfully', type: 'success' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {/* Alert Settings */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>Customize your monitoring preferences and notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Alert Types</h4>
                {[
                  { name: 'Status Changes', description: 'Trial status transitions', enabled: true },
                  { name: 'Safety Events', description: 'Safety holds and concerns', enabled: true },
                  { name: 'Enrollment Milestones', description: 'Recruitment targets and completions', enabled: false },
                  { name: 'Regulatory Updates', description: 'FDA and other regulatory actions', enabled: true },
                  { name: 'Sponsor Changes', description: 'Sponsor or funding modifications', enabled: false },
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{setting.name}</p>
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    </div>
                    <Badge variant={setting.enabled ? "default" : "secondary"}>
                      {setting.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatusMonitor;