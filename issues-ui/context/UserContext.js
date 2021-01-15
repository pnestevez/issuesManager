import { useState, useEffect, createContext } from 'react';
import { fetcher, converter } from '../utils';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(null);
  useEffect(() => fetcher('/api/user')
    .then(res => res && setUser(res)),
  []);

  const [votes, setVotes] = useState(null);
  useEffect(() => user && fetcher(`${process.env.NEXT_PUBLIC_API_URL}/votes?author=${user.email}`)
    .then(res => res && setVotes(converter(res, 'issueId'))),
  [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        votes,
        setVotes,
        showModal,
        setShowModal,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
