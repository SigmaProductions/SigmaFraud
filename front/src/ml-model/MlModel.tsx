import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { startTraining } from "../services/reports.service";

type Props = {};

export default function MlModel({}: Props) {
  const Wrapper = styled.div`
    height: 15rem;
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;
  const [trainState, setTrainState] = useState(false);

  const train = () => {
    try {
      startTraining().then((res) => setTrainState(true));
    } catch (e) {
      setTrainState(true);
    }
  };

  return (
    <Wrapper>
      <h2>Rozpocznij trenowanie modelu</h2>
      <Button variant="danger" size="lg" onClick={train}>
        trenuj
      </Button>
      {trainState && "Trwa trenowanie modelu"}
    </Wrapper>
  );
}
