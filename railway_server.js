// server.js - Railway Backend with embedded sample data
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true, // Allow all origins for demo
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'demo-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Sample data embedded in the server
const sampleData = {
  employees: [
    { id: '1', name: 'Abdulla Elkawakjy', department: 'Operations' },
    { id: '2', name: 'Srinivas Ravikumar', department: 'IT' },
    { id: '3', name: 'Moorthy', department: 'Operations' },
    { id: '4', name: 'Abdulaziz Al-Mohsin', department: 'Commercial' },
    { id: '5', name: 'Zaheeruddin Mohamed', department: 'General Services' }
  ],
  
  mandatoryRequirements: [
    { key: 1, department: 'Operations', sow_type: 'Supply', mandatory_requirement: 'Valid commercial registration for supply activities' },
    { key: 2, department: 'Operations', sow_type: 'Supply', mandatory_requirement: 'ISO 9001:2015 Quality Management System certification' },
    { key: 3, department: 'Operations', sow_type: 'Supply', mandatory_requirement: 'Minimum 12 months warranty on all supplied items' },
    { key: 4, department: 'Operations', sow_type: 'Supply', mandatory_requirement: 'Local representative or authorized distributor in Qatar' },
    { key: 5, department: 'Operations', sow_type: 'Services', mandatory_requirement: 'Professional liability insurance coverage' },
    { key: 6, department: 'Operations', sow_type: 'Services', mandatory_requirement: 'Qualified and certified technicians' },
    { key: 7, department: 'IT', sow_type: 'Services', mandatory_requirement: 'Information security compliance certification' },
    { key: 8, department: 'IT', sow_type: 'Supply', mandatory_requirement: 'Equipment compatibility with existing IT infrastructure' }
  ],
  
  evaluationCriteria: [
    {
      key: 1, department: 'Operations', sow_type: 'Supply', included_sections: 'Standard',
      critical_criteria: 'Technical Compliance and Quality', critical_weight: 70,
      criteria_section: 'Technical Specifications', criterion: 'Product Quality Standards',
      criterion_weight: 25, category: 'Material compliance with international standards',
      category_weight: 10
    },
    {
      key: 2, department: 'Operations', sow_type: 'Supply', included_sections: 'Standard',
      critical_criteria: 'Technical Compliance and Quality', critical_weight: 70,
      criteria_section: 'Technical Specifications', criterion: 'Product Quality Standards',
      criterion_weight: 25, category: 'Quality certifications (ISO, CE, etc.)',
      category_weight: 8
    },
    {
      key: 3, department: 'Operations', sow_type: 'Supply', included_sections: 'Standard',
      critical_criteria: 'Technical Compliance and Quality', critical_weight: 70,
      criteria_section: 'Technical Specifications', criterion: 'Product Quality Standards',
      criterion_weight: 25, category: 'Testing and inspection reports',
      category_weight: 7
    },
    {
      key: 4, department: 'Operations', sow_type: 'Supply', included_sections: 'Standard',
      critical_criteria: 'Technical Compliance and Quality', critical_weight: 70,
      criteria_section: 'Technical Specifications', criterion: 'Technical Compliance',
      criterion_weight: 25, category: 'Adherence to technical specifications',
      category_weight: 15
    },
    {
      key: 5, department: 'Operations', sow_type: 'Supply', included_sections: 'Standard',
      critical_criteria: 'Technical Compliance and Quality', critical_weight: 70,
      criteria_section: 'Technical Specifications', criterion: 'Technical Compliance',
      criterion_weight: 25, category: 'Performance parameters compliance',
      category_weight: 10
    },
    {
      key: 6, department: 'Operations', sow_type: 'Supply', included_sections: 'Standard',
      critical_criteria: 'Commercial Evaluation', critical_weight: 30,
      criteria_section: 'Commercial Aspects', criterion: 'Price Competitiveness',
      criterion_weight: 20, category: 'Total cost evaluation',
      category_weight: 12
    },
    {
      key: 7, department: 'Operations', sow_type: 'Supply', included_sections: 'Standard',
      critical_criteria: 'Commercial Evaluation', critical_weight: 30,
      criteria_section: 'Commercial Aspects', criterion: 'Price Competitiveness',
      criterion_weight: 20, category: 'Value for money assessment',
      category_weight: 8
    }
  ]
};

