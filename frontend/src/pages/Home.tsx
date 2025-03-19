// import React from 'react';
import { useState } from 'react';
import TopDealsBox from '../components/topDealsBox/TopDealsBox';
import ChartBox from '../components/charts/ChartBox';
import { useQuery } from '@tanstack/react-query';
import {
  MdFactory,
  MdSolarPower,
  MdElectricBolt,
  MdAttachMoney,
  MdLocationOn,
  MdBarChart,
  MdOutlineRoofing,
  MdOutlineWbSunny,
  MdOutlineEmail,
  MdOutlineTrackChanges,
  MdArrowForward
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Mock data for Imperum Solis dashboard
const dashboardData = {
  facilitiesScraped: {
    total: 124,
    enriched: 98,
    percentage: 79,
    chartData: [
      { name: "Jan", value: 45 },
      { name: "Feb", value: 55 },
      { name: "Mar", value: 65 },
      { name: "Apr", value: 75 },
      { name: "May", value: 85 },
      { name: "Jun", value: 95 },
      { name: "Jul", value: 110 },
      { name: "Aug", value: 124 }
    ]
  },
  facilitiesAnalyzed: {
    total: 98,
    percentage: 79,
    chartData: [
      { name: "Jan", value: 35 },
      { name: "Feb", value: 42 },
      { name: "Mar", value: 50 },
      { name: "Apr", value: 58 },
      { name: "May", value: 67 },
      { name: "Jun", value: 78 },
      { name: "Jul", value: 88 },
      { name: "Aug", value: 98 }
    ]
  },
  energyEstimations: {
    total: 98,
    averageUsage: "3,250,000 kWh",
    averageCost: "$390,000",
    chartData: [
      { name: "Jan", value: 2800000 },
      { name: "Feb", value: 2900000 },
      { name: "Mar", value: 3100000 },
      { name: "Apr", value: 3300000 },
      { name: "May", value: 3500000 },
      { name: "Jun", value: 3700000 },
      { name: "Jul", value: 3600000 },
      { name: "Aug", value: 3400000 }
    ]
  },
  solarPotential: {
    facilitiesCalculated: 92,
    averageROI: "185%",
    averagePayback: "7.8 years",
    totalSavings: "$18.5M",
    chartData: [
      { name: "Jan", value: 150 },
      { name: "Feb", value: 160 },
      { name: "Mar", value: 170 },
      { name: "Apr", value: 180 },
      { name: "May", value: 190 },
      { name: "Jun", value: 200 },
      { name: "Jul", value: 190 },
      { name: "Aug", value: 185 }
    ]
  },
  emailCampaigns: {
    emailsSent: 85,
    emailsOpened: 62,
    openRate: 73,
    repliedRate: 42,
    interestedRate: 28,
    chartData: [
      { name: "Sent", value: 85 },
      { name: "Opened", value: 62 },
      { name: "Replied", value: 36 },
      { name: "Interested", value: 24 }
    ]
  },
  topFacilities: [
    {
      id: 1,
      name: "Apple Distribution Center",
      location: "Atlanta, GA",
      savings: "$273,000",
      roi: "205.3%",
      status: "Interested"
    },
    {
      id: 2,
      name: "Tesla Gigafactory",
      location: "Reno, NV",
      savings: "$1,250,000",
      roi: "245.8%",
      status: "Email Sent"
    },
    {
      id: 3,
      name: "Amazon Fulfillment Center",
      location: "Dallas, TX",
      savings: "$425,000",
      roi: "198.2%",
      status: "Follow-up Scheduled"
    },
    {
      id: 4,
      name: "Honeywell Manufacturing Plant",
      location: "Kansas City, MO",
      savings: "$166,320",
      roi: "156.2%",
      status: "Email Opened"
    },
    {
      id: 5,
      name: "Walmart Distribution Center",
      location: "Chicago, IL",
      savings: "$580,000",
      roi: "212.5%",
      status: "Not Contacted"
    }
  ]
};

const Home = () => {
  const navigate = useNavigate();

  const WorkflowStep = ({ 
    number, 
    title, 
    description, 
    icon, 
    route, 
    stats 
  }: { 
    number: number; 
    title: string; 
    description: string; 
    icon: React.ReactNode; 
    route: string;
    stats: React.ReactNode;
  }) => {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
              {number}
            </div>
            <h2 className="card-title">{title}</h2>
          </div>
          
          <div className="flex items-center gap-3 text-2xl mt-2 text-primary">
            {icon}
            <div className="text-base text-base-content">{description}</div>
          </div>
          
          <div className="mt-4">
            {stats}
          </div>
          
          <div className="card-actions justify-end mt-4">
            <button 
              onClick={() => navigate(route)}
              className="btn btn-primary"
            >
              Go to {title}
              <MdArrowForward />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TopFacilitiesBox = () => {
    return (
      <div className="card bg-base-100 shadow-xl col-span-1 md:col-span-2">
        <div className="card-body">
          <h2 className="card-title">Top Facilities by Potential Savings</h2>
          
          <div className="overflow-x-auto mt-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Facility</th>
                  <th>Location</th>
                  <th>Annual Savings</th>
                  <th>ROI</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.topFacilities.map(facility => (
                  <tr key={facility.id}>
                    <td className="font-medium">{facility.name}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <MdLocationOn className="text-primary" />
                        {facility.location}
                      </div>
                    </td>
                    <td className="text-success">{facility.savings}</td>
                    <td>{facility.roi}</td>
                    <td>
                      <span className={`badge ${
                        facility.status === "Interested" ? "badge-success" :
                        facility.status === "Follow-up Scheduled" ? "badge-info" :
                        facility.status === "Email Opened" ? "badge-warning" :
                        facility.status === "Email Sent" ? "badge-primary" :
                        "badge-ghost"
                      }`}>
                        {facility.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="card-actions justify-end mt-4">
            <button 
              onClick={() => navigate('/outreach-tracking')}
              className="btn btn-outline"
            >
              View All Facilities
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Imperum Solis Dashboard</h1>
          <p className="text-gray-500">
            Automate solar sales with facility data scraping, energy analysis, and personalized outreach
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WorkflowStep 
            number={1}
            title="Facility Data Scraper"
            description="Scrape and enrich commercial facility data"
            icon={<MdFactory />}
            route="/facility-data-scraper"
            stats={
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Facilities</div>
                  <div className="stat-value">{dashboardData.facilitiesScraped.total}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Enriched</div>
                  <div className="stat-value text-primary">{dashboardData.facilitiesScraped.enriched}</div>
                  <div className="stat-desc">{dashboardData.facilitiesScraped.percentage}% complete</div>
                </div>
              </div>
            }
          />
          
          <WorkflowStep 
            number={2}
            title="Facility AI Analysis"
            description="Analyze facilities with AI to determine size and type"
            icon={<MdOutlineRoofing />}
            route="/facility-ai-analysis"
            stats={
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Analyzed</div>
                  <div className="stat-value">{dashboardData.facilitiesAnalyzed.total}</div>
                  <div className="stat-desc">{dashboardData.facilitiesAnalyzed.percentage}% of scraped facilities</div>
                </div>
              </div>
            }
          />
          
          <WorkflowStep 
            number={3}
            title="Energy Usage Estimation"
            description="Estimate facility energy usage and costs"
            icon={<MdElectricBolt />}
            route="/energy-usage-estimation"
            stats={
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Avg. Annual Usage</div>
                  <div className="stat-value text-secondary">{dashboardData.energyEstimations.averageUsage}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Avg. Annual Cost</div>
                  <div className="stat-value text-secondary">{dashboardData.energyEstimations.averageCost}</div>
                </div>
              </div>
            }
          />
          
          <WorkflowStep 
            number={4}
            title="Solar Panel Potential"
            description="Calculate solar potential, ROI, and savings"
            icon={<MdSolarPower />}
            route="/solar-panel-potential"
            stats={
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Avg. ROI</div>
                  <div className="stat-value text-accent">{dashboardData.solarPotential.averageROI}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Avg. Payback</div>
                  <div className="stat-value text-accent">{dashboardData.solarPotential.averagePayback}</div>
                </div>
              </div>
            }
          />
          
          <WorkflowStep 
            number={5}
            title="Email Automation"
            description="Create and send personalized outreach emails"
            icon={<MdOutlineEmail />}
            route="/email-automation"
            stats={
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Emails Sent</div>
                  <div className="stat-value">{dashboardData.emailCampaigns.emailsSent}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Open Rate</div>
                  <div className="stat-value text-info">{dashboardData.emailCampaigns.openRate}%</div>
                </div>
              </div>
            }
          />
          
          <WorkflowStep 
            number={6}
            title="Outreach Tracking"
            description="Track email opens, replies, and follow-ups"
            icon={<MdOutlineTrackChanges />}
            route="/outreach-tracking"
            stats={
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Reply Rate</div>
                  <div className="stat-value text-success">{dashboardData.emailCampaigns.repliedRate}%</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Interest Rate</div>
                  <div className="stat-value text-success">{dashboardData.emailCampaigns.interestedRate}%</div>
                </div>
              </div>
            }
          />
        </div>
        
        <TopFacilitiesBox />
      </div>
    </div>
  );
};

export default Home;
