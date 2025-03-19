import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSolarPower, MdOutlineRoofing, MdOutlineWbSunny, MdOutlineSettings, MdLocationOn, MdMap } from 'react-icons/md';
import { toast } from 'react-hot-toast';

interface FacilityData {
  facilityName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  squareFootage: string;
  industryType: string;
  operatingHours: string;
  managerName: string;
  managerEmail: string;
  managerPhone: string;
  companyName: string;
  annualEnergyUsage: string;
  currentUtilityRate: string;
}

const SolarEfficiency = () => {
  const navigate = useNavigate();
  const [facilityData, setFacilityData] = useState<FacilityData | null>(null);
  const [solarData, setSolarData] = useState({
    roofType: '',
    roofAge: '',
    roofAngle: '',
    roofOrientation: '',
    shadingFactor: '',
    panelType: 'monocrystalline',
    panelEfficiency: '20',
    systemSize: '',
    inverterType: 'string',
    batteryStorage: 'no',
    batteryCapacity: '',
  });
  const [recommendations, setRecommendations] = useState({
    optimalSystemSize: 0,
    recommendedPanels: 0,
    estimatedProduction: 0,
    estimatedSavings: 0,
    co2Reduction: 0,
    paybackPeriod: 0,
    recommendedPanelType: '',
    recommendedInverterType: '',
    recommendedBatteryStorage: false,
    recommendedBatterySize: 0,
    roofRequirements: '',
    additionalNotes: '',
  });

  useEffect(() => {
    // Load facility data from localStorage
    const storedData = localStorage.getItem('facilityData');
    if (storedData) {
      setFacilityData(JSON.parse(storedData));
    } else {
      toast.error('No facility data found. Please complete the facility form first.');
      navigate('/facility-calculator');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSolarData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateRecommendations = () => {
    if (!facilityData) return;

    // Convert strings to numbers for calculations
    const squareFootage = parseFloat(facilityData.squareFootage) || 0;
    const utilityRate = parseFloat(facilityData.currentUtilityRate) || 0.12; // Default to $0.12/kWh if not provided
    const annualEnergyUsage = parseFloat(facilityData.annualEnergyUsage) || squareFootage * 15; // Estimate if not provided
    
    // Solar panel efficiency factors
    const panelEfficiency = parseFloat(solarData.panelEfficiency) / 100 || 0.2; // Convert percentage to decimal
    const roofOrientationFactor = getRoofOrientationFactor(solarData.roofOrientation);
    const roofAngleFactor = getRoofAngleFactor(solarData.roofAngle);
    const shadingFactor = getShadingFactor(solarData.shadingFactor);
    const panelTypeFactor = getPanelTypeFactor(solarData.panelType);
    const inverterEfficiency = getInverterEfficiency(solarData.inverterType);
    
    // Calculate optimal system size based on energy usage and available roof space
    const wattsPerSquareFoot = 15; // Average watts per square foot for commercial solar
    const usableRoofPercentage = 0.6; // Assume 60% of roof space is usable for solar
    const maxSystemSizeFromRoof = squareFootage * usableRoofPercentage * wattsPerSquareFoot / 1000; // in kW
    
    // Calculate system size needed to offset energy usage
    const annualSunHours = 1600; // Average annual sun hours (would vary by location)
    const systemSizeNeeded = annualEnergyUsage / (annualSunHours * panelEfficiency * roofOrientationFactor * 
                             roofAngleFactor * shadingFactor * inverterEfficiency);
    
    // Choose the smaller of the two system sizes
    const optimalSystemSize = Math.min(maxSystemSizeFromRoof, systemSizeNeeded);
    
    // Calculate number of panels needed
    const averagePanelWattage = getPanelWattage(solarData.panelType);
    const recommendedPanels = Math.ceil(optimalSystemSize * 1000 / averagePanelWattage);
    
    // Calculate estimated production
    const estimatedProduction = optimalSystemSize * annualSunHours * panelEfficiency * 
                               roofOrientationFactor * roofAngleFactor * shadingFactor * 
                               inverterEfficiency;
    
    // Calculate financial benefits
    const estimatedSavings = estimatedProduction * utilityRate;
    
    // Calculate environmental impact
    const co2PerKwh = 0.85; // lbs of CO2 per kWh (US average)
    const co2Reduction = estimatedProduction * co2PerKwh;
    
    // Calculate payback period
    const installationCostPerWatt = 2.5; // $2.50 per watt installed (commercial scale)
    const installationCost = optimalSystemSize * 1000 * installationCostPerWatt;
    const paybackPeriod = installationCost / estimatedSavings;
    
    // Determine recommended panel type based on efficiency needs and space constraints
    const recommendedPanelType = getRecommendedPanelType(squareFootage, annualEnergyUsage);
    
    // Determine recommended inverter type based on system size and complexity
    const recommendedInverterType = getRecommendedInverterType(optimalSystemSize, solarData.shadingFactor);
    
    // Determine if battery storage is recommended
    const operatingHours = parseFloat(facilityData.operatingHours) || 8;
    const recommendedBatteryStorage = operatingHours > 12 || solarData.batteryStorage === 'yes';
    
    // Calculate recommended battery size if storage is recommended
    const dailyUsage = annualEnergyUsage / 365;
    const recommendedBatterySize = recommendedBatteryStorage ? dailyUsage * 0.3 : 0; // 30% of daily usage
    
    // Generate roof requirements and additional notes
    const roofRequirements = `Requires approximately ${Math.ceil(recommendedPanels * averagePanelWattage / wattsPerSquareFoot)} sq ft of usable roof space.`;
    
    let additionalNotes = '';
    if (shadingFactor < 0.8) {
      additionalNotes += 'Consider tree trimming or alternative panel placement to reduce shading. ';
    }
    if (roofOrientationFactor < 0.9) {
      additionalNotes += 'Panel orientation is not optimal; consider adjustable mounting systems. ';
    }
    if (parseFloat(solarData.roofAge) > 15) {
      additionalNotes += 'Roof replacement may be needed before solar installation. ';
    }
    
    setRecommendations({
      optimalSystemSize,
      recommendedPanels,
      estimatedProduction,
      estimatedSavings,
      co2Reduction,
      paybackPeriod,
      recommendedPanelType,
      recommendedInverterType,
      recommendedBatteryStorage,
      recommendedBatterySize,
      roofRequirements,
      additionalNotes: additionalNotes || 'No additional recommendations.',
    });
    
    toast.success('Solar efficiency calculations completed!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRecommendations();
  };

  // Helper functions for solar calculations
  const getRoofOrientationFactor = (orientation: string): number => {
    const factors: {[key: string]: number} = {
      'south': 1.0,
      'southwest': 0.95,
      'southeast': 0.95,
      'east': 0.85,
      'west': 0.85,
      'north': 0.7,
      'northeast': 0.75,
      'northwest': 0.75,
      '': 0.9 // Default if not specified
    };
    return factors[orientation.toLowerCase()] || 0.9;
  };

  const getRoofAngleFactor = (angle: string): number => {
    const numericAngle = parseFloat(angle) || 0;
    if (numericAngle >= 30 && numericAngle <= 40) return 1.0; // Optimal
    if (numericAngle >= 20 && numericAngle < 30) return 0.95;
    if (numericAngle > 40 && numericAngle <= 50) return 0.95;
    if (numericAngle >= 10 && numericAngle < 20) return 0.9;
    if (numericAngle > 50 && numericAngle <= 60) return 0.9;
    return 0.85; // Flat or very steep
  };

  const getShadingFactor = (shading: string): number => {
    const numericShading = parseFloat(shading) || 0;
    return 1 - (numericShading / 100);
  };

  const getPanelTypeFactor = (type: string): number => {
    const factors: {[key: string]: number} = {
      'monocrystalline': 1.0,
      'polycrystalline': 0.95,
      'thin-film': 0.9,
      'bifacial': 1.1,
      '': 1.0 // Default if not specified
    };
    return factors[type.toLowerCase()] || 1.0;
  };

  const getInverterEfficiency = (type: string): number => {
    const efficiencies: {[key: string]: number} = {
      'string': 0.96,
      'microinverter': 0.97,
      'power-optimizer': 0.975,
      'central': 0.95,
      '': 0.96 // Default if not specified
    };
    return efficiencies[type.toLowerCase()] || 0.96;
  };

  const getPanelWattage = (type: string): number => {
    const wattages: {[key: string]: number} = {
      'monocrystalline': 380,
      'polycrystalline': 330,
      'thin-film': 300,
      'bifacial': 400,
      '': 350 // Default if not specified
    };
    return wattages[type.toLowerCase()] || 350;
  };

  const getRecommendedPanelType = (squareFootage: number, annualUsage: number): string => {
    const energyDensity = annualUsage / squareFootage;
    
    if (energyDensity > 25) return 'Bifacial Monocrystalline';
    if (energyDensity > 15) return 'High-Efficiency Monocrystalline';
    if (energyDensity > 10) return 'Standard Monocrystalline';
    return 'Polycrystalline';
  };

  const getRecommendedInverterType = (systemSize: number, shadingFactor: string): string => {
    const shading = parseFloat(shadingFactor) || 0;
    
    if (systemSize > 50) return 'Central Inverter';
    if (systemSize > 20) return 'String Inverter with Power Optimizers';
    if (shading > 20) return 'Microinverters';
    return 'String Inverter';
  };

  // Add a solar map visualization component
  const SolarMapVisualization = () => {
    if (!facilityData) return null;
    
    return (
      <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MdMap className="text-xl text-blue-600" /> Solar Potential Visualization
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-64">
            <img 
              src="/images/solar/Screenshot.png" 
              alt="Solar potential heat map" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-br-md text-sm font-medium">
              Heat Map View
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Facility Location</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {facilityData.address}, {facilityData.city}, {facilityData.state} {facilityData.zipCode}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Solar Potential Rating</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(parseFloat(solarData.panelEfficiency) * 4, 100)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">
                  {Math.min(parseFloat(solarData.panelEfficiency) * 4, 100).toFixed(0)}%
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Roof Area</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {(parseFloat(facilityData.squareFootage) * 0.6).toLocaleString()} sq ft available
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Panel Capacity</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {Math.floor((parseFloat(facilityData.squareFootage) * 0.6) / 17.5)} panels possible
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Optimal Installation Areas</h4>
              <p className="text-gray-600 dark:text-gray-400">
                The red/orange areas on the heat map indicate the highest solar potential. 
                These areas receive the most direct sunlight throughout the day.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <div className="box">
          <div className="flex items-center gap-3 mb-5">
            <MdSolarPower className="text-2xl" />
            <h2 className="text-xl font-bold">Solar Efficiency Calculator</h2>
          </div>
          
          {facilityData && (
            <div className="mb-5 p-4 bg-blue-50 dark:bg-slate-800 rounded-md">
              <h3 className="font-semibold mb-2">Facility: {facilityData.facilityName}</h3>
              <p className="text-sm">
                {facilityData.address}, {facilityData.city}, {facilityData.state} {facilityData.zipCode} | 
                Industry: {facilityData.industryType} | 
                Size: {facilityData.squareFootage} sq ft
              </p>
            </div>
          )}
          
          {/* Add Solar Map Visualization */}
          {facilityData && <SolarMapVisualization />}
          
          <p className="mb-5 text-gray-600 dark:text-gray-300">
            Enter your facility's roof and solar system details to calculate optimal solar panel efficiency.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MdOutlineRoofing className="text-xl" /> Roof Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Roof Type</label>
                  <select
                    name="roofType"
                    value={solarData.roofType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="">Select Roof Type</option>
                    <option value="flat">Flat</option>
                    <option value="metal">Metal</option>
                    <option value="shingle">Shingle</option>
                    <option value="tile">Tile</option>
                    <option value="membrane">Membrane</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Roof Age (years)</label>
                  <input
                    type="number"
                    name="roofAge"
                    value={solarData.roofAge}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Enter roof age"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Roof Angle (degrees)</label>
                  <input
                    type="number"
                    name="roofAngle"
                    value={solarData.roofAngle}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Enter roof angle"
                    min="0"
                    max="90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Roof Orientation</label>
                  <select
                    name="roofOrientation"
                    value={solarData.roofOrientation}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="">Select Orientation</option>
                    <option value="south">South</option>
                    <option value="southeast">Southeast</option>
                    <option value="southwest">Southwest</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="north">North</option>
                    <option value="northeast">Northeast</option>
                    <option value="northwest">Northwest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Shading Factor (%)</label>
                  <input
                    type="number"
                    name="shadingFactor"
                    value={solarData.shadingFactor}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Enter shading percentage"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MdOutlineWbSunny className="text-xl" /> Solar Panel Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Panel Type</label>
                  <select
                    name="panelType"
                    value={solarData.panelType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="monocrystalline">Monocrystalline</option>
                    <option value="polycrystalline">Polycrystalline</option>
                    <option value="thin-film">Thin-Film</option>
                    <option value="bifacial">Bifacial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Panel Efficiency (%)</label>
                  <input
                    type="number"
                    name="panelEfficiency"
                    value={solarData.panelEfficiency}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Enter panel efficiency"
                    min="10"
                    max="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Desired System Size (kW)</label>
                  <input
                    type="number"
                    name="systemSize"
                    value={solarData.systemSize}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Enter system size (optional)"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MdOutlineSettings className="text-xl" /> System Configuration
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Inverter Type</label>
                  <select
                    name="inverterType"
                    value={solarData.inverterType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="string">String Inverter</option>
                    <option value="microinverter">Microinverter</option>
                    <option value="power-optimizer">Power Optimizer</option>
                    <option value="central">Central Inverter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Battery Storage</label>
                  <select
                    name="batteryStorage"
                    value={solarData.batteryStorage}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                {solarData.batteryStorage === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Battery Capacity (kWh)</label>
                    <input
                      type="number"
                      name="batteryCapacity"
                      value={solarData.batteryCapacity}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                      placeholder="Enter battery capacity"
                      min="0"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Calculate Solar Efficiency
              </button>
            </div>
          </form>

          {recommendations.optimalSystemSize > 0 && (
            <div className="mt-8 p-6 bg-green-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MdSolarPower className="text-2xl" /> Solar System Recommendations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-700 p-4 rounded-md shadow-sm">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">System Specifications</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Optimal System Size:</span>
                      <span className="font-semibold">{recommendations.optimalSystemSize.toFixed(2)} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Recommended Panels:</span>
                      <span className="font-semibold">{recommendations.recommendedPanels} panels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Recommended Panel Type:</span>
                      <span className="font-semibold">{recommendations.recommendedPanelType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Recommended Inverter:</span>
                      <span className="font-semibold">{recommendations.recommendedInverterType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Battery Storage:</span>
                      <span className="font-semibold">{recommendations.recommendedBatteryStorage ? 'Recommended' : 'Not Required'}</span>
                    </div>
                    {recommendations.recommendedBatteryStorage && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Recommended Battery Size:</span>
                        <span className="font-semibold">{recommendations.recommendedBatterySize.toFixed(1)} kWh</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-4 rounded-md shadow-sm">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Performance Estimates</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Estimated Annual Production:</span>
                      <span className="font-semibold">{recommendations.estimatedProduction.toLocaleString(undefined, {maximumFractionDigits: 0})} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Estimated Annual Savings:</span>
                      <span className="font-semibold">${recommendations.estimatedSavings.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Payback Period:</span>
                      <span className="font-semibold">{recommendations.paybackPeriod.toFixed(1)} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">CO₂ Reduction:</span>
                      <span className="font-semibold">{(recommendations.co2Reduction / 2000).toFixed(1)} tons/year</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-4 rounded-md shadow-sm md:col-span-2">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Installation Requirements</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{recommendations.roofRequirements}</p>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mt-3 mb-2">Additional Recommendations</h4>
                  <p className="text-gray-600 dark:text-gray-400">{recommendations.additionalNotes}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => navigate('/facility-directory')}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  View Facility Directory
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarEfficiency; 