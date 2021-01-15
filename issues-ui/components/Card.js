import { useContext } from 'react';
// Context
import Link from 'next/link';
import UserContext from '../context/UserContext';
import styles from '../styles/Card.module.css';

export default function Card({
  issue, i, handleDelete, handleVote,
}) {
  const { user, votes } = useContext(UserContext);
  const alreadyVoted = votes && votes[issue.id];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.status}>
          {issue.status}
          {' '}
          |
          {' '}
          {issue.votes}
          {' '}
          votes
        </div>
        {user && user.email === issue.author
          ? (
            <div className={styles.trash} onClick={() => handleDelete(issue.id)}>
              <img className={styles.icon} src="/delete.svg" alt="delete" />
            </div>
          )
          : null}

      </div>
      <Link href={`/issues/${issue.id}`}>
        <div className={styles.title}>{issue.title}</div>
      </Link>
      <div className={styles[issue.type]}>
        {issue.tool.name}
        {' '}
        |
        {' '}
        {issue.type}
      </div>
      <div className={styles.description}>{issue.description}</div>
      <img className={styles.image} src={issue.image} alt={issue.name} />
      <div className={styles.vote}>
        <button
          type="submit"
          disabled={!user || issue.status === 'rejected' || issue.status === 'completed'}
          onClick={() => handleVote(i, alreadyVoted)}
        >
          {alreadyVoted ? 'Cancel vote' : 'Vote'}
        </button>
      </div>
    </div>
  );
}
