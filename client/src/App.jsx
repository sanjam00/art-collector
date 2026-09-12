import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrowserRouter, Routes, Route } from 'react-router';
import { useAuth } from "./context/AuthContext";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import HomeFeed from "./pages/HomeFeed";
import MyCollectionsPage from "./pages/MyCollectionsPage";
import CollectionPage from "./pages/CollectionPage";
import ReviewPage from "./pages/ReviewPage";

export default function App() {
  const { token } = useAuth();

  return (
    <div className="app-content">
    <ErrorBoundary>
      <BrowserRouter>
        {token ? <NavBar /> : null}
        <Routes>
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
          < Route
            path="/collections/:collection_id"
            element={
              <ProtectedRoute>
                <CollectionPage />
              </ProtectedRoute>
            }
          />
          < Route
            path="/artwork-reviews/:id"
            element={
              <ProtectedRoute>
                <ReviewPage />
              </ProtectedRoute>
            }
          />
          < Route
            path="/artist-reviews/:id"
            element={
              <ProtectedRoute>
                <ReviewPage />
              </ProtectedRoute>
            }
          />
          < Route path="/*" element= { < NotFoundPage /> } />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
    </div>
  )
}