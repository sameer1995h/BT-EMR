import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VITAL_SIGNS_CONFIG } from '@/utils/vitalSignsConfig'
import { cn } from "@/lib/utils"

function VitalSignsCard({ parameters }) {
  const getVitalSign = (name) => {
    const parameter = parameters.find(p => p.name === name)
    return parameter?.readings[0]?.value || '-'
  }

  const getStatusClass = (name, value) => {
    const config = VITAL_SIGNS_CONFIG[name]
    if (!config || !value || value === '-') return ''

    if (name === "Blood Pressure") {
      const [systolic, diastolic] = value.split('/')
      const systolicNum = parseInt(systolic)
      const diastolicNum = parseInt(diastolic)
      
      if (systolicNum < config.systolic.normalRange.min || 
          diastolicNum < config.diastolic.normalRange.min) {
        return 'bg-yellow-100 text-yellow-800'
      }
      if (systolicNum > config.systolic.normalRange.max || 
          diastolicNum > config.diastolic.normalRange.max) {
        return 'bg-red-100 text-red-800'
      }
      return 'bg-green-100 text-green-800'
    }

    const numValue = parseFloat(value)
    if (numValue < config.normalRange.min) return 'bg-yellow-100 text-yellow-800'
    if (numValue > config.normalRange.max) return 'bg-red-100 text-red-800'
    return 'bg-green-100 text-green-800'
  }

  const vitalSigns = [
    { name: 'Heart Rate', value: getVitalSign('Heart Rate'), unit: 'bpm' },
    { name: 'Blood Pressure', value: getVitalSign('Blood Pressure'), unit: 'mmHg' },
    { name: 'Temperature', value: getVitalSign('Temperature'), unit: '°F' },
    { name: 'Respiratory Rate', value: getVitalSign('Respiratory Rate'), unit: 'breaths/min' },
    { name: 'SpO2', value: getVitalSign('SpO2'), unit: '%' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Vital Signs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {vitalSigns.map((sign) => (
            <div key={sign.name} className="text-center">
              <p className="text-sm text-muted-foreground mb-1">{sign.name}</p>
              <Badge variant="secondary" className={cn(getStatusClass(sign.name, sign.value))}>
                {sign.value} <span className="text-xs opacity-75">{sign.unit}</span>
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default VitalSignsCard
