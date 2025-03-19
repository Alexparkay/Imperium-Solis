import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdFilterList, MdLocationOn, MdFactory, MdOutlineEmail, MdOutlinePhone, MdArrowForward, MdAdd, MdDelete, MdEdit, MdLink } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { FaLinkedin } from 'react-icons/fa';

const FacilityDataScraper = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [totalCount, setTotalCount] = useState(335);
  const [netNewCount, setNetNewCount] = useState(335);
  const [savedCount, setSavedCount] = useState(0);
  const [dataScraped, setDataScraped] = useState(false);
  const [facilityType, setFacilityType] = useState('');

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
      toast.success(`Facility data for ${facilityType} scraped successfully`);
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
    // Only show facilities when data has been scraped and either search term is entered or verified filter is on
    if (!dataScraped || (searchTerm === '' && !showVerifiedOnly)) {
      return false;
    }
    
    const matchesSearch = 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVerified = !showVerifiedOnly || facility.verified;
    
    const matchesLocation = locationFilter === '' || facility.location.includes(locationFilter);
    const matchesIndustry = industryFilter === '' || facility.company.includes(industryFilter);
    
    return matchesSearch && matchesVerified && matchesLocation && matchesIndustry;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Facility Data Scraper</h1>
          <div className="flex gap-2">
            <button 
              onClick={handleScrape}
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'Scraping...' : 'Scrape New Facilities'}
            </button>
            <button 
              onClick={handleEnrich}
              disabled={isLoading || selectedFacilities.length === 0}
              className="btn btn-secondary"
            >
              {isLoading ? 'Enriching...' : 'Enrich Selected'}
            </button>
          </div>
        </div>
        
        {!dataScraped ? (
          <div className="flex flex-col items-center justify-center py-12 bg-base-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">What facilities are you looking for?</h2>
            <div className="form-control w-full max-w-md">
              <input
                type="text"
                placeholder="e.g., Electrical manufacturing facilities in the United States"
                value={facilityType}
                onChange={(e) => setFacilityType(e.target.value)}
                className="input input-bordered w-full"
              />
              <p className="text-sm mt-2 text-gray-500">
                Enter the type of facilities you want to scrape data for
              </p>
            </div>
            <button 
              onClick={handleScrape}
              disabled={isLoading || !facilityType}
              className="btn btn-primary mt-6"
            >
              {isLoading ? 'Scraping...' : 'Start Scraping'}
            </button>
          </div>
        ) : (
          <>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total</div>
                <div className="stat-value">{totalCount}</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Net New</div>
                <div className="stat-value">{netNewCount}</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Saved</div>
                <div className="stat-value">{savedCount}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="relative w-1/3">
                <input
                  type="text"
                  placeholder="Search facilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="btn btn-outline flex items-center gap-2"
                >
                  <MdFilterList size={20} />
                  Filters
                </button>
                
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-10">
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <select 
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="select select-bordered w-full"
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
                        <label className="block text-sm font-medium mb-1">Industry</label>
                        <select 
                          value={industryFilter}
                          onChange={(e) => setIndustryFilter(e.target.value)}
                          className="select select-bordered w-full"
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
                            className="checkbox" 
                          />
                          <span className="text-sm font-medium">
                            Verified emails of facility managers in the United States for electrical/electronic manufacturing plants
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="w-12">
                      <input 
                        type="checkbox" 
                        className="checkbox"
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
                    <th>NAME</th>
                    <th>JOB TITLE</th>
                    <th>COMPANY</th>
                    <th>EMAILS</th>
                    <th>PHONE NUMBERS</th>
                    <th>ACTIONS</th>
                    <th>LINKS</th>
                    <th>LOCATION</th>
                    <th>AI ANALYSIS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFacilities.map((facility) => (
                    <tr key={facility.id} className={selectedFacilities.includes(facility.id) ? "bg-base-200" : ""}>
                      <td>
                        <input 
                          type="checkbox" 
                          className="checkbox"
                          checked={selectedFacilities.includes(facility.id)}
                          onChange={() => handleSelectFacility(facility.id)}
                        />
                      </td>
                      <td className="underline">{facility.name}</td>
                      <td>{facility.jobTitle}</td>
                      <td>
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
                      <td>
                        <button className="btn btn-sm btn-outline rounded-full">
                          <span className="text-green-500">✓</span> Access email
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline rounded-full">
                          <span className="text-green-500">✓</span> Access Mobile
                        </button>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-sm btn-circle btn-ghost">
                            <MdEdit size={18} />
                          </button>
                          <button className="btn btn-sm btn-circle btn-ghost">
                            <MdLink size={18} />
                          </button>
                          <button className="btn btn-sm btn-circle btn-ghost">
                            <MdOutlineEmail size={18} />
                          </button>
                          <button className="btn btn-sm btn-circle btn-ghost">
                            ...
                          </button>
                        </div>
                      </td>
                      <td>
                        <FaLinkedin className="text-blue-600" size={20} />
                      </td>
                      <td>{facility.location}</td>
                      <td>
                        <button 
                          onClick={() => navigate(`/facility-ai-analysis/${facility.id}`)}
                          className="btn btn-sm btn-primary flex items-center gap-1"
                        >
                          AI Analysis
                          <MdArrowForward size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className="text-sm">
                  {facilities.filter(f => f.enriched).length} of {facilities.length} facilities enriched
                </span>
                <span className="text-sm ml-4 text-primary">
                  Only 5% of these facilities have adopted solar technology
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacilityDataScraper; 