import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          < Route path="/*" element= { < NotFoundPage /> } />
          < Route path="/login" element={ <LoginPage /> } />
          < Route path="/signup" element={ <SignupPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}