import React, { createContext, useContext, useState } from 'react';

export const ARiContext = createContext();

export const ARiProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <ARiContext.Provider value={{ state, setState }}>
      {children}
    </ARiContext.Provider>
  );
};

export const useApiContext = () => useContext(ApiContext);
