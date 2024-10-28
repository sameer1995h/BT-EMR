import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Table from '@/components/Table'

function Templates() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Progress Note Template',
      type: 'Progress Note',
      lastModified: '2024-02-20'
    }
  ])

  const columns = [
    { key: 'name', header: 'Template Name' },
    { key: 'type', header: 'Type' },
    { key: 'lastModified', header: 'Last Modified' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="outline" size="sm">Use</Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Report Templates</h1>
        <Button>New Template</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Search templates..." />
          </div>
          <Table columns={columns} data={templates} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Templates
