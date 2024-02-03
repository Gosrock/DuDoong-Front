import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeType = 'black' | 'white';
export interface HeaderColorContextType {
  theme: ThemeType;
  setHeaderColor: (value: ThemeType) => void;
}

export const headerColorContext = createContext<HeaderColorContextType>({
  theme: 'white',
  setHeaderColor: () => {},
});

export const useHeaderColorContext = (): HeaderColorContextType => {
  const context = useContext(headerColorContext);
  if (!context) {
    throw new Error(
      'useHeaderColorContext 훅은 HeaderColorProvider 안에서 사용 되어야 해요.',
    );
  }
  return context;
};

export const HeaderColorProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('white');

  const setHeaderColor = (value: ThemeType) => setTheme(value);

  return (
    <headerColorContext.Provider value={{ theme, setHeaderColor }}>
      {children}
    </headerColorContext.Provider>
  );
};
