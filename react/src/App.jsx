import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import StudentsPage from './routes/StudentsPage'
import CoursesPage from './routes/CoursesPage'

export default function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="*" element={<Navigate to="/students" replace />} />
        </Routes>
      </PageLayout>
    </Router>
  )
}
