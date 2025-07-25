import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users2, Award, TrendingUp, Building, MapPin, Star, Network, BookOpen } from "lucide-react";

const KOLNetwork = () => {
  const topKOLs = [
    { 
      name: 'Dr. Sarah Chen', 
      institution: 'Memorial Sloan Kettering', 
      trials: 45, 
      specialty: 'Oncology', 
      successRate: 82,
      h_index: 76,
      publications: 234,
      networkScore: 95,
      collaborations: 28,
      countries: ['US', 'CA', 'UK'],
      recentGrants: '$12.5M'
    },
    { 
      name: 'Dr. Michael Rodriguez', 
      institution: 'Mayo Clinic', 
      trials: 38, 
      specialty: 'Cardiology', 
      successRate: 76,
      h_index: 62,
      publications: 189,
      networkScore: 88,
      collaborations: 24,
      countries: ['US', 'DE', 'FR'],
      recentGrants: '$8.2M'
    },
    { 
      name: 'Dr. Jennifer Wong', 
      institution: 'Johns Hopkins', 
      trials: 34, 
      specialty: 'Neurology', 
      successRate: 68,
      h_index: 58,
      publications: 156,
      networkScore: 84,
      collaborations: 22,
      countries: ['US', 'JP', 'CH'],
      recentGrants: '$9.8M'
    },
    { 
      name: 'Dr. David Kim', 
      institution: 'Stanford', 
      trials: 29, 
      specialty: 'Immunology', 
      successRate: 89,
      h_index: 71,
      publications: 198,
      networkScore: 91,
      collaborations: 31,
      countries: ['US', 'KR', 'SG'],
      recentGrants: '$15.3M'
    },
    { 
      name: 'Dr. Elena Petrov', 
      institution: 'Harvard Medical School', 
      trials: 27, 
      specialty: 'Genetics', 
      successRate: 85,
      h_index: 69,
      publications: 167,
      networkScore: 89,
      collaborations: 26,
      countries: ['US', 'RU', 'FI'],
      recentGrants: '$11.7M'
    }
  ];

  const institutionRankings = [
    { name: 'Memorial Sloan Kettering', investigators: 89, trials: 234, successRate: 78, avgH_index: 45 },
    { name: 'Mayo Clinic', investigators: 76, trials: 198, successRate: 74, avgH_index: 42 },
    { name: 'Johns Hopkins', investigators: 82, trials: 189, successRate: 71, avgH_index: 48 },
    { name: 'Stanford University', investigators: 54, trials: 167, successRate: 83, avgH_index: 52 },
    { name: 'Harvard Medical School', investigators: 67, trials: 145, successRate: 79, avgH_index: 49 },
  ];

  const collaborationData = [
    { source: 'Memorial Sloan Kettering', target: 'Mayo Clinic', trials: 12, strength: 'strong' },
    { source: 'Johns Hopkins', target: 'Stanford', trials: 8, strength: 'medium' },
    { source: 'Harvard', target: 'MIT', trials: 15, strength: 'strong' },
    { source: 'MD Anderson', target: 'Dana-Farber', trials: 6, strength: 'medium' },
  ];

  const emergingInvestigators = [
    { name: 'Dr. Alex Thompson', institution: 'UCSF', trials: 8, growth: '+150%', specialty: 'Gene Therapy' },
    { name: 'Dr. Maria Garcia', institution: 'NIH', trials: 6, growth: '+200%', specialty: 'Immunooncology' },
    { name: 'Dr. James Liu', institution: 'MD Anderson', trials: 9, growth: '+125%', specialty: 'Precision Medicine' },
  ];

  const activityTrends = [
    { year: '2019', publications: 1240, trials: 156, grants: 89 },
    { year: '2020', publications: 1356, trials: 167, grants: 94 },
    { year: '2021', publications: 1478, trials: 189, grants: 103 },
    { year: '2022', publications: 1598, trials: 212, grants: 118 },
    { year: '2023', publications: 1723, trials: 234, grants: 127 },
    { year: '2024', publications: 1845, trials: 256, grants: 138 },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          KOL/PI Network Insights
        </h1>
        <p className="text-muted-foreground mt-2">
          Track top investigators by trial volume, success rates, and network influence
        </p>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active KOLs</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2,456</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Trials per KOL</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">18.3</div>
            <p className="text-xs text-muted-foreground">+2.1 from last year</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Success Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">76.8%</div>
            <p className="text-xs text-muted-foreground">+3.2% improvement</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Reach</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">67</div>
            <p className="text-xs text-muted-foreground">Countries represented</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="top-kols" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="top-kols">Top KOLs</TabsTrigger>
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="collaborations">Network</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="top-kols" className="space-y-6">
          {/* Top Performing KOLs */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Top Performing Investigators
              </CardTitle>
              <CardDescription>Leading investigators by trial volume, success rate, and network influence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topKOLs.map((kol, index) => (
                  <div key={kol.name} className="p-6 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{kol.name}</h3>
                          <p className="text-muted-foreground">{kol.institution}</p>
                          <Badge variant="outline" className="mt-1">{kol.specialty}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{kol.trials}</div>
                        <p className="text-sm text-muted-foreground">Active Trials</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="font-semibold text-green-600">{kol.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">H-Index</p>
                        <p className="font-semibold">{kol.h_index}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Publications</p>
                        <p className="font-semibold">{kol.publications}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Network Score</p>
                        <p className="font-semibold text-primary">{kol.networkScore}/100</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Collaborations:</p>
                        <p className="font-medium">{kol.collaborations} active</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Global Reach:</p>
                        <div className="flex gap-1 mt-1">
                          {kol.countries.map(country => (
                            <Badge key={country} variant="secondary" className="text-xs">{country}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Recent Grants:</p>
                        <p className="font-medium text-green-600">{kol.recentGrants}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emerging Investigators */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Rising Stars
              </CardTitle>
              <CardDescription>Emerging investigators with rapid growth in trial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergingInvestigators.map((investigator, index) => (
                  <div key={investigator.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium">{investigator.name}</h4>
                        <p className="text-sm text-muted-foreground">{investigator.institution} • {investigator.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="default" className="mb-1">{investigator.growth}</Badge>
                      <p className="text-sm text-muted-foreground">{investigator.trials} trials</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="institutions" className="space-y-6">
          {/* Institution Rankings */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Leading Institutions
              </CardTitle>
              <CardDescription>Top institutions by investigator quality and trial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {institutionRankings.map((institution, index) => (
                  <div key={institution.name} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{institution.name}</h3>
                          <p className="text-sm text-muted-foreground">{institution.investigators} investigators</p>
                        </div>
                      </div>
                      <Badge variant={institution.successRate > 75 ? "default" : "secondary"}>
                        {institution.successRate}% Success
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Active Trials:</span>
                        <p className="font-medium">{institution.trials}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg H-Index:</span>
                        <p className="font-medium">{institution.avgH_index}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Trials per PI:</span>
                        <p className="font-medium">{Math.round(institution.trials / institution.investigators * 10) / 10}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-6">
          {/* Collaboration Network */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Key Collaborations
              </CardTitle>
              <CardDescription>Strategic partnerships and multi-institutional trials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collaborationData.map((collab, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="font-medium text-sm">{collab.source}</span>
                        </div>
                        <div className="text-muted-foreground">↔</div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-accent" />
                          <span className="font-medium text-sm">{collab.target}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={collab.strength === 'strong' ? 'default' : 'secondary'}>
                          {collab.trials} trials
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{collab.strength} partnership</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Activity Trends */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                KOL Activity Trends
              </CardTitle>
              <CardDescription>Publications, trials, and grants over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={activityTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="publications" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Publications" />
                  <Line type="monotone" dataKey="trials" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Trials" />
                  <Line type="monotone" dataKey="grants" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Grants" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KOLNetwork;