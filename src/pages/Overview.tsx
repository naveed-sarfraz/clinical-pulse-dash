import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Calendar, MapPin, Building2, Activity, Globe } from "lucide-react";

const Overview = () => {
  // Mock data for visualizations
  const phaseData = [
    { name: 'Phase I', count: 2450, percentage: 28, successRate: '72%' },
    { name: 'Phase II', count: 3200, percentage: 37, successRate: '45%' },
    { name: 'Phase III', count: 2100, percentage: 24, successRate: '68%' },
    { name: 'Phase IV', count: 950, percentage: 11, successRate: '89%' },
  ];

  const sponsorData = [
    { name: 'Pfizer', trials: 324, type: 'Industry', avgDuration: 18, successRate: 78 },
    { name: 'Novartis', trials: 298, type: 'Industry', avgDuration: 20, successRate: 72 },
    { name: 'NIH', trials: 245, type: 'Government', avgDuration: 24, successRate: 68 },
    { name: 'Mayo Clinic', trials: 189, type: 'Academic', avgDuration: 22, successRate: 74 },
    { name: 'Roche', trials: 167, type: 'Industry', avgDuration: 16, successRate: 81 },
  ];

  const trendData = [
    { year: '2019', trials: 6800, completed: 1240, terminated: 89 },
    { year: '2020', trials: 7200, completed: 1456, terminated: 112 },
    { year: '2021', trials: 8100, completed: 1678, terminated: 134 },
    { year: '2022', trials: 8900, completed: 1890, terminated: 156 },
    { year: '2023', trials: 9400, completed: 2034, terminated: 167 },
    { year: '2024', trials: 10200, completed: 2245, terminated: 189 },
  ];

  const therapeuticAreas = [
    { name: 'Oncology', trials: 3245, growth: '+12%', avgRecruitment: 14, successRate: 67 },
    { name: 'Cardiovascular', trials: 1890, growth: '+8%', avgRecruitment: 18, successRate: 74 },
    { name: 'Neurology', trials: 1567, growth: '+15%', avgRecruitment: 22, successRate: 58 },
    { name: 'Infectious Disease', trials: 1234, growth: '+22%', avgRecruitment: 12, successRate: 82 },
    { name: 'Immunology', trials: 987, growth: '+18%', avgRecruitment: 16, successRate: 71 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive view of global clinical trials data and key metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trials</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">10,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recruiting</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">6,892</div>
            <p className="text-xs text-muted-foreground">67% of active trials</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">89</div>
            <p className="text-xs text-muted-foreground">Active globally</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsors</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">2,456</div>
            <p className="text-xs text-muted-foreground">Industry + Academic</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase Distribution */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Trial Phase Distribution</CardTitle>
            <CardDescription>Current distribution across all phases</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={phaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trial Trends */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Trial Trends Over Time</CardTitle>
            <CardDescription>Growth pattern in clinical trials</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="trials" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
                <Area type="monotone" dataKey="completed" stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Therapeutic Areas */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Top Therapeutic Areas</CardTitle>
          <CardDescription>Leading areas by trial volume and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {therapeuticAreas.map((area, index) => (
              <div key={area.name} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{area.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {area.growth}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {area.trials} active trials • {area.avgRecruitment} months avg recruitment
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary">{area.successRate}%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Sponsors */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Leading Sponsors</CardTitle>
          <CardDescription>Most active trial sponsors by volume and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sponsorData.map((sponsor, index) => (
              <div key={sponsor.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium">{sponsor.name}</div>
                    <div className="text-sm text-muted-foreground">{sponsor.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{sponsor.trials} trials</div>
                  <div className="text-sm text-muted-foreground">{sponsor.successRate}% success</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;