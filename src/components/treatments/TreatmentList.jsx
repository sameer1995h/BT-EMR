import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function TreatmentList({ treatments }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'completed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      case 'discontinued':
        return 'bg-red-100 text-red-800 hover:bg-red-100'
      case 'on hold':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  return (
    <div className="space-y-4">
      {treatments.map((treatment) => (
        <Card key={treatment.id} className="p-6">
          <div className="flex flex-col space-y-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{treatment.name}</h3>
                  <Badge className={cn("font-medium", getStatusColor(treatment.status))}>
                    {treatment.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Started on {treatment.date} • {treatment.doctor}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <p className="text-sm">{treatment.type}</p>
              </div>
              {treatment.type === 'Medication' && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dosage</p>
                  <p className="text-sm">{treatment.dosage}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Frequency</p>
                <p className="text-sm">{treatment.frequency}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <p className="text-sm">{treatment.duration}</p>
              </div>
            </div>

            {/* Instructions and Notes */}
            {treatment.instructions && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Instructions</p>
                <p className="text-sm mt-1">{treatment.instructions}</p>
              </div>
            )}
            {treatment.notes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <p className="text-sm mt-1">{treatment.notes}</p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}

export default TreatmentList
