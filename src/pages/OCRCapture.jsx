import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createWorker } from 'tesseract.js'

function OCRCapture() {
  const [image, setImage] = useState(null)
  const [text, setText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef(null)
  
  const handleImageCapture = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
      processImage(file)
    }
  }

  const processImage = async (file) => {
    setIsProcessing(true)
    try {
      const worker = await createWorker()
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      const { data: { text } } = await worker.recognize(file)
      setText(text)
      await worker.terminate()
    } catch (error) {
      console.error('OCR Error:', error)
    }
    setIsProcessing(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">OCR Document Capture</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Image Capture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleImageCapture}
              className="hidden"
            />
            <div className="space-y-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                Capture Image
              </Button>
              {image && (
                <div className="relative aspect-video">
                  <img
                    src={image}
                    alt="Captured"
                    className="rounded-lg object-contain w-full h-full"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extracted Text</CardTitle>
          </CardHeader>
          <CardContent>
            {isProcessing ? (
              <div className="flex items-center justify-center h-32">
                <p>Processing image...</p>
              </div>
            ) : (
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-[300px]"
                placeholder="Extracted text will appear here..."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OCRCapture
