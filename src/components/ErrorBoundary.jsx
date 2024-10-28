import { Component } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="w-full max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              An error occurred while loading this content.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Reload Page
            </Button>
          </CardFooter>
        </Card>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
