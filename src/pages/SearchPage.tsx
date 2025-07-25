import React from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [expandedTrial, setExpandedTrial] = useState<string | null>(null);

  // Enhanced mock trial data with required parameters
  const mockTrials = [
    { 
      id: 'NCT05234567', 
      title: 'Phase II Trial of Gene Therapy for Glioblastoma Multiforme',
      therapeuticArea: 'Oncology',
      indication: 'Glioblastoma Multiforme (GBM)',
      phase: 'Phase II',
      trialType: 'Interventional',
      interventionType: 'Biologic',
      intervention: 'CAR-T Gene Therapy Vector',
      comparator: 'Standard of Care (Temozolomide + Radiation)',
      randomization: 'Randomized (1:1)',
      blinding: 'Open-label',
      primaryEndpoint: 'Overall Survival at 12 months',
      secondaryEndpoints: ['Progression-Free Survival', 'Quality of Life (EORTC QLQ-C30)', 'Safety and Tolerability'],
      sampleSize: 120,
      statisticalPower: '80% power to detect 30% improvement in OS',
      status: 'Recruiting',
      sponsor: 'Memorial Sloan Kettering Cancer Center'
    },
    { 
      id: 'NCT05234568', 
      title: 'Adaptive Platform Trial for Advanced Lung Cancer Immunotherapy',
      therapeuticArea: 'Oncology',
      indication: 'Non-Small Cell Lung Cancer (NSCLC)',
      phase: 'Phase I/II',
      trialType: 'Adaptive',
      interventionType: 'Drug',
      intervention: 'PD-L1 Inhibitor (Pembrolizumab)',
      comparator: 'Historical controls',
      randomization: 'Non-randomized',
      blinding: 'Single-blind (Investigator)',
      primaryEndpoint: 'Maximum Tolerated Dose (MTD) and Objective Response Rate',
      secondaryEndpoints: ['Duration of Response', 'Pharmacokinetics', 'Biomarker Analysis'],
      sampleSize: 75,
      statisticalPower: '85% power to detect ORR >20%',
      status: 'Active, not recruiting',
      sponsor: 'Bristol-Myers Squibb'
    },
    { 
      id: 'NCT05234569', 
      title: 'Digital Therapeutics for Diabetes Management Observational Study',
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
      sponsor: 'Joslin Diabetes Center'
    },
    { 
      id: 'NCT05234570', 
      title: 'Cardiac Device Trial for Heart Failure with Reduced Ejection Fraction',
      therapeuticArea: 'Cardiology',
      indication: 'Heart Failure with Reduced Ejection Fraction (HFrEF)',
      phase: 'Phase III',
      trialType: 'Interventional',
      interventionType: 'Device',
      intervention: 'Left Ventricular Assist Device (LVAD)',
      comparator: 'Optimal Medical Therapy',
      randomization: 'Randomized (2:1)',
      blinding: 'Open-label',
      primaryEndpoint: 'Composite of death, disabling stroke, or device malfunction at 2 years',
      secondaryEndpoints: ['Quality of Life', 'Functional capacity (6MWT)', 'Hospitalizations'],
      sampleSize: 400,
      statisticalPower: '85% power to detect 25% relative risk reduction',
      status: 'Recruiting',
      sponsor: 'Abbott Medical Devices'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Simple search filtering - in real app would be more sophisticated
    const filtered = mockTrials.filter(trial => 
      trial.title.toLowerCase().includes(query.toLowerCase()) ||
      trial.therapeuticArea.toLowerCase().includes(query.toLowerCase()) ||
      trial.indication.toLowerCase().includes(query.toLowerCase()) ||
      trial.intervention.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const toggleTrialExpanded = (trialId: string) => {
    setExpandedTrial(expandedTrial === trialId ? null : trialId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Minimalist Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-medium text-foreground">Clinical Trial Search</h1>
        <p className="text-sm text-muted-foreground">Search and explore clinical trials with detailed study parameters</p>
      </div>

      {/* Simple Search Bar */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trials by condition, intervention, or therapeutic area..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 border-muted focus-visible:ring-1"
              />
              <Button 
                type="submit" 
                size="sm"
                className="absolute right-2 top-2 h-8"
              >
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {searchResults.length} trial{searchResults.length !== 1 ? 's' : ''} found
          </div>
          
          {searchResults.map((trial) => (
            <Card key={trial.id} className="border border-muted/50 hover:shadow-sm transition-shadow">
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
          <p className="text-sm">Try searching for different terms or conditions.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;