import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { patients } from '@/utils/mockData'

function PatientSelector({ open, onClose, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Select Patient</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <Button
                  key={patient.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onSelect(patient)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{patient.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {patient.age} years • {patient.condition}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PatientSelector