// Sample AI responses
const aiResponses = {
  supply: {
    questions: [
      "What are the specific voltage and current requirements for the electrical equipment?",
      "What is the expected delivery timeline and are there any critical milestones?",
      "Are there any specific installation or commissioning requirements?",
      "What are the maintenance and support expectations post-delivery?"
    ],
    sections: {
      "section1_placeholder": {
        title: "1. Introduction and Scope",
        content: `This document outlines the comprehensive scope of work for the supply of electrical equipment and instrumentation systems required for the operational enhancement of QPMC facilities.

The scope encompasses:
• Assessment and analysis of current electrical infrastructure requirements
• Supply of high-quality electrical components and instrumentation systems
• Ensuring compliance with international safety standards and local regulations
• Integration capabilities with existing operational systems
• Comprehensive performance testing and validation procedures

The successful contractor shall provide all necessary materials, equipment, expertise, and documentation to ensure successful project completion within the specified timeline and budget constraints while maintaining the highest standards of quality and safety.`
      },
      "section2_placeholder": {
        title: "2. Technical Specifications and Requirements",
        content: `All equipment and materials supplied under this contract shall conform to the following technical specifications and requirements:

ELECTRICAL REQUIREMENTS:
• Voltage Rating: 415V AC, 3-phase, 50Hz (or as specified in technical schedules)
• Protection Rating: IP65 minimum for outdoor installations, IP54 for indoor applications
• Operating Temperature Range: -10°C to +50°C ambient temperature
• Humidity Tolerance: Up to 95% relative humidity, non-condensing
• Altitude: Operation up to 1000m above sea level without derating

COMPLIANCE STANDARDS:
• IEC 61010 series for electrical safety requirements
• IEEE standards for instrumentation and control systems
• BS EN standards for materials and construction
• Qatar General Organization for Standards and Metrology (QS) requirements
• Local electrical authority regulations and codes

DOCUMENTATION REQUIREMENTS:
• Complete technical datasheets and specifications
• Installation, operation, and maintenance manuals in English and Arabic
• Quality assurance and compliance certificates
• Factory acceptance test reports and calibration certificates
• Spare parts recommendations and availability confirmation`
      },
      "section3_placeholder": {
        title: "3. Delivery, Installation and Commissioning",
        content: `DELIVERY REQUIREMENTS:
• All items shall be delivered to QPMC facilities in Mesaieed Industrial City
• Delivery schedule to be coordinated with QPMC operations team with minimum 48 hours advance notice
• Packaging shall be suitable for Qatar's climate conditions with adequate protection against humidity, dust, and temperature variations
• Comprehensive insurance coverage during transport, handling, and storage until final acceptance

INSTALLATION SERVICES:
• Professional installation by factory-trained and certified technicians
• All installation work to be coordinated with QPMC operations to minimize disruption
• Adherence to QPMC safety protocols and permit-to-work procedures
• Integration with existing plant control systems where applicable
• Installation work to be performed during approved maintenance windows

TESTING AND COMMISSIONING:
• Pre-installation testing of all equipment at supplier's facility
• Comprehensive integrated system testing upon installation
• Performance verification against specified parameters
• Documentation of all test results and commissioning reports
• Training for QPMC personnel on operation and basic maintenance procedures`
      }
    }
  }
};

