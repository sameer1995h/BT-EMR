export const VITAL_SIGNS_CONFIG = {
  "Heart Rate": {
    min: 40,
    max: 120,
    normalRange: { min: 60, max: 100 },
    stepSize: 10,
    color: 'rgb(220, 38, 38)',
    backgroundColor: 'rgba(220, 38, 38, 0.5)'
  },
  "SpO2": {
    min: 90,
    max: 100,
    normalRange: { min: 95, max: 100 },
    stepSize: 1,
    color: 'rgb(59, 130, 246)',
    backgroundColor: 'rgba(59, 130, 246, 0.5)'
  },
  "Respiratory Rate": {
    min: 8,
    max: 30,
    normalRange: { min: 12, max: 20 },
    stepSize: 2,
    color: 'rgb(16, 185, 129)',
    backgroundColor: 'rgba(16, 185, 129, 0.5)'
  },
  "Temperature": {
    min: 95,
    max: 104,
    normalRange: { min: 97, max: 99 },
    stepSize: 0.5,
    color: 'rgb(245, 158, 11)',
    backgroundColor: 'rgba(245, 158, 11, 0.5)'
  },
  "Blood Pressure": {
    systolic: {
      min: 90,
      max: 180,
      normalRange: { min: 90, max: 120 }
    },
    diastolic: {
      min: 60,
      max: 120,
      normalRange: { min: 60, max: 80 }
    },
    color: 'rgb(239, 68, 68)',
    backgroundColor: 'rgba(239, 68, 68, 0.5)'
  }
}
