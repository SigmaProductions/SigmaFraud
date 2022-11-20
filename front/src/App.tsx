import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Dashboard from "./dashboard/Dashboard";
import styled from "styled-components";

function App() {
  const AppWrapper = styled.div`
    text-align: center;
    height: 100%;
    padding: 1rem;
  `;

  return (
    <AppWrapper>
      <header className="App-header">
        <img src="/cc.png" className="App-logo" alt="logo" />
      </header>
      <Dashboard></Dashboard>
    </AppWrapper>
  );
}

export default App;
