import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Calendar, MapPin, Building2, Activity, Globe } from "lucide-react";

const Overview = () => {
  // Gene therapy pipeline data
  const phaseData = [
    { name: 'Late Preclinical', count: 1247, percentage: 42, successRate: '68%' },
    { name: 'Phase I', count: 986, percentage: 33, successRate: '74%' },
    { name: 'Phase II', count: 524, percentage: 18, successRate: '52%' },
    { name: 'Phase III', count: 203, percentage: 7, successRate: '71%' },
  ];

  const biotechSponsors = [
    { name: 'Intellia Therapeutics', trials: 12, type: 'Public Biotech', partnershipStatus: 'Unpartnered', clinicalEntry: '3 months', location: 'Boston' },
    { name: 'Prime Medicine', trials: 8, type: 'Private Biotech', partnershipStatus: 'Partnership Discussions', clinicalEntry: '6 months', location: 'Boston' },
    { name: 'Solid Biosciences', trials: 6, type: 'Public Biotech', partnershipStatus: 'Seeking Alliance', clinicalEntry: '8 months', location: 'Boston' },
    { name: 'Decibel Therapeutics', trials: 4, type: 'Private Biotech', partnershipStatus: 'Unpartnered', clinicalEntry: '18 months', location: 'Boston' },
    { name: 'Encoded Therapeutics', trials: 3, type: 'Private Biotech', partnershipStatus: 'Series B Stage', clinicalEntry: '12 months', location: 'San Francisco' },
  ];

  const trendData = [
    { year: '2019', trials: 6800, completed: 1240, terminated: 89 },
    { year: '2020', trials: 7200, completed: 1456, terminated: 112 },
    { year: '2021', trials: 8100, completed: 1678, terminated: 134 },
    { year: '2022', trials: 8900, completed: 1890, terminated: 156 },
    { year: '2023', trials: 9400, completed: 2034, terminated: 167 },
    { year: '2024', trials: 10200, completed: 2245, terminated: 189 },
  ];

  const geneTherapyAreas = [
    { name: 'Rare Diseases', trials: 892, growth: '+24%', partnershipOpps: 156, successRate: 71, avgTimeToClinic: '14 months' },
    { name: 'Oncology (CAR-T/TCR)', trials: 634, growth: '+18%', partnershipOpps: 98, successRate: 67, avgTimeToClinic: '16 months' },
    { name: 'Neuromuscular Disorders', trials: 445, growth: '+31%', partnershipOpps: 89, successRate: 58, avgTimeToClinic: '18 months' },
    { name: 'Ophthalmology', trials: 287, growth: '+15%', partnershipOpps: 67, successRate: 74, avgTimeToClinic: '12 months' },
    { name: 'Blood Disorders', trials: 203, growth: '+28%', partnershipOpps: 45, successRate: 69, avgTimeToClinic: '15 months' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Gene Therapy Pipeline Intelligence
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time insights on emerging biotech innovators in Boston, San Francisco, San Diego, and Shanghai
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Preclinical Programs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">+18% from last quarter</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpartnered Companies</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">456</div>
            <p className="text-xs text-muted-foreground">Partnership opportunities</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Innovation Hubs</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">4</div>
            <p className="text-xs text-muted-foreground">Primary focus regions</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Near-Term Catalysts</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">89</div>
            <p className="text-xs text-muted-foreground">Next 12 months</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase Distribution */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Development Stage Distribution</CardTitle>
            <CardDescription>Gene therapy programs by development phase</CardDescription>
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
            <CardTitle>Gene Therapy Therapeutic Areas</CardTitle>
            <CardDescription>Top areas by program count and partnership opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geneTherapyAreas.map((area, index) => (
                <div key={area.name} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{area.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {area.growth}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {area.trials} programs • {area.partnershipOpps} partnership opportunities
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">{area.successRate}%</div>
                    <div className="text-xs text-muted-foreground">Avg {area.avgTimeToClinic} to clinic</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      {/* Top Sponsors */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Emerging Biotech Companies</CardTitle>
            <CardDescription>Key targets in innovation hubs with upcoming catalysts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {biotechSponsors.map((company, index) => (
                <div key={company.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-muted-foreground">{company.type} • {company.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{company.trials} programs</div>
                    <div className="text-sm text-muted-foreground">{company.clinicalEntry} to clinic</div>
                    <Badge variant={company.partnershipStatus.includes('Unpartnered') ? "default" : "secondary"} className="text-xs mt-1">
                      {company.partnershipStatus}
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

export default Overview;