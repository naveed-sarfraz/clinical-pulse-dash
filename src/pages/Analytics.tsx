import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, TrendingDown, Target, Globe, Building } from "lucide-react";

const Analytics = () => {
  const benchmarkData = [
    { indication: 'Lung Cancer', avgRecruitment: 16, successRate: 68, phase2Duration: 18, phase3Duration: 36, trials: 890 },
    { indication: 'Breast Cancer', avgRecruitment: 14, successRate: 74, phase2Duration: 16, phase3Duration: 32, trials: 756 },
    { indication: 'Glioblastoma', avgRecruitment: 28, successRate: 42, phase2Duration: 22, phase3Duration: 48, trials: 234 },
    { indication: 'Diabetes', avgRecruitment: 12, successRate: 78, phase2Duration: 14, phase3Duration: 28, trials: 567 },
    { indication: 'Multiple Sclerosis', avgRecruitment: 20, successRate: 65, phase2Duration: 20, phase3Duration: 40, trials: 345 },
  ];

  const sponsorPerformance = [
    { name: 'Pfizer', trials: 324, successRate: 78, avgDuration: 18, completed: 252, terminated: 24 },
    { name: 'Novartis', trials: 298, successRate: 72, avgDuration: 20, completed: 214, terminated: 31 },
    { name: 'Roche', trials: 267, successRate: 81, avgDuration: 16, completed: 216, terminated: 18 },
    { name: 'Bristol-Myers Squibb', trials: 245, successRate: 69, avgDuration: 22, completed: 169, terminated: 28 },
    { name: 'Johnson & Johnson', trials: 234, successRate: 76, avgDuration: 19, completed: 178, terminated: 21 },
  ];

  const geographicMetrics = [
    { country: 'United States', trials: 4250, sites: 1240, completionRate: 72, avgEnrollment: 156 },
    { country: 'China', trials: 1890, sites: 456, completionRate: 68, avgEnrollment: 134 },
    { country: 'Germany', trials: 1456, sites: 234, completionRate: 78, avgEnrollment: 98 },
    { country: 'United Kingdom', trials: 1234, sites: 189, completionRate: 74, avgEnrollment: 112 },
    { country: 'France', trials: 1098, sites: 167, completionRate: 76, avgEnrollment: 87 },
  ];

  const phaseSuccessData = [
    { phase: 'Phase I', successRate: 72, trials: 2450 },
    { phase: 'Phase II', successRate: 45, trials: 3200 },
    { phase: 'Phase III', successRate: 68, trials: 2100 },
    { phase: 'Phase IV', successRate: 89, trials: 950 },
  ];

  const timelineData = [
    { year: '2019', avgPhase1: 14, avgPhase2: 18, avgPhase3: 36, totalTrials: 6800 },
    { year: '2020', avgPhase1: 13, avgPhase2: 17, avgPhase3: 34, totalTrials: 7200 },
    { year: '2021', avgPhase1: 12, avgPhase2: 16, avgPhase3: 32, totalTrials: 8100 },
    { year: '2022', avgPhase1: 11, avgPhase2: 15, avgPhase3: 30, totalTrials: 8900 },
    { year: '2023', avgPhase1: 10, avgPhase2: 14, avgPhase3: 28, totalTrials: 9400 },
    { year: '2024', avgPhase1: 9, avgPhase2: 13, avgPhase3: 26, totalTrials: 10200 },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Analytics & Benchmarking
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive insights on trial timelines, outcomes, and comparative performance
        </p>
      </div>

      <Tabs defaultValue="benchmarks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="benchmarks" className="space-y-6">
          {/* Indication Benchmarks */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Indication Benchmarks
              </CardTitle>
              <CardDescription>Average recruitment and success rates by therapeutic area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benchmarkData.map((item, index) => (
                  <div key={item.indication} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{item.indication}</h3>
                        <p className="text-sm text-muted-foreground">{item.trials} active trials</p>
                      </div>
                      <Badge variant={item.successRate > 70 ? "default" : item.successRate > 50 ? "secondary" : "outline"}>
                        {item.successRate}% Success
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Avg Recruitment:</span>
                        <p className="font-medium">{item.avgRecruitment} months</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phase II Duration:</span>
                        <p className="font-medium">{item.phase2Duration} months</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phase III Duration:</span>
                        <p className="font-medium">{item.phase3Duration} months</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Phase Success Rates */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Success Rates by Phase</CardTitle>
              <CardDescription>Historical completion rates across trial phases</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={phaseSuccessData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="phase" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="successRate" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sponsors" className="space-y-6">
          {/* Sponsor Performance */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Sponsor Performance Analysis
              </CardTitle>
              <CardDescription>Comparative performance metrics across major sponsors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sponsorPerformance.map((sponsor, index) => (
                  <div key={sponsor.name} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{sponsor.name}</h3>
                          <p className="text-sm text-muted-foreground">{sponsor.trials} total trials</p>
                        </div>
                      </div>
                      <Badge variant={sponsor.successRate > 75 ? "default" : "secondary"}>
                        {sponsor.successRate}% Success
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Avg Duration:</span>
                        <p className="font-medium">{sponsor.avgDuration} months</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completed:</span>
                        <p className="font-medium text-green-600">{sponsor.completed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Terminated:</span>
                        <p className="font-medium text-red-600">{sponsor.terminated}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          {/* Geographic Analysis */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Geographic Performance
              </CardTitle>
              <CardDescription>Trial metrics by country and region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicMetrics.map((country, index) => (
                  <div key={country.country} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{country.country}</h3>
                        <p className="text-sm text-muted-foreground">{country.trials} trials • {country.sites} sites</p>
                      </div>
                      <Badge variant={country.completionRate > 75 ? "default" : "secondary"}>
                        {country.completionRate}% Completion
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Avg Enrollment:</span>
                        <p className="font-medium">{country.avgEnrollment} patients</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sites per Trial:</span>
                        <p className="font-medium">{Math.round(country.sites / country.trials * 100) / 100}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Timeline Trends */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Timeline Optimization Trends
              </CardTitle>
              <CardDescription>How trial durations have evolved over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgPhase1" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Phase I" />
                  <Line type="monotone" dataKey="avgPhase2" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Phase II" />
                  <Line type="monotone" dataKey="avgPhase3" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Phase III" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <TrendingDown className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">-28%</div>
                <p className="text-sm text-muted-foreground">Avg Phase III duration reduction since 2019</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">+45%</div>
                <p className="text-sm text-muted-foreground">Increase in total active trials</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-accent">73%</div>
                <p className="text-sm text-muted-foreground">Overall industry success rate</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;