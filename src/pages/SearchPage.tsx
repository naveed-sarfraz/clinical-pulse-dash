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

  // Rich trial data from dashboard with all required parameters
  const mockTrials = [
    { 
      id: 'NCT05234567', 
      title: 'Phase II Trial of Gene Therapy for Glioblastoma Multiforme',
      therapeuticArea: 'Oncology',
      indication: 'Glioblastoma Multiforme (GBM)',
      phase: 'Phase II',
      trialType: 'Interventional',
      interventionType: 'Biologic',
      intervention: 'Gene Therapy Vector (CAR-T)',
      comparator: 'Standard of Care (Temozolomide + Radiation)',
      randomization: 'Randomized (1:1)',
      blinding: 'Open-label',
      primaryEndpoint: 'Overall Survival at 12 months',
      secondaryEndpoints: ['Progression-Free Survival', 'Quality of Life (EORTC QLQ-C30)', 'Safety and Tolerability'],
      sampleSize: 120,
      statisticalPower: '80% power to detect 30% improvement in OS',
      status: 'Recruiting',
      sponsor: 'Memorial Sloan Kettering Cancer Center',
      startDate: '2022-03-15',
      estimatedCompletion: '2025-12-31',
      currentEnrollment: 67,
      sites: [
        { name: 'Memorial Sloan Kettering Cancer Center', type: 'Academic', country: 'United States' },
        { name: 'MD Anderson Cancer Center', type: 'Academic', country: 'United States' },
        { name: 'Dana-Farber Cancer Institute', type: 'Academic', country: 'United States' }
      ],
      successRateInSimilar: '42% in similar GBM gene therapy trials'
    },
    { 
      id: 'NCT05234568', 
      title: 'CAR-T Cell Therapy for Recurrent Brain Tumors',
      therapeuticArea: 'Oncology',
      indication: 'Recurrent Glioblastoma',
      phase: 'Phase I/II',
      trialType: 'Adaptive',
      interventionType: 'Biologic',
      intervention: 'CAR-T Cell Therapy (EGFRvIII-targeted)',
      comparator: 'Historical controls',
      randomization: 'Non-randomized',
      blinding: 'Single-blind (Investigator)',
      primaryEndpoint: 'Maximum Tolerated Dose (MTD) and Objective Response Rate',
      secondaryEndpoints: ['Duration of Response', 'Pharmacokinetics', 'Biomarker Analysis'],
      sampleSize: 30,
      statisticalPower: '85% power to detect ORR >20%',
      status: 'Active, not recruiting',
      sponsor: 'Duke University Medical Center',
      startDate: '2021-08-20',
      estimatedCompletion: '2024-06-30',
      currentEnrollment: 28,
      sites: [
        { name: 'Duke University Medical Center', type: 'Academic', country: 'United States' },
        { name: 'University of Pennsylvania', type: 'Academic', country: 'United States' }
      ],
      successRateInSimilar: '38% in similar CAR-T Phase I/II trials'
    },
    { 
      id: 'NCT05234569', 
      title: 'Digital Therapeutics for Type 2 Diabetes Management',
      therapeuticArea: 'Endocrinology',
      indication: 'Type 2 Diabetes Mellitus',
      phase: 'Phase IV',
      trialType: 'Observational',
      interventionType: 'Digital',
      intervention: 'Mobile Health Application with AI Coaching',
      comparator: 'Standard diabetes care',
      randomization: 'Cluster randomized',
      blinding: 'Double-blind',
      primaryEndpoint: 'Change in HbA1c from baseline at 6 months',
      secondaryEndpoints: ['Patient-reported outcomes', 'Healthcare utilization', 'Cost-effectiveness'],
      sampleSize: 500,
      statisticalPower: '90% power to detect 0.5% reduction in HbA1c',
      status: 'Recruiting',
      sponsor: 'Joslin Diabetes Center',
      startDate: '2023-01-10',
      estimatedCompletion: '2024-12-31',
      currentEnrollment: 312,
      sites: [
        { name: 'Joslin Diabetes Center', type: 'Academic', country: 'United States' },
        { name: 'Cleveland Clinic', type: 'Academic', country: 'United States' },
        { name: 'Kaiser Permanente', type: 'Private', country: 'United States' },
        { name: 'Scripps Health', type: 'Private', country: 'United States' }
      ],
      successRateInSimilar: '78% in similar digital diabetes intervention studies'
    },
    { 
      id: 'NCT05234570', 
      title: 'Left Ventricular Assist Device Trial for Heart Failure',
      therapeuticArea: 'Cardiology',
      indication: 'Heart Failure with Reduced Ejection Fraction (HFrEF)',
      phase: 'Phase III',
      trialType: 'Interventional',
      interventionType: 'Device',
      intervention: 'Left Ventricular Assist Device (HeartMate 3)',
      comparator: 'Optimal Medical Therapy',
      randomization: 'Randomized (2:1)',
      blinding: 'Open-label',
      primaryEndpoint: 'Composite of death, disabling stroke, or device malfunction at 2 years',
      secondaryEndpoints: ['Quality of Life (Kansas City Cardiomyopathy)', 'Functional capacity (6MWT)', 'Hospitalizations'],
      sampleSize: 400,
      statisticalPower: '85% power to detect 25% relative risk reduction',
      status: 'Recruiting',
      sponsor: 'Abbott Medical Devices',
      startDate: '2022-09-01',
      estimatedCompletion: '2026-08-31',
      currentEnrollment: 267,
      sites: [
        { name: 'Texas Heart Institute', type: 'Private', country: 'United States' },
        { name: 'Cedars-Sinai Medical Center', type: 'Private', country: 'United States' },
        { name: 'Massachusetts General Hospital', type: 'Academic', country: 'United States' },
        { name: 'Toronto General Hospital', type: 'Academic', country: 'Canada' }
      ],
      successRateInSimilar: '74% in similar LVAD Phase III trials'
    },
    { 
      id: 'NCT05234571', 
      title: 'Immunotherapy Combination for Advanced Lung Cancer',
      therapeuticArea: 'Oncology',
      indication: 'Non-Small Cell Lung Cancer (NSCLC)',
      phase: 'Phase II',
      trialType: 'Interventional',
      interventionType: 'Drug',
      intervention: 'Pembrolizumab + Chemotherapy',
      comparator: 'Chemotherapy alone',
      randomization: 'Randomized (1:1)',
      blinding: 'Double-blind',
      primaryEndpoint: 'Progression-Free Survival',
      secondaryEndpoints: ['Overall Survival', 'Objective Response Rate', 'Safety Profile'],
      sampleSize: 300,
      statisticalPower: '85% power to detect HR 0.7 for PFS',
      status: 'Recruiting',
      sponsor: 'Bristol-Myers Squibb',
      startDate: '2023-05-01',
      estimatedCompletion: '2026-12-31',
      currentEnrollment: 189,
      sites: [
        { name: 'MD Anderson Cancer Center', type: 'Academic', country: 'United States' },
        { name: 'Mayo Clinic', type: 'Academic', country: 'United States' },
        { name: 'Private Oncology Associates', type: 'Private', country: 'United States' },
        { name: 'Princess Margaret Cancer Centre', type: 'Academic', country: 'Canada' },
        { name: 'The Christie NHS Foundation Trust', type: 'Hospital', country: 'United Kingdom' }
      ],
      successRateInSimilar: '68% in similar immunotherapy combination trials'
    },
    { 
      id: 'NCT05234572', 
      title: 'Novel Alzheimer\'s Drug in Early-Stage Disease',
      therapeuticArea: 'Neurology',
      indication: 'Early Alzheimer\'s Disease',
      phase: 'Phase III',
      trialType: 'Interventional',
      interventionType: 'Drug',
      intervention: 'Aducanumab (BIIB037)',
      comparator: 'Placebo',
      randomization: 'Randomized (1:1)',
      blinding: 'Double-blind',
      primaryEndpoint: 'Change in CDR-SB score at 78 weeks',
      secondaryEndpoints: ['MMSE score change', 'Amyloid PET burden', 'Caregiver burden assessment'],
      sampleSize: 1800,
      statisticalPower: '90% power to detect 25% slowing of decline',
      status: 'Recruiting',
      sponsor: 'Biogen Inc.',
      startDate: '2022-01-01',
      estimatedCompletion: '2025-06-30',
      currentEnrollment: 1234,
      sites: [
        { name: 'Mayo Clinic', type: 'Academic', country: 'United States' },
        { name: 'Johns Hopkins University', type: 'Academic', country: 'United States' },
        { name: 'University of California San Francisco', type: 'Academic', country: 'United States' },
        { name: 'Karolinska Institute', type: 'Academic', country: 'Sweden' },
        { name: 'University of Oxford', type: 'Academic', country: 'United Kingdom' }
      ],
      successRateInSimilar: '58% in similar Alzheimer\'s Phase III trials'
    }
  ];

  const exampleQueries = [
    "glioblastoma Phase II",
    "diabetes digital therapeutics",
    "heart failure device trials",
    "lung cancer immunotherapy Phase I",
    "Alzheimer's drug trials recruiting",
    "pediatric oncology adaptive trials"
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
          <h1 className="text-3xl font-semibold text-foreground">Clinical Trial Search</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover clinical trials with comprehensive study details, endpoints, and statistical parameters
        </p>
      </div>

      {/* Search Interface */}
      <div className="space-y-6">
        {/* Main Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for clinical trials by condition, treatment, or study type..."
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
                    <SelectValue placeholder="Phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phase I">Phase I</SelectItem>
                    <SelectItem value="Phase II">Phase II</SelectItem>
                    <SelectItem value="Phase III">Phase III</SelectItem>
                    <SelectItem value="Phase IV">Phase IV</SelectItem>
                    <SelectItem value="Phase I/II">Phase I/II</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.therapeuticArea} onValueChange={(value) => setFilters({...filters, therapeuticArea: value})}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Therapeutic Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oncology">Oncology</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.trialType} onValueChange={(value) => setFilters({...filters, trialType: value})}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Trial Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Interventional">Interventional</SelectItem>
                    <SelectItem value="Observational">Observational</SelectItem>
                    <SelectItem value="Adaptive">Adaptive</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Recruiting">Recruiting</SelectItem>
                    <SelectItem value="Active, not recruiting">Active, not recruiting</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
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