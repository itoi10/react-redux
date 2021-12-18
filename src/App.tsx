import React from "react";
import { Header } from "./components/Header";
import Router from "./Router";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="py-24 px-0">
        <Router />
      </main>
    </>
  );
};

export default App;
