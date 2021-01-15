import { useState, useContext } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
// Context
import UserContext from '../../context/UserContext';
// Components
import Layout from '../../components/Layout';
import styles from '../../styles/Issue.module.css';

import formStyles from '../../styles/Form.module.css';
// Functions
import { fetcher } from '../../utils';

export default function Issue({ issue }) {
  const { user, setShowModal } = useContext(UserContext);

  const [status, setStatus] = useState(issue.status);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/issues/${issue.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => setIsLoading(false));
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles[issue.type]}>
          <div className={styles.tool}>{issue.tool.name}</div>
          <div>
            {issue.votes}
            {' '}
            {issue.votes === 1 ? 'votes' : 'vote'}
          </div>
        </div>
        <div className={styles.issue}>
          <div className={styles.titleBox}>
            <div className={styles.title}>
              <span>{issue.title}</span>
              {' '}
              by
              {' '}
              {issue.author}
            </div>
          </div>
          <div className={styles.description}>{issue.description}</div>
          <img src={issue.image} alt={issue.name} />
        </div>
        <div className={styles.status}>
          <div>
            Update
            <span>status</span>
            :
          </div>
          {isLoading
            ? (
              <SyncLoader
                size={6}
                margin={1.5}
                color="rgb(130,130,130)"
                loading
              />
            )
            : (
              <select
                disabled={!user}
                className={formStyles.input}
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="pending">Pending of aproval</option>
                <option value="queued">In produccion queue</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            )}
          <button type="submit" onClick={() => (user ? handleSubmit() : setShowModal(true))}>
            {user
              ? <img src="/pen.svg" alt="send" />
              : <img src="/login.svg" alt="send" />}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const { id } = context.query;
  return fetcher(`${process.env.NEXT_PUBLIC_API_URL}/issues/${id}`)
    .then((issue) => {
      if (!issue) return { notFound: true };
      return {
        props: {
          issue,
        },
      };
    });
}
