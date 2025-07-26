import React from "react";
import Router from "./route/Index";
import ThemeProvider from "./layout/provider/Theme";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;