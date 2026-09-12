import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import "../styles/SignupPage.css";
import "../index.css";

export default function SignupPage(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    console.log("password:", JSON.stringify(password))
    console.log("confirmPassword:", JSON.stringify(confirmPassword))

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await signup(username, email, password, confirmPassword);
      setSuccessMsg("Signup success! Please log in to confirm credentials.");
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="signup-page">
      <h1 id="site-name">Art Collector</h1>

      <div className="signup-form-container">
        <h2 className="signup-header">Create an account</h2>

        {error && <p className="signup-message error-message">{error}</p>}
        {successMsg && <p className="signup-message success-message">{successMsg}</p>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-field">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="form-control"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="signup-button" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="login-prompt">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

      </div>
    </div>
  )
}