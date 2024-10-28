import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TreatmentList from '@/components/treatments/TreatmentList'
import PatientSelector from '@/components/PatientSelector'
import { treatments } from '@/utils/mockData'

function Treatments() {
  const [patient, setPatient] = useState(null)
  const [showPatientSelector, setShowPatientSelector] = useState(false)
  const [patientTreatments, setPatientTreatments] = useState([])

  const handlePatientSelect = (selectedPatient) => {
    setPatient(selectedPatient)
    const data = treatments.filter(t => t.patientId === selectedPatient.id)
    setPatientTreatments(data)
    setShowPatientSelector(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {patient ? `Treatments - ${patient.name}` : 'Treatments'}
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

      {patient ? (
        patientTreatments.length > 0 ? (
          <TreatmentList treatments={patientTreatments} />
        ) : (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">
                No treatments found for this patient.
              </p>
            </CardContent>
          </Card>
        )
      ) : (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              Please select a patient to view their treatments.
            </p>
          </CardContent>
        </Card>
      )}

      <PatientSelector
        open={showPatientSelector}
        onClose={() => setShowPatientSelector(false)}
        onSelect={handlePatientSelect}
      />
    </div>
  )
}

export default Treatments
