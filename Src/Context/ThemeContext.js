import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
 
const defaultTheme = 'light';
const alternativeTheme = 'dark';

// Context with default values
const ThemeContext = createContext({
  theme: defaultTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || defaultTheme);

  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        } else {
          setTheme(systemTheme || 'light');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    })();
  }, [systemTheme]);
  

  const toggleTheme = async () => {
    try {
      const newTheme = theme === defaultTheme ? alternativeTheme : defaultTheme;
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
