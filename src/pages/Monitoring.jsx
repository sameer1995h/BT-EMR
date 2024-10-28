import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MonitoringList from '@/components/monitoring/MonitoringList'
import PatientSelector from '@/components/PatientSelector'
import { monitoringParameters } from '@/utils/mockData'
import { useToast } from "@/hooks/useToast"

function Monitoring() {
  const navigate = useNavigate()
  const toast = useToast()
  const [parameters, setParameters] = useState([])
  const [patient, setPatient] = useState(null)
  const [showPatientSelector, setShowPatientSelector] = useState(false)

  const handlePatientSelect = (selectedPatient) => {
    setPatient(selectedPatient)
    const data = monitoringParameters.filter(p => p.patientId === selectedPatient.id)
    setParameters(data)
    setShowPatientSelector(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {patient ? `Monitoring - ${patient.name}` : 'Monitoring Overview'}
        </h1>
        <Button onClick={() => setShowPatientSelector(true)}>
          {patient ? 'Change Patient' : 'Select Patient'}
        </Button>
      </div>

      {patient && (
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{patient.age} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Condition</p>
                <p className="font-medium">{patient.condition}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Visit</p>
                <p className="font-medium">{patient.lastVisit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Vital Signs Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          {patient ? (
            parameters.length > 0 ? (
              <MonitoringList parameters={parameters} />
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No monitoring data available for this patient.
              </p>
            )
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Please select a patient to view their monitoring data.
            </p>
          )}
        </CardContent>
      </Card>

      <PatientSelector
        open={showPatientSelector}
        onClose={() => setShowPatientSelector(false)}
        onSelect={handlePatientSelect}
      />
    </div>
  )
}

export default Monitoring
