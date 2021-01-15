import { useContext } from 'react';
// Context
import Head from 'next/head';
import UserContext from '../context/UserContext';
// Components
import Navbar from './Navbar';
import Footer from './Footer';
import Modal from './Modal';
import styles from '../styles/Home.module.css';

export default function Layout({ query, children }) {
  const { showModal } = useContext(UserContext);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>BI Issues Manager</title>
          <link href="/icon.svg" rel="icon" data-head-react="true" />
        </Head>
        <Navbar query={query} />

        <main className={styles.main}>
          {children}
        </main>

        <Footer />
      </div>
      {showModal && <Modal />}
    </>
  );
}
