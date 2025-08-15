import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Comparer from '../pages/comparer';
import { GlobalProvider } from '../context/GlobalProvider';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

type ThemeType = 'light' | 'dark'

const Dashboard = () => {
  const [theme, setTheme] = useState<ThemeType>('light')

  useEffect(() => {
    //System dark/light mode changes 
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    /**
     * Setting the saved theme
     * priority is given to the saved one, if there's no saved one, system default is applied
     */
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme as ThemeType)
    } else {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    //Listen to System dark/light mode changes 
    const handleChange = () => {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const updateTheme = () => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light')
      setTheme('light')
    } else {
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }
  }

  return (
    <GlobalProvider>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">CC</Navbar.Brand>
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} onClick={updateTheme} role='button' title='Toggle Dark/Light mode'/>
        </Container>
      </Navbar>
      <main><Comparer /></main>
    </GlobalProvider>
  );
}

export default Dashboard;