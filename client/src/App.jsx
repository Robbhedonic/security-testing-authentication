import { useEffect, useState } from 'react';
import Profile from './components/Profile/Profile';

const BACKEND = 'http://localhost:3000';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined); // undefined = not yet loaded

  // Optional challenge: call /me on load to know auth state
  useEffect(() => {
    fetch(`${BACKEND}/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data))
      .catch(() => setCurrentUser(null));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <h1>Auth0 + Express</h1>

      {/* Optional challenge: conditionally show Login or Logout */}
      {currentUser === undefined ? null : currentUser ? (
        <p>
          Welcome, {currentUser.given_name || currentUser.name} &mdash;{' '}
          <a href={`${BACKEND}/logout`}>Log out</a>
        </p>
      ) : (
        <p>
          <a href={`${BACKEND}/login`}>Log in</a>
        </p>
      )}

      <Profile />
    </div>
  );
}

export default App;