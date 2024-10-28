import { useNavigate } from 'react-router-dom'
import PatientForm from '../components/patients/PatientForm'
import { patients } from '../utils/mockData'
import { useToast } from "@/hooks/useToast"

function NewPatient() {
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = (formData) => {
    // In a real app, this would be an API call
    const newPatient = {
      id: patients.length + 1,
      ...formData
    }
    patients.push(newPatient)
    
    toast.success("Success", "Patient added successfully")
    navigate('/patients')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Patient</h1>
      <PatientForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewPatient
