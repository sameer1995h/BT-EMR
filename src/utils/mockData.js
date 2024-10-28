export const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "123-456-7890",
    lastVisit: "2024-02-20",
    condition: "Hypertension",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    phone: "098-765-4321",
    lastVisit: "2024-02-19",
    condition: "Diabetes",
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 28,
    gender: "Male",
    phone: "555-123-4567",
    lastVisit: "2024-02-18",
    condition: "Asthma",
  },
  {
    id: 4,
    name: "Sarah Williams",
    age: 52,
    gender: "Female",
    phone: "777-888-9999",
    lastVisit: "2024-02-17",
    condition: "Arthritis",
  }
];

export const medicalHistories = [
  {
    id: 1,
    patientId: 1,
    date: "2024-02-20",
    type: "Diagnosis",
    description: "Initial diagnosis of Hypertension",
    notes: "BP: 150/95, Patient reports occasional headaches",
    doctor: "Dr. Smith"
  },
  {
    id: 2,
    patientId: 1,
    date: "2024-01-15",
    type: "Surgery",
    description: "Appendectomy",
    notes: "Successful laparoscopic procedure",
    doctor: "Dr. Johnson"
  }
];

export const examinations = [
  {
    id: 1,
    patientId: 1,
    date: "2024-02-20",
    type: "General",
    vitalSigns: {
      bloodPressure: "120/80",
      heartRate: "72",
      temperature: "98.6",
      respiratoryRate: "16",
      spO2: "98"
    },
    generalAppearance: "Alert and oriented",
    findings: "No acute distress. Heart and lung sounds normal.",
    diagnosis: "Stable hypertension",
    plan: "Continue current medications",
    doctor: "Dr. Smith"
  },
  {
    id: 2,
    patientId: 1,
    date: "2024-01-15",
    type: "Follow-up",
    vitalSigns: {
      bloodPressure: "130/85",
      heartRate: "75",
      temperature: "98.4",
      respiratoryRate: "18",
      spO2: "97"
    },
    generalAppearance: "Well-appearing",
    findings: "Mild peripheral edema noted",
    diagnosis: "Hypertension - not optimally controlled",
    plan: "Adjust medication dosage",
    doctor: "Dr. Johnson"
  }
];

