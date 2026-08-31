import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccessMsg('');

    try {
      const response = await login(username, password);

      // check if response includes a token
      if (response?.token) {
        setSuccessMsg('Login successful, navigating to home page...')
        setTimeout(() => {
          navigate('/') // navigate to collectionFeed
        }, 3000)
      }
      console.log('Response. Attempting to nav')
    } catch(err) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // add bootstap classes
  return (
    <div className="login-page">
      <p className=".h1" id="site-name">Art Collector</p>

      <h1>Log In</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div>
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

        <div>
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

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>

    </div>
  )
}