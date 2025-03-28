import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdSearch, 
  MdFilterList, 
  MdLocationOn, 
  MdFactory, 
  MdOutlineEmail, 
  MdOutlinePhone, 
  MdArrowForward, 
  MdAdd, 
  MdDelete, 
  MdEdit, 
  MdLink, 
  MdCheck, 
  MdChevronRight,
  MdFilterAlt,
  MdRefresh,
  MdOutlineRoofing,
  MdOutlineManageSearch,
  MdOutlineBusiness,
  MdSolarPower,
  MdOutlineElectricBolt,
  MdAreaChart
} from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { FaLinkedin, FaFilter } from 'react-icons/fa';

const FacilityDataScraper = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [squareFootageFilter, setSquareFootageFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [energyUsageFilter, setEnergyUsageFilter] = useState('');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [totalCount, setTotalCount] = useState(335);
  const [netNewCount, setNetNewCount] = useState(335);
  const [savedCount, setSavedCount] = useState(0);
  const [dataScraped, setDataScraped] = useState(false);
  const [facilityType, setFacilityType] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // State options for dropdown
  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", 
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", 
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  // Industry/sector options
  const sectors = [
    "Manufacturing", "Technology", "Healthcare", "Retail", "Warehousing", "Energy", 
    "Financial Services", "Education", "Food Production", "Automotive", "Electronics", 
    "Pharmaceuticals", "Logistics", "Aerospace", "Telecommunications"
  ];

  // Square footage ranges
  const squareFootageRanges = [
    "Under 10,000 sq ft",
    "10,000 - 50,000 sq ft",
    "50,000 - 100,000 sq ft", 
    "100,000 - 250,000 sq ft",
    "250,000 - 500,000 sq ft",
    "Over 500,000 sq ft"
  ];

  // Energy usage ranges
  const energyUsageRanges = [
    "Low (< 500,000 kWh/year)",
    "Medium (500,000 - 2,000,000 kWh/year)",
    "High (2,000,000 - 5,000,000 kWh/year)",
    "Very High (> 5,000,000 kWh/year)"
  ];

  // Sample facility data from the image
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: "Jeff Levy",
      jobTitle: "Facilities Manager",
      company: "Apple",
      emails: true,
      phoneNumbers: true,
      location: "Atlanta, GA",
      enriched: true,
      verified: true
    },
    {
      id: 2,
      name: "Amy Huke",
      jobTitle: "Facilities Manager",
      company: "Honeywell",
      emails: true,
      phoneNumbers: true,
      location: "Kansas City, MO",
      enriched: true,
      verified: true
    },
    {
      id: 3,
      name: "Ryan Kuddes",
      jobTitle: "Facilities Manager",
      company: "Apple",
      emails: true,
      phoneNumbers: true,
      location: "Denver, CO",
      enriched: true,
      verified: true
    },
    {
      id: 4,
      name: "Zuretti Carter",
      jobTitle: "Facilities Manager",
      company: "ChargePoint",
      emails: true,
      phoneNumbers: true,
      location: "San Francisco, CA",
      enriched: true,
      verified: true
    },
    {
      id: 5,
      name: "Scott Simpson",
      jobTitle: "Facilities Manager",
      company: "Plexus Corp.",
      emails: true,
      phoneNumbers: true,
      location: "Neenah, WI",
      enriched: true,
      verified: true
    },
    {
      id: 6,
      name: "Rob Greinke",
      jobTitle: "Facilities Manager",
      company: "Eaton",
      emails: true,
      phoneNumbers: true,
      location: "Waukesha, WI",
      enriched: true,
      verified: true
    },
    {
      id: 7,
      name: "Ryan Frey",
      jobTitle: "Facilities Manager",
      company: "Vertiv",
      emails: true,
      phoneNumbers: true,
      location: "Delaware, OH",
      enriched: true,
      verified: true
    },
    {
      id: 8,
      name: "Fred Hotchkiss",
      jobTitle: "Facilities Manager",
      company: "EMS Technologies, Inc.",
      emails: true,
      phoneNumbers: true,
      location: "Binghamton, NY",
      enriched: true,
      verified: true
    },
    {
      id: 9,
      name: "Anthony Sankale",
      jobTitle: "Facilities Manager",
      company: "Novanta Inc.",
      emails: true,
      phoneNumbers: true,
      location: "Boston, MA",
      enriched: true,
      verified: true
    },
    {
      id: 10,
      name: "Bob Harrison",
      jobTitle: "Facilities Manager",
      company: "Franklin Electric",
      emails: true,
      phoneNumbers: true,
      location: "Bluffton, IN",
      enriched: true,
      verified: true
    },
    {
      id: 11,
      name: "Matt Olson",
      jobTitle: "Facilities Manager",
      company: "Bentek Corporation",
      emails: true,
      phoneNumbers: true,
      location: "San Jose, CA",
      enriched: true,
      verified: true
    },
    {
      id: 12,
      name: "Bradley Romero",
      jobTitle: "Facilities Manager",
      company: "Honeywell",
      emails: true,
      phoneNumbers: true,
      location: "Denver, CO",
      enriched: true,
      verified: true
    },
    {
      id: 13,
      name: "Vicente Cornejo",
      jobTitle: "Facilities Manager",
      company: "ITW Food Equipment Group",
      emails: true,
      phoneNumbers: true,
      location: "Dayton, OH",
      enriched: true,
      verified: true
    },
    {
      id: 14,
      name: "Daniel Conroy",
      jobTitle: "Facilities Manager",
      company: "Apple",
      emails: true,
      phoneNumbers: true,
      location: "Jersey City, NJ",
      enriched: true,
      verified: true
    }
  ]);

  const handleScrape = () => {
    if (!facilityType) {
      toast.error('Please enter what facilities you are looking for');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setDataScraped(true);
      
      // Build a description of what's being searched for
      let searchDescription = facilityType;
      
      // Add filter details to the search description
      if (stateFilter) {
        searchDescription += ` in ${stateFilter}`;
      }
      if (sectorFilter) {
        searchDescription += ` (${sectorFilter} sector)`;
      }
      if (squareFootageFilter) {
        searchDescription += ` with ${squareFootageFilter}`;
      }
      if (energyUsageFilter) {
        searchDescription += ` using ${energyUsageFilter}`;
      }
      if (showVerifiedOnly) {
        searchDescription += " with verified contacts";
      }
      
      toast.success(`Facility data for ${searchDescription} scraped successfully`);
      
      // Add new facilities
      setFacilities(prev => [
        ...prev,
        {
          id: 15,
          name: "Michael Johnson",
          jobTitle: "Facilities Manager",
          company: "Samsung Electronics",
          emails: true,
          phoneNumbers: true,
          location: "Austin, TX",
          enriched: true,
          verified: true
        },
        {
          id: 16,
          name: "Sarah Williams",
          jobTitle: "Facilities Manager",
          company: "Intel Corporation",
          emails: true,
          phoneNumbers: true,
          location: "Chandler, AZ",
          enriched: true,
          verified: true
        }
      ]);
      setTotalCount(337);
      setNetNewCount(337);
    }, 2000);
  };

  const handleEnrich = () => {
    if (selectedFacilities.length === 0) {
      toast.error('Please select at least one facility to enrich');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${selectedFacilities.length} facilities enriched successfully`);
      
      // Update enriched facilities
      setFacilities(prev => prev.map(facility => {
        if (selectedFacilities.includes(facility.id)) {
          return {
            ...facility,
            enriched: true
          };
        }
        return facility;
      }));
      
      setSelectedFacilities([]);
    }, 2000);
  };

  const handleContinue = () => {
    if (facilities.filter(f => f.enriched).length === 0) {
      toast.error('Please enrich at least one facility before continuing');
      return;
    }
    navigate('/facility-ai-analysis');
  };

  const handleSelectFacility = (id: number) => {
    setSelectedFacilities(prev => {
      if (prev.includes(id)) {
        return prev.filter(facilityId => facilityId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredFacilities = facilities.filter(facility => {
    // Only show facilities when data has been scraped
    if (!dataScraped) {
      return false;
    }
    
    // Basic search term matching
    const matchesSearch = searchTerm === '' || 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Standard filters
    const matchesVerified = !showVerifiedOnly || facility.verified;
    const matchesLocation = locationFilter === '' || facility.location.includes(locationFilter);
    const matchesIndustry = industryFilter === '' || facility.company.includes(industryFilter);
    
    // Advanced filters - we'll assume these properties exist or can be derived from existing properties
    // In a real app, you'd have these properties in your facility data
    
    // State filter - extract state from location
    const facilityState = facility.location.split(', ')[1]; // Assumes format "City, State"
    const matchesState = stateFilter === '' || 
                          (facilityState && facilityState.includes(stateFilter));
    
    // These are mocked checks since we don't have this data in the sample
    // In a real application, these would check actual facility properties
    const matchesSector = sectorFilter === '' || 
                          (facility.company === 'Apple' && sectorFilter === 'Technology') ||
                          (facility.company === 'Honeywell' && sectorFilter === 'Manufacturing') ||
                          (facility.company === 'ChargePoint' && sectorFilter === 'Energy');
    
    // Mocked square footage matching
    const mockSquareFootageMatcher = () => {
      if (squareFootageFilter === '') return true;
      
      // Just for demonstration - in a real app, you'd check actual square footage
      if (facility.id % 3 === 0 && squareFootageFilter === 'Under 10,000 sq ft') return true;
      if (facility.id % 3 === 1 && squareFootageFilter === '10,000 - 50,000 sq ft') return true;
      if (facility.id % 3 === 2 && squareFootageFilter === '50,000 - 100,000 sq ft') return true;
      if (facility.id % 5 === 0 && squareFootageFilter === '100,000 - 250,000 sq ft') return true;
      if (facility.id % 7 === 0 && squareFootageFilter === '250,000 - 500,000 sq ft') return true;
      if (facility.id % 11 === 0 && squareFootageFilter === 'Over 500,000 sq ft') return true;
      
      return false;
    };
    
    // Mocked energy usage matching
    const mockEnergyUsageMatcher = () => {
      if (energyUsageFilter === '') return true;
      
      // Just for demonstration - in a real app, you'd check actual energy usage
      if (facility.id % 4 === 0 && energyUsageFilter === 'Low (< 500,000 kWh/year)') return true;
      if (facility.id % 4 === 1 && energyUsageFilter === 'Medium (500,000 - 2,000,000 kWh/year)') return true;
      if (facility.id % 4 === 2 && energyUsageFilter === 'High (2,000,000 - 5,000,000 kWh/year)') return true;
      if (facility.id % 4 === 3 && energyUsageFilter === 'Very High (> 5,000,000 kWh/year)') return true;
      
      return false;
    };
    
    const matchesSquareFootage = mockSquareFootageMatcher();
    const matchesEnergyUsage = mockEnergyUsageMatcher();
    
    // Combine all filter criteria
    return matchesSearch && 
           matchesVerified && 
           matchesLocation && 
           matchesIndustry &&
           matchesState &&
           matchesSector &&
           matchesSquareFootage &&
           matchesEnergyUsage;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        {/* Header section with title and actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-3 rounded-xl text-white shadow-sm">
              <MdOutlineManageSearch className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Facility Data Scraper</h1>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleScrape}
              disabled={isLoading}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2 px-4 rounded-lg font-medium transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Scraping...' : 'Scrape New Facilities'}
              <MdSolarPower />
            </button>
            <button 
              onClick={handleEnrich}
              disabled={isLoading || selectedFacilities.length === 0}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enriching...' : 'Enrich Selected'}
              <MdOutlineElectricBolt />
            </button>
          </div>
        </div>
        
        {!dataScraped ? (
          <div className="rounded-xl shadow-xl p-0 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            {/* Premium gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-95"></div>
            
            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #ffffff 40px, #ffffff 42px), repeating-linear-gradient(90deg, transparent, transparent 40px, #ffffff 40px, #ffffff 42px)',
                  backgroundSize: '42px 42px'
                }}
              ></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-500/30 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-tl-full"></div>
            <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-amber-500/20 blur-2xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl"></div>
            
            {/* Subtle light effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-b from-amber-500/20 to-transparent blur-3xl"></div>
            
            <div className="relative z-10 p-10">
              <div className="flex flex-col items-center justify-center py-12 px-8 backdrop-blur-sm bg-white/5 dark:bg-gray-900/20 rounded-xl border border-white/10 shadow-2xl">
                <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-5 rounded-2xl text-white shadow-lg mb-8 transform hover:scale-105 transition-transform duration-300">
                  <MdFactory className="text-4xl" />
                </div>
                
                <h2 className="text-3xl font-bold mb-8 text-white">What facilities are you looking for?</h2>
                
                <div className="form-control w-full max-w-xl">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., Electrical manufacturing facilities in the United States"
                      value={facilityType}
                      onChange={(e) => setFacilityType(e.target.value)}
                      className="w-full p-4 pl-6 pr-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-lg placeholder-white/60"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <MdSearch className="text-white/70 text-xl" />
                    </div>
                  </div>
                  <p className="text-sm mt-3 text-white/70">
                    Enter the type of facilities you want to scrape data for
                  </p>
                </div>

                {/* Filter Options */}
                <div className="w-full max-w-xl mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-2 rounded-lg text-white shadow-md">
                        <MdFilterAlt className="text-lg" />
                      </div>
                      <h3 className="font-semibold text-white">Search Filters</h3>
                    </div>
                    <button 
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
                    >
                      {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
                      {showAdvancedFilters ? 
                        <MdChevronRight className="transform rotate-90" /> : 
                        <MdChevronRight className="transform rotate-0" />
                      }
                    </button>
                  </div>

                  {showAdvancedFilters && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                          <MdLocationOn className="text-amber-400" />
                          State
                        </label>
                        <select 
                          value={stateFilter}
                          onChange={(e) => setStateFilter(e.target.value)}
                          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="">All States</option>
                          {usStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                          <MdOutlineBusiness className="text-amber-400" />
                          Sector
                        </label>
                        <select 
                          value={sectorFilter}
                          onChange={(e) => setSectorFilter(e.target.value)}
                          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="">All Sectors</option>
                          {sectors.map(sector => (
                            <option key={sector} value={sector}>{sector}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                          <MdOutlineRoofing className="text-amber-400" />
                          Square Footage
                        </label>
                        <select 
                          value={squareFootageFilter}
                          onChange={(e) => setSquareFootageFilter(e.target.value)}
                          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="">All Sizes</option>
                          {squareFootageRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
                          <MdOutlineElectricBolt className="text-amber-400" />
                          Energy Usage
                        </label>
                        <select 
                          value={energyUsageFilter}
                          onChange={(e) => setEnergyUsageFilter(e.target.value)}
                          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="">All Energy Usage Levels</option>
                          {energyUsageRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 mt-1">
                          <input 
                            type="checkbox" 
                            checked={showVerifiedOnly}
                            onChange={() => setShowVerifiedOnly(!showVerifiedOnly)}
                            className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-5 w-5" 
                          />
                          <span className="text-sm font-medium text-white">
                            Only show verified contacts
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleScrape}
                  disabled={isLoading || !facilityType}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 px-8 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? 'Scraping...' : 'Start Scraping'}
                  <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                {/* Animated floating elements for additional visual interest */}
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-500/20 animate-pulse"></div>
                <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-amber-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-20 right-4 w-12 h-12 rounded-full bg-amber-500/20 animate-pulse" style={{ animationDuration: '4s' }}></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                {/* Background decorative pattern */}
                <div className="absolute right-0 bottom-0 opacity-5">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H100V100H70C31.3 100 0 68.7 0 30V0Z" fill="currentColor" />
                  </svg>
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Facilities</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{totalCount}</h3>
                  </div>
                  <div className="rounded-xl p-3 bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <MdFactory className="text-2xl" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 opacity-5">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H100V100H70C31.3 100 0 68.7 0 30V0Z" fill="currentColor" />
                  </svg>
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Net New</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{netNewCount}</h3>
                  </div>
                  <div className="rounded-xl p-3 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <MdAdd className="text-2xl" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 opacity-5">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H100V100H70C31.3 100 0 68.7 0 30V0Z" fill="currentColor" />
                  </svg>
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Saved</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{savedCount}</h3>
                  </div>
                  <div className="rounded-xl p-3 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <MdCheck className="text-2xl" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 relative overflow-visible">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-500/5 to-transparent"></div>
              
              <div className="flex flex-wrap justify-between items-center gap-4 relative z-10">
                <div className="relative w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search facilities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 px-4 pl-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <button 
                      onClick={() => setFilterOpen(!filterOpen)}
                      className="flex items-center gap-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-all"
                    >
                      <MdFilterList size={20} className="text-amber-500" />
                      Quick Filters
                      {filterOpen ? 
                        <MdChevronRight className="transform rotate-90" /> : 
                        <MdChevronRight className="transform rotate-0" />
                      }
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setLocationFilter('');
                      setIndustryFilter('');
                      setStateFilter('');
                      setSectorFilter('');
                      setSquareFootageFilter('');
                      setEnergyUsageFilter('');
                      setShowVerifiedOnly(false);
                      setSearchTerm('');
                    }}
                    className="flex items-center gap-2 text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    <MdRefresh size={20} />
                    Reset
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Filter dropdown positioned with fixed z-index */}
            {filterOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-end items-start pt-40" onClick={() => setFilterOpen(false)}>
                <div 
                  className="mr-10 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-5 border border-gray-100 dark:border-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">Quick Filters</h3>
                    <button 
                      onClick={() => setFilterOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Location</label>
                      <select 
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-full py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      >
                        <option value="">All Locations</option>
                        <option value="Atlanta">Atlanta</option>
                        <option value="Boston">Boston</option>
                        <option value="Denver">Denver</option>
                        <option value="Kansas City">Kansas City</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="San Jose">San Jose</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Industry</label>
                      <select 
                        value={industryFilter}
                        onChange={(e) => setIndustryFilter(e.target.value)}
                        className="w-full py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      >
                        <option value="">All Industries</option>
                        <option value="Apple">Apple</option>
                        <option value="Honeywell">Honeywell</option>
                        <option value="ChargePoint">ChargePoint</option>
                        <option value="Eaton">Eaton</option>
                        <option value="Vertiv">Vertiv</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={showVerifiedOnly}
                          onChange={() => setShowVerifiedOnly(!showVerifiedOnly)}
                          className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-5 w-5" 
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Verified contacts only
                        </span>
                      </label>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button 
                        onClick={() => {
                          setLocationFilter('');
                          setIndustryFilter('');
                          setShowVerifiedOnly(false);
                        }}
                        className="flex items-center gap-2 text-amber-500 hover:text-amber-600 transition-colors text-sm font-medium"
                      >
                        <MdRefresh size={16} />
                        Reset Filters
                      </button>
                      
                      <button 
                        onClick={() => setFilterOpen(false)}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-1.5 px-4 rounded-lg font-medium transition-all text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Facilities Table */}
            <div className="mt-6 overflow-x-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="w-12 py-3 px-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-5 w-5"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFacilities(filteredFacilities.map(f => f.id));
                            } else {
                              setSelectedFacilities([]);
                            }
                          }}
                          checked={selectedFacilities.length === filteredFacilities.length && filteredFacilities.length > 0}
                        />
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job Title</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Emails</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone Numbers</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Links</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">AI Analysis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredFacilities.length > 0 ? (
                      filteredFacilities.map((facility) => (
                        <tr key={facility.id} className={`${selectedFacilities.includes(facility.id) ? "bg-amber-50 dark:bg-gray-700" : ""} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                          <td className="py-4 px-4">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-5 w-5"
                              checked={selectedFacilities.includes(facility.id)}
                              onChange={() => handleSelectFacility(facility.id)}
                            />
                          </td>
                          <td className="py-4 px-4 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer">{facility.name}</td>
                          <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-300">{facility.jobTitle}</td>
                          <td className="py-4 px-4 text-sm">
                            {facility.company === "Apple" && <span className="flex items-center gap-1">🍎 Apple</span>}
                            {facility.company === "Honeywell" && <span className="flex items-center gap-1"><span className="bg-red-500 w-4 h-4 rounded-sm"></span> Honeywell</span>}
                            {facility.company === "ChargePoint" && <span className="flex items-center gap-1">— ChargePoint</span>}
                            {facility.company === "Plexus Corp." && <span className="flex items-center gap-1"><span className="bg-red-600 w-4 h-4 rounded-sm"></span> Plexus Corp.</span>}
                            {facility.company === "Eaton" && <span className="flex items-center gap-1">Eaton</span>}
                            {facility.company === "Vertiv" && <span className="flex items-center gap-1"><span className="bg-black w-4 h-4 rounded-sm"></span> Vertiv</span>}
                            {facility.company === "EMS Technologies, Inc." && <span className="flex items-center gap-1">EMS Technologies, Inc.</span>}
                            {facility.company === "Novanta Inc." && <span className="flex items-center gap-1"><span className="bg-teal-500 w-4 h-4 rounded-sm"></span> Novanta Inc.</span>}
                            {facility.company === "Franklin Electric" && <span className="flex items-center gap-1"><span className="bg-blue-600 w-4 h-4 rounded-sm"></span> Franklin Electric</span>}
                            {facility.company === "Bentek Corporation" && <span className="flex items-center gap-1">Bentek Corporation</span>}
                            {facility.company === "ITW Food Equipment Group" && <span className="flex items-center gap-1">ITW Food Equipment Group</span>}
                            {facility.company === "Samsung Electronics" && <span className="flex items-center gap-1">Samsung Electronics</span>}
                            {facility.company === "Intel Corporation" && <span className="flex items-center gap-1">Intel Corporation</span>}
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <button className="inline-flex items-center gap-1 py-1 px-3 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 font-medium text-xs hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                              <MdCheck className="text-green-600 dark:text-green-400" /> Access email
                            </button>
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <button className="inline-flex items-center gap-1 py-1 px-3 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 font-medium text-xs hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                              <MdCheck className="text-green-600 dark:text-green-400" /> Access Mobile
                            </button>
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <div className="flex gap-2">
                              <button className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <MdEdit size={16} />
                              </button>
                              <button className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <MdLink size={16} />
                              </button>
                              <button className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <MdOutlineEmail size={16} />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <FaLinkedin className="text-blue-600" size={20} />
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-300">
                            <div className="flex items-center gap-1">
                              <MdLocationOn className="text-amber-500" />
                              {facility.location}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <button 
                              onClick={() => navigate(`/facility-ai-analysis/${facility.id}`)}
                              className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium text-xs shadow-sm hover:shadow-md transition-all group"
                            >
                              AI Analysis
                              <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="py-8 px-4 text-center text-gray-500 dark:text-gray-400">
                          <div className="flex flex-col items-center">
                            <MdSearch className="text-4xl text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">No facilities found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Footer info */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-500/5 to-transparent"></div>
              
              <div className="flex flex-wrap justify-between items-center gap-4 relative z-10">
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {facilities.filter(f => f.enriched).length} of {facilities.length} facilities enriched
                  </span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full" 
                      style={{ width: `${(facilities.filter(f => f.enriched).length / facilities.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 py-2 px-4 rounded-lg">
                  <MdSolarPower className="text-amber-500 text-lg" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                    Only 5% of these facilities have adopted solar technology
                  </span>
                </div>
                
                <button 
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2.5 px-6 rounded-lg font-medium transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group"
                >
                  Continue to AI Analysis
                  <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacilityDataScraper; 