// Authentication middleware (simplified for demo)
const authMiddleware = (req, res, next) => {
  req.user = {
    id: req.headers['user-id'] || 'demo-user',
    name: req.headers['user-name'] || 'Demo User',
    department: req.headers['user-department'] || 'Operations'
  };
  next();
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Get initial data for dropdowns
app.get('/api/initial-data', authMiddleware, (req, res) => {
  try {
    const departments = [...new Set(sampleData.employees.map(emp => emp.department))];
    
    const categories = {
      "Supply": ["Open Contract", "Parts Purchase", "Asset Purchase", "Other Supply"],
      "Services": ["Outsourcing (Crusher)", "Technical Services", "Installation", "Inspection", "AMC", "Design, Consultation", "Hiring", "Other Services"],
      "Works": ["Supply + Installation", "Refurbishment", "Projects (CCTV, Fencing)", "Upgrading", "Other Works"]
    };

    res.json({
      employees: sampleData.employees.map(emp => emp.name),
      departments,
      categories,
      contractDurations: [
        "1YR fixed",
        "1YR initial+(1) Renewal and/or extension thereof",
        "1YR initial+(1) Renewal +(1) Renewal and/or extension thereof",
        "2YR fixed",
        "2YR initial+(2) Renewal and/or extension thereof",
        "2YR initial+(2) Renewal +(2) Renewal and/or extension thereof",
        "2YR initial+(1) Renewal and/or extension thereof",
        "3YR fixed",
        "3YR initial+(3) Renewal and/or extension thereof",
        "3YR initial+(3) Extension +(3) Renewal and/or extension thereof",
        "4YR fixed",
        "4YR initial+(3) Extension +(3) Renewal and/or extension thereof",
        "4YR fixed initial+(4) Extension +(4) Renewal and/or extension thereof",
        "Based on Employer/3rd Party Proposed Timeline",
        "Others: (specify duration)"
      ],
      tradeCategories: [
        "Electrical & Instrumentation",
        "Mechanical",
        "Piping & Fitting",
        "Maintenance, Repair & Operations",
        "Structural",
        "Parts and Tools",
        "Consumables",
        "Health, Safety and Environment",
        "Non-Project Related Services",
        "Manpower & Resources",
        "Facility Management",
        "IT Services and Supply",
        "Paints, Lubricants and Chemicals",
        "Gasses and Oil",
        "Food & Beverages",
        "Others: (specify category)"
      ]
    });
  } catch (error) {
    console.error('Error loading initial data:', error);
    res.status(500).json({ error: 'Failed to load initial data' });
  }
});

// Get evaluation criteria departments
app.get('/api/criteria/departments', authMiddleware, (req, res) => {
  try {
    const departments = [...new Set(sampleData.evaluationCriteria.map(item => item.department))];
    res.json(departments);
  } catch (error) {
    console.error('Error loading departments:', error);
    res.status(500).json({ error: 'Failed to load departments' });
  }
});

// Get SOW types for department
app.get('/api/criteria/sow-types/:department', authMiddleware, (req, res) => {
  try {
    const sowTypes = [...new Set(
      sampleData.evaluationCriteria
        .filter(item => item.department === req.params.department)
        .map(item => item.sow_type)
    )];
    res.json(sowTypes);
  } catch (error) {
    console.error('Error loading SOW types:', error);
    res.status(500).json({ error: 'Failed to load SOW types' });
  }
});

// Get included sections
app.get('/api/criteria/included-sections/:department/:sowType', authMiddleware, (req, res) => {
  try {
    const sections = [...new Set(
      sampleData.evaluationCriteria
        .filter(item => 
          item.department === req.params.department && 
          item.sow_type === req.params.sowType
        )
        .map(item => item.included_sections)
    )];
    res.json(sections.length > 0 ? sections : ['Standard', 'Standard + Resources & Personnel Expertise']);
  } catch (error) {
    console.error('Error loading included sections:', error);
    res.status(500).json({ error: 'Failed to load included sections' });
  }
});

// Get critical criteria
app.get('/api/criteria/critical/:department/:sowType/:includedSections', authMiddleware, (req, res) => {
  try {
    const { department, sowType, includedSections } = req.params;
    
    const criticalCriteria = [...new Set(
      sampleData.evaluationCriteria
        .filter(item => 
          item.department === department && 
          item.sow_type === sowType &&
          item.included_sections === includedSections
        )
        .map(item => item.critical_criteria)
    )];
    
    res.json(criticalCriteria.length > 0 ? criticalCriteria : ['Technical Compliance and Quality', 'Commercial Evaluation']);
  } catch (error) {
    console.error('Error loading critical criteria:', error);
    res.status(500).json({ error: 'Failed to load critical criteria' });
  }
});

// Get critical weights
app.get('/api/criteria/weights/:department/:sowType/:includedSections/:critical', authMiddleware, (req, res) => {
  try {
    const { department, sowType, includedSections, critical } = req.params;
    
    const weights = [...new Set(
      sampleData.evaluationCriteria
        .filter(item => 
          item.department === department && 
          item.sow_type === sowType &&
          item.included_sections === includedSections &&
          item.critical_criteria === critical
        )
        .map(item => item.critical_weight.toString())
    )];
    
    res.json(weights.length > 0 ? weights : ['70', '80']);
  } catch (error) {
    console.error('Error loading weights:', error);
    res.status(500).json({ error: 'Failed to load weights' });
  }
});

// Get evaluation criteria
app.get('/api/criteria/evaluation/:department/:sowType/:includedSections/:critical/:weight', authMiddleware, (req, res) => {
  try {
    const { department, sowType, includedSections, critical, weight } = req.params;
    
    const filteredCriteria = sampleData.evaluationCriteria.filter(item => 
      item.department === department && 
      item.sow_type === sowType &&
      item.included_sections === includedSections &&
      item.critical_criteria === critical &&
      item.critical_weight.toString() === weight
    );

    // Group by section and criterion
    const grouped = {};
    filteredCriteria.forEach(item => {
      const section = item.criteria_section;
      const criterion = item.criterion;
      
      if (!grouped[section]) {
        grouped[section] = {};
      }
      
      if (!grouped[section][criterion]) {
        grouped[section][criterion] = {
          criterion_weight: item.criterion_weight,
          categories: []
        };
      }
      
      grouped[section][criterion].categories.push({
        category: item.category,
        category_weight: item.category_weight
      });
    });

    res.json(grouped);
  } catch (error) {
    console.error('Error loading evaluation criteria:', error);
    res.status(500).json({ error: 'Failed to load evaluation criteria' });
  }
});

// Get mandatory requirements
app.get('/api/mandatory-requirements/:sowType', authMiddleware, (req, res) => {
  try {
    const requirements = sampleData.mandatoryRequirements
      .filter(item => item.sow_type === req.params.sowType)
      .map(item => item.mandatory_requirement);
    
    res.json(requirements.length > 0 ? requirements : [
      'Valid commercial registration',
      'ISO certification required',
      'Minimum 1 year warranty',
      'Local support presence'
    ]);
  } catch (error) {
    console.error('Error loading mandatory requirements:', error);
    res.status(500).json({ error: 'Failed to load mandatory requirements' });
  }
});

// Save session data
app.post('/api/session/save', authMiddleware, (req, res) => {
  try {
    const { section, data } = req.body;
    
    if (!req.session.sowData) {
      req.session.sowData = {};
    }
    
    req.session.sowData[section] = data;
    res.json({ success: true, message: 'Session data saved successfully' });
  } catch (error) {
    console.error('Error saving session:', error);
    res.status(500).json({ error: 'Failed to save session data' });
  }
});

// Get session data
app.get('/api/session/get/:section?', authMiddleware, (req, res) => {
  try {
    const section = req.params.section;
    
    if (section) {
      res.json(req.session.sowData?.[section] || {});
    } else {
      res.json(req.session.sowData || {});
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: 'Failed to retrieve session data' });
  }
});

