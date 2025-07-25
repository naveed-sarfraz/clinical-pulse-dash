import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Search, MessageCircle, TrendingUp, Users, Calendar, MapPin, Building2, Pill, Clock, AlertCircle, Bell, Activity, Target, Zap, Filter, BarChart3, PieChart, Map, Users2, Lightbulb, FileSearch, TrendingDown, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [chatMessages, setChatMessages] = useState([
    { type: "assistant", content: "Welcome to the Advanced Clinical Trials Dashboard! I can help you analyze trial data, monitor status changes, and provide benchmarking insights. Try asking: 'Show me Phase II trials for glioblastoma using gene therapy started after 2020 in the U.S.' or 'What are the recruitment success rates by sponsor type?'" }
  ]);

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

  const geographicData = [
    { country: 'United States', trials: 4250, sites: 1240 },
    { country: 'China', trials: 1890, sites: 456 },
    { country: 'Germany', trials: 1456, sites: 234 },
    { country: 'United Kingdom', trials: 1234, sites: 189 },
    { country: 'France', trials: 1098, sites: 167 },
    { country: 'Canada', trials: 987, sites: 145 },
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

  // New data for advanced features
  const statusAlerts = [
    { id: 1, trial: 'NCT05234567', status: 'Terminated', change: 'Recruiting → Terminated', reason: 'Safety concerns', time: '2 hours ago', severity: 'high' },
    { id: 2, trial: 'NCT05234568', status: 'Completed', change: 'Active → Completed', reason: 'Enrollment complete', time: '5 hours ago', severity: 'low' },
    { id: 3, trial: 'NCT05234569', status: 'Suspended', change: 'Recruiting → Suspended', reason: 'Regulatory hold', time: '1 day ago', severity: 'medium' },
    { id: 4, trial: 'NCT05234570', status: 'Withdrawn', change: 'Not yet recruiting → Withdrawn', reason: 'Funding issues', time: '2 days ago', severity: 'medium' },
  ];

  const benchmarkData = [
    { indication: 'Lung Cancer', avgRecruitment: 16, successRate: 68, phase2Duration: 18, phase3Duration: 36 },
    { indication: 'Breast Cancer', avgRecruitment: 14, successRate: 74, phase2Duration: 16, phase3Duration: 32 },
    { indication: 'Glioblastoma', avgRecruitment: 28, successRate: 42, phase2Duration: 22, phase3Duration: 48 },
    { indication: 'Diabetes', avgRecruitment: 12, successRate: 78, phase2Duration: 14, phase3Duration: 28 },
  ];

  const kolData = [
    { name: 'Dr. Sarah Chen', institution: 'Memorial Sloan Kettering', trials: 45, specialty: 'Oncology', successRate: 82 },
    { name: 'Dr. Michael Rodriguez', institution: 'Mayo Clinic', trials: 38, specialty: 'Cardiology', successRate: 76 },
    { name: 'Dr. Jennifer Wong', institution: 'Johns Hopkins', trials: 34, specialty: 'Neurology', successRate: 68 },
    { name: 'Dr. David Kim', institution: 'Stanford', trials: 29, specialty: 'Immunology', successRate: 89 },
  ];

  const feasibilityMetrics = [
    { factor: 'Patient Population', score: 85, impact: 'High' },
    { factor: 'Site Availability', score: 72, impact: 'Medium' },
    { factor: 'Regulatory Climate', score: 91, impact: 'High' },
    { factor: 'Competitive Landscape', score: 64, impact: 'Medium' },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setChatMessages(prev => [...prev, 
      { type: "user", content: query },
      { type: "assistant", content: `Based on current data: ${query.toLowerCase().includes('oncology') ? 'Oncology trials show 3,245 active studies with Phase II leading at 37% distribution.' : query.toLowerCase().includes('sponsor') ? 'Top sponsors include Pfizer (324 trials), Novartis (298 trials), and NIH (245 trials).' : 'I found relevant clinical trial data. The charts above show detailed breakdowns by phase, sponsor, and geographic distribution.'}` }
    ]);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Clinical Trials Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Analyze ClinicalTrials.gov data with conversational AI and interactive visualizations
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Advanced Search Bar */}
        <Card className="border-0 shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-5 w-5" />
              Intelligent Search
            </CardTitle>
            <CardDescription>Natural language search for clinical trials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <div className="flex gap-2">
                <Badge variant={selectedFilter === "all" ? "default" : "secondary"} 
                       className="cursor-pointer" 
                       onClick={() => setSelectedFilter("all")}>
                  All Trials
                </Badge>
                <Badge variant={selectedFilter === "recruiting" ? "default" : "secondary"} 
                       className="cursor-pointer" 
                       onClick={() => setSelectedFilter("recruiting")}>
                  Recruiting
                </Badge>
                <Badge variant={selectedFilter === "oncology" ? "default" : "secondary"} 
                       className="cursor-pointer" 
                       onClick={() => setSelectedFilter("oncology")}>
                  Oncology
                </Badge>
                <Badge variant={selectedFilter === "phase2" ? "default" : "secondary"} 
                       className="cursor-pointer" 
                       onClick={() => setSelectedFilter("phase2")}>
                  Phase II
                </Badge>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Try: "Show Phase II trials for glioblastoma using gene therapy started after 2020 in the U.S."
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Status Monitor</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
            <TabsTrigger value="kol">KOL Network</TabsTrigger>
            <TabsTrigger value="feasibility">Feasibility</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Charts Section */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="phases" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="phases">Trial Phases</TabsTrigger>
                    <TabsTrigger value="sponsors">Top Sponsors</TabsTrigger>
                    <TabsTrigger value="geography">Geography</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                  </TabsList>

                  <TabsContent value="phases" className="space-y-4">
                    <Card className="border-0 shadow-elevated">
                      <CardHeader>
                        <CardTitle>Trial Distribution by Phase</CardTitle>
                        <CardDescription>Current active trials across development phases with success rates</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={phaseData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-4 gap-4 mt-4">
                          {phaseData.map((phase, index) => (
                            <div key={phase.name} className="text-center">
                              <p className="text-sm font-medium">{phase.name}</p>
                              <p className="text-xs text-muted-foreground">Success: {phase.successRate}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="sponsors" className="space-y-4">
                    <Card className="border-0 shadow-elevated">
                      <CardHeader>
                        <CardTitle>Leading Trial Sponsors</CardTitle>
                        <CardDescription>Organizations with performance metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={sponsorData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="trials" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="geography" className="space-y-4">
                    <Card className="border-0 shadow-elevated">
                      <CardHeader>
                        <CardTitle>Global Trial Distribution</CardTitle>
                        <CardDescription>Active trials and sites by country</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={geographicData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                            <XAxis dataKey="country" angle={-45} textAnchor="end" height={60} />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="trials" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="trends" className="space-y-4">
                    <Card className="border-0 shadow-elevated">
                      <CardHeader>
                        <CardTitle>Trial Outcomes Trends</CardTitle>
                        <CardDescription>Completion and termination rates over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="trials" stroke="hsl(var(--chart-1))" strokeWidth={3} name="Total Trials" />
                            <Line type="monotone" dataKey="completed" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Completed" />
                            <Line type="monotone" dataKey="terminated" stroke="hsl(var(--chart-5))" strokeWidth={2} name="Terminated" />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Therapeutic Areas */}
                <Card className="border-0 shadow-elevated">
                  <CardHeader>
                    <CardTitle>Therapeutic Areas Performance</CardTitle>
                    <CardDescription>Active research areas with recruitment and success metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {therapeuticAreas.map((area, index) => (
                        <div key={area.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                            <div>
                              <p className="font-medium">{area.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {area.trials} trials • {area.avgRecruitment}mo avg recruitment • {area.successRate}% success
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            {area.growth}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chat Interface */}
              <div className="space-y-6">
                <Card className="border-0 shadow-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      AI Assistant
                    </CardTitle>
                    <CardDescription>Ask complex questions about trial data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-64 overflow-y-auto space-y-3">
                      {chatMessages.map((message, index) => (
                        <div key={index} className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-primary text-primary-foreground ml-4' : 'bg-muted mr-4'}`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleQuerySubmit} className="flex gap-2">
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask about trials, benchmarks, KOLs..."
                        className="flex-1"
                      />
                      <Button type="submit" className="bg-gradient-to-r from-primary to-primary-glow">
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Enhanced Insights */}
                <Card className="border-0 shadow-elevated">
                  <CardHeader>
                    <CardTitle>Real-time Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                      <Activity className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Live Activity</p>
                        <p className="text-xs text-muted-foreground">234 status updates in last 24h</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                      <Target className="h-4 w-4 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Recruitment Alert</p>
                        <p className="text-xs text-muted-foreground">15 trials below target enrollment</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-chart-4/5">
                      <Lightbulb className="h-4 w-4 text-chart-4 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Opportunity</p>
                        <p className="text-xs text-muted-foreground">Gene therapy gaps in pediatric oncology</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Status Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Status Change Alerts
                  </CardTitle>
                  <CardDescription>Real-time trial status monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {statusAlerts.map((alert) => (
                      <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                        alert.severity === 'high' ? 'border-l-destructive bg-destructive/5' :
                        alert.severity === 'medium' ? 'border-l-chart-4 bg-chart-4/5' :
                        'border-l-accent bg-accent/5'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {alert.severity === 'high' ? <XCircle className="h-4 w-4 text-destructive" /> :
                             alert.severity === 'medium' ? <AlertTriangle className="h-4 w-4 text-chart-4" /> :
                             <CheckCircle className="h-4 w-4 text-accent" />}
                            <div>
                              <p className="font-medium text-sm">{alert.trial}</p>
                              <p className="text-xs text-muted-foreground">{alert.change}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {alert.time}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{alert.reason}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activity Heatmap
                  </CardTitle>
                  <CardDescription>Trial activity by therapeutic area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {therapeuticAreas.map((area, index) => (
                      <div key={area.name} className={`p-3 rounded text-center text-xs ${
                        area.successRate > 75 ? 'bg-accent text-accent-foreground' :
                        area.successRate > 60 ? 'bg-primary/20 text-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        <p className="font-medium">{area.name}</p>
                        <p>{area.successRate}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Sponsor Performance Analytics</CardTitle>
                  <CardDescription>Success rates and duration metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sponsorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="successRate" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Trial Duration Analysis</CardTitle>
                  <CardDescription>Average duration by sponsor type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sponsorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgDuration" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Benchmarks Tab */}
          <TabsContent value="benchmarks" className="space-y-6 mt-6">
            <Card className="border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Indication Benchmarking</CardTitle>
                <CardDescription>Comparative metrics across disease areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benchmarkData.map((item, index) => (
                    <div key={item.indication} className="p-4 rounded-lg bg-muted/50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{item.indication}</h4>
                        <Badge variant="outline">{item.successRate}% success</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Avg Recruitment</p>
                          <p className="font-medium">{item.avgRecruitment} months</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phase II Duration</p>
                          <p className="font-medium">{item.phase2Duration} months</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phase III Duration</p>
                          <p className="font-medium">{item.phase3Duration} months</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KOL Network Tab */}
          <TabsContent value="kol" className="space-y-6 mt-6">
            <Card className="border-0 shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users2 className="h-5 w-5" />
                  Key Opinion Leaders Network
                </CardTitle>
                <CardDescription>Top investigators and their trial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kolData.map((kol, index) => (
                    <div key={kol.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-medium">{kol.name}</h4>
                        <p className="text-sm text-muted-foreground">{kol.institution} • {kol.specialty}</p>
                        <p className="text-xs text-muted-foreground">{kol.trials} trials conducted</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-accent/10 text-accent">
                          {kol.successRate}% success
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feasibility Tab */}
          <TabsContent value="feasibility" className="space-y-6 mt-6">
            <Card className="border-0 shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Trial Feasibility Assessment
                </CardTitle>
                <CardDescription>Key factors for trial success prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feasibilityMetrics.map((metric, index) => (
                    <div key={metric.factor} className="p-4 rounded-lg bg-muted/50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{metric.factor}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant={metric.impact === 'High' ? 'default' : 'secondary'}>
                            {metric.impact} Impact
                          </Badge>
                          <span className="text-lg font-bold">{metric.score}/100</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" 
                          style={{ width: `${metric.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;