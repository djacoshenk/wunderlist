import React, { createContext, useState } from 'react';

export const LocationURLContext = createContext();

export default function LocationURLProvider({ children }) {
  const [locationURL, setLocationURL] = useState('');

  const value = { locationURL, setLocationURL };

  return (
    <LocationURLContext.Provider value={value}>
      {children}
    </LocationURLContext.Provider>
  );
}
