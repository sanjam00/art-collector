import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          < Route path="/login" element={ <LoginPage /> } />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}