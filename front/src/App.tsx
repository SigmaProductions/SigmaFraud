import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Dashboard from "./dashboard/Dashboard";
import styled from "styled-components";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import Stats from "./stats/Stats";
import MlModel from "./ml-model/MlModel";

function App() {
  const AppWrapper = styled.div`
    text-align: center;
    height: 100%;
    padding: 1rem;
  `;
  type routes = "dash" | "stats" | "model";

  const navRadios = [
    { name: "Dashboard", value: "dash" },
    { name: "Statistics", value: "stats" },
    { name: "Model", value: "model" },
  ];

  const [route, setRoute] = useState<routes>("dash");
  const Title = styled.h2``;
  return (
    <AppWrapper>
      <header className="App-header">
        <img src="/cc.png" className="App-logo" alt="logo" />
        <h2>Sigma fraud</h2>
        <ButtonGroup>
          {navRadios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={"outline-success"}
              name="radio"
              value={radio.value}
              checked={route === radio.value}
              onChange={(e) => setRoute(e.currentTarget.value as routes)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </header>
      {route === "dash" && <Dashboard></Dashboard>}
      {route === "stats" && <Stats></Stats>}
      {route === "model" && <MlModel></MlModel>}
    </AppWrapper>
  );
}

export default App;
