import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function PatientInfo({ patient }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{patient.name}</h2>
            <p className="text-muted-foreground">
              ID: {patient.id} • Last Visit: {patient.lastVisit}
            </p>
          </div>
          <Badge variant="secondary" className="text-base">
            {patient.condition}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Age</p>
            <p className="text-lg">{patient.age} years</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Gender</p>
            <p className="text-lg">{patient.gender}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p className="text-lg">{patient.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PatientInfo
