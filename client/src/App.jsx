import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrowserRouter, Routes, Route } from 'react-router'
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import HomeFeed from "./pages/HomeFeed";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          < Route path="/*" element= { < NotFoundPage /> } />
          < Route path="/login" element={ <LoginPage /> } />
          < Route path="/signup" element={ <SignupPage />} />
          < Route
            path="/"
            element={
              <ProtectedRoute>
                {/* home page leads to collectionfeed.py */}
                <HomeFeed />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}