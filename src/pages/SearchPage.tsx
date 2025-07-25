import React from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Brain, Sparkles, Filter, CheckCircle } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
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
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Intelligent Search
        </h1>
        <p className="text-muted-foreground mt-2">
          Natural language search for clinical trials with advanced filtering
        </p>
      </div>

      {/* Search Interface */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Natural Language Search
            <Sparkles className="h-4 w-4 text-accent" />
          </CardTitle>
          <CardDescription>
            Ask questions like: "Show Phase II trials for glioblastoma using gene therapy started after 2020 in the U.S."
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Input */}
          <form onSubmit={handleQuerySubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Describe the trials you're looking for..."
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
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </h3>
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
          </div>

          {/* Quick Examples */}
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
    </div>
  );
};

export default SearchPage;