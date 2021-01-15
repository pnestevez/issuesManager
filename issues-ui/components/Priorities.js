// Components
import List from './List';
import styles from '../styles/Priorities.module.css';

export default function Priorities({ pendingPriorities, queuedIssues }) {
  return (
    <div className={styles.priorities}>
      <div className={styles.title}>
        Top 10 priorities
        {' '}
        <span>(pending)</span>
      </div>
      <List issues={pendingPriorities} />
      <div className={styles.title}>
        <span>In queue</span>
        {' '}
        issues
      </div>
      <List issues={queuedIssues} />
    </div>
  );
}
