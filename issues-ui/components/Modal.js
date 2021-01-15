import { Magic } from 'magic-sdk';
import { useState, useContext } from 'react';
// Context
import UserContext from '../context/UserContext';
// Components
import styles from '../styles/Modal.module.css';
import formStyles from '../styles/Form.module.css';
// Functions
import useFormInput from '../hooks/useFormInput';
import { fetcher, notNull } from '../utils';

export default function Modal() {
  const { setShowModal, setUser, setIsLoading } = useContext(UserContext);

  // Handle email imput
  const email = useFormInput('');
  const [isNull, setIsNull] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate not null input value
    if (!notNull(email.value)) {
      setIsNull(true);
      return;
    }

    setIsLoading(true);
    setShowModal(false);

    // Ask magic for the Decentralized ID
    let did;
    try {
      did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
        .auth
        .loginWithMagicLink({ email: email.value });
    } catch (error) {
      setShowModal(true);
    }

    // Login with our own API
    const user = await fetcher('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
    });

    setUser(user);
    setIsLoading(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img onClick={() => setShowModal(false)} src="/close.svg" alt="close" />
        </div>
        <div className={styles.title}>
          <h2>Welcome</h2>
          <h4>to the issues manager!</h4>
        </div>
        <form onSubmit={handleLogin} className={formStyles.form}>
          <div className={formStyles.section}>
            <label>
              Email
              {' '}
              <span>{isNull && '- cannot be null'}</span>
            </label>
            <input className={formStyles.input} name="email" type="email" value={email.value} onChange={email.handleChange} />
          </div>
          <button type="submit" className={formStyles.submit} onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}
