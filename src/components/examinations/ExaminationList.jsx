import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function ExaminationList({ examinations }) {
  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'general':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100/80'
      case 'follow-up':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80'
      case 'emergency':
        return 'bg-red-100 text-red-800 hover:bg-red-100/80'
      case 'specialist':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100/80'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80'
    }
  }

  return (
    <div className="space-y-6">
      {examinations.map((exam) => (
        <Card key={exam.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <Badge variant="secondary" className={cn(getTypeColor(exam.type))}>
                {exam.type} Examination
              </Badge>
              <p className="text-sm text-muted-foreground">
                {exam.date} • {exam.doctor}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vital Signs */}
            <Card className="bg-accent/50">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium mb-3">Vital Signs</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Blood Pressure</p>
                    <p className="text-sm font-medium">{exam.vitalSigns.bloodPressure}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                    <p className="text-sm font-medium">{exam.vitalSigns.heartRate} bpm</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="text-sm font-medium">{exam.vitalSigns.temperature}°F</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Respiratory Rate</p>
                    <p className="text-sm font-medium">{exam.vitalSigns.respiratoryRate}/min</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">SpO2</p>
                    <p className="text-sm font-medium">{exam.vitalSigns.spO2}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Examination Details */}
            <div className="grid gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">General Appearance</h4>
                <p className="text-sm">{exam.generalAppearance}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Findings</h4>
                <p className="text-sm">{exam.findings}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Diagnosis</h4>
                <p className="text-sm">{exam.diagnosis}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Plan</h4>
                <p className="text-sm">{exam.plan}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ExaminationList
