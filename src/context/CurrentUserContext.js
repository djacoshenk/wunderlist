import React, { createContext, useState } from 'react';

export const CurrentUserContext = createContext();

export default function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function toggleLoader() {
    setIsLoading(!isLoading);
  }

  const value = {
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading,
    toggleLoader,
  };

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
