import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import MonitoringChart from './MonitoringChart'
import MonitoringForm from './MonitoringForm'
import VitalSignsCard from './VitalSignsCard'

function MonitoringList({ parameters, onAddReading }) {
  const [selectedParameter, setSelectedParameter] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleAddReading = (parameter) => {
    setSelectedParameter(parameter)
    setShowForm(true)
  }

  const handleSubmit = (formData) => {
    if (onAddReading) {
      onAddReading({
        ...formData,
        name: selectedParameter.name,
        unit: selectedParameter.unit
      })
    }
    setShowForm(false)
    setSelectedParameter(null)
  }

  if (!parameters || parameters.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">No monitoring data available</p>
        </CardContent>
      </Card>
    )
  }

  if (showForm && selectedParameter) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            Add Reading for {selectedParameter.name}
          </h3>
          <Button
            variant="ghost"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
        </div>
        <MonitoringForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          defaultValues={{
            name: selectedParameter.name,
            unit: selectedParameter.unit
          }}
        />
      </div>
    )
  }

  const sortedParameters = [...parameters].sort((a, b) => {
    const order = [
      'Blood Pressure',
      'Heart Rate',
      'Temperature',
      'Respiratory Rate',
      'SpO2'
    ]
    return order.indexOf(a.name) - order.indexOf(b.name)
  })

  return (
    <div className="space-y-6">
      <VitalSignsCard parameters={parameters} />
      
      {sortedParameters.map((parameter) => (
        <Card key={parameter.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{parameter.name}</h3>
              <Button
                variant="outline"
                onClick={() => handleAddReading(parameter)}
              >
                Add Reading
              </Button>
            </div>
            <MonitoringChart parameter={parameter} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default MonitoringList
