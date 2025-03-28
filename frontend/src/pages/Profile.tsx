import React from 'react';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { MdSolarPower, MdElectricBolt, MdOutlineSettings, MdBolt, MdPower, MdBusiness, MdLocationOn, MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';

const Profile = () => {
  const modalDelete = React.useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  // Sample company solar data
  const solarCompanyData = {
    companyInfo: {
      name: "SolarTech Solutions",
      address: "123 Energy Way, Solar City, CA 94105",
      phone: "(555) 123-4567",
      email: "contact@solartech.com",
      website: "www.solartech.com"
    },
    solarProducts: {
      panels: [
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
      ],
      inverters: [
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
      ]
    },
    installationCapabilities: {
      maxProjectSize: "2 MW",
      typicalProjectSize: "10-250 kW",
      installationTypes: ["Rooftop", "Ground Mount", "Carport"],
      certifications: ["NABCEP", "UL", "IEEE"],
      serviceArea: ["California", "Nevada", "Arizona"]
    },
    performance: {
      completedProjects: 1250,
      totalCapacity: "15.5 MW",
      averageEfficiency: 21.6,
      customerSatisfaction: 4.8
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Company Profile</h2>
          <button
            onClick={() => navigate('/profile/edit')}
            className="btn btn-primary"
          >
            <HiOutlinePencil className="text-lg" /> Edit Profile
          </button>
        </div>

        {/* Company Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white">
              <MdBusiness className="text-3xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{solarCompanyData.companyInfo.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MdLocationOn className="text-amber-500" />
                  <span className="text-gray-600 dark:text-gray-300">{solarCompanyData.companyInfo.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlinePhone className="text-amber-500" />
                  <span className="text-gray-600 dark:text-gray-300">{solarCompanyData.companyInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineEmail className="text-amber-500" />
                  <span className="text-gray-600 dark:text-gray-300">{solarCompanyData.companyInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solar Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Solar Panels */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white">
                <MdSolarPower className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Solar Panels</h3>
            </div>
            <div className="space-y-4">
              {solarCompanyData.solarProducts.panels.map((panel, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{panel.model}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Wattage:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{panel.wattage}W</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Efficiency:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{panel.efficiency}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Warranty:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{panel.warranty} years</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inverters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white">
                <MdPower className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Inverters</h3>
            </div>
            <div className="space-y-4">
              {solarCompanyData.solarProducts.inverters.map((inverter, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{inverter.model}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Capacity:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{inverter.capacity}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Efficiency:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{inverter.efficiency}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Warranty:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">{inverter.warranty} years</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-500 dark:text-gray-400">Features:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {inverter.features.map((feature, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Installation Capabilities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white">
              <MdOutlineSettings className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Installation Capabilities</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Project Size</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Max Size:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{solarCompanyData.installationCapabilities.maxProjectSize}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Typical Range:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{solarCompanyData.installationCapabilities.typicalProjectSize}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Installation Types</h4>
              <div className="flex flex-wrap gap-2">
                {solarCompanyData.installationCapabilities.installationTypes.map((type, index) => (
                  <span key={index} className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded text-xs">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {solarCompanyData.installationCapabilities.certifications.map((cert, index) => (
                  <span key={index} className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded text-xs">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Service Area</h4>
              <div className="flex flex-wrap gap-2">
                {solarCompanyData.installationCapabilities.serviceArea.map((area, index) => (
                  <span key={index} className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded text-xs">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl text-white">
              <MdBolt className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Performance Metrics</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Completed Projects</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{solarCompanyData.performance.completedProjects}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Total Capacity Installed</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{solarCompanyData.performance.totalCapacity}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Average System Efficiency</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{solarCompanyData.performance.averageEfficiency}%</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Customer Satisfaction</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{solarCompanyData.performance.customerSatisfaction}/5.0</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8">
          <button
            className="btn btn-error"
            onClick={() => modalDelete.current?.showModal()}
          >
            <HiOutlineTrash className="text-lg" />
            Delete Company Profile
          </button>
          <dialog
            id="modal_delete"
            className="modal"
            ref={modalDelete}
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg dark:text-white">
                Delete Confirmation
              </h3>
              <p className="py-4">
                Are you sure you want to delete your company profile? This action cannot be undone.
              </p>
              <div className="modal-action mx-0 flex-col items-stretch justify-stretch gap-3">
                <button
                  onClick={() =>
                    toast('Profile deletion is disabled in demo mode', {
                      icon: '⚠️',
                    })
                  }
                  className="btn btn-error btn-block text-white"
                >
                  Yes, delete my profile
                </button>
                <form method="dialog" className="m-0 w-full">
                  <button className="btn btn-block">
                    No, keep my profile
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
