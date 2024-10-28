import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PatientInfo from '../components/PatientInfo'
import TabPanel from '../components/TabPanel'
import MedicalHistoryForm from '../components/medical/MedicalHistoryForm'
import MedicalHistoryTimeline from '../components/medical/MedicalHistoryTimeline'
import ExaminationForm from '../components/examinations/ExaminationForm'
import ExaminationList from '../components/examinations/ExaminationList'
import InvestigationForm from '../components/investigations/InvestigationForm'
import InvestigationList from '../components/investigations/InvestigationList'
import TreatmentForm from '../components/treatments/TreatmentForm'
import TreatmentList from '../components/treatments/TreatmentList'
import MonitoringForm from '../components/monitoring/MonitoringForm'
import MonitoringList from '../components/monitoring/MonitoringList'
import { 
  patients, 
  medicalHistories, 
  examinations, 
  investigations, 
  treatments,
  monitoringParameters 
} from '../utils/mockData'

function PatientDetails() {
  const { id } = useParams()
  const [patient, setPatient] = useState(null)
  const [activeTab, setActiveTab] = useState('medical-history')
  const [showMedicalHistoryForm, setShowMedicalHistoryForm] = useState(false)
  const [showExaminationForm, setShowExaminationForm] = useState(false)
  const [showInvestigationForm, setShowInvestigationForm] = useState(false)
  const [showTreatmentForm, setShowTreatmentForm] = useState(false)
  const [patientHistories, setPatientHistories] = useState([])
  const [patientExaminations, setPatientExaminations] = useState([])
  const [patientInvestigations, setPatientInvestigations] = useState([])
  const [patientTreatments, setPatientTreatments] = useState([])
  const [showMonitoringForm, setShowMonitoringForm] = useState(false)
  const [patientMonitoring, setPatientMonitoring] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // In a real app, this would be an API call
    const foundPatient = patients.find(p => p.id === parseInt(id))
    setPatient(foundPatient)
  }, [id])

  useEffect(() => {
    if (patient) {
      // In a real app, these would be API calls
      const histories = medicalHistories.filter(h => h.patientId === patient.id)
      const exams = examinations.filter(e => e.patientId === patient.id)
      const invs = investigations.filter(i => i.patientId === patient.id)
      const treats = treatments.filter(t => t.patientId === patient.id)
      const monitoring = monitoringParameters.filter(m => m.patientId === patient.id)
      
      setPatientHistories(histories)
      setPatientExaminations(exams)
      setPatientInvestigations(invs)
      setPatientTreatments(treats)
      setPatientMonitoring(monitoring)
    }
  }, [patient])

  const tabs = [
    { id: 'medical-history', label: 'Medical History' },
    { id: 'examinations', label: 'Examinations' },
    { id: 'investigations', label: 'Investigations' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'monitoring', label: 'Monitoring' },
  ]

  const handleAddMedicalHistory = (formData) => {
    const newHistory = {
      id: Date.now(),
      patientId: patient.id,
      ...formData
    }
    setPatientHistories([newHistory, ...patientHistories])
    setShowMedicalHistoryForm(false)
  }

  const handleAddExamination = (formData) => {
    const newExamination = {
      id: Date.now(),
      patientId: patient.id,
      ...formData
    }
    setPatientExaminations([newExamination, ...patientExaminations])
    setShowExaminationForm(false)
  }

  const handleAddInvestigation = (formData) => {
    const newInvestigation = {
      id: Date.now(),
      patientId: patient.id,
      ...formData
    }
    setPatientInvestigations([newInvestigation, ...patientInvestigations])
    setShowInvestigationForm(false)
  }

  const handleAddTreatment = (formData) => {
    const newTreatment = {
      id: Date.now(),
      patientId: patient.id,
      ...formData
    }
    setPatientTreatments([newTreatment, ...patientTreatments])
    setShowTreatmentForm(false)
  }

  const handleAddMonitoring = (formData) => {
    const existingParam = patientMonitoring.find(p => 
      p.name.toLowerCase() === formData.name.toLowerCase()
    )

    if (existingParam) {
      const updatedParams = patientMonitoring.map(p => {
        if (p.id === existingParam.id) {
          return {
            ...p,
            readings: [
              { date: formData.date, value: formData.value },
              ...p.readings.sort((a, b) => new Date(b.date) - new Date(a.date))
            ]
          }
        }
        return p
      })
      setPatientMonitoring(updatedParams)
    } else {
      const newParam = {
        id: Date.now(),
        patientId: patient.id,
        name: formData.name,
        unit: formData.unit,
        readings: [{ date: formData.date, value: formData.value }]
      }
      setPatientMonitoring([...patientMonitoring, newParam])
    }
    setShowMonitoringForm(false)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'medical-history':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Medical History</CardTitle>
              {!showMedicalHistoryForm && (
                <Button onClick={() => setShowMedicalHistoryForm(true)}>
                  Add Medical History
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {showMedicalHistoryForm ? (
                <MedicalHistoryForm
                  onSubmit={handleAddMedicalHistory}
                  onCancel={() => setShowMedicalHistoryForm(false)}
                />
              ) : (
                <MedicalHistoryTimeline histories={patientHistories} />
              )}
            </CardContent>
          </Card>
        )
      case 'examinations':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Examinations</CardTitle>
              {!showExaminationForm && (
                <Button onClick={() => setShowExaminationForm(true)}>
                  New Examination
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {showExaminationForm ? (
                <ExaminationForm
                  onSubmit={handleAddExamination}
                  onCancel={() => setShowExaminationForm(false)}
                />
              ) : (
                <ExaminationList examinations={patientExaminations} />
              )}
            </CardContent>
          </Card>
        )
      case 'investigations':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Investigations</CardTitle>
              {!showInvestigationForm && (
                <Button onClick={() => setShowInvestigationForm(true)}>
                  Add Investigation
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {showInvestigationForm ? (
                <InvestigationForm
                  onSubmit={handleAddInvestigation}
                  onCancel={() => setShowInvestigationForm(false)}
                />
              ) : (
                <InvestigationList investigations={patientInvestigations} />
              )}
            </CardContent>
          </Card>
        )
      case 'treatments':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Treatments</CardTitle>
              {!showTreatmentForm && (
                <Button onClick={() => setShowTreatmentForm(true)}>
                  Add Treatment
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {showTreatmentForm ? (
                <TreatmentForm
                  onSubmit={handleAddTreatment}
                  onCancel={() => setShowTreatmentForm(false)}
                />
              ) : (
                <TreatmentList treatments={patientTreatments} />
              )}
            </CardContent>
          </Card>
        )
      case 'monitoring':
        return (
          <Card>
            <CardContent>
              <MonitoringList 
                parameters={patientMonitoring} 
                onAddReading={handleAddMonitoring}
              />
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  if (!patient) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Details</h1>
        <Button onClick={() => navigate(`/patients/${id}/edit`)}>
          Edit Patient
        </Button>
      </div>

      <PatientInfo patient={patient} />

      <TabPanel
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {renderTabContent()}
      </TabPanel>
    </div>
  )
}

export default PatientDetails
