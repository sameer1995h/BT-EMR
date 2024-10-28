import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PatientForm from '../components/patients/PatientForm'
import { patients } from '../utils/mockData'
import { useToast } from "@/hooks/useToast"

function EditPatient() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [patient, setPatient] = useState(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundPatient = patients.find(p => p.id === parseInt(id))
    if (foundPatient) {
      setPatient(foundPatient)
    } else {
      navigate('/patients')
    }
  }, [id, navigate])

  const handleSubmit = (formData) => {
    // In a real app, this would be an API call
    const index = patients.findIndex(p => p.id === parseInt(id))
    if (index !== -1) {
      patients[index] = { ...patients[index], ...formData }
      toast.success("Success", "Patient updated successfully")
      navigate('/patients')
    }
  }

  if (!patient) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Patient</h1>
      <PatientForm patient={patient} onSubmit={handleSubmit} />
    </div>
  )
}

export default EditPatient
