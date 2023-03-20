import React, { createContext } from 'react';

import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import { useToggleState } from '@/hooks/useToggleState';

export type GlobalSpinnerContextValue = {
  isSpinnerVisible: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
  toggleSpinner: () => void;
};

export const GlobalSpinnerContext = createContext<
  GlobalSpinnerContextValue | undefined
>(undefined);

type GlobalSpinnerContextProviderProps = {
  children: React.ReactNode;
};

const GlobalSpinnerContextProvider = (
  props: GlobalSpinnerContextProviderProps
) => {
  const { children } = props;
  const {
    state: isSpinnerVisible,
    open: showSpinner,
    close: hideSpinner,
    toggle: toggleSpinner,
  } = useToggleState(false);

  return (
    <GlobalSpinnerContext.Provider
      value={{
        isSpinnerVisible,
        showSpinner,
        hideSpinner,
        toggleSpinner,
      }}
    >
      {children}
      <GlobalSpinner />
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContextProvider;
