import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import classNames from "classnames";

interface Theme {
  main: string;
  sidebar: string;
  sidenav: string;
  sidebarVisibility: boolean;
  sidebarMobile: boolean;
  header: string;
  skin: string;
}

interface ThemeUpdate {
  uistyle: (value: string) => void;
  sidebar: (value: string) => void;
  sidenav: (value: string) => void;
  sidebarVisibility: () => void;
  sidebarHide: () => void;
  header: (value: string) => void;
  skin: (value: string) => void;
  reset: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<Theme | undefined>(undefined);
const ThemeUpdateContext = createContext<ThemeUpdate | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeUpdate() {
  const context = useContext(ThemeUpdateContext);
  if (context === undefined) {
    throw new Error('useThemeUpdate must be used within a ThemeProvider');
  }
  return context;
}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const defaultTheme: Theme = {
    main: "default", // other value can be passed "softy"
    sidebar: "white", // other value can be passed "light,dark,theme"
    sidenav: "light", // other value can be passed "theme,white,dark"
    sidebarVisibility: false,
    sidebarMobile: false,
    header: "white", // other value can be passed "light,dark,theme"
    skin: "light", // other value can be passed "dark"
  };

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const themeUpdate: ThemeUpdate = {
    uistyle: function(value: string) {
      setTheme({...theme, main: value});
    },
    sidebar: function(value: string) {
      setTheme({...theme, sidebar: value});
    },
    sidenav: function(value: string) {
      setTheme({...theme, sidenav: value});
    },
    sidebarVisibility: function() {
      setTheme({...theme, sidebarVisibility: !theme.sidebarVisibility});
    },
    sidebarHide: function() {
      setTheme({...theme, sidebarVisibility: false});
    },
    header: function(value: string) {
      setTheme({...theme, header: value});
    },
    skin: function(value: string) {
      setTheme({...theme, skin: value});
    },
    reset: function() {
      setTheme({
        ...theme, 
        main: defaultTheme.main, 
        sidebar: defaultTheme.sidebar, 
        sidenav: defaultTheme.sidenav, 
        skin: defaultTheme.skin 
      });
    },
  };

  const bodyClass = classNames({
    "nk-body ui-rounder has-sidebar has-touch nk-nio-theme": true,
  });

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.className = bodyClass;
    }
  }, [bodyClass]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) return;

    if (theme.main === "default") {
      body.classList.add("ui-default");
      body.classList.remove("ui-softy");
    }
    if (theme.main === "softy") {
      body.classList.add("ui-softy");
      body.classList.remove("ui-default");
    }
    if (theme.skin === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
    if (theme.sidebarVisibility === true) {
      body.classList.add("nav-shown");
    } else {
      body.classList.remove("nav-shown");
    }
  }, [theme]);

  useEffect(() => {
    const handleMobileSidebar = () => {
      if (window.innerWidth < 1200) {
        setTheme(prev => ({...prev, sidebarMobile: true}));
      } else {
        setTheme(prev => ({...prev, sidebarMobile: false, sidebarVisibility: false}));
      }
    };

    handleMobileSidebar();
    window.addEventListener('resize', handleMobileSidebar);
    return () => {
      window.removeEventListener('resize', handleMobileSidebar);
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={themeUpdate}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;