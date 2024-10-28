import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/useToast"
import { patients } from '@/utils/mockData'
import Loading from '@/components/ui/loading'

function PatientList() {
  const navigate = useNavigate()
  const toast = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPatients, setFilteredPatients] = useState(patients)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = patients.filter(patient => 
        patient.name.toLowerCase().includes(term) ||
        patient.phone.includes(term)
      )
      setFilteredPatients(filtered)
      setIsLoading(false)
    }, 500)
  }

  const handleAddNew = () => {
    navigate('/patients/new')
    toast.success("Navigation", "Redirecting to add new patient form")
  }

  const handlePatientClick = (patientId) => {
    navigate(`/patients/${patientId}`)
    toast.success("Navigation", "Loading patient details")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Button onClick={handleAddNew}>
          Add New Patient
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No patients found matching your search.
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <Card 
                key={patient.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handlePatientClick(patient.id)}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{patient.name}</h3>
                    <span className="text-sm text-muted-foreground">{patient.id}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{patient.age} years • {patient.gender}</p>
                    <p>{patient.phone}</p>
                    <p>Last Visit: {patient.lastVisit}</p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                      {patient.condition}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default PatientList
