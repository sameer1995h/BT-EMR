import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Table from '@/components/Table'
import TaskForm from '@/components/tasks/TaskForm'
import { tasks } from '@/utils/mockData'
import { useToast } from "@/hooks/useToast"

function Tasks() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [editingTask, setEditingTask] = useState(null)
  const toast = useToast()

  const columns = [
    { key: 'title', header: 'Task' },
    { key: 'patient', header: 'Patient' },
    { key: 'dueDate', header: 'Due Date' },
    { 
      key: 'priority',
      header: 'Priority',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.priority === 'High' ? 'bg-red-100 text-red-800' :
          row.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {row.priority}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.status === 'Completed' ? 'bg-green-100 text-green-800' :
          row.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleStatusChange(row.id, 'Completed')}
            disabled={row.status === 'Completed'}
          >
            Complete
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
        </div>
      )
    }
  ]

  const handleSearch = (value) => {
    setSearchTerm(value)
    const filtered = tasks.filter(task => 
      task.title.toLowerCase().includes(value.toLowerCase()) ||
      task.patient.toLowerCase().includes(value.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredTasks(filtered)
  }

  const handleSubmit = (formData) => {
    // In a real app, this would be an API call
    const newTask = {
      id: tasks.length + 1,
      ...formData
    }
    tasks.unshift(newTask)
    setFilteredTasks([newTask, ...filteredTasks])
    setShowForm(false)
    toast.success("Success", "Task created successfully")
  }

  const handleStatusChange = (taskId, newStatus) => {
    // In a real app, this would be an API call
    const updatedTasks = filteredTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus }
      }
      return task
    })
    setFilteredTasks(updatedTasks)
    toast.success("Success", "Task status updated")
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const getTaskStats = () => {
    const total = filteredTasks.length
    const completed = filteredTasks.filter(t => t.status === 'Completed').length
    const pending = filteredTasks.filter(t => t.status === 'Pending').length
    const inProgress = filteredTasks.filter(t => t.status === 'In Progress').length
    return { total, completed, pending, inProgress }
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{editingTask ? 'Edit Task' : 'New Task'}</h1>
        </div>
        <TaskForm 
          onSubmit={(formData) => {
            if (editingTask) {
              // Update existing task
              const updatedTasks = filteredTasks.map(task => 
                task.id === editingTask.id ? { ...task, ...formData } : task
              )
              setFilteredTasks(updatedTasks)
              toast.success("Success", "Task updated successfully")
            } else {
              // Create new task
              const newTask = {
                id: tasks.length + 1,
                ...formData
              }
              tasks.unshift(newTask)
              setFilteredTasks([newTask, ...filteredTasks])
              toast.success("Success", "Task created successfully")
            }
            setShowForm(false)
            setEditingTask(null)
          }}
          onCancel={() => {
            setShowForm(false)
            setEditingTask(null)
          }}
          initialData={editingTask}
        />
      </div>
    )
  }

  const stats = getTaskStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={() => setShowForm(true)}>New Task</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Table columns={columns} data={filteredTasks} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Tasks
