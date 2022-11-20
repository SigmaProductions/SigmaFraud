import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import styled from "styled-components";
import { getTrainingMetrics, startTraining } from "../services/reports.service";

type Props = {};

export default function MlModel({}: Props) {
  const Wrapper = styled.div`
    gap: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80%;
  `;
  const [trainState, setTrainState] = useState(false);

  const train = () => {
    try {
      startTraining().then((res) => setTrainState(true));
    } catch (e) {
      setTrainState(true);
    }
  };

  const [metrics, setMetrics] = useState<any>();
  useEffect(() => {
    getTrainingMetrics().then((res) => setMetrics(res));
  }, []);

  const MetricsCard = styled(Card)`
    margin-top: 5rem;
  `;

  const P = styled.p`
    margin-top: 2rem;
  `;
  const F1 = styled.h2`
    color: red;
  `;
  return (
    <Wrapper>
      <h2>Rozpocznij trenowanie modelu</h2>
      <Button variant="danger" size="lg" onClick={train}>
        trenuj
      </Button>
      {trainState && "Trwa trenowanie modelu"}
      <MetricsCard>
        <P>
          <h3>Wskażnik precyzji makro F1</h3>
          <F1>
            {metrics &&
              metrics.customSingleLabelClassificationEvaluation.macroF1}
          </F1>
        </P>
        <h2>Obecne Parametry</h2>
        {metrics && JSON.stringify(metrics, null, 2)}
      </MetricsCard>
    </Wrapper>
  );
}
