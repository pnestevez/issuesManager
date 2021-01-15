import { useContext } from 'react';
import { mutate } from 'swr';
// Context
import UserContext from '../context/UserContext';
// Components
import Card from './Card';
import styles from '../styles/Issues.module.css';
// Functions
import { fetcher } from '../utils';

export default function Issues({ issues, query }) {
  const { user, votes, setVotes } = useContext(UserContext);

  const handleDelete = (id) => {
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/issues/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        author: user.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // Mutate data through api request
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/issues`);
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/issues/priorities`);
      });
  };

  const handleVote = (i, alreadyVoted) => {
    const method = alreadyVoted ? 'DELETE' : 'POST';

    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/issues/${issues[i].id}/vote`, {
      method,
      body: JSON.stringify({
        author: user.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // Mutate data through api request
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/issues/priorities`);

        // Mutate data locally
        const updated = [...issues];
        updated[i] = {
          ...updated[i],
          votes: alreadyVoted ? updated[i].votes - 1 : updated[i].votes + 1,
        };
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/issues`, updated, false);
        setVotes({ ...votes, [issues[i].id]: !alreadyVoted });
      });
  };

  return (
    <div className={styles.issues}>
      {issues && issues.filter(issue => issue.title.toLowerCase().match(query.toLowerCase())
                || issue.description.toLowerCase().match(query.toLowerCase())).map((issue, i) => (
                  <Card
                    key={issue.id}
                    issue={issue}
                    i={i}
                    handleDelete={handleDelete}
                    handleVote={handleVote}
                  />
      ))}
    </div>
  );
}
