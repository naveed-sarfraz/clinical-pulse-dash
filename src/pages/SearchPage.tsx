import React from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown, ChevronUp, ExternalLink, Filter, Sparkles } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [expandedTrial, setExpandedTrial] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    phase: "",
    therapeuticArea: "",
    trialType: "",
    status: ""
  });

  // Gene therapy pipeline data focused on late preclinical companies in target hubs
  const mockTrials = [
    {
      id: "NCT05234567",
      title: "Novel AAV-CGF166 Gene Therapy for Congenital Hearing Loss",
      therapeuticArea: "Gene Therapy - Rare Diseases",
      indication: "Congenital Hearing Loss",
      phase: "Late Preclinical",
      trialType: "IND-Enabling Studies",
      interventionType: "Gene Therapy",
      intervention: "AAV-CGF166 (Inner Ear Gene Therapy)",
      comparator: "Natural History Control",
      randomization: "Single-arm, Open-label",
      blinding: "None",
      primaryEndpoint: "Safety and preliminary efficacy in hearing restoration",
      secondaryEndpoints: ["Audiometric improvements", "Quality of life measures", "Long-term safety"],
      sampleSize: 24,
      statisticalPower: "80% power to detect clinically meaningful hearing improvement",
      status: "Manufacturing Scale-Up",
      sponsor: "Decibel Therapeutics",
      startDate: "Expected Q2 2024",
      estimatedCompletion: "Phase I: Q4 2025",
      currentEnrollment: 0,
      sites: [
        { name: "Boston Children's Hospital", type: "Academic Medical Center", country: "United States", location: "Boston, MA" },
        { name: "UCSF Clinical Research Center", type: "Academic Medical Center", country: "United States", location: "San Francisco, CA" }
      ],
      successRateInSimilar: "72% for AAV-based therapies in similar rare disease indications",
      partnershipStatus: "Unpartnered - Actively seeking development partner",
      developmentStage: "Late Preclinical (IND submission planned Q1 2024)",
      keyMilestones: ["IND filing Q1 2024", "Phase I initiation Q2 2024", "First patient dosed Q3 2024"],
      targetProfile: "Emerging biotech, 18 months to clinical entry",
      lastUpdate: "2024-01-10"
    },
    {
      id: "NCT05789012",
      title: "Base-Edited Therapeutic for Beta-Thalassemia",
      therapeuticArea: "Gene Therapy - Blood Disorders",
      indication: "Beta-Thalassemia",
      phase: "Late Preclinical",
      trialType: "CMC Development",
      interventionType: "Gene Therapy",
      intervention: "Prime-edited autologous CD34+ cells",
      comparator: "Standard of care (transfusions + iron chelation)",
      randomization: "Single-arm study",
      blinding: "Open-label",
      primaryEndpoint: "Safety and manufacturing feasibility",
      secondaryEndpoints: ["Hemoglobin levels", "Transfusion independence", "Vector integration analysis"],
      sampleSize: 12,
      statisticalPower: "90% power to detect transfusion independence in >50% patients",
      status: "Regulatory Preparation",
      sponsor: "Prime Medicine",
      startDate: "Expected Q3 2024",
      estimatedCompletion: "Phase I: Q2 2026",
      currentEnrollment: 0,
      sites: [
        { name: "Boston Children's Hospital", type: "Academic Medical Center", country: "United States", location: "Boston, MA" },
        { name: "Stanford Medicine", type: "Academic Medical Center", country: "United States", location: "San Francisco, CA" }
      ],
      successRateInSimilar: "65% for base editing approaches in hereditary blood disorders",
      partnershipStatus: "Unpartnered - Active partnership discussions with multiple pharma",
      developmentStage: "Late Preclinical (IND submission planned Q2 2024)",
      keyMilestones: ["GMP manufacturing Q1 2024", "IND filing Q2 2024", "Phase I start Q3 2024"],
      targetProfile: "Emerging biotech, 6 months to clinical entry",
      lastUpdate: "2024-01-05"
    },
    {
      id: "NCT05456789",
      title: "Lipid Nanoparticle-Delivered Gene Therapy for Duchenne Muscular Dystrophy",
      therapeuticArea: "Gene Therapy - Neuromuscular",
      indication: "Duchenne Muscular Dystrophy",
      phase: "Late Preclinical",
      trialType: "IND-Enabling Studies",
      interventionType: "Gene Therapy",
      intervention: "LNP-delivered microdystrophin gene therapy",
      comparator: "Natural history controls",
      randomization: "Open-label, single-arm",
      blinding: "None",
      primaryEndpoint: "Safety and dystrophin expression in muscle biopsies",
      secondaryEndpoints: ["Functional assessments", "Biomarker analysis", "Pharmacokinetics"],
      sampleSize: 18,
      statisticalPower: "85% power to detect meaningful dystrophin restoration",
      status: "Regulatory Preparation",
      sponsor: "Solid Biosciences",
      startDate: "Expected Q4 2024",
      estimatedCompletion: "Phase I: Q4 2026",
      currentEnrollment: 0,
      sites: [
        { name: "Boston Children's Hospital", type: "Academic Medical Center", country: "United States", location: "Boston, MA" },
        { name: "UCSF Benioff Children's", type: "Pediatric Hospital", country: "United States", location: "San Francisco, CA" },
        { name: "Rady Children's Hospital", type: "Pediatric Hospital", country: "United States", location: "San Diego, CA" }
      ],
      successRateInSimilar: "58% for systemic gene delivery in neuromuscular disorders",
      partnershipStatus: "Unpartnered - Seeking strategic alliance for development and commercialization",
      developmentStage: "Late Preclinical (IND targeted Q3 2024)",
      keyMilestones: ["Toxicology studies completion Q2 2024", "IND submission Q3 2024"],
      targetProfile: "Public biotech, 8 months to clinical entry",
      lastUpdate: "2024-01-03"
    },
    {
      id: "NCT05678901",
      title: "CRISPR-Based In Vivo Gene Editing for Hereditary Transthyretin Amyloidosis",
      therapeuticArea: "Gene Therapy - Rare Diseases",
      indication: "Hereditary Transthyretin Amyloidosis (hATTR)",
      phase: "Late Preclinical",
      trialType: "IND-Enabling Studies",
      interventionType: "Gene Therapy",
      intervention: "CRISPR-Cas9 in vivo gene editing (NTLA-2001)",
      comparator: "Historical controls",
      randomization: "Single-arm, dose-escalation",
      blinding: "Open-label",
      primaryEndpoint: "Safety and TTR protein reduction",
      secondaryEndpoints: ["Pharmacokinetics", "Biomarker analysis", "Clinical assessments"],
      sampleSize: 20,
      statisticalPower: "90% power to detect >75% TTR reduction",
      status: "IND-Enabling Studies",
      sponsor: "Intellia Therapeutics",
      startDate: "Expected Q2 2024",
      estimatedCompletion: "Phase I: Q4 2025",
      currentEnrollment: 0,
      sites: [
        { name: "Mass General Brigham", type: "Academic Medical Center", country: "United States", location: "Boston, MA" },
        { name: "Stanford Medicine", type: "Academic Medical Center", country: "United States", location: "San Francisco, CA" }
      ],
      successRateInSimilar: "76% for in vivo CRISPR applications in similar indications",
      partnershipStatus: "Unpartnered - Open to strategic partnerships for global development",
      developmentStage: "Late Preclinical (IND submission imminent)",
      keyMilestones: ["IND filing Q1 2024", "First patient dosed Q2 2024"],
      targetProfile: "Public biotech, 3 months to clinical entry",
      lastUpdate: "2024-01-12"
    },
    {
      id: "NCT05890123",
      title: "Adeno-Associated Virus Gene Therapy for Spinal Muscular Atrophy Type 2/3",
      therapeuticArea: "Gene Therapy - Neuromuscular",
      indication: "Spinal Muscular Atrophy Type 2/3",
      phase: "Late Preclinical",
      trialType: "Manufacturing Optimization",
      interventionType: "Gene Therapy",
      intervention: "AAV9-SMN gene therapy (next-generation vector)",
      comparator: "Natural history/current standard of care",
      randomization: "Single-arm study",
      blinding: "Open-label",
      primaryEndpoint: "Safety and motor function improvement",
      secondaryEndpoints: ["SMN protein expression", "Survival", "Quality of life"],
      sampleSize: 15,
      statisticalPower: "80% power to detect clinically meaningful motor improvement",
      status: "CMC Development",
      sponsor: "AveXis (Novartis Gene Therapies)",
      startDate: "Expected Q1 2025",
      estimatedCompletion: "Phase I: Q3 2027",
      currentEnrollment: 0,
      sites: [
        { name: "Boston Children's Hospital", type: "Academic Medical Center", country: "United States", location: "Boston, MA" },
        { name: "UCSF Benioff Children's", type: "Pediatric Hospital", country: "United States", location: "San Francisco, CA" },
        { name: "Shanghai Children's Hospital", type: "Pediatric Hospital", country: "China", location: "Shanghai, China" }
      ],
      successRateInSimilar: "71% for AAV-based therapies in neuromuscular disorders",
      partnershipStatus: "Novartis Internal Program - Potential out-licensing opportunities",
      developmentStage: "Late Preclinical (Manufacturing optimization phase)",
      keyMilestones: ["Process optimization Q4 2024", "IND filing Q4 2024"],
      targetProfile: "Large pharma subsidiary, 12 months to clinical entry",
      lastUpdate: "2023-12-28"
    }
  ];

  const exampleQueries = [
    "Late preclinical gene therapy companies in Boston targeting rare diseases",
    "Unpartnered AAV-based therapies in San Francisco approaching Phase I",
    "Cell therapy biotech firms in Shanghai with upcoming clinical milestones",
    "Gene editing companies in San Diego seeking development partnerships",
    "Emerging biotech with novel delivery platforms for gene therapies",
    "Late-stage preclinical companies developing in vivo gene therapies"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Simple search filtering - in real app would be more sophisticated
    let filtered = mockTrials.filter(trial => 
      trial.title.toLowerCase().includes(query.toLowerCase()) ||
      trial.therapeuticArea.toLowerCase().includes(query.toLowerCase()) ||
      trial.indication.toLowerCase().includes(query.toLowerCase()) ||
      trial.intervention.toLowerCase().includes(query.toLowerCase())
    );

    // Apply filters if any are set
    if (filters.phase) {
      filtered = filtered.filter(trial => trial.phase === filters.phase);
    }
    if (filters.therapeuticArea) {
      filtered = filtered.filter(trial => trial.therapeuticArea === filters.therapeuticArea);
    }
    if (filters.trialType) {
      filtered = filtered.filter(trial => trial.trialType === filters.trialType);
    }
    if (filters.status) {
      filtered = filtered.filter(trial => trial.status === filters.status);
    }

    setSearchResults(filtered);
    setShowFilters(true);
  };

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  const toggleTrialExpanded = (trialId: string) => {
    setExpandedTrial(expandedTrial === trialId ? null : trialId);
  };

  const clearFilters = () => {
    setFilters({
      phase: "",
      therapeuticArea: "",
      trialType: "",
      status: ""
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      {/* Minimalist Header */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Search className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-semibold text-foreground">🧬 Gene Therapy Pipeline Intelligence</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Identify emerging biotech innovators in late preclinical stages across Boston, San Francisco, San Diego, and Shanghai. Focus on unpartnered companies and partnership opportunities.
        </p>
        <p className="text-xs text-muted-foreground">Focus areas: Boston • San Francisco • San Diego • Shanghai • Late preclinical companies • Partnership opportunities</p>
      </div>

      {/* Search Interface */}
      <div className="space-y-6">
        {/* Main Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search gene therapy companies, partnerships, or clinical milestones..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-24 h-14 text-base border-muted-foreground/20 focus-visible:ring-2 focus-visible:ring-primary/20"
            />
            <Button 
              type="submit" 
              size="sm"
              className="absolute right-2 top-2 h-10 px-6"
            >
              Search
            </Button>
          </div>
        </form>

        {/* ChatGPT-style Example Queries */}
        {searchResults.length === 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              Try these example searches:
            </div>
            <div className="flex flex-wrap gap-3">
              {exampleQueries.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleClick(example)}
                  className="text-sm border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Filters - Show after search */}
        {showFilters && searchResults.length > 0 && (
          <Card className="border-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Refine Results</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 text-xs"
                >
                  Clear filters
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Select value={filters.phase} onValueChange={(value) => setFilters({...filters, phase: value})}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Development Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Late Preclinical">Late Preclinical</SelectItem>
                    <SelectItem value="Phase I">Phase I</SelectItem>
                    <SelectItem value="Phase II">Phase II</SelectItem>
                    <SelectItem value="Phase III">Phase III</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.therapeuticArea} onValueChange={(value) => setFilters({...filters, therapeuticArea: value})}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Therapeutic Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gene Therapy - Rare Diseases">Rare Diseases</SelectItem>
                    <SelectItem value="Gene Therapy - Blood Disorders">Blood Disorders</SelectItem>
                    <SelectItem value="Gene Therapy - Neuromuscular">Neuromuscular</SelectItem>
                    <SelectItem value="Gene Therapy - Oncology">Oncology (CAR-T/TCR)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.trialType} onValueChange={(value) => setFilters({...filters, trialType: value})}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Partnership Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Unpartnered">Unpartnered</SelectItem>
                    <SelectItem value="Partnership Discussions">Partnership Discussions</SelectItem>
                    <SelectItem value="Seeking Alliance">Seeking Alliance</SelectItem>
                    <SelectItem value="Internal Program">Internal Program</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Innovation Hub" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Boston">Boston</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="San Diego">San Diego</SelectItem>
                    <SelectItem value="Shanghai">Shanghai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {searchResults.length} trial{searchResults.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          {searchResults.map((trial) => (
            <Card key={trial.id} className="border border-muted/50 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-medium leading-tight mb-2">
                      {trial.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{trial.id}</span>
                      <span>•</span>
                      <span>{trial.sponsor}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={trial.status === 'Recruiting' ? 'default' : 'secondary'} className="text-xs">
                      {trial.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTrialExpanded(trial.id)}
                      className="h-8 px-2"
                    >
                      {expandedTrial === trial.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Key Trial Info - Always Visible */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-xs">
                  <div>
                    <div className="text-muted-foreground mb-1">Therapeutic Area</div>
                    <div className="font-medium">{trial.therapeuticArea}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Phase</div>
                    <div className="font-medium">{trial.phase}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Trial Type</div>
                    <div className="font-medium">{trial.trialType}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Intervention Type</div>
                    <div className="font-medium">{trial.interventionType}</div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTrial === trial.id && (
                  <div className="border-t border-muted/30 pt-4 space-y-4">
                    <div className="grid gap-4">
                      {/* Indication */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Indication</div>
                        <div className="text-sm">{trial.indication}</div>
                      </div>

                      {/* Intervention & Comparator */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Intervention</div>
                          <div className="text-sm">{trial.intervention}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Comparator/Control</div>
                          <div className="text-sm">{trial.comparator}</div>
                        </div>
                      </div>

                      {/* Study Design */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Randomization</div>
                          <div className="text-sm">{trial.randomization}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Blinding</div>
                          <div className="text-sm">{trial.blinding}</div>
                        </div>
                      </div>

                      {/* Endpoints */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Primary Endpoint</div>
                          <div className="text-sm">{trial.primaryEndpoint}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Secondary Endpoints</div>
                          <div className="text-sm">
                            <ul className="list-disc list-inside space-y-1">
                              {trial.secondaryEndpoints.map((endpoint: string, index: number) => (
                                <li key={index}>{endpoint}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Sample Size & Statistics */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Sample Size</div>
                          <div className="text-sm">{trial.sampleSize} participants</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Statistical Power</div>
                          <div className="text-sm">{trial.statisticalPower}</div>
                        </div>
                      </div>

                      {/* Sites Information */}
                      {trial.sites && (
                        <div>
                          <div className="text-xs text-muted-foreground mb-2">
                            Sites ({trial.sites.length} locations)
                          </div>
                          <div className="grid md:grid-cols-2 gap-2">
                            {trial.sites.map((site: any, index: number) => (
                              <div key={index} className="text-sm p-2 rounded bg-muted/20">
                                <div className="font-medium">{site.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {site.type} • {site.country}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Success Rate in Similar Trials */}
                      {trial.successRateInSimilar && (
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Success Rate in Similar Trials</div>
                          <div className="text-sm font-medium text-primary">{trial.successRateInSimilar}</div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="flex justify-end pt-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Full Details
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {query && searchResults.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No trials found matching your search criteria.</p>
          <p className="text-sm">Try searching for different terms or adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;