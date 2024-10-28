import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Table from '@/components/Table'
import ReportForm from '@/components/reports/ReportForm'
import { reports } from '@/utils/mockData'
import { useToast } from "@/hooks/useToast"

function Reports() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [filteredReports, setFilteredReports] = useState(reports)
  const toast = useToast()

  const columns = [
    { key: 'date', header: 'Date', className: 'w-32' },
    { key: 'type', header: 'Type', className: 'w-40' },
    { key: 'patient', header: 'Patient' },
    { key: 'doctor', header: 'Doctor' },
    { 
      key: 'actions',
      header: 'Actions',
      className: 'w-32',
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleView(row)}>
            View
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleEdit(row)}>
            Edit
          </Button>
        </div>
      )
    }
  ]

  const handleSearch = (value) => {
    setSearchTerm(value)
    const filtered = reports.filter(report => 
      report.patient.toLowerCase().includes(value.toLowerCase()) ||
      report.type.toLowerCase().includes(value.toLowerCase()) ||
      report.doctor.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredReports(filtered)
  }

  const handleSubmit = (formData) => {
    // In a real app, this would be an API call
    const newReport = {
      id: reports.length + 1,
      doctor: 'Dr. Smith', // Get from auth context in real app
      ...formData
    }
    reports.unshift(newReport)
    setFilteredReports([newReport, ...filteredReports])
    setShowForm(false)
    toast.success("Success", "Report created successfully")
  }

  const handleView = (report) => {
    // Implement view functionality
    console.log('View report:', report)
  }

  const handleEdit = (report) => {
    // Implement edit functionality
    console.log('Edit report:', report)
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">New Report</h1>
        </div>
        <ReportForm 
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="space-x-2">
          <Link to="/reports/templates">
            <Button variant="outline">Templates</Button>
          </Link>
          <Button onClick={() => setShowForm(true)}>New Report</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Table columns={columns} data={filteredReports} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Reports
