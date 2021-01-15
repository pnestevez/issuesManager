import Link from 'next/link';
// Components
import styles from '../styles/Priorities.module.css';

export default function List({ issues }) {
  return (
    <div className={styles.container}>
      {issues && issues.map((issue, i) => (
        <Link key={issue.id} href={`/issues/${issue.id}`}>
          <a className={i % 2 ? styles.odd : styles.pair}>
            <div className={styles.info}>
              <div className={styles.votes}>{`${i + 1}.`}</div>
              <div className={styles.tool}>{issue.tool.name}</div>
              <div className={styles.name}>{`${issue.title.slice(0, 16)} (${issue.votes})`}</div>
            </div>
            <div className={styles[issue.type]}>{issue.type[0]}</div>
          </a>
        </Link>
      ))}
    </div>
  );
}
