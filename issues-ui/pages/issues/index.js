import useSWR from 'swr';
// Components
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Launcher from '../../components/Launcher';
import Issues from '../../components/Issues';
import Priorities from '../../components/Priorities';
// Functions
import useFormInput from '../../hooks/useFormInput';
import { fetcher } from '../../utils';

export default function Home(props) {
  // Stale while revalidate for
  // all issues,
  const { data: issues } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/issues`,
    fetcher,
    {
      initialData: props.issues,
      refreshInterval: process.env.NEXT_PUBLIC_REFRESH_INTERVAL,
    },
  );
  // all tools
  const { data: tools } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/tools`,
    fetcher,
    {
      initialData: props.tools,
      refreshInterval: process.env.NEXT_PUBLIC_REFRESH_INTERVAL,
    },
  );
  // & top 10 queued priorities
  const { data: pendingPriorities } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/issues/priorities`,
    fetcher,
    {
      initialData: props.pendingPriorities,
      refreshInterval: process.env.NEXT_PUBLIC_REFRESH_INTERVAL,
    },
  );

  // Set queued issues locally
  const [queuedIssues, setQueuedIssues] = useState(null);
  useEffect(() => {
    setQueuedIssues(issues.filter(i => i.status === 'queued'));
  }, [issues]);

  // Handle query
  const query = useFormInput('');

  return (
    <Layout query={query}>

      <Launcher tools={tools} />

      <Issues
        issues={issues}
        query={query.value}
      />

      <Priorities
        pendingPriorities={pendingPriorities}
        queuedIssues={queuedIssues}
      />

    </Layout>
  );
}

export function getServerSideProps() {
  const promises = [
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/issues`),
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/issues/priorities`),
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/tools`),
  ];
  return Promise.all(promises).then(([
    issues,
    pendingPriorities,
    tools,
  ]) => ({
    props: {
      issues,
      pendingPriorities,
      tools,
    },
  }));
}
