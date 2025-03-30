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
      <div className="min-h-screen bg-[#020305] flex items-center justify-center relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
        <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="loading loading-spinner loading-lg text-orange-500 relative"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Loading Email Automation</h2>
            <p className="text-white/60">Preparing your email templates and contacts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-1 py-2 bg-[#020305] min-h-screen min-w-full relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center sticky top-0 z-50 backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 py-4 px-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/solar-panel-potential')}
                className="btn btn-circle bg-transparent hover:bg-orange-500/10 border border-orange-500/30 transition-colors"
              >
                <MdArrowBack size={24} className="text-orange-500" />
              </button>
              <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                Email Automation
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Email Templates and Editor */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Email Templates */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-4 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <MdOutlineEmail size={24} />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Email Templates</h2>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-col gap-3">
                    {templates.map(template => (
                      <div 
                        key={template.id}
                        className={`backdrop-blur-md bg-[#28292b]/40 rounded-lg p-3 border border-orange-500/10 cursor-pointer hover:border-orange-500/30 transition-all duration-300 ${
                          selectedTemplate === template.id 
                            ? 'ring-1 ring-orange-500 shadow-lg shadow-orange-500/10' 
                            : ''
                        }`}
                        onClick={() => handleTemplateChange(template.id)}
                      >
                        <h3 className="font-medium text-white">{template.name}</h3>
                        <p className="text-sm text-white/60 truncate">{template.subject}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <button className="btn btn-sm bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0 gap-2 shadow-lg hover:shadow-orange-500/20 transition-all">
                      <FaRegEdit size={16} />
                      Create New Template
                    </button>
                  </div>
                </div>
              </div>

              {/* Automation Settings (Collapsible) */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-4 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300">
                <details className="w-full">
                  <summary className="flex items-center gap-3 cursor-pointer mb-4">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <MdOutlineSettings size={24} />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Automation Settings</h2>
                  </summary>
                  
                  <div className="mt-6 space-y-4 pl-12">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-white/80">Follow-up Timing</span>
                      </label>
                      <select className="select w-full backdrop-blur-md bg-[#28292b]/60 border border-orange-500/20 text-white focus:border-orange-500">
                        <option value="3">After 3 days</option>
                        <option value="5">After 5 days</option>
                        <option value="7">After 7 days</option>
                        <option value="14">After 14 days</option>
                      </select>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-white/80">Maximum Follow-ups</span>
                      </label>
                      <select className="select w-full backdrop-blur-md bg-[#28292b]/60 border border-orange-500/20 text-white focus:border-orange-500">
                        <option value="1">1 follow-up</option>
                        <option value="2">2 follow-ups</option>
                        <option value="3">3 follow-ups</option>
                      </select>
                    </div>
                    
                    <div className="form-control">
                      <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                        <input type="checkbox" className="checkbox checkbox-warning" defaultChecked />
                        <span className="label-text text-white/80">Stop sequence if reply received</span>
                      </label>
                    </div>
                    
                    <div className="form-control">
                      <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                        <input type="checkbox" className="checkbox checkbox-warning" defaultChecked />
                        <span className="label-text text-white/80">Track email opens and clicks</span>
                      </label>
                    </div>
                  </div>
                </details>
              </div>

              {/* Delivery Rules (Collapsible) */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-4 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300">
                <details className="w-full">
                  <summary className="flex items-center gap-3 cursor-pointer mb-4">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <MdOutlineRule size={24} />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Delivery Rules</h2>
                  </summary>
                  
                  <div className="mt-6 space-y-4 pl-12">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-white/80">Delivery Window</span>
                      </label>
                      <div className="flex gap-4">
                        <input 
                          type="time" 
                          className="input flex-1 backdrop-blur-md bg-[#28292b]/60 border border-orange-500/20 text-white focus:border-orange-500"
                          defaultValue="09:00"
                        />
                        <input 
                          type="time" 
                          className="input flex-1 backdrop-blur-md bg-[#28292b]/60 border border-orange-500/20 text-white focus:border-orange-500"
                          defaultValue="17:00"
                        />
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-white/80">Time Zone</span>
                      </label>
                      <select className="select w-full backdrop-blur-md bg-[#28292b]/60 border border-orange-500/20 text-white focus:border-orange-500">
                        <option>Recipient's Local Time</option>
                        <option>Your Local Time</option>
                        <option>UTC</option>
                      </select>
                    </div>
                    
                    <div className="form-control">
                      <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                        <input type="checkbox" className="checkbox checkbox-warning" defaultChecked />
                        <span className="label-text text-white/80">Respect business hours only</span>
                      </label>
                    </div>
                    
                    <div className="form-control">
                      <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                        <input type="checkbox" className="checkbox checkbox-warning" defaultChecked />
                        <span className="label-text text-white/80">Skip weekends</span>
                      </label>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Right Column - Email Editor and Preview */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Email Editor */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-4 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <FaRegEdit size={24} />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Email Editor</h2>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-white/80">Subject</span>
                    </label>
                    <input 
                      type="text" 
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="input w-full backdrop-blur-md bg-[#28292b]/60 border border-orange-500/20 text-white focus:border-orange-500"
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-white/80">Email Body</span>
                    </label>
                    <textarea 
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="textarea h-64 backdrop-blur-md bg-[#28292b]/60 border border-orange-500/20 text-white focus:border-orange-500"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-sm bg-gradient-to-br from-[#28292b]/80 to-[#28292b]/60 hover:from-[#28292b]/90 hover:to-[#28292b]/70 text-white border border-orange-500/20 gap-2 shadow-lg hover:shadow-orange-500/10 transition-all">
                      <FaRegCopy size={16} />
                      Copy
                    </button>
                    <button className="btn btn-sm bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0 gap-2 shadow-lg hover:shadow-orange-500/20 transition-all">
                      <FaRegSave size={16} />
                      Save as Template
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Preview */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-4 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <MdOutlineEmail size={24} />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Email Preview</h2>
                </div>
                
                <div className="mt-4">
                  {selectedContacts.length > 0 ? (
                    <div className="backdrop-blur-md bg-[#28292b]/40 rounded-lg p-4 border border-orange-500/10">
                      <div className="mb-2 text-white/80 flex items-center gap-2">
                        <span className="font-medium">To:</span>
                        <div className="flex items-center gap-1">
                          <span className="bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 text-white">{contacts.find(c => c.name === selectedContacts[0])?.email}</span>
                          {selectedContacts.length > 1 && (
                            <span className="bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 text-white">+{selectedContacts.length - 1} more</span>
                          )}
                        </div>
                      </div>
                      <div className="mb-4 text-white/80">
                        <span className="font-medium">Subject:</span>
                        <div className="bg-orange-500/10 px-3 py-2 rounded mt-1 border border-orange-500/20 text-white">
                          {personalize(emailSubject, contacts.find(c => c.name === selectedContacts[0]))}
                        </div>
                      </div>
                      <div className="whitespace-pre-line border-t border-orange-500/20 pt-4 text-white">
                        {personalize(emailBody, contacts.find(c => c.name === selectedContacts[0]))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 backdrop-blur-md bg-[#28292b]/40 rounded-lg border border-orange-500/10">
                      <div className="text-orange-500 mb-4">
                        <MdOutlineEmail size={48} className="mx-auto" />
                      </div>
                      <p className="text-white/60">
                        Select a contact to preview the personalized email
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Selection and Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Contact Selection */}
            <div className="lg:col-span-2 backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-4 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <MdOutlinePersonAdd size={24} />
                </div>
                <h2 className="text-lg font-semibold text-white">Select Recipients</h2>
              </div>
              
              <div className="mt-4">
                <div className="flex flex-col gap-2">
                  {contacts.map(contact => (
                    <div 
                      key={contact.id}
                      className="flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm bg-[#28292b]/30 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group/contact"
                    >
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-warning"
                          checked={selectedContacts.includes(contact.name)}
                          onChange={() => handleContactToggle(contact.name)}
                        />
                        <div className="absolute inset-0 bg-orange-500/20 rounded-lg filter blur-lg opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="transform group-hover/contact:translate-x-1 transition-transform duration-300">
                        <div className="font-medium text-white">{contact.name}</div>
                        <div className="text-sm text-white/80">{contact.email}</div>
                        <div className="text-xs text-white/60">{contact.company} - {contact.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4">
                  <span className="text-sm text-white/60">
                    {selectedContacts.length} contacts selected
                  </span>
                  <button className="btn btn-sm bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0 gap-2 shadow-lg hover:shadow-orange-500/20 transition-all">
                    Import Contacts
                  </button>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-orange-500/15 p-4 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <MdScheduleSend size={24} />
                </div>
                <h2 className="text-lg font-semibold text-white">Schedule Delivery</h2>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-white/80">Date</span>
                  </label>
                  <div className="relative group/input">
                    <input 
                      type="date" 
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="input w-full backdrop-blur-md bg-[#28292b]/60 border border-orange-500/20 text-white focus:border-orange-500 pr-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-white/80">Time</span>
                  </label>
                  <div className="relative group/input">
                    <input 
                      type="time" 
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="input w-full backdrop-blur-md bg-[#28292b]/60 border border-orange-500/20 text-white focus:border-orange-500 pr-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                    <input type="checkbox" className="checkbox checkbox-warning" />
                    <span className="label-text text-white/80 group-hover/checkbox:text-orange-500 transition-colors duration-300">
                      Send follow-up if no response after 3 days
                    </span>
                  </label>
                </div>
                
                <button 
                  onClick={handleSendEmails}
                  className="btn w-full bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0 gap-2 shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group/button relative overflow-hidden"
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
          
          {/* Continue Button */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleContinueToOutreachTracking}
              className="relative group overflow-hidden"
            >
              <div className="relative z-10 bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-4 px-8 rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-3">
                <span className="text-lg">Continue to Outreach Tracking</span>
                <MdArrowForward className="text-2xl group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              
              {/* Button decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAutomation; 