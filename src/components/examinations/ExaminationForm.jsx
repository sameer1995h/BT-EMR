import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ExaminationForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'General',
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      respiratoryRate: '',
      spO2: ''
    },
    generalAppearance: '',
    findings: '',
    diagnosis: '',
    plan: '',
    doctor: ''
  })

  const handleVitalSignChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      vitalSigns: {
        ...prev.vitalSigns,
        [field]: value
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Examination</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Specialist">Specialist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vital Signs Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Vital Signs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Blood Pressure</Label>
                <Input
                  placeholder="120/80"
                  value={formData.vitalSigns.bloodPressure}
                  onChange={(e) => handleVitalSignChange('bloodPressure', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Heart Rate</Label>
                <Input
                  placeholder="bpm"
                  value={formData.vitalSigns.heartRate}
                  onChange={(e) => handleVitalSignChange('heartRate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Temperature</Label>
                <Input
                  placeholder="°F"
                  value={formData.vitalSigns.temperature}
                  onChange={(e) => handleVitalSignChange('temperature', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Respiratory Rate</Label>
                <Input
                  placeholder="/min"
                  value={formData.vitalSigns.respiratoryRate}
                  onChange={(e) => handleVitalSignChange('respiratoryRate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>SpO2</Label>
                <Input
                  placeholder="%"
                  value={formData.vitalSigns.spO2}
                  onChange={(e) => handleVitalSignChange('spO2', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>General Appearance</Label>
            <Input
              value={formData.generalAppearance}
              onChange={(e) => setFormData({ ...formData, generalAppearance: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Findings</Label>
            <Textarea
              value={formData.findings}
              onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Diagnosis</Label>
            <Input
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Plan</Label>
            <Textarea
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Doctor</Label>
            <Input
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Save Examination
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ExaminationForm
