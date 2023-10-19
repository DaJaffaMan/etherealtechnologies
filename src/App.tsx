import React from "react";
import HomePage from "./views/home";

import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HomePage />
    </div>
  );
};

export default App;
