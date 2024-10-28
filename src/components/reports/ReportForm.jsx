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
import { templates } from '@/utils/mockData'

function ReportForm({ onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    patient: '',
    content: '',
    template: '',
    ...initialData
  })

  const handleTemplateChange = (templateId) => {
    const template = templates.find(t => t.id === parseInt(templateId))
    if (template) {
      setFormData(prev => ({
        ...prev,
        template: templateId,
        type: template.type,
        content: template.content
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Template</Label>
              <Select
                value={formData.template}
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map(template => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Patient</Label>
            <Input
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              placeholder="Patient name"
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="font-mono"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Save Report
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReportForm
