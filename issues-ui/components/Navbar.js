import { useContext } from 'react';
import Link from 'next/link';
// Context
import UserContext from '../context/UserContext';
// Components
import styles from '../styles/Navbar.module.css';

export default function Navbar({ query }) {
  const {
    user, setUser, setVotes, setShowModal,
  } = useContext(UserContext);

  const handleLogout = async () => {
    const response = await fetch('/api/logout');
    response.ok && (setUser(null), setVotes(null));
  };

  return (
    <div className={styles.container}>
      {query
        ? <input type="text" placeholder="Looking for an issue?" value={query.value} onChange={query.handleChange} />
        : (
          <Link href="/issues">
            <a>
              <img src="/back.svg" alt="back" className={styles.back} />
            </a>
          </Link>
        )}
      {user && user.email
        ? <img src="/logout.svg" alt="Login" className={styles.icon} onClick={handleLogout} />
        : <img src="/login.svg" alt="Login" className={styles.icon} onClick={() => setShowModal(true)} />}
    </div>
  );
}
