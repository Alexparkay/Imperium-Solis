import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowForward, MdOutlineEmail, MdScheduleSend, MdSend, MdOutlinePersonAdd, MdOutlineSettings, MdOutlineRule } from 'react-icons/md';
import { FaRegCopy, FaRegEdit, FaRegSave, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface Facility {
  id: number;
  name: string;
  industry: string;
  location: string;
  manager: string;
  email: string;
  phone: string;
  analysis: {
    facilityType: string;
    squareFootage: number;
    energyRate: number;
    roofArea: number;
  };
  energyEstimation: {
    annualUsage: number;
    annualCost: number;
  };
  solarPotential: {
    calculated: boolean;
    maxPanels: number;
    annualProduction: number;
    installationCost: number;
    annualSavings: number;
    paybackPeriod: number;
    roi: number;
  };
  emailStatus: {
    drafted: boolean;
    sent: boolean;
    scheduled: boolean;
    scheduledDate?: Date;
  };
}

const EmailAutomation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('independent_research');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  
  // Email templates
  const templates = [
    {
      id: 'independent_research',
      name: 'Independent Research',
      subject: 'Independent research on {{company}}\'s energy savings',
      body: `Hey {{name}},

I came across {{company}} and was really impressed by your work in the renewable energy sector. I decided to run some independent research on your facility at {{location}} to see if solar could be a game-changer for you.

Based on our calculations, your facility's estimated energy usage is 249,087 kWh per year, with a rough annual electricity cost of £77,217. If you were to install 155.7 kW of solar panels, you could generate 1823% of your energy needs in-house and save around £47,892 per year. With available solar incentives, your return on investment would be just 8.2 years.

Would you be interested in seeing a visualisation of this data? I'll send it right away!

Best,
Your Name`
    },
    {
      id: 'solar_intro',
      name: 'Solar Introduction',
      subject: 'Reduce Energy Costs with Solar - Personalized Analysis for {{company}}',
      body: `Dear {{name}},

I hope this email finds you well. I'm reaching out because we've conducted an analysis of {{company}}'s facility at {{location}} and identified significant potential for solar energy savings.

Our analysis shows:
• Potential annual savings of $77,217
• 155.7 kW system capacity
• 622 solar panels
• 1823% energy coverage

Would you be available for a 15-minute call next week to discuss how these savings could benefit {{company}}?

Best regards,
Your Name
Solar Energy Consultant`
    },
    {
      id: 'solar_followup',
      name: 'Solar Follow-up',
      subject: 'Following Up: Solar Energy Savings for {{company}}',
      body: `Dear {{name}},

I wanted to follow up on my previous email regarding the solar energy potential we identified for {{company}}'s facility.

Our analysis indicates that implementing solar energy at your facility could result in:
• Significant reduction in energy costs
• Protection against rising utility rates
• Enhanced sustainability profile
• Potential tax incentives and rebates

I'd be happy to share our detailed analysis with you. Would you have time for a brief call this week?

Best regards,
Your Name
Solar Energy Consultant`
    },
    {
      id: 'solar_proposal',
      name: 'Solar Proposal',
      subject: 'Solar Energy Proposal for {{company}}',
      body: `Dear {{name}},

Thank you for your interest in exploring solar energy solutions for {{company}}. As promised, I've attached our detailed proposal for your facility at {{location}}.

Key highlights of our proposal:
• System Size: 155.7 kW
• Annual Production: 249,087 kWh
• Annual Savings: $77,217
• ROI Timeline: Detailed in the attached proposal
• Environmental Impact: Reduction of 176 tons of CO2 annually

Please review the attached proposal at your convenience. I'm available to answer any questions you might have or to schedule a site visit.

Best regards,
Your Name
Solar Energy Consultant`
    }
  ];
  
  // Contact data
  const contacts = [
    {
      id: 1,
      name: "Jeff Levy",
      email: "j.levy@example.com",
      company: "Apple",
      location: "Atlanta, GA",
      position: "Facilities Manager"
    },
    {
      id: 2,
      name: "Amy Huke",
      email: "a.huke@example.com",
      company: "Honeywell",
      location: "Kansas City, MO",
      position: "Facilities Manager"
    },
    {
      id: 3,
      name: "Ryan Kuddes",
      email: "r.kuddes@example.com",
      company: "Apple",
      location: "Denver, CO",
      position: "Facilities Manager"
    },
    {
      id: 4,
      name: "Zuretti Carter",
      email: "z.carter@example.com",
      company: "ChargePoint",
      location: "San Francisco, CA",
      position: "Facilities Manager"
    },
    {
      id: 5,
      name: "Scott Simpson",
      email: "s.simpson@example.com",
      company: "Plexus Corp.",
      location: "Neenah, WI",
      position: "Facilities Manager"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Set default template
      const defaultTemplate = templates.find(t => t.id === 'independent_research');
      if (defaultTemplate) {
        setEmailSubject(defaultTemplate.subject);
        setEmailBody(defaultTemplate.body);
      }
      
      // Set default selected contacts
      setSelectedContacts([contacts[0].name, contacts[2].name]);
      
      // Default scheduled date/time (tomorrow at 9am)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setScheduledDate(tomorrow.toISOString().split('T')[0]);
      setScheduledTime('09:00');
    }, 1000);
  }, []);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setEmailSubject(template.subject);
      setEmailBody(template.body);
    }
  };

  const handleContactToggle = (name: string) => {
    setSelectedContacts(prev => {
      if (prev.includes(name)) {
        return prev.filter(n => n !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const handleSendEmails = () => {
    if (selectedContacts.length === 0) {
      toast.error('Please select at least one contact');
      return;
    }
    
    toast.success(`${selectedContacts.length} emails scheduled for ${scheduledDate} at ${scheduledTime}`);
    
    // Navigate to outreach tracking after a short delay
    setTimeout(() => {
      navigate('/outreach-tracking');
    }, 1500);
  };

  const handleContinueToOutreachTracking = () => {
    navigate('/outreach-tracking');
  };

  const personalize = (text: string, contact: any) => {
    return text
      .replace(/{{name}}/g, contact.name)
      .replace(/{{company}}/g, contact.company)
      .replace(/{{location}}/g, contact.location)
      .replace(/{{position}}/g, contact.position);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 22px)',
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="loading loading-spinner loading-lg text-amber-500 relative"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Loading Email Automation</h2>
            <p className="text-gray-400">Preparing your email templates and contacts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 py-4 px-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/solar-panel-potential')}
                className="btn btn-circle btn-ghost hover:bg-amber-500/10 transition-colors"
              >
                <MdArrowBack size={24} className="text-amber-500" />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                Email Automation
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Email Templates and Editor */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Email Templates */}
              <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Subtle pattern background */}
                <div className="absolute inset-0 opacity-[0.02]">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60' fill='none' stroke='%23000000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      backgroundSize: '60px 60px'
                    }}
                  ></div>
                </div>
                
                {/* Subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent"></div>
                
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <MdOutlineEmail size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Email Templates
                      </h2>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex flex-col gap-3">
                      {templates.map(template => (
                        <div 
                          key={template.id}
                          className={`card bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ${
                            selectedTemplate === template.id 
                              ? 'ring-2 ring-amber-500 shadow-lg transform scale-[1.02]' 
                              : ''
                          }`}
                          onClick={() => handleTemplateChange(template.id)}
                        >
                          <div className="card-body p-4">
                            <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{template.subject}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <button className="btn btn-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 gap-2 shadow-lg hover:shadow-xl transition-all">
                        <FaRegEdit size={16} />
                        Create New Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Automation Settings (Collapsible) */}
              <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="card-body relative z-10">
                  <details className="w-full">
                    <summary className="flex items-center gap-6 cursor-pointer">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg">
                        <MdOutlineSettings size={24} />
                      </div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                        Automation Settings
                      </h2>
                    </summary>
                    
                    <div className="mt-6 space-y-4 pl-16">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Follow-up Timing</span>
                        </label>
                        <select className="select select-bordered w-full bg-white dark:bg-gray-800">
                          <option value="3">After 3 days</option>
                          <option value="5">After 5 days</option>
                          <option value="7">After 7 days</option>
                          <option value="14">After 14 days</option>
                        </select>
                      </div>
                      
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Maximum Follow-ups</span>
                        </label>
                        <select className="select select-bordered w-full bg-white dark:bg-gray-800">
                          <option value="1">1 follow-up</option>
                          <option value="2">2 follow-ups</option>
                          <option value="3">3 follow-ups</option>
                        </select>
                      </div>
                      
                      <div className="form-control">
                        <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                          <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                          <span className="label-text">Stop sequence if reply received</span>
                        </label>
                      </div>
                      
                      <div className="form-control">
                        <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                          <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                          <span className="label-text">Track email opens and clicks</span>
                        </label>
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              {/* Delivery Rules (Collapsible) */}
              <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="card-body relative z-10">
                  <details className="w-full">
                    <summary className="flex items-center gap-6 cursor-pointer">
                      <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-xl text-white shadow-lg">
                        <MdOutlineRule size={24} />
                      </div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                        Delivery Rules
                      </h2>
                    </summary>
                    
                    <div className="mt-6 space-y-4 pl-16">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Delivery Window</span>
                        </label>
                        <div className="flex gap-4">
                          <input 
                            type="time" 
                            className="input input-bordered flex-1 bg-white dark:bg-gray-800"
                            defaultValue="09:00"
                          />
                          <input 
                            type="time" 
                            className="input input-bordered flex-1 bg-white dark:bg-gray-800"
                            defaultValue="17:00"
                          />
                        </div>
                      </div>
                      
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Time Zone</span>
                        </label>
                        <select className="select select-bordered w-full bg-white dark:bg-gray-800">
                          <option>Recipient's Local Time</option>
                          <option>Your Local Time</option>
                          <option>UTC</option>
                        </select>
                      </div>
                      
                      <div className="form-control">
                        <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                          <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                          <span className="label-text">Respect business hours only</span>
                        </label>
                      </div>
                      
                      <div className="form-control">
                        <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                          <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                          <span className="label-text">Skip weekends</span>
                        </label>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* Right Column - Email Editor and Preview */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Email Editor */}
              <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Subtle pattern background */}
                <div className="absolute inset-0 opacity-[0.02]">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='0.5' fill='%23000000'/%3E%3C/svg%3E")`,
                      backgroundSize: '20px 20px'
                    }}
                  ></div>
                </div>
                
                {/* Subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent"></div>
                
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <FaRegEdit size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Email Editor
                      </h2>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Subject</span>
                      </label>
                      <input 
                        type="text" 
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="input input-bordered w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Email Body</span>
                      </label>
                      <textarea 
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        className="textarea textarea-bordered h-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button className="btn btn-sm bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 gap-2 shadow-lg hover:shadow-xl transition-all">
                        <FaRegCopy size={16} />
                        Copy
                      </button>
                      <button className="btn btn-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 gap-2 shadow-lg hover:shadow-xl transition-all">
                        <FaRegSave size={16} />
                        Save as Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Preview */}
              <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Subtle pattern background */}
                <div className="absolute inset-0 opacity-[0.02]">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 L40 0' stroke='%23000000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      backgroundSize: '40px 40px'
                    }}
                  ></div>
                </div>
                
                {/* Subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent"></div>
                
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <MdOutlineEmail size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        Email Preview
                      </h2>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    {selectedContacts.length > 0 ? (
                      <div className="bg-gradient-to-br from-gray-50/90 to-gray-50/70 dark:from-gray-800/90 dark:to-gray-800/70 rounded-xl p-6 backdrop-blur-lg shadow-inner">
                        <div className="mb-2 text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span className="font-medium">To:</span>
                          <div className="flex items-center gap-1">
                            <span className="bg-amber-500/10 px-2 py-1 rounded">{contacts.find(c => c.name === selectedContacts[0])?.email}</span>
                            {selectedContacts.length > 1 && (
                              <span className="bg-amber-500/10 px-2 py-1 rounded">+{selectedContacts.length - 1} more</span>
                            )}
                          </div>
                        </div>
                        <div className="mb-4 text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Subject:</span>
                          <div className="bg-amber-500/10 px-3 py-2 rounded mt-1">
                            {personalize(emailSubject, contacts.find(c => c.name === selectedContacts[0]))}
                          </div>
                        </div>
                        <div className="whitespace-pre-line border-t border-gray-200 dark:border-gray-700 pt-4 text-gray-900 dark:text-white">
                          {personalize(emailBody, contacts.find(c => c.name === selectedContacts[0]))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gradient-to-br from-gray-50/90 to-gray-50/70 dark:from-gray-800/90 dark:to-gray-800/70 rounded-xl backdrop-blur-lg">
                        <div className="text-amber-500 mb-4">
                          <MdOutlineEmail size={48} className="mx-auto" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Select a contact to preview the personalized email
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Selection and Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Contact Selection */}
            <div className="lg:col-span-2 card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              {/* Subtle pattern background */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 h40 M20 0 v40' stroke='%23000000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                  }}
                ></div>
              </div>
              
              {/* Subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent"></div>
              
              <div className="card-body relative z-10">
                <div className="flex items-start gap-6 mb-8">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <MdOutlinePersonAdd size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                      Select Recipients
                    </h2>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-col gap-2">
                    {contacts.map(contact => (
                      <div 
                        key={contact.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r hover:from-gray-50/50 hover:to-gray-100/50 dark:hover:from-gray-800/50 dark:hover:to-gray-700/50 transition-all duration-300 group/contact"
                      >
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="checkbox checkbox-primary"
                            checked={selectedContacts.includes(contact.name)}
                            onChange={() => handleContactToggle(contact.name)}
                          />
                          <div className="absolute inset-0 bg-amber-500/20 rounded-lg filter blur-lg opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="transform group-hover/contact:translate-x-1 transition-transform duration-300">
                          <div className="font-medium text-gray-900 dark:text-white">{contact.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{contact.email}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">{contact.company} - {contact.position}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedContacts.length} contacts selected
                    </span>
                    <button className="btn btn-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 gap-2 shadow-lg hover:shadow-xl transition-all">
                      Import Contacts
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              {/* Subtle pattern background */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='20' height='20' x='5' y='5' fill='none' stroke='%23000000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                  }}
                ></div>
              </div>
              
              {/* Subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent"></div>
              
              <div className="card-body relative z-10">
                <div className="flex items-start gap-6 mb-8">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <MdScheduleSend size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                      Schedule Delivery
                    </h2>
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Date</span>
                    </label>
                    <div className="relative group/input">
                      <input 
                        type="date" 
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="input input-bordered w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-amber-500 focus:ring-amber-500 pr-10"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Time</span>
                    </label>
                    <div className="relative group/input">
                      <input 
                        type="time" 
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="input input-bordered w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-amber-500 focus:ring-amber-500 pr-10"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                      <input type="checkbox" className="checkbox checkbox-primary" />
                      <span className="label-text group-hover/checkbox:text-amber-500 transition-colors duration-300">
                        Send follow-up if no response after 3 days
                      </span>
                    </label>
                  </div>
                  
                  <button 
                    onClick={handleSendEmails}
                    className="btn w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group/button relative overflow-hidden"
                    disabled={selectedContacts.length === 0}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-1000"></div>
                    <MdSend size={18} className="transform group-hover/button:rotate-12 transition-transform duration-300" />
                    {selectedContacts.length > 0 
                      ? `Schedule ${selectedContacts.length} Emails` 
                      : 'Select Recipients First'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Continue Button */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleContinueToOutreachTracking}
              className="relative group overflow-hidden"
            >
              <div className="relative z-10 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 px-8 rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-3">
                <span className="text-lg">Continue to Outreach Tracking</span>
                <MdArrowForward className="text-2xl group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              
              {/* Button decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAutomation; 