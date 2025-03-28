import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { MdSolarPower, MdElectricBolt, MdOutlineSettings, MdBolt, MdPower, MdBusiness, MdLocationOn, MdOutlineEmail, MdOutlinePhone, MdSave } from 'react-icons/md';

const EditProfile = () => {
  const navigate = useNavigate();

  // Company Info State
  const [companyInfo, setCompanyInfo] = useState({
    name: "SolarTech Solutions",
    address: "123 Energy Way, Solar City, CA 94105",
    phone: "(555) 123-4567",
    email: "contact@solartech.com",
    website: "www.solartech.com"
  });

  // Solar Panels State
  const [panels, setPanels] = useState([
    {
      model: "SolarMax Pro",
      wattage: 400,
      efficiency: 21.4,
      warranty: 25,
      dimensions: "1755 x 1038 x 35 mm",
      weight: "20.5 kg"
    },
    {
      model: "SolarMax Elite",
      wattage: 450,
      efficiency: 22.8,
      warranty: 30,
      dimensions: "1855 x 1038 x 35 mm",
      weight: "21.5 kg"
    }
  ]);

  // Inverters State
  const [inverters, setInverters] = useState([
    {
      model: "PowerConvert X1",
      capacity: "7.6 kW",
      efficiency: 97.5,
      warranty: 12,
      features: ["Smart monitoring", "Battery ready", "Rapid shutdown"]
    },
    {
      model: "PowerConvert X2",
      capacity: "11.4 kW",
      efficiency: 98.2,
      warranty: 15,
      features: ["Smart monitoring", "Battery ready", "Rapid shutdown", "Dual MPPT"]
    }
  ]);

  // Installation Capabilities State
  const [installationCapabilities, setInstallationCapabilities] = useState({
    maxProjectSize: "2 MW",
    typicalProjectSize: "10-250 kW",
    installationTypes: ["Rooftop", "Ground Mount", "Carport"],
    certifications: ["NABCEP", "UL", "IEEE"],
    serviceArea: ["California", "Nevada", "Arizona"]
  });

  // Performance Metrics State
  const [performance, setPerformance] = useState({
    completedProjects: 1250,
    totalCapacity: "15.5 MW",
    averageEfficiency: 21.6,
    customerSatisfaction: 4.8
  });

  // Handlers for adding/removing items
  const addPanel = () => {
    setPanels([...panels, {
      model: "",
      wattage: 0,
      efficiency: 0,
      warranty: 0,
      dimensions: "",
      weight: ""
    }]);
  };

  const removePanel = (index: number) => {
    setPanels(panels.filter((_, i) => i !== index));
  };

  const addInverter = () => {
    setInverters([...inverters, {
      model: "",
      capacity: "",
      efficiency: 0,
      warranty: 0,
      features: []
    }]);
  };

  const removeInverter = (index: number) => {
    setInverters(inverters.filter((_, i) => i !== index));
  };

  const addFeature = (inverterIndex: number) => {
    const newInverters = [...inverters];
    newInverters[inverterIndex].features.push("");
    setInverters(newInverters);
  };

  const removeFeature = (inverterIndex: number, featureIndex: number) => {
    const newInverters = [...inverters];
    newInverters[inverterIndex].features.splice(featureIndex, 1);
    setInverters(newInverters);
  };

  const addInstallationType = () => {
    setInstallationCapabilities({
      ...installationCapabilities,
      installationTypes: [...installationCapabilities.installationTypes, ""]
    });
  };

  const removeInstallationType = (index: number) => {
    setInstallationCapabilities({
      ...installationCapabilities,
      installationTypes: installationCapabilities.installationTypes.filter((_, i) => i !== index)
    });
  };

  const addCertification = () => {
    setInstallationCapabilities({
      ...installationCapabilities,
      certifications: [...installationCapabilities.certifications, ""]
    });
  };

  const removeCertification = (index: number) => {
    setInstallationCapabilities({
      ...installationCapabilities,
      certifications: installationCapabilities.certifications.filter((_, i) => i !== index)
    });
  };

  const addServiceArea = () => {
    setInstallationCapabilities({
      ...installationCapabilities,
      serviceArea: [...installationCapabilities.serviceArea, ""]
    });
  };

  const removeServiceArea = (index: number) => {
    setInstallationCapabilities({
      ...installationCapabilities,
      serviceArea: installationCapabilities.serviceArea.filter((_, i) => i !== index)
    });
  };

  // Handler for saving changes
  const handleSave = () => {
    // Here you would typically make an API call to save the data
    toast.success('Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Company Profile</h2>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary gap-2"
            >
              <MdSave className="text-lg" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Company Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white">
              <MdBusiness className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Company Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                className="input input-bordered"
                placeholder="Enter company name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                className="input input-bordered"
                placeholder="Enter address"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                className="input input-bordered"
                placeholder="Enter phone number"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                className="input input-bordered"
                placeholder="Enter email"
              />
            </div>
          </div>
        </div>

        {/* Solar Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Solar Panels */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white">
                  <MdSolarPower className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Solar Panels</h3>
              </div>
              <button
                onClick={addPanel}
                className="btn btn-circle btn-ghost text-amber-500 hover:text-amber-600"
              >
                <HiPlus className="text-xl" />
              </button>
            </div>
            <div className="space-y-6">
              {panels.map((panel, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 relative">
                  <button
                    onClick={() => removePanel(index)}
                    className="absolute top-2 right-2 btn btn-circle btn-ghost btn-xs text-gray-500"
                  >
                    <HiXMark />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Model</span>
                      </label>
                      <input
                        type="text"
                        value={panel.model}
                        onChange={(e) => {
                          const newPanels = [...panels];
                          newPanels[index].model = e.target.value;
                          setPanels(newPanels);
                        }}
                        className="input input-bordered input-sm"
                        placeholder="Model name"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Wattage (W)</span>
                      </label>
                      <input
                        type="number"
                        value={panel.wattage}
                        onChange={(e) => {
                          const newPanels = [...panels];
                          newPanels[index].wattage = Number(e.target.value);
                          setPanels(newPanels);
                        }}
                        className="input input-bordered input-sm"
                        placeholder="Wattage"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Efficiency (%)</span>
                      </label>
                      <input
                        type="number"
                        value={panel.efficiency}
                        onChange={(e) => {
                          const newPanels = [...panels];
                          newPanels[index].efficiency = Number(e.target.value);
                          setPanels(newPanels);
                        }}
                        className="input input-bordered input-sm"
                        placeholder="Efficiency"
                        step="0.1"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Warranty (years)</span>
                      </label>
                      <input
                        type="number"
                        value={panel.warranty}
                        onChange={(e) => {
                          const newPanels = [...panels];
                          newPanels[index].warranty = Number(e.target.value);
                          setPanels(newPanels);
                        }}
                        className="input input-bordered input-sm"
                        placeholder="Warranty"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inverters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white">
                  <MdPower className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Inverters</h3>
              </div>
              <button
                onClick={addInverter}
                className="btn btn-circle btn-ghost text-amber-500 hover:text-amber-600"
              >
                <HiPlus className="text-xl" />
              </button>
            </div>
            <div className="space-y-6">
              {inverters.map((inverter, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeInverter(index)}
                    className="absolute top-2 right-2 btn btn-circle btn-ghost btn-xs text-gray-500"
                  >
                    <HiXMark />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Model</span>
                      </label>
                      <input
                        type="text"
                        value={inverter.model}
                        onChange={(e) => {
                          const newInverters = [...inverters];
                          newInverters[index].model = e.target.value;
                          setInverters(newInverters);
                        }}
                        className="input input-bordered input-sm"
                        placeholder="Model name"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Capacity</span>
                      </label>
                      <input
                        type="text"
                        value={inverter.capacity}
                        onChange={(e) => {
                          const newInverters = [...inverters];
                          newInverters[index].capacity = e.target.value;
                          setInverters(newInverters);
                        }}
                        className="input input-bordered input-sm"
                        placeholder="Capacity"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Efficiency (%)</span>
                      </label>
                      <input
                        type="number"
                        value={inverter.efficiency}
                        onChange={(e) => {
                          const newInverters = [...inverters];
                          newInverters[index].efficiency = Number(e.target.value);
                          setInverters(newInverters);
                        }}
                        className="input input-bordered input-sm"
                        placeholder="Efficiency"
                        step="0.1"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Warranty (years)</span>
                      </label>
                      <input
                        type="number"
                        value={inverter.warranty}
                        onChange={(e) => {
                          const newInverters = [...inverters];
                          newInverters[index].warranty = Number(e.target.value);
                          setInverters(newInverters);
                        }}
                        className="input input-bordered input-sm"
                        placeholder="Warranty"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="label">
                      <span className="label-text">Features</span>
                      <button
                        onClick={() => addFeature(index)}
                        className="btn btn-ghost btn-xs text-amber-500"
                      >
                        <HiPlus className="text-lg" />
                      </button>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inverter.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-1">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const newInverters = [...inverters];
                              newInverters[index].features[featureIndex] = e.target.value;
                              setInverters(newInverters);
                            }}
                            className="input input-bordered input-sm"
                            placeholder="Feature"
                          />
                          <button
                            onClick={() => removeFeature(index, featureIndex)}
                            className="btn btn-ghost btn-xs text-gray-500"
                          >
                            <HiXMark />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Installation Capabilities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white">
              <MdOutlineSettings className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Installation Capabilities</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Max Project Size</span>
              </label>
              <input
                type="text"
                value={installationCapabilities.maxProjectSize}
                onChange={(e) => setInstallationCapabilities({
                  ...installationCapabilities,
                  maxProjectSize: e.target.value
                })}
                className="input input-bordered"
                placeholder="Max project size"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Typical Project Range</span>
              </label>
              <input
                type="text"
                value={installationCapabilities.typicalProjectSize}
                onChange={(e) => setInstallationCapabilities({
                  ...installationCapabilities,
                  typicalProjectSize: e.target.value
                })}
                className="input input-bordered"
                placeholder="Typical project range"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Installation Types</span>
                <button
                  onClick={addInstallationType}
                  className="btn btn-ghost btn-xs text-amber-500"
                >
                  <HiPlus className="text-lg" />
                </button>
              </label>
              <div className="flex flex-wrap gap-2">
                {installationCapabilities.installationTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <input
                      type="text"
                      value={type}
                      onChange={(e) => {
                        const newTypes = [...installationCapabilities.installationTypes];
                        newTypes[index] = e.target.value;
                        setInstallationCapabilities({
                          ...installationCapabilities,
                          installationTypes: newTypes
                        });
                      }}
                      className="input input-bordered input-sm"
                      placeholder="Installation type"
                    />
                    <button
                      onClick={() => removeInstallationType(index)}
                      className="btn btn-ghost btn-xs text-gray-500"
                    >
                      <HiXMark />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Service Areas</span>
                <button
                  onClick={addServiceArea}
                  className="btn btn-ghost btn-xs text-amber-500"
                >
                  <HiPlus className="text-lg" />
                </button>
              </label>
              <div className="flex flex-wrap gap-2">
                {installationCapabilities.serviceArea.map((area, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => {
                        const newAreas = [...installationCapabilities.serviceArea];
                        newAreas[index] = e.target.value;
                        setInstallationCapabilities({
                          ...installationCapabilities,
                          serviceArea: newAreas
                        });
                      }}
                      className="input input-bordered input-sm"
                      placeholder="Service area"
                    />
                    <button
                      onClick={() => removeServiceArea(index)}
                      className="btn btn-ghost btn-xs text-gray-500"
                    >
                      <HiXMark />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white">
              <MdBolt className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Performance Metrics</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Completed Projects</span>
              </label>
              <input
                type="number"
                value={performance.completedProjects}
                onChange={(e) => setPerformance({
                  ...performance,
                  completedProjects: Number(e.target.value)
                })}
                className="input input-bordered"
                placeholder="Number of projects"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Total Capacity</span>
              </label>
              <input
                type="text"
                value={performance.totalCapacity}
                onChange={(e) => setPerformance({
                  ...performance,
                  totalCapacity: e.target.value
                })}
                className="input input-bordered"
                placeholder="Total capacity"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Average Efficiency (%)</span>
              </label>
              <input
                type="number"
                value={performance.averageEfficiency}
                onChange={(e) => setPerformance({
                  ...performance,
                  averageEfficiency: Number(e.target.value)
                })}
                className="input input-bordered"
                placeholder="Average efficiency"
                step="0.1"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Customer Satisfaction</span>
              </label>
              <input
                type="number"
                value={performance.customerSatisfaction}
                onChange={(e) => setPerformance({
                  ...performance,
                  customerSatisfaction: Number(e.target.value)
                })}
                className="input input-bordered"
                placeholder="Customer satisfaction"
                step="0.1"
                min="0"
                max="5"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate('/profile')}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary gap-2"
          >
            <MdSave className="text-lg" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
