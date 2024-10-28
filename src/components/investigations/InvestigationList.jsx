import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"

function InvestigationList({ investigations }) {
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'laboratory':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100/80'
      case 'radiology':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100/80'
      case 'pathology':
        return 'bg-red-100 text-red-800 hover:bg-red-100/80'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80'
    }
  }

  return (
    <div className="space-y-6">
      {investigations.map((investigation) => (
        <Card key={investigation.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              {investigation.type}
            </CardTitle>
            <Badge variant="secondary" className={cn(getCategoryColor(investigation.category))}>
              {investigation.category}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{investigation.date}</span>
              <span>{investigation.doctor}</span>
            </div>

            {/* Results Table */}
            {investigation.results.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Normal Range</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investigation.results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.parameter}</TableCell>
                      <TableCell>
                        {result.value} {result.unit}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {result.range}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Attachments */}
            {investigation.attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Attachments</h4>
                <div className="flex flex-wrap gap-2">
                  {investigation.attachments.map((file) => (
                    <Button
                      key={file.id}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                        {file.name}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {investigation.summary && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Summary</h4>
                <p className="text-sm">{investigation.summary}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default InvestigationList
