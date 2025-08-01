import React from "react";
import Router from "./route/Index";
import ThemeProvider from "./layout/provider/Theme";
import { PWANotifications } from "./components/PWANotifications";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router />
      <PWANotifications />
    </ThemeProvider>
  );
};

export default App;