export const investigations = [
  {
    id: 1,
    patientId: 1,
    date: "2024-02-20",
    type: "Blood Test",
    category: "Laboratory",
    results: [
      { parameter: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5" },
      { parameter: "WBC", value: "7.8", unit: "K/µL", range: "4.5-11.0" },
      { parameter: "Platelets", value: "250", unit: "K/µL", range: "150-450" }
    ],
    summary: "Normal complete blood count",
    doctor: "Dr. Smith",
    attachments: []
  },
  {
    id: 2,
    patientId: 1,
    date: "2024-02-15",
    type: "Chest X-Ray",
    category: "Radiology",
    results: [],
    summary: "No acute cardiopulmonary process",
    doctor: "Dr. Johnson",
    attachments: [
      {
        id: 1,
        name: "chest-xray.jpg",
        type: "image/jpeg",
        url: "/mock-images/chest-xray.jpg"
      }
    ]
  }
];

export const treatments = [
  {
    id: 1,
    patientId: 1,
    date: "2024-02-20",
    type: "Medication",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "3 months",
    instructions: "Take in the morning with food",
    status: "Active",
    doctor: "Dr. Smith",
    notes: "Monitor blood pressure weekly"
  },
  {
    id: 2,
    patientId: 1,
    date: "2024-02-15",
    type: "Procedure",
    name: "Physical Therapy",
    frequency: "Twice weekly",
    duration: "6 weeks",
    instructions: "Focus on lower back exercises",
    status: "Active",
    doctor: "Dr. Johnson",
    notes: "Patient showing good progress"
  }
];

export const monitoringParameters = [
  {
    id: 1,
    patientId: 1,
    name: "Blood Pressure",
    unit: "mmHg",
    readings: [
      { date: "2024-02-01", value: "120/80" },
      { date: "2024-02-07", value: "118/78" },
      { date: "2024-02-14", value: "122/82" },
      { date: "2024-02-21", value: "116/76" }
    ]
  },
  {
    id: 2,
    patientId: 1,
    name: "Weight",
    unit: "kg",
    readings: [
      { date: "2024-02-01", value: "75" },
      { date: "2024-02-07", value: "74.5" },
      { date: "2024-02-14", value: "74" },
      { date: "2024-02-21", value: "73.5" }
    ]
  },
  {
    id: 3,
    patientId: 1,
    name: "Blood Sugar",
    unit: "mg/dL",
    readings: [
      { date: "2024-02-01", value: "110" },
      { date: "2024-02-07", value: "108" },
      { date: "2024-02-14", value: "115" },
      { date: "2024-02-21", value: "106" }
    ]
  },
  {
    id: 4,
    patientId: 1,
    name: "Heart Rate",
    unit: "bpm",
    readings: [
      { date: "2024-02-01", value: "72" },
      { date: "2024-02-07", value: "75" },
      { date: "2024-02-14", value: "70" },
      { date: "2024-02-21", value: "73" }
    ]
  },
  {
    id: 5,
    patientId: 1,
    name: "SpO2",
    unit: "%",
    readings: [
      { date: "2024-02-01", value: "98" },
      { date: "2024-02-07", value: "97" },
      { date: "2024-02-14", value: "98" },
      { date: "2024-02-21", value: "99" }
    ]
  },
  {
    id: 6,
    patientId: 1,
    name: "Respiratory Rate",
    unit: "breaths/min",
    readings: [
      { date: "2024-02-01", value: "16" },
      { date: "2024-02-07", value: "18" },
      { date: "2024-02-14", value: "16" },
      { date: "2024-02-21", value: "17" }
    ]
  },
  {
    id: 7,
    patientId: 1,
    name: "Temperature",
    unit: "°F",
    readings: [
      { date: "2024-02-01", value: "98.6" },
      { date: "2024-02-07", value: "98.4" },
      { date: "2024-02-14", value: "98.8" },
      { date: "2024-02-21", value: "98.2" }
    ]
  }
];

export const reports = [
  {
    id: 1,
    date: '2024-02-20',
    type: 'Progress Note',
    patient: 'John Doe',
    doctor: 'Dr. Smith',
    content: 'Patient showing improvement...',
    template: 'Progress Note Template'
  }
]

export const templates = [
  {
    id: 1,
    name: 'Progress Note Template',
    type: 'Progress Note',
    content: `
SUBJECTIVE:
[Chief Complaint]

OBJECTIVE:
Vital Signs:
BP: [BP]
HR: [HR]
Temp: [Temp]
RR: [RR]
SpO2: [SpO2]

ASSESSMENT:
[Assessment]

PLAN:
[Plan]
    `,
    lastModified: '2024-02-20'
  }
]

export const tasks = [
  {
    id: 1,
    title: 'Follow-up with Patient',
    patient: 'John Doe',
    dueDate: '2024-02-25',
    priority: 'High',
    status: 'Pending',
    assignedTo: 'Dr. Smith',
    description: 'Review latest test results and adjust treatment plan'
  }
]

export const ocrDocuments = [
  {
    id: 1,
    patientId: 1,
    date: '2024-02-20',
    type: 'Lab Report',
    imageUrl: '/mock-images/lab-report.jpg',
    extractedText: 'Hemoglobin: 14.2 g/dL\nWBC: 7.8 K/µL\nPlatelets: 250 K/µL',
    status: 'Processed'
  }
]

export const settings = {
  theme: 'light',
  language: 'en',
  notifications: {
    email: true,
    desktop: true,
    taskReminders: true,
    appointmentReminders: true
  },
  defaultViews: {
    dashboard: 'summary',
    patients: 'list',
    monitoring: 'charts'
  }
}
