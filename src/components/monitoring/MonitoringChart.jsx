import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { VITAL_SIGNS_CONFIG } from '@/utils/vitalSignsConfig'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function MonitoringChart({ parameter }) {
  const vitalSignConfig = VITAL_SIGNS_CONFIG[parameter.name]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${parameter.name} Over Time`,
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            if (vitalSignConfig && vitalSignConfig.normalRange) {
              const value = context.parsed.y
              return getStatusText(parameter.name, value)
            }
            return null
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: parameter.unit
        },
        ...(vitalSignConfig && {
          min: vitalSignConfig.min,
          max: vitalSignConfig.max,
          ticks: {
            stepSize: vitalSignConfig.stepSize
          }
        })
      }
    }
  }

  const processValue = (value) => {
    if (parameter.name === "Blood Pressure") {
      const [systolic, diastolic] = value.split('/')
      return { systolic: parseInt(systolic), diastolic: parseInt(diastolic) }
    }
    return parseFloat(value)
  }

  const getDatasets = () => {
    if (parameter.name === "Blood Pressure") {
      return [
        {
          label: 'Systolic',
          data: parameter.readings.map(reading => processValue(reading.value).systolic),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          tension: 0.3
        },
        {
          label: 'Diastolic',
          data: parameter.readings.map(reading => processValue(reading.value).diastolic),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.3
        }
      ]
    }

    if (vitalSignConfig) {
      return [{
        label: parameter.name,
        data: parameter.readings.map(reading => processValue(reading.value)),
        borderColor: vitalSignConfig.color || 'rgb(75, 192, 192)',
        backgroundColor: vitalSignConfig.backgroundColor || 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8
      }]
    }

    return [{
      label: parameter.name,
      data: parameter.readings.map(reading => processValue(reading.value)),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.3
    }]
  }

  const data = {
    labels: parameter.readings.map(reading => reading.date),
    datasets: getDatasets()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{parameter.name} Trend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-card p-4 rounded-lg">
          <Line options={options} data={data} />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Recent Readings</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Value</TableHead>
                {vitalSignConfig && vitalSignConfig.normalRange && (
                  <TableHead>Status</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {parameter.readings.map((reading, index) => (
                <TableRow key={index}>
                  <TableCell>{reading.date}</TableCell>
                  <TableCell>
                    {reading.value} {parameter.unit}
                  </TableCell>
                  {vitalSignConfig && vitalSignConfig.normalRange && (
                    <TableCell>
                      {getVitalSignStatus(parameter.name, parseFloat(reading.value))}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function getVitalSignStatus(parameterName, value) {
  const config = VITAL_SIGNS_CONFIG[parameterName]
  if (!config || !config.normalRange) return null

  if (value < config.normalRange.min) {
    return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low</Badge>
  } else if (value > config.normalRange.max) {
    return <Badge variant="secondary" className="bg-red-100 text-red-800">High</Badge>
  }
  return <Badge variant="secondary" className="bg-green-100 text-green-800">Normal</Badge>
}

function getStatusText(parameterName, value) {
  const config = VITAL_SIGNS_CONFIG[parameterName]
  if (!config || !config.normalRange) return null

  if (value < config.normalRange.min) {
    return `Status: Low (Normal range: ${config.normalRange.min}-${config.normalRange.max})`
  } else if (value > config.normalRange.max) {
    return `Status: High (Normal range: ${config.normalRange.min}-${config.normalRange.max})`
  }
  return `Status: Normal (Range: ${config.normalRange.min}-${config.normalRange.max})`
}

export default MonitoringChart