// Generate AI draft
app.post('/api/generate-draft', authMiddleware, (req, res) => {
  try {
    const { sowType, sowSubCategory, sowTitle, briefDescription, contractDuration, userInstructions } = req.body;
    
    // Simulate AI processing delay
    setTimeout(() => {
      const response = aiResponses[sowType.toLowerCase()] || aiResponses.supply;
      
      // Customize the response based on input
      const customizedSections = { ...response.sections };
      Object.keys(customizedSections).forEach(key => {
        customizedSections[key].content = customizedSections[key].content
          .replace(/electrical equipment/gi, briefDescription || 'required items')
          .replace(/QPMC/g, 'Client Organization');
      });
      
      res.json({
        questions: response.questions,
        sections: customizedSections
      });
    }, 2000); // 2 second delay to simulate AI processing
    
  } catch (error) {
    console.error('Error generating draft:', error);
    res.status(500).json({ error: 'Failed to generate draft' });
  }
});

// File upload endpoints (simplified for demo)
app.post('/api/upload/boq', authMiddleware, (req, res) => {
  try {
    // In a real implementation, you would handle file upload here
    // For demo purposes, we'll just acknowledge the upload
    res.json({ 
      success: true, 
      message: 'BoQ file uploaded successfully',
      filename: 'demo_boq.csv'
    });
  } catch (error) {
    console.error('Error uploading BoQ:', error);
    res.status(500).json({ error: 'Failed to upload BoQ file' });
  }
});

app.post('/api/upload/images', authMiddleware, (req, res) => {
  try {
    // In a real implementation, you would handle file upload here
    // For demo purposes, we'll just acknowledge the upload
    res.json({ 
      success: true, 
      message: 'Images uploaded successfully',
      count: 2 // Demo count
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// Generate final document
app.post('/api/generate-document', authMiddleware, (req, res) => {
  try {
    const formData = req.body;
    
    // Create a demo document content
    const documentContent = `
SOW GENERATOR DEMO DOCUMENT
===========================

Title: ${formData.sowTitle || 'Sample SOW'}
Requestor: ${formData.requestorName || 'Demo User'}
Department: ${formData.requestingDept || 'Demo Department'}
Date: ${new Date().toLocaleDateString()}

SCOPE OF WORK:
${formData.briefDescription || 'This is a demo SOW document generated by the AI SOW Generator system.'}

AI GENERATED SECTIONS:
${Object.entries(formData.aiSections || {}).map(([key, section]) => `
${section.title}
${'-'.repeat(section.title.length)}
${section.content}
`).join('\n')}

MANDATORY REQUIREMENTS:
${(formData.selectedMandatoryReqs || []).map((req, index) => `${index + 1}. ${req}`).join('\n')}

Generated on: ${new Date().toISOString()}
System: SOW Generator v1.0
`;

    // Set headers for file download
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="SOW_${new Date().toISOString().slice(0, 10)}.txt"`);
    res.send(documentContent);

  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({ error: 'Failed to generate document' });
  }
});

// Clear session
app.post('/api/session/clear', authMiddleware, (req, res) => {
  try {
    req.session.sowData = {};
    res.json({ success: true, message: 'Session cleared successfully' });
  } catch (error) {
    console.error('Error clearing session:', error);
    res.status(500).json({ error: 'Failed to clear session' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SOW Generator API server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;