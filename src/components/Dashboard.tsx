import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Search, MessageCircle, TrendingUp, Users, Calendar, MapPin, Building2, Pill, Clock, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "assistant", content: "Welcome to the Clinical Trials Dashboard! I can help you analyze trial data. Try asking: 'Show me oncology trials by phase' or 'What are the top sponsors in cardiovascular research?'" }
  ]);

  // Mock data for visualizations
  const phaseData = [
    { name: 'Phase I', count: 2450, percentage: 28 },
    { name: 'Phase II', count: 3200, percentage: 37 },
    { name: 'Phase III', count: 2100, percentage: 24 },
    { name: 'Phase IV', count: 950, percentage: 11 },
  ];

  const sponsorData = [
    { name: 'Pfizer', trials: 324, type: 'Industry' },
    { name: 'Novartis', trials: 298, type: 'Industry' },
    { name: 'NIH', trials: 245, type: 'Government' },
    { name: 'Mayo Clinic', trials: 189, type: 'Academic' },
    { name: 'Roche', trials: 167, type: 'Industry' },
  ];

  const geographicData = [
    { country: 'United States', trials: 4250 },
    { country: 'China', trials: 1890 },
    { country: 'Germany', trials: 1456 },
    { country: 'United Kingdom', trials: 1234 },
    { country: 'France', trials: 1098 },
    { country: 'Canada', trials: 987 },
  ];

  const trendData = [
    { year: '2019', trials: 6800 },
    { year: '2020', trials: 7200 },
    { year: '2021', trials: 8100 },
    { year: '2022', trials: 8900 },
    { year: '2023', trials: 9400 },
    { year: '2024', trials: 10200 },
  ];

  const therapeuticAreas = [
    { name: 'Oncology', trials: 3245, growth: '+12%' },
    { name: 'Cardiovascular', trials: 1890, growth: '+8%' },
    { name: 'Neurology', trials: 1567, growth: '+15%' },
    { name: 'Infectious Disease', trials: 1234, growth: '+22%' },
    { name: 'Immunology', trials: 987, growth: '+18%' },
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

        {/* Main Content */}
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
                    <CardDescription>Current active trials across development phases</CardDescription>
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sponsors" className="space-y-4">
                <Card className="border-0 shadow-elevated">
                  <CardHeader>
                    <CardTitle>Leading Trial Sponsors</CardTitle>
                    <CardDescription>Organizations conducting the most clinical trials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={sponsorData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip />
                        <Bar dataKey="trials" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="geography" className="space-y-4">
                <Card className="border-0 shadow-elevated">
                  <CardHeader>
                    <CardTitle>Global Trial Distribution</CardTitle>
                    <CardDescription>Number of active trials by country</CardDescription>
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
                    <CardTitle>Trial Growth Trends</CardTitle>
                    <CardDescription>Annual growth in clinical trial activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="trials" stroke="hsl(var(--chart-2))" strokeWidth={3} dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Therapeutic Areas */}
            <Card className="border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Top Therapeutic Areas</CardTitle>
                <CardDescription>Most active research areas with growth indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {therapeuticAreas.map((area, index) => (
                    <div key={area.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                        <div>
                          <p className="font-medium">{area.name}</p>
                          <p className="text-sm text-muted-foreground">{area.trials} active trials</p>
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
                <CardDescription>Ask questions about clinical trial data</CardDescription>
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
                    placeholder="Ask about trials, sponsors, phases..."
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-gradient-to-r from-primary to-primary-glow">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card className="border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                  <Pill className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Immunotherapy Growth</p>
                    <p className="text-xs text-muted-foreground">22% increase in immunotherapy trials this year</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                  <Clock className="h-4 w-4 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Recruitment Delays</p>
                    <p className="text-xs text-muted-foreground">Average 3-month delay in Phase III trials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-chart-4/5">
                  <AlertCircle className="h-4 w-4 text-chart-4 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Rare Disease Gap</p>
                    <p className="text-xs text-muted-foreground">Only 5% of trials focus on rare diseases</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;