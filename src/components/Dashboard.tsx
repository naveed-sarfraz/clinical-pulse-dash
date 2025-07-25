import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Search, MessageCircle, TrendingUp, Users, Calendar, MapPin, Building2, Pill, Clock, AlertCircle, Bell, Activity, Target, Zap, Filter, BarChart3, PieChart, Map, Users2, Lightbulb, FileSearch, TrendingDown, CheckCircle, XCircle, AlertTriangle, Globe, Building, Sparkles, Brain, Sliders } from "lucide-react";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchFilters, setSearchFilters] = useState({
    phase: "all",
    status: "all",
    sponsor: "all",
    condition: "all",
    country: "all",
    year: "all"
  });
  const [parsedQuery, setParsedQuery] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
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

  // Mock trial data for search results
  const mockTrials = [
    { 
      id: 'NCT05234567', 
      title: 'Phase II Trial of Gene Therapy for Glioblastoma', 
      phase: 'Phase II', 
      status: 'Recruiting', 
      sponsor: 'Memorial Sloan Kettering', 
      condition: 'Glioblastoma', 
      intervention: 'Gene Therapy',
      country: 'United States',
      startDate: '2022-03-15',
      estimatedCompletion: '2025-12-31',
      enrollmentTarget: 120,
      currentEnrollment: 67
    },
    { 
      id: 'NCT05234568', 
      title: 'CAR-T Cell Therapy for Recurrent Brain Tumors', 
      phase: 'Phase I/II', 
      status: 'Active, not recruiting', 
      sponsor: 'Duke University', 
      condition: 'Glioblastoma', 
      intervention: 'CAR-T Cell Therapy',
      country: 'United States',
      startDate: '2021-08-20',
      estimatedCompletion: '2024-06-30',
      enrollmentTarget: 30,
      currentEnrollment: 28
    },
    { 
      id: 'NCT05234569', 
      title: 'Immunotherapy Combined with Radiation for GBM', 
      phase: 'Phase III', 
      status: 'Recruiting', 
      sponsor: 'Bristol-Myers Squibb', 
      condition: 'Glioblastoma', 
      intervention: 'Immunotherapy',
      country: 'United States',
      startDate: '2023-01-10',
      estimatedCompletion: '2026-08-15',
      enrollmentTarget: 300,
      currentEnrollment: 145
    }
  ];

  // Natural language processing function
  const parseNaturalLanguageQuery = (queryText: string) => {
    const lowerQuery = queryText.toLowerCase();
    const parsed = {
      phase: null as string | null,
      condition: null as string | null,
      intervention: null as string | null,
      country: null as string | null,
      yearAfter: null as number | null,
      status: null as string | null
    };

    // Extract phase
    if (lowerQuery.includes('phase i') && !lowerQuery.includes('phase ii') && !lowerQuery.includes('phase iii')) {
      parsed.phase = 'Phase I';
    } else if (lowerQuery.includes('phase ii')) {
      parsed.phase = 'Phase II';
    } else if (lowerQuery.includes('phase iii')) {
      parsed.phase = 'Phase III';
    } else if (lowerQuery.includes('phase iv')) {
      parsed.phase = 'Phase IV';
    }

    // Extract condition
    if (lowerQuery.includes('glioblastoma') || lowerQuery.includes('gbm')) {
      parsed.condition = 'Glioblastoma';
    } else if (lowerQuery.includes('lung cancer')) {
      parsed.condition = 'Lung Cancer';
    } else if (lowerQuery.includes('breast cancer')) {
      parsed.condition = 'Breast Cancer';
    }

    // Extract intervention
    if (lowerQuery.includes('gene therapy')) {
      parsed.intervention = 'Gene Therapy';
    } else if (lowerQuery.includes('immunotherapy')) {
      parsed.intervention = 'Immunotherapy';
    } else if (lowerQuery.includes('car-t')) {
      parsed.intervention = 'CAR-T Cell Therapy';
    }

    // Extract country
    if (lowerQuery.includes('u.s.') || lowerQuery.includes('united states') || lowerQuery.includes('usa')) {
      parsed.country = 'United States';
    } else if (lowerQuery.includes('china')) {
      parsed.country = 'China';
    } else if (lowerQuery.includes('germany')) {
      parsed.country = 'Germany';
    }

    // Extract year
    const yearMatch = lowerQuery.match(/after (\d{4})/);
    if (yearMatch) {
      parsed.yearAfter = parseInt(yearMatch[1]);
    }

    // Extract status
    if (lowerQuery.includes('recruiting')) {
      parsed.status = 'Recruiting';
    } else if (lowerQuery.includes('completed')) {
      parsed.status = 'Completed';
    }

    return parsed;
  };

  // Filter trials based on parsed query
  const filterTrials = (trials: any[], parsedQuery: any) => {
    return trials.filter(trial => {
      if (parsedQuery.phase && trial.phase !== parsedQuery.phase) return false;
      if (parsedQuery.condition && trial.condition !== parsedQuery.condition) return false;
      if (parsedQuery.intervention && trial.intervention !== parsedQuery.intervention) return false;
      if (parsedQuery.country && trial.country !== parsedQuery.country) return false;
      if (parsedQuery.status && trial.status !== parsedQuery.status) return false;
      if (parsedQuery.yearAfter) {
        const trialYear = new Date(trial.startDate).getFullYear();
        if (trialYear <= parsedQuery.yearAfter) return false;
      }
      return true;
    });
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Parse the natural language query
    const parsed = parseNaturalLanguageQuery(query);
    setParsedQuery(parsed);

    // Filter trials based on parsed query
    const filtered = filterTrials(mockTrials, parsed);
    setSearchResults(filtered);

    // Generate response based on results
    let response = "";
    if (filtered.length === 0) {
      response = "No trials found matching your criteria. Try adjusting your search terms.";
    } else {
      response = `Found ${filtered.length} trial${filtered.length > 1 ? 's' : ''} matching your criteria:`;
      if (parsed.phase) response += ` ${parsed.phase}`;
      if (parsed.condition) response += ` for ${parsed.condition}`;
      if (parsed.intervention) response += ` using ${parsed.intervention}`;
      if (parsed.country) response += ` in ${parsed.country}`;
      if (parsed.yearAfter) response += ` started after ${parsed.yearAfter}`;
    }

    setChatMessages(prev => [...prev, 
      { type: "user", content: query },
      { type: "assistant", content: response }
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

        {/* Intelligent Search Interface */}
        <Card className="border-0 shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Intelligent Search
              <Sparkles className="h-4 w-4 text-accent" />
            </CardTitle>
            <CardDescription>
              Natural language search for clinical trials. Ask questions like a conversation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Natural Language Search */}
            <form onSubmit={handleQuerySubmit} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Show Phase II trials for glioblastoma using gene therapy started after 2020 in the U.S."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="absolute right-2 top-2"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Search
                </Button>
              </div>
            </form>

            {/* Advanced Filters */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Select value={searchFilters.phase} onValueChange={(value) => setSearchFilters(prev => ({...prev, phase: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Phases</SelectItem>
                  <SelectItem value="phase1">Phase I</SelectItem>
                  <SelectItem value="phase2">Phase II</SelectItem>
                  <SelectItem value="phase3">Phase III</SelectItem>
                  <SelectItem value="phase4">Phase IV</SelectItem>
                </SelectContent>
              </Select>

              <Select value={searchFilters.status} onValueChange={(value) => setSearchFilters(prev => ({...prev, status: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="recruiting">Recruiting</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>

              <Select value={searchFilters.sponsor} onValueChange={(value) => setSearchFilters(prev => ({...prev, sponsor: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sponsor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sponsors</SelectItem>
                  <SelectItem value="industry">Industry</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>

              <Select value={searchFilters.condition} onValueChange={(value) => setSearchFilters(prev => ({...prev, condition: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="immunology">Immunology</SelectItem>
                </SelectContent>
              </Select>

              <Select value={searchFilters.country} onValueChange={(value) => setSearchFilters(prev => ({...prev, country: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>

              <Select value={searchFilters.year} onValueChange={(value) => setSearchFilters(prev => ({...prev, year: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Search Examples */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">Quick Examples:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Phase II oncology trials in the US",
                  "Gene therapy trials for brain cancer",
                  "Recruiting immunotherapy studies",
                  "Pfizer sponsored trials after 2022"
                ].map((example) => (
                  <Badge 
                    key={example}
                    variant="outline" 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setQuery(example)}
                  >
                    {example}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Parsed Query Display */}
            {parsedQuery && (
              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <div className="text-sm font-medium flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Parsed Search Criteria:
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(parsedQuery).map(([key, value]) => (
                    value && (
                      <Badge key={key} variant="secondary" className="text-xs">
                        {key}: {String(value)}
                      </Badge>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-4">
                <div className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Found {searchResults.length} matching trials:
                </div>
                <div className="space-y-3">
                  {searchResults.map((trial) => (
                    <Card key={trial.id} className="border border-muted">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{trial.title}</h4>
                            <p className="text-xs text-muted-foreground">{trial.id}</p>
                          </div>
                          <Badge variant={trial.status === 'Recruiting' ? 'default' : 'secondary'}>
                            {trial.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          <div>
                            <span className="text-muted-foreground">Phase:</span>
                            <p className="font-medium">{trial.phase}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Sponsor:</span>
                            <p className="font-medium">{trial.sponsor}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Condition:</span>
                            <p className="font-medium">{trial.condition}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Enrollment:</span>
                            <p className="font-medium">{trial.currentEnrollment}/{trial.enrollmentTarget}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
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
            {/* KOL Network Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users2 className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">Active KOLs</p>
                  </div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-xs text-muted-foreground">+15% vs last year</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-accent" />
                    <p className="text-sm font-medium text-muted-foreground">Avg Trials/KOL</p>
                  </div>
                  <p className="text-2xl font-bold">3.2</p>
                  <p className="text-xs text-muted-foreground">-5% vs last year</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <p className="text-sm font-medium text-muted-foreground">Network Success</p>
                  </div>
                  <p className="text-2xl font-bold">74%</p>
                  <p className="text-xs text-muted-foreground">+8% vs last year</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-info" />
                    <p className="text-sm font-medium text-muted-foreground">Global Reach</p>
                  </div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs text-muted-foreground">countries</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top KOLs Performance */}
              <Card className="border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users2 className="h-5 w-5" />
                    Top Performing Investigators
                  </CardTitle>
                  <CardDescription>Ranked by trial volume and success rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {kolData.map((kol, index) => (
                      <div key={kol.name} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{kol.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                #{index + 1}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{kol.institution}</p>
                            <p className="text-xs text-muted-foreground">{kol.specialty}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="bg-accent/10 text-accent mb-1">
                              {kol.successRate}% success
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div className="text-center p-2 bg-background/50 rounded">
                            <p className="font-medium text-primary">{kol.trials}</p>
                            <p className="text-muted-foreground">Trials</p>
                          </div>
                          <div className="text-center p-2 bg-background/50 rounded">
                            <p className="font-medium text-primary">{Math.floor(kol.trials * 0.6)}</p>
                            <p className="text-muted-foreground">Completed</p>
                          </div>
                          <div className="text-center p-2 bg-background/50 rounded">
                            <p className="font-medium text-primary">{Math.floor(kol.trials * 0.3)}</p>
                            <p className="text-muted-foreground">Publications</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-muted">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">Network Influence</span>
                            <span className="font-medium">{85 - index * 5}/100</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full" 
                              style={{ width: `${85 - index * 5}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* KOL Network Analysis */}
              <Card className="border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Network Analysis & Collaborations</CardTitle>
                  <CardDescription>Investigator partnerships and institutional networks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Top Collaborations */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Key Collaborations
                    </h4>
                    <div className="space-y-3">
                      {[
                        { pair: "Dr. Sarah Chen ↔ Dr. Michael Rodriguez", trials: 12, success: "89%" },
                        { pair: "Dr. Emily Watson ↔ Dr. James Park", trials: 8, success: "92%" },
                        { pair: "Dr. David Liu ↔ Dr. Maria Santos", trials: 6, success: "83%" }
                      ].map((collab, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{collab.pair}</p>
                            <p className="text-xs text-muted-foreground">{collab.trials} joint trials</p>
                          </div>
                          <Badge variant="outline">{collab.success} success</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Institutional Networks */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Leading Institutions
                    </h4>
                    <div className="space-y-2">
                      {[
                        { name: "Mayo Clinic", kols: 23, trials: 156, specialty: "Oncology" },
                        { name: "Johns Hopkins", kols: 19, trials: 134, specialty: "Cardiology" },
                        { name: "Stanford Medicine", kols: 16, trials: 98, specialty: "Neurology" },
                        { name: "Mass General Brigham", kols: 14, trials: 87, specialty: "Immunology" }
                      ].map((inst, index) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-sm">{inst.name}</p>
                              <p className="text-xs text-muted-foreground">{inst.specialty} Focus</p>
                            </div>
                            <Badge variant="secondary" className="text-xs">{inst.kols} KOLs</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Active Trials: </span>
                              <span className="font-medium">{inst.trials}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Avg Success: </span>
                              <span className="font-medium">{78 + index}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* KOL Activity Trends */}
            <Card className="border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>KOL Activity Trends & Pipeline</CardTitle>
                <CardDescription>Investigator engagement and upcoming trial commitments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Activity Timeline */}
                  <div>
                    <h4 className="font-medium mb-4">Trial Initiation Timeline</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={[
                        { month: 'Jan', kols: 45, trials: 67 },
                        { month: 'Feb', kols: 52, trials: 78 },
                        { month: 'Mar', kols: 48, trials: 71 },
                        { month: 'Apr', kols: 56, trials: 84 },
                        { month: 'May', kols: 62, trials: 92 },
                        { month: 'Jun', kols: 58, trials: 87 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="kols" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="trials" stroke="hsl(var(--accent))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Emerging KOLs */}
                  <div>
                    <h4 className="font-medium mb-4">Emerging Investigators</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Dr. Alex Thompson", institution: "UCSF", growth: "+340%", trials: 3 },
                        { name: "Dr. Priya Patel", institution: "NYU Langone", growth: "+280%", trials: 4 },
                        { name: "Dr. Hassan Ahmed", institution: "Cleveland Clinic", growth: "+220%", trials: 5 },
                        { name: "Dr. Lisa Chang", institution: "UCLA", growth: "+180%", trials: 3 }
                      ].map((emerging, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{emerging.name}</p>
                            <p className="text-xs text-muted-foreground">{emerging.institution}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              {emerging.growth}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{emerging.trials} trials</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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