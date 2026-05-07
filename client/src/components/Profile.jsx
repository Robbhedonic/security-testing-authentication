import { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND = 'http://localhost:3000';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [secureData, setSecureData] = useState(null);
  const [secureLoading, setSecureLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND}/profile`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Task B: fetch secure data
  async function fetchSecureData() {
    setSecureLoading(true);
    try {
      const response = await axios.get(`${BACKEND}/secure-data`, {
        withCredentials: true,
      });
      setSecureData(response.data.message);
    } catch {
      setSecureData('Error: could not fetch secure data.');
    } finally {
      setSecureLoading(false);
    }
  }

  // Task A: loading skeleton
  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          height: 120,
          borderRadius: 8,
          background: '#e0e0e0',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
        aria-label="Loading..."
      />
    );
  }

  if (!user) return <p>Not logged in.</p>;

  return (
    <div>
      {/* Task A: profile picture with fixed borderRadius */}
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name}
          style={{ width: 80, borderRadius: '50%' }}
        />
      )}

      {/* Task A: given_name with fallback to name */}
      <h2>Hello {user.given_name || user.name}</h2>

      {/* Task A: email */}
      <p>{user.email}</p>

      {/* Task A: Log out button */}
      <a href={`${BACKEND}/logout`}>Log out</a>

      {/* Task B: fetch secure data */}
      <div style={{ marginTop: 16 }}>
        <button onClick={fetchSecureData} disabled={secureLoading}>
          {secureLoading ? 'Loading...' : 'Fetch secure data'}
        </button>
        {secureData && <p>{secureData}</p>}
      </div>
    </div>
  );
}

export default Profile;