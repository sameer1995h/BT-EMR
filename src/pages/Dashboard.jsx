import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { patients, examinations, treatments } from '@/utils/mockData'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const recentPatients = patients.slice(0, 5)
  const recentExams = examinations.slice(0, 5)

  const stats = [
    {
      title: "Total Patients",
      value: patients.length,
      description: "Active patients in system"
    },
    {
      title: "Recent Examinations",
      value: examinations.length,
      description: "Last 30 days"
    },
    {
      title: "Active Treatments",
      value: treatments.filter(t => t.status === 'Active').length,
      description: "Ongoing treatments"
    },
    {
      title: "Pending Follow-ups",
      value: "3",
      description: "Scheduled this week"
    }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentPatients.map(patient => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.condition}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {patient.lastVisit}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Examinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentExams.map(exam => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer"
                  onClick={() => navigate(`/patients/${exam.patientId}`)}
                >
                  <div>
                    <p className="font-medium">{exam.type} Examination</p>
                    <p className="text-sm text-muted-foreground">
                      {exam.doctor}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {exam.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
