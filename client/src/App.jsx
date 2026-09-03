import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrowserRouter, Routes, Route } from 'react-router';
import { useAuth } from "./context/AuthContext";
import NavBar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import HomeFeed from "./pages/HomeFeed";
import "./App.css"
import MyCollectionsPage from "./pages/MyCollectionsPage";

export default function App() {
  const { token } = useAuth();

  return (
    <div className="app-content">
    <ErrorBoundary>
      <BrowserRouter>
        {token ? <NavBar /> : null}
        <Routes>
          < Route path="/*" element= { < NotFoundPage /> } />
          < Route path="/login" element={ <LoginPage /> } />
          < Route path="/signup" element={ <SignupPage />} />
          < Route
            path="/home"
            element={
              <ProtectedRoute>
                {/* home page leads to collectionfeed.py */}
                <HomeFeed />
              </ProtectedRoute>
            }
          />
          < Route
            path="/my-collections"
            element={
              <ProtectedRoute>
                <MyCollectionsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
    </div>
  )
}