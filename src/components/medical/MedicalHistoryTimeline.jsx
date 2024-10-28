import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function MedicalHistoryTimeline({ histories }) {
  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'diagnosis':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100/80'
      case 'surgery':
        return 'bg-red-100 text-red-800 hover:bg-red-100/80'
      case 'treatment':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80'
      case 'test results':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100/80'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80'
    }
  }

  if (histories.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No medical history records found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {histories.map((history, index) => (
        <Card key={history.id} className="relative">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={cn(getTypeColor(history.type))}>
                      {history.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {history.date} • {history.doctor}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium">{history.description}</h4>
                {history.notes && (
                  <p className="mt-2 text-sm text-muted-foreground">{history.notes}</p>
                )}
              </div>

              {index !== histories.length - 1 && (
                <div className="absolute left-6 h-full">
                  <Separator orientation="vertical" className="h-full border-dashed" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default MedicalHistoryTimeline
