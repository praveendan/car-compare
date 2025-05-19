import React, { createContext, useReducer, ReactNode } from 'react';
import { AppState } from './types';
import { AppAction } from './action.types';
import { rootReducer, initialAppState } from './rootReducer';

interface GlobalContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  state: initialAppState,
  dispatch: () => null,
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialAppState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
