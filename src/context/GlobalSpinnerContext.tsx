import React, { useMemo } from 'react';

import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import { contextFactory } from '@/utils/contextFactory';
import { useToggleState } from '@/hooks/useToggleState';

type GlobalSpinnerValues = {
  isSpinnerVisible: boolean;
};

type GlobalSpinnerActions = {
  showSpinner: () => void;
  hideSpinner: () => void;
  toggleSpinner: () => void;
};

export const [useGlobalSpinnerContext, GlobalSpinnerContext] =
  contextFactory<GlobalSpinnerValues>();

export const [useGlobalSpinnerActionsContext, GlobalSpinnerActionsContext] =
  contextFactory<GlobalSpinnerActions>();

interface Props {
  children: React.ReactNode;
}

const GlobalSpinnerContextProvider = (props: Props) => {
  const { children } = props;

  const {
    state: isSpinnerVisible,
    open: showSpinner,
    close: hideSpinner,
    toggle: toggleSpinner,
  } = useToggleState(false);

  const values = useMemo(
    () => ({
      isSpinnerVisible,
    }),
    [isSpinnerVisible]
  );

  const actions = useMemo(
    () => ({
      showSpinner,
      hideSpinner,
      toggleSpinner,
    }),
    []
  );

  return (
    <GlobalSpinnerContext.Provider value={values}>
      <GlobalSpinnerActionsContext.Provider value={actions}>
        {children}
        <GlobalSpinner />
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContextProvider;
