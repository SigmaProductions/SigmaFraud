import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import styled from "styled-components";
import { getTrainingMetrics, startTraining } from "../services/reports.service";

type Props = {};

export default function MlModel({}: Props) {
  const Wrapper = styled.div`
    gap: 3px;
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
  const Json = styled.span`
    margin: 1rem;
  `;

  const [metrics, setMetrics] = useState<any>();
  useEffect(() => {
    getTrainingMetrics().then((res) => setMetrics(res));
  }, []);

  const MetricsCard = styled(Card)`
    display: flex;
  `;

  const P = styled.p`
    margin-top: 2rem;
  `;
  const F1 = styled.h2`
    color: red;
  `;
  const F2 = styled.h3`
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
          <h3>Wskażnik precyzji macro precision</h3>
          <F2>
            {metrics &&
              metrics.customSingleLabelClassificationEvaluation.macroPrecision}
          </F2>
          <h3>Wskażnik precyzji precision recall</h3>
          <F2>
            {metrics &&
              metrics.customSingleLabelClassificationEvaluation.macroRecall}
          </F2>
        </P>
        <h2>Obecne Parametry</h2>
        <Json>{metrics && JSON.stringify(metrics, null, 2)}</Json>
      </MetricsCard>
    </Wrapper>
  );
}
