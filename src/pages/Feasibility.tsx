import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, AlertTriangle, MapPin, Users, Calendar, DollarSign, TrendingUp, Brain } from "lucide-react";

const Feasibility = () => {
  const [selectedIndication, setSelectedIndication] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const feasibilityMetrics = [
    { factor: 'Patient Population', score: 85, impact: 'High', details: 'Adequate patient pool identified' },
    { factor: 'Site Availability', score: 72, impact: 'Medium', details: '67 qualified sites in target regions' },
    { factor: 'Regulatory Climate', score: 91, impact: 'High', details: 'Favorable regulatory environment' },
    { factor: 'Competitive Landscape', score: 64, impact: 'Medium', details: '12 competing trials identified' },
    { factor: 'Recruitment Timeline', score: 78, impact: 'High', details: 'Estimated 14-18 months for full enrollment' },
    { factor: 'Budget Requirements', score: 69, impact: 'Medium', details: '$8.5M estimated total cost' },
  ];

  const siteRecommendations = [
    { 
      name: 'Mayo Clinic - Rochester', 
      location: 'Minnesota, US', 
      capacity: 45, 
      experience: 'High', 
      timeline: '3-4 months',
      strengths: ['Experienced PI', 'Fast enrollment', 'Regulatory expertise'],
      score: 94
    },
    { 
      name: 'Memorial Sloan Kettering', 
      location: 'New York, US', 
      capacity: 38, 
      experience: 'High', 
      timeline: '2-3 months',
      strengths: ['Top oncology center', 'Research infrastructure', 'Patient database'],
      score: 92
    },
    { 
      name: 'Johns Hopkins Hospital', 
      location: 'Maryland, US', 
      capacity: 32, 
      experience: 'High', 
      timeline: '4-5 months',
      strengths: ['Academic reputation', 'Diverse patient population', 'Technology platform'],
      score: 89
    },
    { 
      name: 'Cleveland Clinic', 
      location: 'Ohio, US', 
      capacity: 29, 
      experience: 'Medium', 
      timeline: '3-4 months',
      strengths: ['Multi-specialty support', 'Patient retention', 'Cost efficiency'],
      score: 86
    }
  ];

  const riskFactors = [
    { risk: 'Slow Enrollment', probability: 'Medium', impact: 'High', mitigation: 'Expand to additional sites' },
    { risk: 'Regulatory Delays', probability: 'Low', impact: 'High', mitigation: 'Early FDA engagement' },
    { risk: 'Competitive Pressure', probability: 'High', impact: 'Medium', mitigation: 'Differentiated endpoints' },
    { risk: 'Site Capacity Issues', probability: 'Medium', impact: 'Medium', mitigation: 'Backup site identification' },
  ];

  const costBreakdown = [
    { category: 'Site Payments', amount: 3200000, percentage: 38 },
    { category: 'Patient Recruitment', amount: 1700000, percentage: 20 },
    { category: 'Regulatory & Compliance', amount: 1275000, percentage: 15 },
    { category: 'Data Management', amount: 1020000, percentage: 12 },
    { category: 'Monitoring', amount: 850000, percentage: 10 },
    { category: 'Other', amount: 425000, percentage: 5 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Trial Feasibility Assessment
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive feasibility analysis for clinical trial planning and optimization
        </p>
      </div>

      {/* Feasibility Configuration */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Trial Configuration
          </CardTitle>
          <CardDescription>Define your trial parameters for feasibility assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedIndication} onValueChange={setSelectedIndication}>
              <SelectTrigger>
                <SelectValue placeholder="Select Indication" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="glioblastoma">Glioblastoma</SelectItem>
                <SelectItem value="lung-cancer">Lung Cancer</SelectItem>
                <SelectItem value="breast-cancer">Breast Cancer</SelectItem>
                <SelectItem value="diabetes">Type 2 Diabetes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPhase} onValueChange={setSelectedPhase}>
              <SelectTrigger>
                <SelectValue placeholder="Trial Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phase1">Phase I</SelectItem>
                <SelectItem value="phase2">Phase II</SelectItem>
                <SelectItem value="phase3">Phase III</SelectItem>
                <SelectItem value="phase4">Phase IV</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Target Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                <SelectItem value="global">Global</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full">
              <Target className="h-4 w-4 mr-2" />
              Assess Feasibility
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Feasibility Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">78</div>
                <p className="text-sm text-muted-foreground">Overall Feasibility Score</p>
                <Badge variant="default" className="mt-2">Good</Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-accent mb-1">16</div>
                <p className="text-sm text-muted-foreground">Est. Recruitment (months)</p>
                <Badge variant="secondary" className="mt-2">Target</Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-chart-3 mx-auto mb-3" />
                <div className="text-3xl font-bold text-chart-3 mb-1">$8.5M</div>
                <p className="text-sm text-muted-foreground">Estimated Total Cost</p>
                <Badge variant="outline" className="mt-2">Budget</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Feasibility Factors */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Feasibility Assessment</CardTitle>
              <CardDescription>Key factors affecting trial success probability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {feasibilityMetrics.map((metric, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{metric.factor}</h4>
                        <Badge variant={metric.impact === 'High' ? 'default' : 'secondary'}>
                          {metric.impact} Impact
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-lg ${getScoreColor(metric.score)}`}>
                          {metric.score}
                        </span>
                        {metric.score >= 80 ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                    <p className="text-sm text-muted-foreground">{metric.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sites" className="space-y-6">
          {/* Site Recommendations */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Recommended Sites
              </CardTitle>
              <CardDescription>Top-ranked sites based on capacity, experience, and timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {siteRecommendations.map((site, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{site.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {site.location}
                        </p>
                      </div>
                      <Badge variant={getScoreVariant(site.score)}>
                        Score: {site.score}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Capacity:</span>
                        <p className="font-medium">{site.capacity} patients</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Experience:</span>
                        <p className="font-medium">{site.experience}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>
                        <p className="font-medium">{site.timeline}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Key Strengths:</p>
                      <div className="flex flex-wrap gap-1">
                        {site.strengths.map((strength, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          {/* Risk Assessment */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Analysis
              </CardTitle>
              <CardDescription>Potential risks and mitigation strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{risk.risk}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">
                          <span className={getProbabilityColor(risk.probability)}>
                            {risk.probability}
                          </span>
                        </Badge>
                        <Badge variant="outline">
                          {risk.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Mitigation: </span>
                      <span>{risk.mitigation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          {/* Cost Breakdown */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost Analysis
              </CardTitle>
              <CardDescription>Detailed budget breakdown and cost optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costBreakdown.map((cost, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{cost.category}</h4>
                      <div className="text-right">
                        <div className="font-bold">${(cost.amount / 1000000).toFixed(1)}M</div>
                        <div className="text-sm text-muted-foreground">{cost.percentage}%</div>
                      </div>
                    </div>
                    <Progress value={cost.percentage} className="h-2" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">Cost Optimization Opportunities</span>
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Consider central lab services to reduce per-site costs</li>
                  <li>• Implement electronic data capture to streamline monitoring</li>
                  <li>• Negotiate volume discounts for multi-site agreements</li>
                  <li>• Utilize patient registries for efficient recruitment</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Feasibility;