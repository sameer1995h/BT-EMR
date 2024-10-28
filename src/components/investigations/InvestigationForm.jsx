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

function InvestigationForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    category: 'Laboratory',
    results: [],
    summary: '',
    doctor: '',
    attachments: []
  })

  const [newResult, setNewResult] = useState({
    parameter: '',
    value: '',
    unit: '',
    range: ''
  })

  const handleAddResult = () => {
    if (newResult.parameter && newResult.value) {
      setFormData(prev => ({
        ...prev,
        results: [...prev.results, { ...newResult }]
      }))
      setNewResult({ parameter: '', value: '', unit: '', range: '' })
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const newAttachments = files.map(file => ({
      id: Date.now(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file)
    }))
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Investigation</CardTitle>
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
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                  <SelectItem value="Radiology">Radiology</SelectItem>
                  <SelectItem value="Pathology">Pathology</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Investigation Type</Label>
            <Input
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              placeholder="e.g., Blood Test, X-Ray, MRI"
            />
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Results</h3>
            
            {formData.results.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  {formData.results.map((result, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                      <div>{result.parameter}</div>
                      <div>{result.value} {result.unit}</div>
                      <div>{result.range}</div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            results: prev.results.filter((_, i) => i !== index)
                          }))
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-4 gap-2">
              <Input
                placeholder="Parameter"
                value={newResult.parameter}
                onChange={(e) => setNewResult({ ...newResult, parameter: e.target.value })}
              />
              <Input
                placeholder="Value"
                value={newResult.value}
                onChange={(e) => setNewResult({ ...newResult, value: e.target.value })}
              />
              <Input
                placeholder="Unit"
                value={newResult.unit}
                onChange={(e) => setNewResult({ ...newResult, unit: e.target.value })}
              />
              <Input
                placeholder="Normal Range"
                value={newResult.range}
                onChange={(e) => setNewResult({ ...newResult, range: e.target.value })}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleAddResult}
            >
              Add Result
            </Button>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {formData.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {formData.attachments.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-2 bg-accent rounded-md">
                    <span className="text-sm">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          attachments: prev.attachments.filter(f => f.id !== file.id)
                        }))
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
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
              Save Investigation
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default InvestigationForm
