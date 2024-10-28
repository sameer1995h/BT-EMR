import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

// Existing Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PatientList from './pages/PatientList'
import PatientDetails from './pages/PatientDetails'
import NewPatient from './pages/NewPatient'
import EditPatient from './pages/EditPatient'
import Monitoring from './pages/Monitoring'
import Investigations from './pages/Investigations'
import OCRCapture from './pages/OCRCapture'
import Treatments from './pages/Treatments'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              
              {/* Patient Routes */}
              <Route path="patients" element={<PatientList />} />
              <Route path="patients/new" element={<NewPatient />} />
              <Route path="patients/:id/edit" element={<EditPatient />} />
              <Route path="patients/:id" element={<PatientDetails />} />
              
              {/* Monitoring Routes */}
              <Route path="monitoring" element={<Monitoring />} />
              
              {/* Investigations Routes */}
              <Route path="investigations" element={<Investigations />} />
              
              {/* OCR Routes */}
              <Route path="ocr" element={<OCRCapture />} />
              
              {/* Treatments Routes */}
              <Route path="treatments" element={<Treatments />} />
              
              {/* Tasks Routes */}
              <Route path="tasks" element={<Tasks />} />
              
              {/* Settings Routes */}
              <Route path="settings" element={<Settings />} />
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
